using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PidsusAPI.Data;
using PidsusAPI.Models;

namespace PidsusAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SuspectsController : ControllerBase
    {
        private readonly AppDbContext _context;
        public SuspectsController(AppDbContext context) => _context = context;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Suspect>>> GetSuspects()
        {
            return await _context.Suspects.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Suspect>> GetSuspect(int id)
        {
            var suspect = await _context.Suspects.FindAsync(id);
            if (suspect == null) return NotFound();
            return suspect;
        }

        [HttpPost]
        public async Task<ActionResult<Suspect>> CreateSuspect(Suspect newSuspect)
        {
            _context.Suspects.Add(newSuspect);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetSuspect), new { id = newSuspect.Id }, newSuspect);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSuspect(int id, Suspect updatedSuspect)
        {
            if (id != updatedSuspect.Id) return BadRequest();
            _context.Entry(updatedSuspect).State = EntityState.Modified;

            try { await _context.SaveChangesAsync(); }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Suspects.Any(s => s.Id == id)) return NotFound();
                throw;
            }
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSuspect(int id)
        {
            var suspect = await _context.Suspects.FindAsync(id);
            if (suspect == null) return NotFound();
            _context.Suspects.Remove(suspect);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}