using System.ComponentModel.DataAnnotations;

namespace Cookbook.Models.Authentication
{
    public class UserRegistrationRequest
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
