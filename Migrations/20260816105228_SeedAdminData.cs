using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ConferenceApi.Migrations
{
    /// <inheritdoc />
    public partial class SeedAdminData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Admins",
                columns: new[] { "Id", "Email", "Name", "PasswordHash" },
                values: new object[] { 1, "admin@icomath.com", "Gozde Zubari", "$2a$11$DITKiDxXDonde.H6JrKTmuFnGDuSqjbREHzYiWeBMxUtKsVeMkMT." });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Admins",
                keyColumn: "Id",
                keyValue: 1);
        }
    }
}
