﻿namespace Peperino.Contracts.Services
{
    public interface ICurrentUserService
    {
        string UserId { get; }
        bool IsKnownPeperinoUser { get; }
    }
}
