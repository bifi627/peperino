using MediatR;
using Microsoft.EntityFrameworkCore;
using Peperino.Core.Contracts;
using Peperino.Core.EntityFramework.Entities;
using Peperino.Core.EntityFramework.Exceptions;
using Peperino.EntityFramework;
using System.ComponentModel.DataAnnotations;

namespace Peperino.Application.Inventory.Command
{
    public class RenameInventoryCommand : IRequest<Unit>
    {
        [Required]
        public string Slug { get; set; }

        [Required]
        [MinLength(3)]
        public string NewName { get; set; }

        public RenameInventoryCommand(string slug, string newName)
        {
            Slug = slug;
            NewName = newName;
        }
    }

    public class RenameInventoryCommandHandler : IRequestHandler<RenameInventoryCommand, Unit>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly ICurrentUserService _currentUserService;

        public RenameInventoryCommandHandler(IApplicationDbContext dbContext, ICurrentUserService currentUserService)
        {
            _dbContext = dbContext;
            _currentUserService = currentUserService;
        }

        public async Task<Unit> Handle(RenameInventoryCommand request, CancellationToken cancellationToken)
        {
            var inventory = await _dbContext.CheckLists.FirstOrDefaultAsync(r => r.Slug == request.Slug, cancellationToken: cancellationToken);
            var currentUser = await _dbContext.Users.FirstOrDefaultAsync(u => u.Id == _currentUserService.UserId, cancellationToken: cancellationToken);

            if (currentUser is null)
            {
                throw new ArgumentNullException("Current user is null", nameof(currentUser));
            }

            if (inventory is null)
            {
                throw new Exception($"Inventory {request.Slug} not found");
            }

            var checkListPermission = inventory.RequireAccessWrite(currentUser, false);
            var roomPermission = inventory.Room?.RequireAccessWrite(currentUser, false) ?? false;

            if (!checkListPermission && !roomPermission)
            {
                throw new EntityAccessException(inventory.Name, inventory.Id, currentUser.Id, AccessLevel.Write);
            }

            inventory.Name = request.NewName;

            await _dbContext.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
