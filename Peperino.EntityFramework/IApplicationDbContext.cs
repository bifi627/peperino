﻿using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Peperino.Contracts.DbContexts;
using Peperino.EntityFramework.Entities;

namespace Peperino.EntityFramework
{
    public interface IApplicationDbContext : IUsersDbContext, ISessionDbContext, IBaseDbContext
    {
        DatabaseFacade Database { get; }
        DbSet<Demo> Demos { get; }
    }
}
