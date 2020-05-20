using System;

namespace Weatherstation.Entities
{
    public class SensorData
    {
        public Guid SensorDataId { get; set; }
        public double Temperature { get; set; }
        public double Humidity { get; set; }
        public DateTime MeasuredAt { get; set; }
    }
}
