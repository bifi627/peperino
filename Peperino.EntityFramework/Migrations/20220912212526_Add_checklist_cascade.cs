using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Peperino.EntityFramework.Migrations
{
    public partial class Add_checklist_cascade : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CheckListItems_CheckLists_CheckListId",
                table: "CheckListItems");

            migrationBuilder.AlterColumn<int>(
                name: "CheckListId",
                table: "CheckListItems",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_CheckListItems_CheckLists_CheckListId",
                table: "CheckListItems",
                column: "CheckListId",
                principalTable: "CheckLists",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CheckListItems_CheckLists_CheckListId",
                table: "CheckListItems");

            migrationBuilder.AlterColumn<int>(
                name: "CheckListId",
                table: "CheckListItems",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddForeignKey(
                name: "FK_CheckListItems_CheckLists_CheckListId",
                table: "CheckListItems",
                column: "CheckListId",
                principalTable: "CheckLists",
                principalColumn: "Id");
        }
    }
}
