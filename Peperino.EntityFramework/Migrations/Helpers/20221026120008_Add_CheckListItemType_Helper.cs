using Microsoft.EntityFrameworkCore.Migrations;

namespace Peperino.EntityFramework.Migrations.Helpers
{
    public class Helper_Add_CheckListItemType
    {
        /// <summary>
        /// Migrates ChecklistItems to TextChecklistItems
        /// </summary>
        internal static void Seed(MigrationBuilder builder)
        {
            builder.Sql(@"INSERT INTO ""CheckListItemTypes""(""Id"", ""Name"", ""Description"", ""Variant"") VALUES (1, 'Text', '', 1)");
            builder.Sql(@"INSERT INTO ""CheckListItemTypes""(""Id"", ""Name"", ""Description"", ""Variant"") VALUES (2, 'Link', '', 2)");
            builder.Sql(@"INSERT INTO ""CheckListItemTypes""(""Id"", ""Name"", ""Description"", ""Variant"") VALUES (3, 'Image', '', 3)");
        }
    }
}
