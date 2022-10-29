using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Peperino.EntityFramework.Migrations
{
    public partial class Add_CheckListItemType : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ItemTypeId",
                table: "BaseCheckListItems",
                type: "integer",
                nullable: false,
                defaultValue: 1);

            migrationBuilder.CreateTable(
                name: "CheckListItemTypes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    Variant = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CheckListItemTypes", x => x.Id);
                });

            Helpers.Helper_Add_CheckListItemType.Seed(migrationBuilder);

            migrationBuilder.CreateIndex(
                name: "IX_BaseCheckListItems_ItemTypeId",
                table: "BaseCheckListItems",
                column: "ItemTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_BaseCheckListItems_CheckListItemTypes_ItemTypeId",
                table: "BaseCheckListItems",
                column: "ItemTypeId",
                principalTable: "CheckListItemTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BaseCheckListItems_CheckListItemTypes_ItemTypeId",
                table: "BaseCheckListItems");

            migrationBuilder.DropTable(
                name: "CheckListItemTypes");

            migrationBuilder.DropIndex(
                name: "IX_BaseCheckListItems_ItemTypeId",
                table: "BaseCheckListItems");

            migrationBuilder.DropColumn(
                name: "ItemTypeId",
                table: "BaseCheckListItems");
        }
    }
}
