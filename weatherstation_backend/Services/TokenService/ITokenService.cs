using System.Security.Claims;
using System.Threading.Tasks;
using Weatherstation.Models.Authentication;
using Weatherstation.Entities;

namespace Weatherstation.Services.TokenService
{
    public interface ITokenService
    {       
        Task<AuthenticationResult> GenerateTokenAndAuthenticationResultForUser(ApplicationUser user);

        ClaimsPrincipal GetPrincipalFromAccessToken(string token);
    }
}
