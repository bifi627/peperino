using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Peperino.EntityFramework.Migrations
{
    public partial class Add_Inventory : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "RoomId",
                table: "CheckLists",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddColumn<int>(
                name: "Room_InventoryId",
                table: "CheckLists",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "InventoryCheckListItems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false),
                    Text = table.Column<string>(type: "text", nullable: false),
                    Quantity = table.Column<double>(type: "double precision", nullable: false),
                    Unit = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InventoryCheckListItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_InventoryCheckListItems_BaseCheckListItems_Id",
                        column: x => x.Id,
                        principalTable: "BaseCheckListItems",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CheckLists_Room_InventoryId",
                table: "CheckLists",
                column: "Room_InventoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_CheckLists_Rooms_Room_InventoryId",
                table: "CheckLists",
                column: "Room_InventoryId",
                principalTable: "Rooms",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CheckLists_Rooms_Room_InventoryId",
                table: "CheckLists");

            migrationBuilder.DropTable(
                name: "InventoryCheckListItems");

            migrationBuilder.DropIndex(
                name: "IX_CheckLists_Room_InventoryId",
                table: "CheckLists");

            migrationBuilder.DropColumn(
                name: "Room_InventoryId",
                table: "CheckLists");

            migrationBuilder.AlterColumn<int>(
                name: "RoomId",
                table: "CheckLists",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);
        }
    }
}
