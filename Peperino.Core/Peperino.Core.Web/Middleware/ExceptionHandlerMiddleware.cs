using FluentValidation;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Server.Kestrel.Core;
using Microsoft.Extensions.Logging;
using Peperino.Core.EntityFramework.Exceptions;
using System.Text.Json;

namespace Peperino.Core.Web.Middleware
{
    public sealed class ExceptionHandlerMiddleware : IMiddleware
    {
        private readonly ILogger<ExceptionHandlerMiddleware> _logger;
        public ExceptionHandlerMiddleware(ILogger<ExceptionHandlerMiddleware> logger)
        {
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            try
            {
                await next(context);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                await HandleExceptionAsync(context, ex);
            }
        }
        private static async Task HandleExceptionAsync(HttpContext httpContext, Exception exception)
        {
            var statusCode = GetStatusCode(exception);
            var response = new
            {
                details = GetDetails(exception),
                status = statusCode,
                message = exception.Message,
                errors = GetErrors(exception)
            };
            httpContext.Response.ContentType = "application/json";
            httpContext.Response.StatusCode = statusCode;
            await httpContext.Response.WriteAsync(JsonSerializer.Serialize(response));
        }
        private static int GetStatusCode(Exception exception)
        {
            return exception switch
            {
                BadHttpRequestException => StatusCodes.Status400BadRequest,
                //NotFoundException => StatusCodes.Status404NotFound,
                ValidationException => StatusCodes.Status422UnprocessableEntity,
                EntityAccessException => StatusCodes.Status403Forbidden,
                _ => StatusCodes.Status500InternalServerError
            };
        }

        private static string GetDetails(Exception exception)
        {
            return exception switch
            {
                ApplicationException applicationException => applicationException.Message,
                ValidationException validationException => validationException.Message,
                EntityAccessException entityAccessException => entityAccessException.GetReason(),
                _ => "Server Error"
            };
        }

        private static IEnumerable<string> GetErrors(Exception exception)
        {
            var errors = Enumerable.Empty<string>();
            if (exception is ValidationException validationException)
            {
                errors = validationException.Errors.Select(x => x.ErrorMessage);
            }
            return errors;
        }
    }
}
