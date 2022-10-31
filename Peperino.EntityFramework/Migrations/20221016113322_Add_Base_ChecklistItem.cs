using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using Peperino.EntityFramework.Migrations.Helpers;

#nullable disable

namespace Peperino.EntityFramework.Migrations
{
    public partial class Add_Base_ChecklistItem : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BaseCheckListItems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    SortIndex = table.Column<int>(type: "integer", nullable: false),
                    Checked = table.Column<bool>(type: "boolean", nullable: false),
                    CheckListId = table.Column<int>(type: "integer", nullable: false),
                    Created = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedById = table.Column<string>(type: "text", nullable: true),
                    LastModified = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    LastModifiedById = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BaseCheckListItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BaseCheckListItems_CheckLists_CheckListId",
                        column: x => x.CheckListId,
                        principalTable: "CheckLists",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BaseCheckListItems_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_BaseCheckListItems_Users_LastModifiedById",
                        column: x => x.LastModifiedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "LinkCheckListItems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false),
                    Link = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LinkCheckListItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LinkCheckListItems_BaseCheckListItems_Id",
                        column: x => x.Id,
                        principalTable: "BaseCheckListItems",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TextCheckListItems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false),
                    Text = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TextCheckListItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TextCheckListItems_BaseCheckListItems_Id",
                        column: x => x.Id,
                        principalTable: "BaseCheckListItems",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BaseCheckListItems_CheckListId",
                table: "BaseCheckListItems",
                column: "CheckListId");

            migrationBuilder.CreateIndex(
                name: "IX_BaseCheckListItems_CreatedById",
                table: "BaseCheckListItems",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_BaseCheckListItems_LastModifiedById",
                table: "BaseCheckListItems",
                column: "LastModifiedById");

            Helper_Add_Base_ChecklistItem.MigrateDataUp(migrationBuilder);

            migrationBuilder.DropTable(
                name: "CheckListItems");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CheckListItems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CheckListId = table.Column<int>(type: "integer", nullable: false),
                    CreatedById = table.Column<string>(type: "text", nullable: true),
                    LastModifiedById = table.Column<string>(type: "text", nullable: true),
                    Checked = table.Column<bool>(type: "boolean", nullable: false),
                    Created = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    LastModified = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    SortIndex = table.Column<int>(type: "integer", nullable: false),
                    Text = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CheckListItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CheckListItems_CheckLists_CheckListId",
                        column: x => x.CheckListId,
                        principalTable: "CheckLists",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CheckListItems_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_CheckListItems_Users_LastModifiedById",
                        column: x => x.LastModifiedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_CheckListItems_CheckListId",
                table: "CheckListItems",
                column: "CheckListId");

            migrationBuilder.CreateIndex(
                name: "IX_CheckListItems_CreatedById",
                table: "CheckListItems",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_CheckListItems_LastModifiedById",
                table: "CheckListItems",
                column: "LastModifiedById");

            Helper_Add_Base_ChecklistItem.MigrateDataDown(migrationBuilder);

            migrationBuilder.DropTable(
                name: "LinkCheckListItems");

            migrationBuilder.DropTable(
                name: "TextCheckListItems");

            migrationBuilder.DropTable(
                name: "BaseCheckListItems");
        }
    }
}
