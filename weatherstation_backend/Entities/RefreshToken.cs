﻿using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Weatherstation.Entities
{
    public class RefreshToken
    {
        public Guid Id { get; set; }

        public string Token { get; set; }

        public string AccessTokenId { get; set; }

        public DateTime CreationDate { get; set; }

        public DateTime ExpiryDate { get; set; }

        public bool Invalidated { get; set; }

        public string UserId { get; set; }

        [ForeignKey(nameof(UserId))]
        public ApplicationUser User { get; set; }
    }
}
