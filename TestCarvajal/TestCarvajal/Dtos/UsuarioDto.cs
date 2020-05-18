using System;

namespace TestCarvajal.API.Dtos
{
    public class UsuarioDto
    {
        public Guid Id { get; set; }
        public long NroIdentificacion { get; set; }
       
        public string Nombres { get; set; }

      
        public string Apellidos { get; set; }


        public string Password { get; set; }      

   
        public string Email { get; set; }

        public Guid TipoIdentificacionId { get; set; }

        public string TipoIdentificacion { get; set; }

    }
}
