using MediatR;
using Microsoft.EntityFrameworkCore;
using Peperino.Core.Contracts;
using Peperino.Core.EntityFramework.Entities;
using Peperino.EntityFramework;
using System.ComponentModel.DataAnnotations;

namespace Peperino.Application.Inventory.Command
{
    public class DeleteInventoryCommand : IRequest<Unit>
    {
        [Required]
        public string InventorySlug { get; set; } = string.Empty;
    }

    public class DeleteInventoryCommandHandler : IRequestHandler<DeleteInventoryCommand, Unit>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly ICurrentUserService _currentUserService;
        private readonly Core.EntityFramework.Entities.User? _currentUser;

        public DeleteInventoryCommandHandler(IApplicationDbContext dbContext, ICurrentUserService currentUserService)
        {
            _dbContext = dbContext;
            _currentUserService = currentUserService;
            _currentUser = _dbContext.Users.FirstOrDefault(u => u.Id == _currentUserService.UserId);
        }

        public async Task<Unit> Handle(DeleteInventoryCommand request, CancellationToken cancellationToken)
        {
            var inventory = await _dbContext.Inventories.FirstOrDefaultAsync(i => i.Slug == request.InventorySlug, cancellationToken);

            if (inventory is null)
            {
                throw new ArgumentException("Inventory not found");
            }

            inventory.RequireAccess(_currentUser, AccessLevel.Delete);

            _dbContext.Inventories.Remove(inventory);
            await _dbContext.SaveChangesAsync();

            return Unit.Value;
        }
    }
}
