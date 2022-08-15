using FluentValidation;
using Peperino.Contracts.DbContexts;

namespace Peperino.Application.User.Commands.CreateUser
{
    public class CreateUserCommandValidator : AbstractValidator<CreateUserCommand>
    {
        private readonly IUsersDbContext _usersDbContext;

        public CreateUserCommandValidator(IUsersDbContext usersDbContext)
        {
            _usersDbContext = usersDbContext;

            RuleFor(user => user.UserId).NotEmpty().NotEqual("0");
            RuleFor(user => user.UserId).Must(BeUniqueExternalId).WithMessage("Account with this id already created");

            RuleFor(user => user.UserName).NotEmpty().MinimumLength(6).MaximumLength(64);
            RuleFor(user => user.UserName).Must(BeUniqueUserName).WithMessage("Username already in use");
        }

        private bool BeUniqueExternalId(string userId)
        {
            return _usersDbContext.Users.Find(userId) == null;
        }

        private bool BeUniqueUserName(string username)
        {
            return _usersDbContext.Users.FirstOrDefault(u => u.UserName == username) == null;
        }
    }
}
