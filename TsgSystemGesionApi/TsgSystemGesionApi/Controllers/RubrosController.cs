using Microsoft.AspNetCore.Mvc;
using TsgSystemGestionBussiness;
using TsgSystemGestionEntities;

namespace TsgSystemGesionApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RubrosController : ControllerBase
    {
        private readonly ILogger<RubrosController> _logger;
        private readonly IRubroService _rubroService;
        public RubrosController(ILogger<RubrosController> logger, IRubroService rubroService)
        {
            _logger = logger;
            _rubroService = rubroService;

        }
        // GET: /Rubros
        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                var rubros = _rubroService.GetAll();
                return Ok(rubros);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error obteniendo rubros");
                return StatusCode(500, "Error interno del servidor");
            }
        }

        // POST: /Rubros
        [HttpPost]
        public IActionResult Create([FromBody] Rubros rubro)
        {
            if (rubro == null)
                return BadRequest("Rubro inválido");

            try
            {
                _rubroService.InsertRubro(rubro);
                return Ok("Rubro creado exitosamente");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creando rubro");
                return StatusCode(500, "Error interno del servidor");
            }
        }

        // PUT: /Rubros
        [HttpPut]
        public IActionResult Update([FromBody] Rubros rubro)
        {
            if (rubro == null || rubro.rubro <= 0)
                return BadRequest("Rubro inválido");

            try
            {
                _rubroService.UpdateRubro(rubro);
                return Ok("Rubro actualizado exitosamente");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error actualizando rubro");
                return StatusCode(500, "Error interno del servidor");
            }
        }

    }
}
