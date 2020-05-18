using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TestCarvajal.API.Data;
using TestCarvajal.API.Dtos;
using TestCarvajal.API.Models;

namespace TestCarvajal.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TipoIdentificacionsController : ControllerBase
    {
        #region Atributos

        private readonly DataContext _context;

        #endregion

        #region Constructor
                
        public TipoIdentificacionsController(DataContext context)
        {
            _context = context;
        }

        #endregion


        /// <summary>
        /// Metodo que retorna una lista de tipos de Identificación
        /// </summary>
        /// <returns></returns>
        [HttpGet("List")]
        public async Task<ActionResult> List()
        {
            var tiposLista = await _context.TiposIdentificacion.ToListAsync();

            if (tiposLista == null)
            {
                return NotFound();
            }

            List<TiposIdentificacionDto> result = new List<TiposIdentificacionDto>();

            foreach (var item in tiposLista)
            {
                result.Add(new TiposIdentificacionDto
                {
                    Id = item.Id,
                    Nombre = item.Nombre,
                    Descripcion = item.Descripcion

                });
            }

            return Ok(result.OrderBy(x => x.Nombre));
        }

        /// <summary>
        /// Metodo que retorna un tipo de identificación
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("Get/{id}")]
        public async Task<ActionResult> Get(Guid id)
        {
            var tipoIdentificacion = await _context.TiposIdentificacion.FirstOrDefaultAsync(x => x.Id == id); ;

            if (tipoIdentificacion == null)
            {
                return NotFound();
            }

            var result = new TiposIdentificacionDto
            {
                Id = tipoIdentificacion.Id,
                Nombre = tipoIdentificacion.Nombre,
                Descripcion = tipoIdentificacion.Descripcion
            };

            return Ok(result);
        }

        /// <summary>
        /// Metodo que retorno la actualización de un tipo de identificación
        /// </summary>
        /// <param name="tipoIdentificacion"></param>
        /// <returns></returns>
        [HttpPut("Update")]
        public async Task<IActionResult> Update([FromBody]TiposIdentificacionDto tipoIdentificacion)
        {
            var modificar = await _context.TiposIdentificacion.FirstOrDefaultAsync(x => x.Id == tipoIdentificacion.Id);


            if (modificar == null)
            {
                return BadRequest("El tipo de identificación no existe");
            }

            modificar.Nombre = tipoIdentificacion.Nombre;
            modificar.Descripcion = tipoIdentificacion.Descripcion;
            modificar.FechaModificacion = DateTime.Now;

            _context.TiposIdentificacion.Update(modificar);
            await _context.SaveChangesAsync();
            
            return Ok();
        }

        /// <summary>
        /// Metodo que crea un tipo de identificación
        /// </summary>
        /// <param name="tipoIdentificacion"></param>
        /// <returns></returns>
        [HttpPost("Create")]
        public async Task<ActionResult> Create([FromBody]TiposIdentificacionDto tipoIdentificacion)
        {
            var validar = await _context.TiposIdentificacion.FirstOrDefaultAsync(x => x.Nombre == tipoIdentificacion.Nombre);

            if (validar != null)
            {
                return BadRequest("El Tipo de identificación ya existe");
            }

            var nuevoTipoIdentificacion = new TipoIdentificacion
            {
                Id = Guid.NewGuid(),
                Nombre = tipoIdentificacion.Nombre,
                Descripcion = tipoIdentificacion.Descripcion,
                FechaCreacion = DateTime.Now,
                FechaModificacion = DateTime.Now

            };

            _context.TiposIdentificacion.Add(nuevoTipoIdentificacion);
            await _context.SaveChangesAsync();

            return Ok();

        }

        /// <summary>
        /// Metodo que elimina un tipo de identificación
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult> Delete(Guid id)
        {
            var tipoIdentificacion = await _context.TiposIdentificacion.FirstOrDefaultAsync(x => x.Id == id);

            if (tipoIdentificacion == null)
            {
                return NotFound();
            }

            _context.TiposIdentificacion.Remove(tipoIdentificacion);
            await _context.SaveChangesAsync();

            return Ok();
        }
        
    }
}
