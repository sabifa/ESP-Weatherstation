using System.Threading.Tasks;
using Weatherstation.Models.Authentication;

namespace Weatherstation.Services.IdentityService
{
    public interface IIdentityService
    {
        Task<AuthenticationResult> RegisterAsync(string email, string password, string firstName);
        Task<AuthenticationResult> LoginAsync(string email, string password);
        Task<AuthenticationResult> RefreshTokenAsync(string acessToken, string requestRefreshToken);
    }
}
