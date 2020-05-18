using Microsoft.AspNetCore.Identity;

namespace Weatherstation.Entities
{
    public class ApplicationUser : IdentityUser
    {
        public string FirstName { get; set; }
    }
}
