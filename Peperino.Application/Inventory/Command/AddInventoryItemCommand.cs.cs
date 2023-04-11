using MediatR;
using Microsoft.EntityFrameworkCore;
using Peperino.Core.Contracts;
using Peperino.Core.EntityFramework.Entities;
using Peperino.EntityFramework;
using Peperino.EntityFramework.Entities.CheckList;
using Peperino.EntityFramework.Entities.Inventory;
using System.ComponentModel.DataAnnotations;

namespace Peperino.Application.Inventory.Command
{
    public class AddInventoryItemCommand : IRequest<InventoryCheckListItem>
    {
        [Required]
        public string InventorySlug { get; set; } = string.Empty;

        [Required]
        public string Text { get; set; } = string.Empty;

        [Required]
        public double Quantity { get; set; } = 0.0;

        [Required]
        public QuantityUnit Unit { get; set; } = QuantityUnit.Unit;
    }

    public class AddInventoryItemCommandHandler : IRequestHandler<AddInventoryItemCommand, InventoryCheckListItem>
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly ICurrentUserService _currentUserService;
        private readonly Core.EntityFramework.Entities.User? _currentUser;

        public AddInventoryItemCommandHandler(IApplicationDbContext dbContext, ICurrentUserService currentUserService)
        {
            _dbContext = dbContext;
            _currentUserService = currentUserService;
            _currentUser = _dbContext.Users.FirstOrDefault(u => u.Id == _currentUserService.UserId);
        }

        public async Task<InventoryCheckListItem> Handle(AddInventoryItemCommand request, CancellationToken cancellationToken)
        {
            var inventory = await _dbContext.CheckLists.FirstOrDefaultAsync(i => i.Slug == request.InventorySlug);

            if (inventory is null)
            {
                throw new ArgumentException($"Inventory with slug '{request.InventorySlug}' not found");
            }

            inventory.RequireAccess(_currentUser, AccessLevel.WriteContent);

            var itemType = await _dbContext.CheckListItemTypes.FirstOrDefaultAsync(x => x.Variant == ItemVariant.Inventory);

            var inventoryItem = new InventoryCheckListItem()
            {
                ItemType = itemType,
                Text = request.Text,
                Quantity = request.Quantity,
                Unit = request.Unit,
            };

            inventory.Entities.Add(inventoryItem);

            await _dbContext.SaveChangesAsync(cancellationToken);

            return inventoryItem;
        }
    }
}
