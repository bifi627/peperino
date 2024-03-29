﻿using MediatR;
using Microsoft.EntityFrameworkCore;
using Peperino.Contracts.Services;
using Peperino.Core.Contracts;
using Peperino.Core.EntityFramework.Entities;
using Peperino.Core.EntityFramework.Exceptions;
using Peperino.EntityFramework;
using Peperino.EntityFramework.Entities.CheckList;
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
        private readonly IApplicationDbContext _dbContext;
        private readonly ICurrentUserService _currentUserService;
        private readonly IFirebaseStorageService _firebaseStorageService;
        private readonly Core.EntityFramework.Entities.User? _currentUser;

        public DeleteCheckListCommandHandler(IApplicationDbContext dbContext, ICurrentUserService currentUserService, IFirebaseStorageService firebaseStorageService)
        {
            _dbContext = dbContext;
            _currentUserService = currentUserService;
            _firebaseStorageService = firebaseStorageService;
            _currentUser = _dbContext.Users.FirstOrDefault(u => u.Id == _currentUserService.UserId);
        }

        public async Task<Unit> Handle(DeleteCheckListCommand request, CancellationToken cancellationToken)
        {
            var checkList = await _dbContext.CheckLists.FirstOrDefaultAsync(c => c.Slug == request.CheckListSlug, cancellationToken: cancellationToken);

            if (checkList is null)
            {
                throw new ArgumentException("CheckList not found");
            }

            var checkListPermission = checkList.RequireAccess(_currentUser, AccessLevel.Delete, false);
            var roomPermission = checkList.Room?.RequireAccess(_currentUser, AccessLevel.Delete, false) ?? false;

            if (!checkListPermission && !roomPermission)
            {
                throw new EntityAccessException(checkList.Name, checkList.Id, _currentUser?.Id ?? "?", AccessLevel.Delete);
            }

            _dbContext.CheckLists.Remove(checkList);
            await _dbContext.SaveChangesAsync(cancellationToken);

            foreach (var checkListItem in checkList.Entities)
            {
                if (checkListItem is ImageCheckListItem imageCheckListItem)
                {
                    await _firebaseStorageService.DeleteFile(StorageScope.CheckListStorage, imageCheckListItem.ImageReference);
                }
            }

            return Unit.Value;
        }
    }
}
