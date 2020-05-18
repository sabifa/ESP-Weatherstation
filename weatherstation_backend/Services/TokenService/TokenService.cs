using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Weatherstation.Data;
using Weatherstation.Entities;
using Weatherstation.Models.Authentication;
using Weatherstation.Settings;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace Weatherstation.Services.TokenService
{
    public class TokenService : ITokenService
    {
        private readonly TokenValidationParameters _tokenValidationParameters;
        private readonly JwtSettings _jwtSettings;
        private readonly DataContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public TokenService(TokenValidationParameters tokenValidationParameters,
            JwtSettings jwtSettings,
            DataContext context,
            UserManager<ApplicationUser> userManager)
        {
            _tokenValidationParameters = tokenValidationParameters;
            _jwtSettings = jwtSettings;
            _context = context;
            _userManager = userManager;
        }

        public async Task<AuthenticationResult> GenerateTokenAndAuthenticationResultForUser(ApplicationUser user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_jwtSettings.Secret);
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim("userId", user.Id),
            };

            var userRoles = await _userManager.GetRolesAsync(user);
            foreach (var userRole in userRoles)
            {
                claims.Add(new Claim(ClaimTypes.Role, userRole));
            }

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddMinutes(_jwtSettings.AccessTokenLifetimeMinutes),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var accessToken = tokenHandler.CreateToken(tokenDescriptor);
            var refreshToken = new RefreshToken
            {
                AccessTokenId = accessToken.Id,
                UserId = user.Id,
                CreationDate = DateTime.UtcNow,
                ExpiryDate = DateTime.UtcNow.AddDays(_jwtSettings.RefreshTokenLifetimeDays),
                Token = Guid.NewGuid().ToString(),
            };

            await _context.RefreshTokens.AddAsync(refreshToken);
            await _context.SaveChangesAsync();

            return new AuthenticationResult
            {
                Success = true,
                AccessToken = tokenHandler.WriteToken(accessToken),
                RefreshToken = refreshToken.Token
            };
        }

        public ClaimsPrincipal GetPrincipalFromAccessToken(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();

            try
            {
                var tokenValidationParameters = _tokenValidationParameters.Clone();
                tokenValidationParameters.ValidateLifetime = false;
                return tokenHandler.ValidateToken(token, tokenValidationParameters, out _);
            }
            catch
            {
                return null;
            }
        }
    }
}
