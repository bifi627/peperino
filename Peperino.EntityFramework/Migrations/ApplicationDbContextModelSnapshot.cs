﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using Peperino.EntityFramework;

#nullable disable

namespace Peperino.EntityFramework.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    partial class ApplicationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("Peperino.Domain.Base.AccessList", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int?>("ParentRelation")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("ParentRelation")
                        .IsUnique();

                    b.ToTable("AccessList");
                });

            modelBuilder.Entity("Peperino.Domain.Base.GroupAccess", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("AccessLevel")
                        .HasColumnType("integer");

                    b.Property<int?>("AccessListId")
                        .HasColumnType("integer");

                    b.Property<int>("UserGroupId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("AccessListId");

                    b.HasIndex("UserGroupId");

                    b.ToTable("GroupAccess");
                });

            modelBuilder.Entity("Peperino.Domain.Base.User", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("text");

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Peperino.Domain.Base.UserAccess", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("AccessLevel")
                        .HasColumnType("integer");

                    b.Property<int?>("AccessListId")
                        .HasColumnType("integer");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("AccessListId");

                    b.HasIndex("UserId");

                    b.ToTable("UserAccess");
                });

            modelBuilder.Entity("Peperino.Domain.Base.UserGroup", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("Created")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("CreatedById")
                        .HasColumnType("text");

                    b.Property<string>("GroupName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime?>("LastModified")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("LastModifiedById")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("CreatedById");

                    b.HasIndex("LastModifiedById");

                    b.ToTable("UserGroups");
                });

            modelBuilder.Entity("Peperino.Domain.Session.Session", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("SessionCookie")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("SessionName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Token")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("UserId")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Sessions");
                });

            modelBuilder.Entity("Peperino.EntityFramework.Entities.Demo", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("Created")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("CreatedById")
                        .HasColumnType("text");

                    b.Property<DateTime?>("LastModified")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("LastModifiedById")
                        .HasColumnType("text");

                    b.Property<string>("Value")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("CreatedById");

                    b.HasIndex("LastModifiedById");

                    b.ToTable("Demos");
                });

            modelBuilder.Entity("Peperino.EntityFramework.Entities.UserStore", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Theme")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("UserStores");
                });

            modelBuilder.Entity("UserUserGroup", b =>
                {
                    b.Property<int>("UserGroupsId")
                        .HasColumnType("integer");

                    b.Property<string>("UsersId")
                        .HasColumnType("text");

                    b.HasKey("UserGroupsId", "UsersId");

                    b.HasIndex("UsersId");

                    b.ToTable("UserUserGroup");
                });

            modelBuilder.Entity("Peperino.Domain.Base.AccessList", b =>
                {
                    b.HasOne("Peperino.EntityFramework.Entities.Demo", null)
                        .WithOne("Access")
                        .HasForeignKey("Peperino.Domain.Base.AccessList", "ParentRelation")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Peperino.Domain.Base.GroupAccess", b =>
                {
                    b.HasOne("Peperino.Domain.Base.AccessList", null)
                        .WithMany("GroupAccess")
                        .HasForeignKey("AccessListId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Peperino.Domain.Base.UserGroup", "UserGroup")
                        .WithMany()
                        .HasForeignKey("UserGroupId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("UserGroup");
                });

            modelBuilder.Entity("Peperino.Domain.Base.UserAccess", b =>
                {
                    b.HasOne("Peperino.Domain.Base.AccessList", null)
                        .WithMany("UserAccess")
                        .HasForeignKey("AccessListId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Peperino.Domain.Base.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("Peperino.Domain.Base.UserGroup", b =>
                {
                    b.HasOne("Peperino.Domain.Base.User", "CreatedBy")
                        .WithMany()
                        .HasForeignKey("CreatedById")
                        .OnDelete(DeleteBehavior.SetNull);

                    b.HasOne("Peperino.Domain.Base.User", "LastModifiedBy")
                        .WithMany()
                        .HasForeignKey("LastModifiedById")
                        .OnDelete(DeleteBehavior.SetNull);

                    b.Navigation("CreatedBy");

                    b.Navigation("LastModifiedBy");
                });

            modelBuilder.Entity("Peperino.Domain.Session.Session", b =>
                {
                    b.HasOne("Peperino.Domain.Base.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Peperino.EntityFramework.Entities.Demo", b =>
                {
                    b.HasOne("Peperino.Domain.Base.User", "CreatedBy")
                        .WithMany()
                        .HasForeignKey("CreatedById")
                        .OnDelete(DeleteBehavior.SetNull);

                    b.HasOne("Peperino.Domain.Base.User", "LastModifiedBy")
                        .WithMany()
                        .HasForeignKey("LastModifiedById")
                        .OnDelete(DeleteBehavior.SetNull);

                    b.Navigation("CreatedBy");

                    b.Navigation("LastModifiedBy");
                });

            modelBuilder.Entity("Peperino.EntityFramework.Entities.UserStore", b =>
                {
                    b.HasOne("Peperino.Domain.Base.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("UserUserGroup", b =>
                {
                    b.HasOne("Peperino.Domain.Base.UserGroup", null)
                        .WithMany()
                        .HasForeignKey("UserGroupsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Peperino.Domain.Base.User", null)
                        .WithMany()
                        .HasForeignKey("UsersId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Peperino.Domain.Base.AccessList", b =>
                {
                    b.Navigation("GroupAccess");

                    b.Navigation("UserAccess");
                });

            modelBuilder.Entity("Peperino.EntityFramework.Entities.Demo", b =>
                {
                    b.Navigation("Access")
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
