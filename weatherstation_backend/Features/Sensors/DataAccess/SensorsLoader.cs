using System.Collections.Generic;
using System.Threading.Tasks;
using Weatherstation.Features.Sensors.DataAccess;
using Weatherstation.Models.Sensors;

namespace Weatherstation.Features.Sensors.Presentation
{
    public interface ISensorsLoader
    {
        public Task<IEnumerable<SensorsViewModel>> GetAllSensorsForUserAsync(string userId);
    }

    public class SensorsLoader : ISensorsLoader
    {
        private readonly ISensorsRepository _sensorsRepository;

        public SensorsLoader(ISensorsRepository sensorsRepository)
        {
            _sensorsRepository = sensorsRepository;
        }

        public async Task<IEnumerable<SensorsViewModel>> GetAllSensorsForUserAsync(string userId)
        {
            var sensorsOfUser = await _sensorsRepository.GetAllSensorsForUserAsync(userId);

            var sensors = new List<SensorsViewModel>();
            foreach (var userSensor in sensorsOfUser.UserSensors)
            {
                var sensor = new SensorsViewModel()
                {
                    MacAddress = userSensor.Sensor.MacAddress,
                    Name = userSensor.Sensor.Name,
                    Location = userSensor.Sensor.Location,
                    SensorData = userSensor.Sensor.SensorData,
                };
                sensors.Add(sensor);
            }

            return sensors;
        }
    }
}
