using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace ConferenceApi.Migrations
{
    /// <inheritdoc />
    public partial class İnitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Admins",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Admins", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Conferences",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Location = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Conferences", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ContactMessages",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Subject = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Message = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ContactMessages", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Submissions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Country = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    StudyTitle = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Session = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    ParticipationType = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    FilePath = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Status = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Submissions", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Books",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Year = table.Column<int>(type: "int", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    FilePath = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    ConferenceId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Books", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Books_Conferences_ConferenceId",
                        column: x => x.ConferenceId,
                        principalTable: "Conferences",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ConferenceTopics",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ConferenceId = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ConferenceTopics", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ConferenceTopics_Conferences_ConferenceId",
                        column: x => x.ConferenceId,
                        principalTable: "Conferences",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ImportantDates",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ConferenceId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ImportantDates", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ImportantDates_Conferences_ConferenceId",
                        column: x => x.ConferenceId,
                        principalTable: "Conferences",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Speakers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Title = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    University = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Country = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Photo = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ConferenceId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Speakers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Speakers_Conferences_ConferenceId",
                        column: x => x.ConferenceId,
                        principalTable: "Conferences",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Participants",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SubmissionId = table.Column<int>(type: "int", nullable: false),
                    Published = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Participants", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Participants_Submissions_SubmissionId",
                        column: x => x.SubmissionId,
                        principalTable: "Submissions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Admins",
                columns: new[] { "Id", "Email", "Name", "PasswordHash" },
                values: new object[] { 1, "admin@icomath.com", "Gozde Zubari", "$2a$11$DITKiDxXDonde.H6JrKTmuFnGDuSqjbREHzYiWeBMxUtKsVeMkMT." });

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

            migrationBuilder.CreateIndex(
                name: "IX_Books_ConferenceId",
                table: "Books",
                column: "ConferenceId");

            migrationBuilder.CreateIndex(
                name: "IX_ConferenceTopics_ConferenceId",
                table: "ConferenceTopics",
                column: "ConferenceId");

            migrationBuilder.CreateIndex(
                name: "IX_ImportantDates_ConferenceId",
                table: "ImportantDates",
                column: "ConferenceId");

            migrationBuilder.CreateIndex(
                name: "IX_Participants_SubmissionId",
                table: "Participants",
                column: "SubmissionId");

            migrationBuilder.CreateIndex(
                name: "IX_Speakers_ConferenceId",
                table: "Speakers",
                column: "ConferenceId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Admins");

            migrationBuilder.DropTable(
                name: "Books");

            migrationBuilder.DropTable(
                name: "ConferenceTopics");

            migrationBuilder.DropTable(
                name: "ContactMessages");

            migrationBuilder.DropTable(
                name: "ImportantDates");

            migrationBuilder.DropTable(
                name: "Participants");

            migrationBuilder.DropTable(
                name: "Speakers");

            migrationBuilder.DropTable(
                name: "Submissions");

            migrationBuilder.DropTable(
                name: "Conferences");
        }
    }
}
