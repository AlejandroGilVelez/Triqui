using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TestCarvajal.API.Models
{
    public class TipoIdentificacion : BaseModel
    {
        [Required]
        [MaxLength(10)]
        public string Nombre { get; set; }

        [Required]
        [MaxLength(150)]
        public string Descripcion { get; set; } 

        public List<Usuario> Usuario { get; set; }

    }
}
