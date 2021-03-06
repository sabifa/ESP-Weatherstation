using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;
using Weatherstation.Data;
using Weatherstation.Models.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Weatherstation.Services.TokenService;
using Weatherstation.Models.ApplicationRole;
using Weatherstation.Entities;

namespace Weatherstation.Services.IdentityService
{
    public class IdentityService : IIdentityService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ITokenService _tokenService;
        private readonly DataContext _context;

        public IdentityService(UserManager<ApplicationUser> userManager, DataContext context, ITokenService tokenService)
        {
            _userManager = userManager;
            _context = context;
            _tokenService = tokenService;
        }

        public async Task<AuthenticationResult> RegisterAsync(string email, string password, string firstName)
        {
            var existingUser = await _userManager.FindByEmailAsync(email);

            if (existingUser != null)
            {
                return new AuthenticationResult
                {
                    Errors = new[] { "User with this email already exists" }
                };
            }

            var user = new ApplicationUser
            {
                FirstName = firstName,
                Email = email,
                UserName = email
            };

            var createdUser = await _userManager.CreateAsync(user, password);
            var roleAssignment = await _userManager.AddToRoleAsync(user, ApplicationRole.User);

            if (!createdUser.Succeeded || !roleAssignment.Succeeded)
            {
                return new AuthenticationResult
                {
                    Errors = createdUser.Errors.Select(x => x.Description)
                };
            }

            return await _tokenService.GenerateTokenAndAuthenticationResultForUser(user);
        }

        public async Task<AuthenticationResult> LoginAsync(string email, string password)
        {
            var existingUser = await _userManager.FindByEmailAsync(email);
            var passwordIsCorrect = await _userManager.CheckPasswordAsync(existingUser, password);

            if (!passwordIsCorrect || existingUser == null)
            {
                return new AuthenticationResult
                {
                    Errors = new[] { "Username or password is incorrect" }
                };
            }

            return await _tokenService.GenerateTokenAndAuthenticationResultForUser(existingUser);
        }

        public async Task<AuthenticationResult> RefreshTokenAsync(string accessToken, string refreshToken)
        {
            var validatedToken = _tokenService.GetPrincipalFromAccessToken(accessToken);
            if (validatedToken == null)
            {
                return new AuthenticationResult { Errors = new[] { "Invalid access token" } };
            }

            var jti = validatedToken.Claims.Single(x => x.Type == JwtRegisteredClaimNames.Jti).Value;
            var userId = validatedToken.Claims.Single(x => x.Type == "userId").Value;
            var storedRefreshToken = await _context.RefreshTokens.SingleOrDefaultAsync(x => x.Token == refreshToken && x.UserId == userId);

            if (storedRefreshToken == null ||
                DateTime.UtcNow > storedRefreshToken.ExpiryDate ||
                storedRefreshToken.Invalidated ||
                storedRefreshToken.AccessTokenId != jti)
            {
                return new AuthenticationResult { Errors = new[] { "Token refresh failed" } };
            }

            _context.RefreshTokens.Remove(storedRefreshToken);
            await _context.SaveChangesAsync();

            var user = await _userManager.FindByIdAsync(validatedToken.Claims.Single(x => x.Type == "userId").Value);
            return await _tokenService.GenerateTokenAndAuthenticationResultForUser(user);
        }
    }
}
