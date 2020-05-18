using System.ComponentModel.DataAnnotations;

namespace TestCarvajal.API.Models
{
    public class Usuario : BaseModel
    {
        [Required]
        public long NroIdentificacion { get; set; }

        [Required]
        [MaxLength(150)]
        public string Nombres { get; set; }

        [Required]
        public string Apellidos { get; set; }        

        [Required]
        public byte[] PasswordHash { get; set; }

        [Required]
        public byte[] PasswordSalt { get; set; }

        [Required]
        [MaxLength(200)]
        public string Email { get; set; }

        public TipoIdentificacion TipoIdentificacion { get; set; }
    }
}
