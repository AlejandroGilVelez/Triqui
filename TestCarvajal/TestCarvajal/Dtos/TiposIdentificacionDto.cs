using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TestCarvajal.API.Dtos
{
    public class TiposIdentificacionDto
    {
        public Guid Id { get; set; }

        public string Nombre { get; set; }

        public string Descripcion { get; set; }
                
    }
}
