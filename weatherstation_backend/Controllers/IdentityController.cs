﻿using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Weatherstation.Models.Authentication;
using Weatherstation.Services.IdentityService;
using Microsoft.AspNetCore.Authorization;

namespace Weatherstation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IdentityController : ControllerBase
    {
        private readonly IIdentityService _identityService;

        public IdentityController(IIdentityService identityService)
        {
            _identityService = identityService;
        }

        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register([FromBody] UserRegistrationRequest request)
        {
            var authResponse = await _identityService.RegisterAsync(request.Email, request.Password, request.FirstName);

            if (!authResponse.Success)
            {
                return Unauthorized(authResponse.Errors);
            }

            return Ok(new AuthResponse
            {
                AccessToken = authResponse.AccessToken,
                RefreshToken = authResponse.RefreshToken
            });
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] UserLoginRequest request)
        {
            var authResponse = await _identityService.LoginAsync(request.Email, request.Password);

            if (!authResponse.Success)
            {
                return Unauthorized(authResponse.Errors);
            }

            return Ok(new AuthResponse
            {
                AccessToken = authResponse.AccessToken,
                RefreshToken = authResponse.RefreshToken
            });
        }

        [HttpPost("refresh")]
        [AllowAnonymous]
        public async Task<IActionResult> Refresh([FromBody] RefreshTokenRequest request)
        {
            var refreshResponse = await _identityService.RefreshTokenAsync(request.AccessToken, request.RefreshToken);

            if (!refreshResponse.Success)
            {
                return Unauthorized(refreshResponse.Errors);
            }

            return Ok(new AuthResponse
            {
                AccessToken = refreshResponse.AccessToken,
                RefreshToken = refreshResponse.RefreshToken
            });
        }
    }
}
