using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Peperino.EntityFramework.Migrations
{
    public partial class Add_demo_delete_behavior : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Demos_Users_CreatedById_CreatedByExternalId",
                table: "Demos");

            migrationBuilder.DropForeignKey(
                name: "FK_Demos_Users_LastModifiedById_LastModifiedByExternalId",
                table: "Demos");

            migrationBuilder.AddForeignKey(
                name: "FK_Demos_Users_CreatedById_CreatedByExternalId",
                table: "Demos",
                columns: new[] { "CreatedById", "CreatedByExternalId" },
                principalTable: "Users",
                principalColumns: new[] { "Id", "ExternalId" },
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Demos_Users_LastModifiedById_LastModifiedByExternalId",
                table: "Demos",
                columns: new[] { "LastModifiedById", "LastModifiedByExternalId" },
                principalTable: "Users",
                principalColumns: new[] { "Id", "ExternalId" },
                onDelete: ReferentialAction.SetNull);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Demos_Users_CreatedById_CreatedByExternalId",
                table: "Demos");

            migrationBuilder.DropForeignKey(
                name: "FK_Demos_Users_LastModifiedById_LastModifiedByExternalId",
                table: "Demos");

            migrationBuilder.AddForeignKey(
                name: "FK_Demos_Users_CreatedById_CreatedByExternalId",
                table: "Demos",
                columns: new[] { "CreatedById", "CreatedByExternalId" },
                principalTable: "Users",
                principalColumns: new[] { "Id", "ExternalId" });

            migrationBuilder.AddForeignKey(
                name: "FK_Demos_Users_LastModifiedById_LastModifiedByExternalId",
                table: "Demos",
                columns: new[] { "LastModifiedById", "LastModifiedByExternalId" },
                principalTable: "Users",
                principalColumns: new[] { "Id", "ExternalId" });
        }
    }
}
