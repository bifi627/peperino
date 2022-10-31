using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Peperino.EntityFramework.Migrations
{
    public partial class Add_ImageCheckListItem_Title : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "LinkCheckListItems",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "ImageCheckListItems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false),
                    Title = table.Column<string>(type: "text", nullable: false),
                    ImageLink = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ImageCheckListItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ImageCheckListItems_BaseCheckListItems_Id",
                        column: x => x.Id,
                        principalTable: "BaseCheckListItems",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ImageCheckListItems");

            migrationBuilder.DropColumn(
                name: "Title",
                table: "LinkCheckListItems");
        }
    }
}
