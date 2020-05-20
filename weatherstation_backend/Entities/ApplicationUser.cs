using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace Weatherstation.Entities
{
    public class ApplicationUser : IdentityUser
    {
        public string FirstName { get; set; }
        public virtual IList<UserSensor> UserSensors { get; set; }
    }
}
