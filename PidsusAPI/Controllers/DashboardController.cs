using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PidsusAPI.Data;

namespace PidsusAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DashboardController : ControllerBase
    {
        private readonly AppDbContext _context;
        public DashboardController(AppDbContext context) => _context = context;

        [HttpGet("summary")]
        public async Task<IActionResult> GetSummary()
        {
            var totalCases = await _context.Cases.CountAsync();

            var byStatus = await _context.Cases
                .GroupBy(c => c.Status)
                .Select(g => new { status = g.Key, count = g.Count() })
                .ToListAsync();

            var byCrimeType = await _context.Cases
                .GroupBy(c => c.CrimeType)
                .Select(g => new { crimeType = g.Key, count = g.Count() })
                .ToListAsync();

            return Ok(new { totalCases, byStatus, byCrimeType });
        }
    }
}