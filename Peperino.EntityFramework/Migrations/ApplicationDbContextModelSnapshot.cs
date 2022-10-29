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

            modelBuilder.Entity("BaseOwnableEntityGroupAccess", b =>
                {
                    b.Property<int>("EntitiesId")
                        .HasColumnType("integer");

                    b.Property<int>("GroupAccessId")
                        .HasColumnType("integer");

                    b.HasKey("EntitiesId", "GroupAccessId");

                    b.HasIndex("GroupAccessId");

                    b.ToTable("BaseOwnableEntityGroupAccess");
                });

            modelBuilder.Entity("BaseOwnableEntityUserAccess", b =>
                {
                    b.Property<int>("EntitiesId")
                        .HasColumnType("integer");

                    b.Property<int>("UserAccessId")
                        .HasColumnType("integer");

                    b.HasKey("EntitiesId", "UserAccessId");

                    b.HasIndex("UserAccessId");

                    b.ToTable("BaseOwnableEntityUserAccess");
                });

            modelBuilder.Entity("Peperino.Domain.Base.BaseOwnableEntity", b =>
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

                    b.HasKey("Id");

                    b.HasIndex("CreatedById");

                    b.HasIndex("LastModifiedById");

                    b.ToTable("BaseOwnableEntity");
                });

            modelBuilder.Entity("Peperino.Domain.Base.GroupAccess", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("AccessLevel")
                        .HasColumnType("integer");

                    b.Property<int>("UserGroupId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

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

                    b.Property<string>("UserId")
                        .HasColumnType("text");

                    b.HasKey("Id");

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

            modelBuilder.Entity("Peperino.EntityFramework.Entities.CheckList.BaseCheckListItem", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("CheckListId")
                        .HasColumnType("integer");

                    b.Property<bool>("Checked")
                        .HasColumnType("boolean");

                    b.Property<DateTime>("Created")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("CreatedById")
                        .HasColumnType("text");

                    b.Property<int>("ItemTypeId")
                        .HasColumnType("integer");

                    b.Property<DateTime?>("LastModified")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("LastModifiedById")
                        .HasColumnType("text");

                    b.Property<int>("SortIndex")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("CheckListId");

                    b.HasIndex("CreatedById");

                    b.HasIndex("ItemTypeId");

                    b.HasIndex("LastModifiedById");

                    b.ToTable("BaseCheckListItems", (string)null);
                });

            modelBuilder.Entity("Peperino.EntityFramework.Entities.CheckList.CheckListItemType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("Variant")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.ToTable("CheckListItemTypes");
                });

            modelBuilder.Entity("Peperino.EntityFramework.Entities.SharedLink", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("Created")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("CreatedById")
                        .HasColumnType("text");

                    b.Property<TimeSpan>("Duration")
                        .HasColumnType("interval");

                    b.Property<int>("EntityId")
                        .HasColumnType("integer");

                    b.Property<int>("GrantAccessLevel")
                        .HasColumnType("integer");

                    b.Property<DateTime?>("LastModified")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("LastModifiedById")
                        .HasColumnType("text");

                    b.Property<int>("LinkType")
                        .HasColumnType("integer");

                    b.Property<string>("Slug")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("CreatedById");

                    b.HasIndex("EntityId");

                    b.HasIndex("LastModifiedById");

                    b.ToTable("SharedLinks");
                });

            modelBuilder.Entity("Peperino.EntityFramework.Entities.UserStoreClient", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("text");

                    b.Property<string>("KeyValueStorage")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

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

            modelBuilder.Entity("Peperino.EntityFramework.Entities.CheckList.CheckList", b =>
                {
                    b.HasBaseType("Peperino.Domain.Base.BaseOwnableEntity");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("RoomId")
                        .HasColumnType("integer");

                    b.Property<string>("Slug")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasIndex("RoomId");

                    b.ToTable("CheckLists", (string)null);
                });

            modelBuilder.Entity("Peperino.EntityFramework.Entities.CheckList.ImageCheckListItem", b =>
                {
                    b.HasBaseType("Peperino.EntityFramework.Entities.CheckList.BaseCheckListItem");

                    b.Property<Guid>("ImageReference")
                        .HasColumnType("uuid");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("text");

                    b.ToTable("ImageCheckListItems", (string)null);
                });

            modelBuilder.Entity("Peperino.EntityFramework.Entities.CheckList.LinkCheckListItem", b =>
                {
                    b.HasBaseType("Peperino.EntityFramework.Entities.CheckList.BaseCheckListItem");

                    b.Property<string>("Link")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("text");

                    b.ToTable("LinkCheckListItems", (string)null);
                });

            modelBuilder.Entity("Peperino.EntityFramework.Entities.CheckList.TextCheckListItem", b =>
                {
                    b.HasBaseType("Peperino.EntityFramework.Entities.CheckList.BaseCheckListItem");

                    b.Property<string>("Text")
                        .IsRequired()
                        .HasColumnType("text");

                    b.ToTable("TextCheckListItems", (string)null);
                });

            modelBuilder.Entity("Peperino.EntityFramework.Entities.Demo", b =>
                {
                    b.HasBaseType("Peperino.Domain.Base.BaseOwnableEntity");

                    b.Property<string>("Value")
                        .IsRequired()
                        .HasColumnType("text");

                    b.ToTable("Demos", (string)null);
                });

            modelBuilder.Entity("Peperino.EntityFramework.Entities.Room", b =>
                {
                    b.HasBaseType("Peperino.Domain.Base.BaseOwnableEntity");

                    b.Property<string>("RoomName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Slug")
                        .IsRequired()
                        .HasColumnType("text");

                    b.ToTable("Rooms", (string)null);
                });

            modelBuilder.Entity("BaseOwnableEntityGroupAccess", b =>
                {
                    b.HasOne("Peperino.Domain.Base.BaseOwnableEntity", null)
                        .WithMany()
                        .HasForeignKey("EntitiesId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Peperino.Domain.Base.GroupAccess", null)
                        .WithMany()
                        .HasForeignKey("GroupAccessId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("BaseOwnableEntityUserAccess", b =>
                {
                    b.HasOne("Peperino.Domain.Base.BaseOwnableEntity", null)
                        .WithMany()
                        .HasForeignKey("EntitiesId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Peperino.Domain.Base.UserAccess", null)
                        .WithMany()
                        .HasForeignKey("UserAccessId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Peperino.Domain.Base.BaseOwnableEntity", b =>
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

            modelBuilder.Entity("Peperino.Domain.Base.GroupAccess", b =>
                {
                    b.HasOne("Peperino.Domain.Base.UserGroup", "UserGroup")
                        .WithMany()
                        .HasForeignKey("UserGroupId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("UserGroup");
                });

            modelBuilder.Entity("Peperino.Domain.Base.UserAccess", b =>
                {
                    b.HasOne("Peperino.Domain.Base.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId");

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

            modelBuilder.Entity("Peperino.EntityFramework.Entities.CheckList.BaseCheckListItem", b =>
                {
                    b.HasOne("Peperino.EntityFramework.Entities.CheckList.CheckList", "CheckList")
                        .WithMany("Entities")
                        .HasForeignKey("CheckListId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Peperino.Domain.Base.User", "CreatedBy")
                        .WithMany()
                        .HasForeignKey("CreatedById");

                    b.HasOne("Peperino.EntityFramework.Entities.CheckList.CheckListItemType", "ItemType")
                        .WithMany()
                        .HasForeignKey("ItemTypeId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("Peperino.Domain.Base.User", "LastModifiedBy")
                        .WithMany()
                        .HasForeignKey("LastModifiedById");

                    b.Navigation("CheckList");

                    b.Navigation("CreatedBy");

                    b.Navigation("ItemType");

                    b.Navigation("LastModifiedBy");
                });

            modelBuilder.Entity("Peperino.EntityFramework.Entities.SharedLink", b =>
                {
                    b.HasOne("Peperino.Domain.Base.User", "CreatedBy")
                        .WithMany()
                        .HasForeignKey("CreatedById");

                    b.HasOne("Peperino.Domain.Base.BaseOwnableEntity", "Entity")
                        .WithMany()
                        .HasForeignKey("EntityId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Peperino.Domain.Base.User", "LastModifiedBy")
                        .WithMany()
                        .HasForeignKey("LastModifiedById");

                    b.Navigation("CreatedBy");

                    b.Navigation("Entity");

                    b.Navigation("LastModifiedBy");
                });

            modelBuilder.Entity("Peperino.EntityFramework.Entities.UserStoreClient", b =>
                {
                    b.HasOne("Peperino.Domain.Base.User", "User")
                        .WithOne()
                        .HasForeignKey("Peperino.EntityFramework.Entities.UserStoreClient", "Id")
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

            modelBuilder.Entity("Peperino.EntityFramework.Entities.CheckList.CheckList", b =>
                {
                    b.HasOne("Peperino.Domain.Base.BaseOwnableEntity", null)
                        .WithOne()
                        .HasForeignKey("Peperino.EntityFramework.Entities.CheckList.CheckList", "Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Peperino.EntityFramework.Entities.Room", "Room")
                        .WithMany("CheckLists")
                        .HasForeignKey("RoomId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Room");
                });

            modelBuilder.Entity("Peperino.EntityFramework.Entities.CheckList.ImageCheckListItem", b =>
                {
                    b.HasOne("Peperino.EntityFramework.Entities.CheckList.BaseCheckListItem", null)
                        .WithOne()
                        .HasForeignKey("Peperino.EntityFramework.Entities.CheckList.ImageCheckListItem", "Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Peperino.EntityFramework.Entities.CheckList.LinkCheckListItem", b =>
                {
                    b.HasOne("Peperino.EntityFramework.Entities.CheckList.BaseCheckListItem", null)
                        .WithOne()
                        .HasForeignKey("Peperino.EntityFramework.Entities.CheckList.LinkCheckListItem", "Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Peperino.EntityFramework.Entities.CheckList.TextCheckListItem", b =>
                {
                    b.HasOne("Peperino.EntityFramework.Entities.CheckList.BaseCheckListItem", null)
                        .WithOne()
                        .HasForeignKey("Peperino.EntityFramework.Entities.CheckList.TextCheckListItem", "Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Peperino.EntityFramework.Entities.Demo", b =>
                {
                    b.HasOne("Peperino.Domain.Base.BaseOwnableEntity", null)
                        .WithOne()
                        .HasForeignKey("Peperino.EntityFramework.Entities.Demo", "Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Peperino.EntityFramework.Entities.Room", b =>
                {
                    b.HasOne("Peperino.Domain.Base.BaseOwnableEntity", null)
                        .WithOne()
                        .HasForeignKey("Peperino.EntityFramework.Entities.Room", "Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Peperino.EntityFramework.Entities.CheckList.CheckList", b =>
                {
                    b.Navigation("Entities");
                });

            modelBuilder.Entity("Peperino.EntityFramework.Entities.Room", b =>
                {
                    b.Navigation("CheckLists");
                });
#pragma warning restore 612, 618
        }
    }
}
