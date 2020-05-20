namespace Weatherstation.Entities
{
    public class UserSensor
    {
        public string ApplicationUserId { get; set; }
        public virtual ApplicationUser ApplicationUser { get; set; }

        public string SensorMacAddress { get; set; }
        public virtual Sensor Sensor { get; set; }
    }
}
