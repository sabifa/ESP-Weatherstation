using System.Threading.Tasks;
using Cookbook.Models.Authentication;

namespace Cookbook.Services.IdentityService
{
    public interface IIdentityService
    {
        Task<AuthenticationResult> RegisterAsync(string email, string password);
        Task<AuthenticationResult> LoginAsync(string email, string password);
        Task<AuthenticationResult> RefreshTokenAsync(string acessToken, string requestRefreshToken);
    }
}
