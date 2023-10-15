using MediatR;
using Microsoft.EntityFrameworkCore;
using Peperino.Core.Contracts;
using Peperino.Core.EntityFramework.Entities;
using Peperino.Core.EntityFramework.Exceptions;
using Peperino.EntityFramework;
using System.ComponentModel.DataAnnotations;

namespace Peperino.Application.CheckList.Commands.UpdateCheckList
{
    public class RenameCheckListCommand : IRequest<Unit>
    {
        [Required]
        public string Slug { get; set; }

        [Required]
        [MinLength(3)]
        public string NewName { get; set; }

        public RenameCheckListCommand(string slug, string newName)
        {
            Slug = slug;
            NewName = newName;
        }
    }

    public class RenameCheckListCommandHandler : IRequestHandler<RenameCheckListCommand, Unit>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly ICurrentUserService _currentUserService;

        public RenameCheckListCommandHandler(IApplicationDbContext dbContext, ICurrentUserService currentUserService)
        {
            _dbContext = dbContext;
            _currentUserService = currentUserService;
        }

        public async Task<Unit> Handle(RenameCheckListCommand request, CancellationToken cancellationToken)
        {
            var checkList = await _dbContext.CheckLists.FirstOrDefaultAsync(r => r.Slug == request.Slug, cancellationToken: cancellationToken);
            var currentUser = await _dbContext.Users.FirstOrDefaultAsync(u => u.Id == _currentUserService.UserId, cancellationToken: cancellationToken);

            if (currentUser is null)
            {
                throw new ArgumentNullException("Current user is null", nameof(currentUser));
            }

            if (checkList is null)
            {
                throw new Exception($"CheckList {request.Slug} not found");
            }

            var checkListPermission = checkList.RequireAccessWrite(currentUser, false);
            var roomPermission = checkList.Room?.RequireAccessWrite(currentUser, false) ?? false;

            if (!checkListPermission && !roomPermission)
            {
                throw new EntityAccessException(checkList.Name, checkList.Id, currentUser.Id, AccessLevel.Write);
            }

            checkList.Name = request.NewName;

            await _dbContext.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
