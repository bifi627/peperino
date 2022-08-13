using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Peperino.EntityFramework.Migrations
{
    public partial class Add_users_add_external_id_to_primary_key : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Demos_Users_CreatedById",
                table: "Demos");

            migrationBuilder.DropForeignKey(
                name: "FK_Demos_Users_LastModifiedById",
                table: "Demos");

            migrationBuilder.DropForeignKey(
                name: "FK_Sessions_Users_UserId",
                table: "Sessions");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Users",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Sessions_UserId",
                table: "Sessions");

            migrationBuilder.DropIndex(
                name: "IX_Demos_CreatedById",
                table: "Demos");

            migrationBuilder.DropIndex(
                name: "IX_Demos_LastModifiedById",
                table: "Demos");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "Users",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer")
                .OldAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddColumn<string>(
                name: "UserExternalId",
                table: "Sessions",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "CreatedByExternalId",
                table: "Demos",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LastModifiedByExternalId",
                table: "Demos",
                type: "text",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Users",
                table: "Users",
                columns: new[] { "Id", "ExternalId" });

            migrationBuilder.CreateIndex(
                name: "IX_Sessions_UserId_UserExternalId",
                table: "Sessions",
                columns: new[] { "UserId", "UserExternalId" });

            migrationBuilder.CreateIndex(
                name: "IX_Demos_CreatedById_CreatedByExternalId",
                table: "Demos",
                columns: new[] { "CreatedById", "CreatedByExternalId" });

            migrationBuilder.CreateIndex(
                name: "IX_Demos_LastModifiedById_LastModifiedByExternalId",
                table: "Demos",
                columns: new[] { "LastModifiedById", "LastModifiedByExternalId" });

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

            migrationBuilder.AddForeignKey(
                name: "FK_Sessions_Users_UserId_UserExternalId",
                table: "Sessions",
                columns: new[] { "UserId", "UserExternalId" },
                principalTable: "Users",
                principalColumns: new[] { "Id", "ExternalId" },
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Demos_Users_CreatedById_CreatedByExternalId",
                table: "Demos");

            migrationBuilder.DropForeignKey(
                name: "FK_Demos_Users_LastModifiedById_LastModifiedByExternalId",
                table: "Demos");

            migrationBuilder.DropForeignKey(
                name: "FK_Sessions_Users_UserId_UserExternalId",
                table: "Sessions");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Users",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Sessions_UserId_UserExternalId",
                table: "Sessions");

            migrationBuilder.DropIndex(
                name: "IX_Demos_CreatedById_CreatedByExternalId",
                table: "Demos");

            migrationBuilder.DropIndex(
                name: "IX_Demos_LastModifiedById_LastModifiedByExternalId",
                table: "Demos");

            migrationBuilder.DropColumn(
                name: "UserExternalId",
                table: "Sessions");

            migrationBuilder.DropColumn(
                name: "CreatedByExternalId",
                table: "Demos");

            migrationBuilder.DropColumn(
                name: "LastModifiedByExternalId",
                table: "Demos");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "Users",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer")
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Users",
                table: "Users",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_Sessions_UserId",
                table: "Sessions",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Demos_CreatedById",
                table: "Demos",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_Demos_LastModifiedById",
                table: "Demos",
                column: "LastModifiedById");

            migrationBuilder.AddForeignKey(
                name: "FK_Demos_Users_CreatedById",
                table: "Demos",
                column: "CreatedById",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Demos_Users_LastModifiedById",
                table: "Demos",
                column: "LastModifiedById",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Sessions_Users_UserId",
                table: "Sessions",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
