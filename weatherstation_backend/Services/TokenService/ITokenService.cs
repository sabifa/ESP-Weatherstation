using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Weatherstation.Models.Authentication;
using Microsoft.AspNetCore.Identity;

namespace Weatherstation.Services.TokenService
{
    public interface ITokenService
    {       
        Task<AuthenticationResult> GenerateTokenAndAuthenticationResultForUser(IdentityUser user);

        ClaimsPrincipal GetPrincipalFromAccessToken(string token);
    }
}
