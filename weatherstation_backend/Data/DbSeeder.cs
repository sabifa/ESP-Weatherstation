using System;
using System.Collections.Generic;
using System.Linq;
using Weatherstation.Entities;

namespace Weatherstation.Data
{
    public interface IDbSeeder
    {
        public void Seed();
    }

    public class DbSeeder : IDbSeeder
    {
        private readonly DataContext _context;

        public DbSeeder(DataContext context)
        {
            _context = context;
        }

        public void Seed()
        {
            if (!_context.Sensors.Any())
            {
                var sensor = new Sensor()
                {
                    MacAddress = "mac1",
                    SensorData = new List<SensorData>()
                    {
                        new SensorData()
                        {
                            SensorDataId = Guid.Parse("7001c991-0203-421e-93ae-a4d892ad51d1"),
                            Humidity = 12.34,
                            Temperature = 23.45,
                            MeasuredAt = DateTime.Now,
                        },
                        new SensorData()
                        {
                            SensorDataId = Guid.Parse("7001c991-0203-421e-93ae-a4d892ad51d2"),
                            Humidity = 22.34,
                            Temperature = 33.45,
                            MeasuredAt = DateTime.Now.AddMinutes(2),
                        }
                    }
                };

                var sensor2 = new Sensor()
                {
                    MacAddress = "mac2",
                    SensorData = new List<SensorData>()
                };

                _context.AddRange(sensor, sensor2);
                _context.SaveChanges();
            }
        }
    }
}
