using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Peperino.EntityFramework.Migrations
{
    public partial class Add_shared_link : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AccessList_Demos_ParentRelation",
                table: "AccessList");

            migrationBuilder.DropForeignKey(
                name: "FK_Demos_Users_CreatedById",
                table: "Demos");

            migrationBuilder.DropForeignKey(
                name: "FK_Demos_Users_LastModifiedById",
                table: "Demos");

            migrationBuilder.DropForeignKey(
                name: "FK_Rooms_AccessList_AccessId",
                table: "Rooms");

            migrationBuilder.DropForeignKey(
                name: "FK_Rooms_Users_CreatedById",
                table: "Rooms");

            migrationBuilder.DropForeignKey(
                name: "FK_Rooms_Users_LastModifiedById",
                table: "Rooms");

            migrationBuilder.DropIndex(
                name: "IX_Rooms_AccessId",
                table: "Rooms");

            migrationBuilder.DropIndex(
                name: "IX_Rooms_CreatedById",
                table: "Rooms");

            migrationBuilder.DropIndex(
                name: "IX_Rooms_LastModifiedById",
                table: "Rooms");

            migrationBuilder.DropIndex(
                name: "IX_Demos_CreatedById",
                table: "Demos");

            migrationBuilder.DropIndex(
                name: "IX_Demos_LastModifiedById",
                table: "Demos");

            migrationBuilder.DropIndex(
                name: "IX_AccessList_ParentRelation",
                table: "AccessList");

            migrationBuilder.DropColumn(
                name: "AccessId",
                table: "Rooms");

            migrationBuilder.DropColumn(
                name: "Created",
                table: "Rooms");

            migrationBuilder.DropColumn(
                name: "CreatedById",
                table: "Rooms");

            migrationBuilder.DropColumn(
                name: "LastModified",
                table: "Rooms");

            migrationBuilder.DropColumn(
                name: "LastModifiedById",
                table: "Rooms");

            migrationBuilder.DropColumn(
                name: "Created",
                table: "Demos");

            migrationBuilder.DropColumn(
                name: "CreatedById",
                table: "Demos");

            migrationBuilder.DropColumn(
                name: "LastModified",
                table: "Demos");

            migrationBuilder.DropColumn(
                name: "LastModifiedById",
                table: "Demos");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "Rooms",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer")
                .OldAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "Demos",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer")
                .OldAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.CreateTable(
                name: "BaseOwnableEntity",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    AccessId = table.Column<int>(type: "integer", nullable: false),
                    Created = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedById = table.Column<string>(type: "text", nullable: true),
                    LastModified = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    LastModifiedById = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BaseOwnableEntity", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BaseOwnableEntity_AccessList_AccessId",
                        column: x => x.AccessId,
                        principalTable: "AccessList",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BaseOwnableEntity_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_BaseOwnableEntity_Users_LastModifiedById",
                        column: x => x.LastModifiedById,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "SharedLinks",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    LinkType = table.Column<int>(type: "integer", nullable: false),
                    Duration = table.Column<TimeSpan>(type: "interval", nullable: false),
                    GrantAccessLevel = table.Column<int>(type: "integer", nullable: false),
                    EntityId = table.Column<int>(type: "integer", nullable: false),
                    Slug = table.Column<string>(type: "text", nullable: false),
                    Created = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedById = table.Column<string>(type: "text", nullable: true),
                    LastModified = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    LastModifiedById = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SharedLinks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SharedLinks_BaseOwnableEntity_EntityId",
                        column: x => x.EntityId,
                        principalTable: "BaseOwnableEntity",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SharedLinks_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_SharedLinks_Users_LastModifiedById",
                        column: x => x.LastModifiedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_BaseOwnableEntity_AccessId",
                table: "BaseOwnableEntity",
                column: "AccessId");

            migrationBuilder.CreateIndex(
                name: "IX_BaseOwnableEntity_CreatedById",
                table: "BaseOwnableEntity",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_BaseOwnableEntity_LastModifiedById",
                table: "BaseOwnableEntity",
                column: "LastModifiedById");

            migrationBuilder.CreateIndex(
                name: "IX_SharedLinks_CreatedById",
                table: "SharedLinks",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_SharedLinks_EntityId",
                table: "SharedLinks",
                column: "EntityId");

            migrationBuilder.CreateIndex(
                name: "IX_SharedLinks_LastModifiedById",
                table: "SharedLinks",
                column: "LastModifiedById");

            migrationBuilder.AddForeignKey(
                name: "FK_Demos_BaseOwnableEntity_Id",
                table: "Demos",
                column: "Id",
                principalTable: "BaseOwnableEntity",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Rooms_BaseOwnableEntity_Id",
                table: "Rooms",
                column: "Id",
                principalTable: "BaseOwnableEntity",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Demos_BaseOwnableEntity_Id",
                table: "Demos");

            migrationBuilder.DropForeignKey(
                name: "FK_Rooms_BaseOwnableEntity_Id",
                table: "Rooms");

            migrationBuilder.DropTable(
                name: "SharedLinks");

            migrationBuilder.DropTable(
                name: "BaseOwnableEntity");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "Rooms",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer")
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddColumn<int>(
                name: "AccessId",
                table: "Rooms",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "Created",
                table: "Rooms",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "CreatedById",
                table: "Rooms",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "LastModified",
                table: "Rooms",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LastModifiedById",
                table: "Rooms",
                type: "text",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "Demos",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer")
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddColumn<DateTime>(
                name: "Created",
                table: "Demos",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "CreatedById",
                table: "Demos",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "LastModified",
                table: "Demos",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LastModifiedById",
                table: "Demos",
                type: "text",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Rooms_AccessId",
                table: "Rooms",
                column: "AccessId");

            migrationBuilder.CreateIndex(
                name: "IX_Rooms_CreatedById",
                table: "Rooms",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_Rooms_LastModifiedById",
                table: "Rooms",
                column: "LastModifiedById");

            migrationBuilder.CreateIndex(
                name: "IX_Demos_CreatedById",
                table: "Demos",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_Demos_LastModifiedById",
                table: "Demos",
                column: "LastModifiedById");

            migrationBuilder.CreateIndex(
                name: "IX_AccessList_ParentRelation",
                table: "AccessList",
                column: "ParentRelation",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_AccessList_Demos_ParentRelation",
                table: "AccessList",
                column: "ParentRelation",
                principalTable: "Demos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Demos_Users_CreatedById",
                table: "Demos",
                column: "CreatedById",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_Demos_Users_LastModifiedById",
                table: "Demos",
                column: "LastModifiedById",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_Rooms_AccessList_AccessId",
                table: "Rooms",
                column: "AccessId",
                principalTable: "AccessList",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Rooms_Users_CreatedById",
                table: "Rooms",
                column: "CreatedById",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Rooms_Users_LastModifiedById",
                table: "Rooms",
                column: "LastModifiedById",
                principalTable: "Users",
                principalColumn: "Id");
        }
    }
}
