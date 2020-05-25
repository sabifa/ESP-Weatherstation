using System.Collections.Generic;
using Weatherstation.Entities;

namespace Weatherstation.Models.Sensors
{
    public class SensorsViewModel
    {
        public string MacAddress { get; set; }
        public string Name { get; set; }
        public string Location { get; set; }
        public IList<SensorData> SensorData { get; set; }
    }
}
