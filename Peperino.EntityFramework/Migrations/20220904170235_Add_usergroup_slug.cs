using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Peperino.EntityFramework.Migrations
{
    public partial class Add_usergroup_slug : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "GroupNameSlug",
                table: "UserGroups",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "GroupNameSlug",
                table: "UserGroups");
        }
    }
}
