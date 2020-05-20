using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Weatherstation.Data.Migrations
{
    public partial class Add_UserSensor : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Sensors",
                columns: table => new
                {
                    MacAddress = table.Column<string>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Location = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sensors", x => x.MacAddress);
                });

            migrationBuilder.CreateTable(
                name: "SensorData",
                columns: table => new
                {
                    SensorDataId = table.Column<Guid>(nullable: false),
                    Temperature = table.Column<double>(nullable: false),
                    Humidity = table.Column<double>(nullable: false),
                    MeasuredAt = table.Column<DateTime>(nullable: false),
                    SensorMacAddress = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SensorData", x => x.SensorDataId);
                    table.ForeignKey(
                        name: "FK_SensorData_Sensors_SensorMacAddress",
                        column: x => x.SensorMacAddress,
                        principalTable: "Sensors",
                        principalColumn: "MacAddress",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "UserSensors",
                columns: table => new
                {
                    ApplicationUserId = table.Column<string>(nullable: false),
                    SensorMacAddress = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserSensors", x => new { x.ApplicationUserId, x.SensorMacAddress });
                    table.ForeignKey(
                        name: "FK_UserSensors_AspNetUsers_ApplicationUserId",
                        column: x => x.ApplicationUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserSensors_Sensors_SensorMacAddress",
                        column: x => x.SensorMacAddress,
                        principalTable: "Sensors",
                        principalColumn: "MacAddress",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SensorData_SensorMacAddress",
                table: "SensorData",
                column: "SensorMacAddress");

            migrationBuilder.CreateIndex(
                name: "IX_UserSensors_SensorMacAddress",
                table: "UserSensors",
                column: "SensorMacAddress");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SensorData");

            migrationBuilder.DropTable(
                name: "UserSensors");

            migrationBuilder.DropTable(
                name: "Sensors");
        }
    }
}
