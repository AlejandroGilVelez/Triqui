using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using TestCarvajal.API.Dtos;

namespace TestCarvajal.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class JuegoController : ControllerBase
    {
        /// <summary>
        /// Metodo que tiene la lógica del juego
        /// </summary>
        /// <param name="juegoDto"></param>
        /// <returns></returns>
        [HttpPost("Jugar")]
        public async Task<IActionResult> Jugar([FromBody]JuegoDto juegoDto)
        {            

            if (juegoDto == null)
            {
                return BadRequest("No selecciono ningun campo");
            }
                        
            string ganador = string.Empty;

            // Ganador Horizontal

            if (juegoDto.A1 == juegoDto.A2 && juegoDto.A2 == juegoDto.A3 && juegoDto.A1 != 0)
            {
                ganador = juegoDto.A1 == 1? juegoDto.Jugador1: juegoDto.Jugador2;
            }

            if (juegoDto.B1 == juegoDto.B2 && juegoDto.B2 == juegoDto.B3 && juegoDto.B1 != 0)
            {
                ganador = juegoDto.B1 == 1 ? juegoDto.Jugador1 : juegoDto.Jugador2; 
            }

            if (juegoDto.C1 == juegoDto.C2 && juegoDto.C2 == juegoDto.C3 && juegoDto.C1 != 0)
            {
                ganador = juegoDto.C1 == 1 ? juegoDto.Jugador1 : juegoDto.Jugador2; 
            }

            // Ganador Vertical

            if (juegoDto.A1 == juegoDto.B1 && juegoDto.B1 == juegoDto.C1 && juegoDto.A1 != 0)
            {
                ganador = juegoDto.A1 == 1 ? juegoDto.Jugador1 : juegoDto.Jugador2; 
            }

            if (juegoDto.A2 == juegoDto.B2 && juegoDto.B2 == juegoDto.C2 && juegoDto.A2 != 0)
            {
                ganador = juegoDto.A2 == 1 ? juegoDto.Jugador1 : juegoDto.Jugador2;
            }
            if (juegoDto.A3 == juegoDto.B3 && juegoDto.B3 == juegoDto.C3 && juegoDto.A3 != 0)
            {
                ganador = juegoDto.A3 == 1 ? juegoDto.Jugador1 : juegoDto.Jugador2;
            }

            // Ganador Vertical Izquierda - Derecha
            if (juegoDto.A1 == juegoDto.B2 && juegoDto.B2 == juegoDto.C3 && juegoDto.A1 != 0)
            {
                ganador = juegoDto.A1 == 1 ? juegoDto.Jugador1 : juegoDto.Jugador2;
            }

            // Ganador Vertical Derecha - Izquierda
            if (juegoDto.A3 == juegoDto.B2 && juegoDto.B2 == juegoDto.C1 && juegoDto.A3 != 0)
            {
                ganador = juegoDto.A3 == 1 ? juegoDto.Jugador1 : juegoDto.Jugador2;
            }

            juegoDto.Ganador = ganador;

            return Ok(juegoDto);

        }
    }
}