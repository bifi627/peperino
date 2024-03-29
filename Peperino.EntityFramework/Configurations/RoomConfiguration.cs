﻿using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Peperino.EntityFramework.Entities;

namespace Peperino.EntityFramework.Configurations
{
    public class RoomConfiguration : IEntityTypeConfiguration<Room>
    {
        public void Configure(EntityTypeBuilder<Room> builder)
        {
            builder.HasOne(d => d.CreatedBy).WithMany().OnDelete(DeleteBehavior.SetNull);
            builder.HasOne(d => d.LastModifiedBy).WithMany().OnDelete(DeleteBehavior.SetNull);

            builder.ToTable("Rooms");
        }
    }
}
