using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Loja_API.Data;
using Loja_API.Models;

namespace Loja_API.Controllers
{
    [Route("api/[controller]")]
    [Authorize(Roles = "funcionario,gerente")]
    [ApiController]
    public class CDController : ControllerBase 
    {
        private LojaContext _context;
        public CDController(LojaContext context) {
        // construtor
        _context = context;
        }
        [HttpGet]
        [AllowAnonymous]
        public ActionResult<List<CD>> GetAll() {
        return _context.CD.ToList();
        }

        [HttpGet("{CDId}")]
        [AllowAnonymous]
        public ActionResult<CD> Get(int CDId) {
            try {
                var result = _context.CD.Find(CDId);
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
        public async Task<ActionResult> post(CD model) {
            try {
                _context.CD.Add(model);
                if (await _context.SaveChangesAsync() == 1) {
                    return Created($"/api/cd/{model.nome}",model);
                }
            }
            catch {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
            return BadRequest();
            }

        [HttpDelete("{CDId}")]
        public async Task<ActionResult> delete(int CDId) {
            try {
                var cd = await _context.CD.FindAsync(CDId);
                if (cd == null) {
                    return NotFound();
                }
                _context.Remove(cd);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
        }

        [HttpPut("{CDId}")]
        public async Task<IActionResult> put(int CDId, CD dadosCDAlt) {
            try {
                var result = await _context.CD.FindAsync(CDId);
                if (CDId != result.id) {
                return BadRequest();
                }
            
            result.nome = dadosCDAlt.nome;
            result.artista = dadosCDAlt.artista;
            result.genero = dadosCDAlt.genero;
            result.ano = dadosCDAlt.ano;

            
            await _context.SaveChangesAsync();
            return Created($"/api/cd/{dadosCDAlt.nome}", dadosCDAlt);
            }
            catch {
                return this.StatusCode(StatusCodes.Status500InternalServerError,"Falha no acesso ao banco de dados.");
            }
        }   
        
    }
}