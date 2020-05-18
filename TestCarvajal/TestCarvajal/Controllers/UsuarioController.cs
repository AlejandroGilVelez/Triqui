using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TestCarvajal.API.Data;
using TestCarvajal.API.Dtos;
using TestCarvajal.API.Models;

namespace TestCarvajal.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        #region Atributos

        private readonly DataContext _context;

        #endregion

        #region Constructor

        public UsuarioController(DataContext context)
        {
            _context = context;
        }

        #endregion

        #region Acciones

        /// <summary>
        /// Metodo que retorna a la lista de usuario
        /// </summary>
        /// <returns></returns>
        [HttpGet("List")]
        public async Task<IActionResult> List()
        {            
            var usuarioLista = await _context.Usuarios.Include(x => x.TipoIdentificacion).ToListAsync();

            if (usuarioLista == null)
            {
                return NotFound();
            }

            List<UsuarioDto> result = new List<UsuarioDto>();

            foreach (var item in usuarioLista)
            {
                result.Add(new UsuarioDto 
                {
                    Id=item.Id,
                    NroIdentificacion = item.NroIdentificacion,
                    Nombres = item.Nombres,
                    Apellidos = item.Apellidos,
                    Email = item.Email,
                    TipoIdentificacionId = item.TipoIdentificacion.Id,
                    TipoIdentificacion = item.TipoIdentificacion.Nombre
                });
            }

            return Ok(result);
        }

        /// <summary>
        /// Metodo que retorna el usuairo
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("Get/{id}")]
        public async Task<IActionResult> Get(Guid id)
        {

            var usuario = await _context.Usuarios.Include(x => x.TipoIdentificacion).FirstOrDefaultAsync(x => x.Id == id);

            if (usuario == null)
            {
                return NotFound();
            }

            var result = new UsuarioDto
            {
                Id = usuario.Id,
                NroIdentificacion = usuario.NroIdentificacion,
                Nombres = usuario.Nombres,
                Apellidos = usuario.Apellidos,
                Email = usuario.Email,
                TipoIdentificacionId = usuario.TipoIdentificacion.Id,
                TipoIdentificacion = usuario.TipoIdentificacion.Nombre
            };


            return Ok(result);

        }

        /// <summary>
        /// Metodo que elimina el usuario
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var result = await _context.Usuarios.FirstOrDefaultAsync(x => x.Id == id);

            if (result == null)
            {
                return NotFound();
            }

            _context.Usuarios.Remove(result);
            await _context.SaveChangesAsync();

            return Ok();
        }

        /// <summary>
        /// Metodo que crea un usuario
        /// </summary>
        /// <param name="usuario"></param>
        /// <returns></returns>
        [HttpPost("Create")]
        public async Task<IActionResult> Create([FromBody]UsuarioDto usuario)
        {

            var validar = await _context.Usuarios.FirstOrDefaultAsync(x => x.Email == usuario.Email);

            if (validar != null)
            {
                return BadRequest("El email ya existe");
            }

            var tipoIdentificacion = await _context.TiposIdentificacion.FirstOrDefaultAsync(x => x.Id == usuario.TipoIdentificacionId);

            byte[] passwordHash, passwordSalt;            

            Utilidades.Utils.CreatePasswordHash(usuario.Password, out passwordHash, out passwordSalt);

            

            var nuevoUsuario = new Usuario
            {
                Id = Guid.NewGuid(),
                NroIdentificacion = usuario.NroIdentificacion,
                Nombres = usuario.Nombres,
                Apellidos = usuario.Apellidos,
                Email = usuario.Email,
                TipoIdentificacion = tipoIdentificacion,
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt,
                FechaCreacion = DateTime.Now,
                FechaModificacion = DateTime.Now
            };

            _context.Add(nuevoUsuario);
            await _context.SaveChangesAsync();

            return Ok();

        }

        /// <summary>
        /// Metodo que actualiza un usuario
        /// </summary>
        /// <param name="usuario"></param>
        /// <returns></returns>
        [HttpPut("Update")]
        public async Task<IActionResult> Update([FromBody]UsuarioDto usuario)
        {
            var modificar = await _context.Usuarios.FirstOrDefaultAsync(x => x.Id == usuario.Id);

            if (modificar == null)
            {
                return BadRequest("El usuario no existe");
            }

            var tipoIdentificacion = await _context.TiposIdentificacion.FirstOrDefaultAsync(x => x.Id == usuario.TipoIdentificacionId);

            if (usuario.Password != null)
            {
                byte[] passwordHash, passwordSalt;

                Utilidades.Utils.CreatePasswordHash(usuario.Password, out passwordHash, out passwordSalt);

                modificar.PasswordHash = passwordHash;
                modificar.PasswordSalt = passwordSalt;
            }

            modificar.NroIdentificacion = usuario.NroIdentificacion;
            modificar.Nombres = usuario.Nombres;
            modificar.Apellidos = usuario.Apellidos;
            modificar.Email = usuario.Email;            
            modificar.FechaModificacion = DateTime.Now;
            modificar.TipoIdentificacion = tipoIdentificacion;


            _context.Usuarios.Update(modificar);
            await _context.SaveChangesAsync();

            return Ok();

        }

        #endregion

    }
}