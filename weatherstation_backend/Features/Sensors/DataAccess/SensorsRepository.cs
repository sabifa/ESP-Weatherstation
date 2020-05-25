using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using Weatherstation.Data;
using Weatherstation.Entities;

namespace Weatherstation.Features.Sensors.DataAccess
{
    public interface ISensorsRepository
    {
        public Task<ApplicationUser> GetAllSensorsForUserAsync(string userId);
    }

    public class SensorsRepository : ISensorsRepository
    {
        private readonly DataContext _context;

        public SensorsRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<ApplicationUser> GetAllSensorsForUserAsync(string userId)
        {
            return await _context
                .Users
                .Where(user => user.Id == userId)
                .Include(user => user.UserSensors)
                .ThenInclude(userSensors => userSensors.Sensor)
                .ThenInclude(sensor => sensor.SensorData)
                .AsNoTracking()
                .SingleOrDefaultAsync();
        }
    }
}
