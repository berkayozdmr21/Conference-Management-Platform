using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace ConferenceApi.Migrations
{
    /// <inheritdoc />
    public partial class SeedInitialData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Conferences",
                columns: new[] { "Id", "Description", "EndDate", "Location", "StartDate", "Title" },
                values: new object[] { 1, "International Conference on Mathematics and Applications", new DateTime(2026, 10, 17, 0, 0, 0, 0, DateTimeKind.Unspecified), "Ankara, Türkiye", new DateTime(2026, 10, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), "ICOMATH 2026" });

            migrationBuilder.InsertData(
                table: "ConferenceTopics",
                columns: new[] { "Id", "ConferenceId", "Name" },
                values: new object[,]
                {
                    { 1, 1, "Applied Mathematics" },
                    { 2, 1, "Artificial Intelligence" },
                    { 3, 1, "Data Science" }
                });

            migrationBuilder.InsertData(
                table: "ImportantDates",
                columns: new[] { "Id", "ConferenceId", "Date", "Description", "Title" },
                values: new object[,]
                {
                    { 1, 1, new DateTime(2026, 8, 30, 0, 0, 0, 0, DateTimeKind.Unspecified), "Last day to submit your abstract.", "Abstract Submission Deadline" },
                    { 2, 1, new DateTime(2026, 9, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), "Authors will be notified about acceptance.", "Notification of Acceptance" }
                });

            migrationBuilder.InsertData(
                table: "Speakers",
                columns: new[] { "Id", "ConferenceId", "Country", "Description", "Name", "Photo", "Title", "University" },
                values: new object[,]
                {
                    { 1, 1, "Türkiye", "Applied mathematics and numerical analysis researcher.", "Prof. Dr. Ayse Yilmaz", "/uploads/speakers/speaker1.jpg", "Prof. Dr.", "Middle East Technical University" },
                    { 2, 1, "United Kingdom", "Machine learning and data science researcher.", "Dr. John Smith", "/uploads/speakers/speaker2.jpg", "Assoc. Prof.", "University of Manchester" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "ConferenceTopics",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "ConferenceTopics",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "ConferenceTopics",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "ImportantDates",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "ImportantDates",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Speakers",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Speakers",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Conferences",
                keyColumn: "Id",
                keyValue: 1);
        }
    }
}
