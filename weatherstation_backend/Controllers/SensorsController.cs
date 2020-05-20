using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Weatherstation.Data;
using Weatherstation.Entities;

namespace Weatherstation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SensorsController : ControllerBase
    {
        private readonly DataContext _context;

        public SensorsController(DataContext context)
        {
            _context = context;
        }

        // GET: api/Sensors 
        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetSensors()
        {
            var sensors = await _context
                .Sensors
                .Include(sensor => sensor.UserSensors)
                .ThenInclude(userSensor => userSensor.ApplicationUser)
                .AsNoTracking()
                .ToListAsync();

            return Ok(sensors);
        }

        // GET: api/Sensors/users 
        [AllowAnonymous]
        [HttpGet("users")]
        public async Task<IActionResult> GetUsers()
        {
            var x = await _context
                .Users
                .Include(user => user.UserSensors)
                .ThenInclude(userSensors => userSensors.Sensor)
                .ThenInclude(sensor => sensor.SensorData)
                .AsNoTracking()
                .ToListAsync();

            return Ok(x);
        }

        public class test
        {
            public string MacAddress { get; set; }
            public double Temperature { get; set; }
            public double Humidity { get; set; }
        }

        // POST: api/Sensors 
        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> PostSensorData([FromBody] test sensorData)
        {
            var newSensorData = new SensorData()
            {
                SensorDataId = new Guid(),
                Humidity = sensorData.Humidity,
                Temperature = sensorData.Temperature,
                MeasuredAt = DateTime.Now,
            };
            var sensorToAddTo = await _context
                .Sensors
                .Where(x => x.MacAddress == sensorData.MacAddress)
                .SingleOrDefaultAsync();

            if (sensorToAddTo == null)
            {
                sensorToAddTo = new Sensor()
                {
                    MacAddress = sensorData.MacAddress,
                    SensorData = new List<SensorData>(),
                };
                _context.Sensors.Add(sensorToAddTo);
                await _context.SaveChangesAsync();
            }

            sensorToAddTo.SensorData.Add(newSensorData);
            await _context.SaveChangesAsync();

            return Ok(sensorToAddTo);
        }

        public class TestModel
        {
            public string UserId { get; set; }
            public string MacAddress { get; set; }
        }

        // PUT: api/Sensors 
        [AllowAnonymous]
        [HttpPut]
        public async Task<IActionResult> AddUserToSensor([FromBody] TestModel test)
        {
            var userSensor = new UserSensor()
            {
                ApplicationUserId = test.UserId,
                SensorMacAddress = test.MacAddress,
            };

            _context.UserSensors.Add(userSensor);
            await _context.SaveChangesAsync();

            var userSensors = await _context
                .UserSensors
                .Include(x => x.Sensor)
                .Include(x => x.ApplicationUser)
                .ToListAsync();
            return Ok(userSensors);
        }
    }
}
