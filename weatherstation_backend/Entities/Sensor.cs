using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Weatherstation.Entities
{
    public class Sensor
    {
        [Key]
        public string MacAddress { get; set; }
        public string Name { get; set; }
        public string Location { get; set; }
        public IList<SensorData> SensorData { get; set; }
        public virtual IList<UserSensor> UserSensors { get; set; }
    }
}
