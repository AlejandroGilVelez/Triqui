using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TestCarvajal.API.Dtos
{
    public class JuegoDto
    {
        public int A1 { get; set; }

        public int A2 { get; set; }

        public int A3 { get; set; }

        public int B1 { get; set; }

        public int B2 { get; set; }

        public int B3 { get; set; }

        public int C1 { get; set; }

        public int C2 { get; set; }

        public int C3 { get; set; }

        public string Jugador1 { get; set; }

        public string Jugador2 { get; set; }

        public string Ganador { get; set; }
    }
}
