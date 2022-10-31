using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Peperino.EntityFramework.Migrations
{
    public partial class Add_ImageStore : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageLink",
                table: "ImageCheckListItems");

            migrationBuilder.AddColumn<Guid>(
                name: "ImageReference",
                table: "ImageCheckListItems",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageReference",
                table: "ImageCheckListItems");

            migrationBuilder.AddColumn<string>(
                name: "ImageLink",
                table: "ImageCheckListItems",
                type: "text",
                nullable: false,
                defaultValue: "");
        }
    }
}
