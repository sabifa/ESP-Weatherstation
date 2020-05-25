using System.ComponentModel.DataAnnotations;

namespace Weatherstation.Models.Authentication
{
    public class UserRegistrationRequest
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public string FirstName { get; set; }
    }
}
