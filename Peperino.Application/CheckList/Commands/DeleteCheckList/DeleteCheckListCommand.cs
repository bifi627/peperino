using MediatR;
using Microsoft.EntityFrameworkCore;
using Peperino.Contracts.DbContexts;
using Peperino.Contracts.Services;
using Peperino.Domain.Base;
using Peperino.EntityFramework;
using System.ComponentModel.DataAnnotations;

namespace Peperino.Application.CheckList.Commands.DeleteCheckList
{
    public class DeleteCheckListCommand : IRequest<Unit>
    {
        [Required]
        public string CheckListSlug { get; set; } = string.Empty;
    }

    public class DeleteCheckListCommandHandler : IRequestHandler<DeleteCheckListCommand, Unit>
    {
        private readonly IUsersDbContext _usersDbContext;
        private readonly IApplicationDbContext _dbContext;
        private readonly ICurrentUserService _currentUserService;
        private readonly Domain.Base.User? _currentUser;

        public DeleteCheckListCommandHandler(IApplicationDbContext dbContext, IUsersDbContext usersDbContext, ICurrentUserService currentUserService)
        {
            _dbContext = dbContext;
            _usersDbContext = usersDbContext;
            _currentUserService = currentUserService;
            _currentUser = _dbContext.Users.FirstOrDefault(u => u.Id == _currentUserService.UserId);
        }

        public async Task<Unit> Handle(DeleteCheckListCommand request, CancellationToken cancellationToken)
        {
            var checkList = await _dbContext.CheckLists.FirstOrDefaultAsync(c => c.Slug == request.CheckListSlug, cancellationToken: cancellationToken);

            if (checkList is null)
            {
                throw new ArgumentException("CheckList not found");
            }

            checkList.RequireAccess(_currentUser, AccessLevel.Delete);

            _dbContext.CheckLists.Remove(checkList);
            await _dbContext.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
