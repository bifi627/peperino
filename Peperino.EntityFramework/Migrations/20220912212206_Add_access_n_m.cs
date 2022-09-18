using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Peperino.EntityFramework.Migrations
{
    public partial class Add_access_n_m : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BaseOwnableEntity_AccessList_AccessId",
                table: "BaseOwnableEntity");

            migrationBuilder.DropForeignKey(
                name: "FK_GroupAccess_AccessList_AccessListId",
                table: "GroupAccess");

            migrationBuilder.DropForeignKey(
                name: "FK_UserAccess_AccessList_AccessListId",
                table: "UserAccess");

            migrationBuilder.DropTable(
                name: "AccessList");

            migrationBuilder.DropIndex(
                name: "IX_UserAccess_AccessListId",
                table: "UserAccess");

            migrationBuilder.DropIndex(
                name: "IX_GroupAccess_AccessListId",
                table: "GroupAccess");

            migrationBuilder.DropIndex(
                name: "IX_BaseOwnableEntity_AccessId",
                table: "BaseOwnableEntity");

            migrationBuilder.DropColumn(
                name: "AccessListId",
                table: "UserAccess");

            migrationBuilder.DropColumn(
                name: "AccessListId",
                table: "GroupAccess");

            migrationBuilder.DropColumn(
                name: "AccessId",
                table: "BaseOwnableEntity");

            migrationBuilder.CreateTable(
                name: "BaseOwnableEntityGroupAccess",
                columns: table => new
                {
                    EntitiesId = table.Column<int>(type: "integer", nullable: false),
                    GroupAccessId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BaseOwnableEntityGroupAccess", x => new { x.EntitiesId, x.GroupAccessId });
                    table.ForeignKey(
                        name: "FK_BaseOwnableEntityGroupAccess_BaseOwnableEntity_EntitiesId",
                        column: x => x.EntitiesId,
                        principalTable: "BaseOwnableEntity",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BaseOwnableEntityGroupAccess_GroupAccess_GroupAccessId",
                        column: x => x.GroupAccessId,
                        principalTable: "GroupAccess",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "BaseOwnableEntityUserAccess",
                columns: table => new
                {
                    EntitiesId = table.Column<int>(type: "integer", nullable: false),
                    UserAccessId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BaseOwnableEntityUserAccess", x => new { x.EntitiesId, x.UserAccessId });
                    table.ForeignKey(
                        name: "FK_BaseOwnableEntityUserAccess_BaseOwnableEntity_EntitiesId",
                        column: x => x.EntitiesId,
                        principalTable: "BaseOwnableEntity",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BaseOwnableEntityUserAccess_UserAccess_UserAccessId",
                        column: x => x.UserAccessId,
                        principalTable: "UserAccess",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BaseOwnableEntityGroupAccess_GroupAccessId",
                table: "BaseOwnableEntityGroupAccess",
                column: "GroupAccessId");

            migrationBuilder.CreateIndex(
                name: "IX_BaseOwnableEntityUserAccess_UserAccessId",
                table: "BaseOwnableEntityUserAccess",
                column: "UserAccessId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BaseOwnableEntityGroupAccess");

            migrationBuilder.DropTable(
                name: "BaseOwnableEntityUserAccess");

            migrationBuilder.AddColumn<int>(
                name: "AccessListId",
                table: "UserAccess",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "AccessListId",
                table: "GroupAccess",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "AccessId",
                table: "BaseOwnableEntity",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "AccessList",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ParentRelation = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AccessList", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserAccess_AccessListId",
                table: "UserAccess",
                column: "AccessListId");

            migrationBuilder.CreateIndex(
                name: "IX_GroupAccess_AccessListId",
                table: "GroupAccess",
                column: "AccessListId");

            migrationBuilder.CreateIndex(
                name: "IX_BaseOwnableEntity_AccessId",
                table: "BaseOwnableEntity",
                column: "AccessId");

            migrationBuilder.AddForeignKey(
                name: "FK_BaseOwnableEntity_AccessList_AccessId",
                table: "BaseOwnableEntity",
                column: "AccessId",
                principalTable: "AccessList",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_GroupAccess_AccessList_AccessListId",
                table: "GroupAccess",
                column: "AccessListId",
                principalTable: "AccessList",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserAccess_AccessList_AccessListId",
                table: "UserAccess",
                column: "AccessListId",
                principalTable: "AccessList",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
