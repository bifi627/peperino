using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Peperino.EntityFramework.Migrations
{
    public partial class Add_userstore : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "UserStores",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    KeyValueStorage = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserStores", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserStores_Users_Id",
                        column: x => x.Id,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserStores");
        }
    }
}
