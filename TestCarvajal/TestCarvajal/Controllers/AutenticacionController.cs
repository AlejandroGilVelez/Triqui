using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using TestCarvajal.API.Data;
using TestCarvajal.API.Dtos;

namespace TestCarvajal.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AutenticacionController : ControllerBase
    {

        #region Atributos

        private readonly DataContext _context;

        #endregion

        #region Constructor

        public AutenticacionController(DataContext context)
        {
            _context = context;
        }

        #endregion

        #region Acciones

        /// <summary>
        /// Metodo que retorna el token para la autorización
        /// </summary>
        /// <param name="informacionLogin"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> Post(LoginDto informacionLogin)
        {
            var usuarioSeleccionado = await _context.Usuarios.FirstOrDefaultAsync(x => x.NroIdentificacion == informacionLogin.NroIdentificacion);

            if (usuarioSeleccionado == null)
            {
                return Unauthorized();
            }

            if (!Utilidades.Utils.VerifyPasswordHash(informacionLogin.Password, usuarioSeleccionado.PasswordHash, usuarioSeleccionado.PasswordSalt))
            {
                return Unauthorized();
            }

            var claims = new Claim[]
            {
                new Claim(ClaimTypes.NameIdentifier, usuarioSeleccionado.Id.ToString()),
                new Claim(ClaimTypes.Name, $"{usuarioSeleccionado.Nombres} {usuarioSeleccionado.Apellidos}")
            };

            var key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes("Miclavedecontrasena"));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };
            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return Ok(new
            {
                token = tokenHandler.WriteToken(token)
            });

        }
        

        #endregion
    }
}