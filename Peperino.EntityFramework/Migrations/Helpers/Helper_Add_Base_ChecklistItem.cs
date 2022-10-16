using Microsoft.EntityFrameworkCore.Migrations;

namespace Peperino.EntityFramework.Migrations.Helpers
{
    internal static class Helper_Add_Base_ChecklistItem
    {
        /// <summary>
        /// Migrates ChecklistItems to TextChecklistItems
        /// </summary>
        internal static void MigrateDataUp(MigrationBuilder builder)
        {
            builder.Sql(@"INSERT INTO ""BaseCheckListItems""(SELECT ""Id"", ""SortIndex"", ""Checked"", ""CheckListId"", ""Created"", ""CreatedById"", ""LastModified"", ""LastModifiedById"" FROM ""CheckListItems"")");
            builder.Sql(@"INSERT INTO ""TextCheckListItems""(SELECT ""Id"", ""Text"" FROM ""CheckListItems"")");
        }

        /// <summary>
        /// Migrates TextCheckListItems to CheckListItems
        /// </summary>
        internal static void MigrateDataDown(MigrationBuilder builder)
        {
            builder.Sql(@"INSERT INTO ""CheckListItems""(""Id"", ""CheckListId"", ""CreatedById"", ""LastModifiedById"", ""Checked"", ""Created"", ""LastModified"", ""SortIndex"", ""Text"")    SELECT ""BaseCheckListItems"".""Id"", ""CheckListId"", ""CreatedById"", ""LastModifiedById"", ""Checked"", ""Created"", ""LastModified"", ""SortIndex"", ""Text"" FROM ""BaseCheckListItems"" LEFT JOIN ""TextCheckListItems"" ON ""BaseCheckListItems"".""Id""=""TextCheckListItems"".""Id""");
        }
    }
}
