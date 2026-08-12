using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PidsusAPI.Data;
using PidsusAPI.Models;

namespace PidsusAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CasesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CasesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Case>>> GetCases()
        {
            return await _context.Cases
                .Include(c => c.Suspects)
                .Include(c => c.Evidences)
                .Include(c => c.CaseStages)
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Case>> GetCase(int id)
        {
            var caseItem = await _context.Cases
                .Include(c => c.Suspects)
                .Include(c => c.Evidences)
                .Include(c => c.CaseStages)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (caseItem == null) return NotFound();
            return caseItem;
        }

        [HttpPost]
        public async Task<ActionResult<Case>> CreateCase(Case newCase)
        {
            _context.Cases.Add(newCase);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetCase), new { id = newCase.Id }, newCase);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCase(int id, Case updatedCase)
        {
            if (id != updatedCase.Id) return BadRequest();

            _context.Entry(updatedCase).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Cases.Any(c => c.Id == id)) return NotFound();
                throw;
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCase(int id)
        {
            var caseItem = await _context.Cases.FindAsync(id);
            if (caseItem == null) return NotFound();

            _context.Cases.Remove(caseItem);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}