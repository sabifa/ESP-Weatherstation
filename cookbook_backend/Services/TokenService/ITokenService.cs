using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Cookbook.Models.Authentication;
using Microsoft.AspNetCore.Identity;

namespace Cookbook.Services.TokenService
{
    public interface ITokenService
    {       
        Task<AuthenticationResult> GenerateTokenAndAuthenticationResultForUser(IdentityUser user);

        ClaimsPrincipal GetPrincipalFromAccessToken(string token);
    }
}
