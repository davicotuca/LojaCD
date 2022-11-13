using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Loja_API.Data;
using Loja_API.Models;

namespace Loja_API.Controllers
{
    [Route("api/[controller]")]
    [Authorize(Roles = "gerente")]
    [ApiController]
    public class UsuarioController : ControllerBase 
    {
        private LojaContext _context;
        public UsuarioController(LojaContext context) {
        // construtor
        _context = context;
        }
        [HttpGet]
        public ActionResult<List<Usuario>> GetAll() {
        return _context.Usuario.ToList();
        }

        [HttpGet("{UsuarioId}")]
        public ActionResult<Usuario> Get(int UsuarioId) {
            try {
                var result = _context.Usuario.Find(UsuarioId);
                if (result == null) {
                    return NotFound();
                }
                return Ok(result);
            }
            catch {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados");
            }
        }

        [HttpPost]
        public async Task<ActionResult> post(Usuario model) {
            try {
                _context.Usuario.Add(model);
                if (await _context.SaveChangesAsync() == 1) {
                    return Created($"/api/usuario/{model.Id}",model);
                }
            }
            catch {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
            return BadRequest();
            }

        [HttpDelete("{UsuarioId}")]
        public async Task<ActionResult> delete(int UsuarioId) {
            try {
                var usuario = await _context.Usuario.FindAsync(UsuarioId);
                if (usuario == null) {
                    return NotFound();
                }
                _context.Remove(usuario);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
        }

        [HttpPut("{UsuarioId}")]
        public async Task<IActionResult> put(int UsuarioId, Usuario dadosUsuarioAlt) {
            try {
                var result = await _context.Usuario.FindAsync(UsuarioId);
                if (UsuarioId != result.Id) {
                return BadRequest();
                }
            
            result.nome = dadosUsuarioAlt.nome;
            result.username = dadosUsuarioAlt.username;
            result.senha = dadosUsuarioAlt.senha;
            result.role = dadosUsuarioAlt.role;
            
            await _context.SaveChangesAsync();
            return Created($"/api/usuario/{dadosUsuarioAlt.nome}", dadosUsuarioAlt);
            }
            catch {
                return this.StatusCode(StatusCodes.Status500InternalServerError,"Falha no acesso ao banco de dados.");
            }
        }   
        
    }
}