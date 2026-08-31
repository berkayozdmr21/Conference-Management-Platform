using ConferenceApi.Data;
using ConferenceApi.Entities;
using ConferenceApi.Helpers;
using ConferenceApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ConferenceApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SubmissionsController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly FileUploadService _fileUploadService;

        public SubmissionsController(
            AppDbContext context,
            FileUploadService fileUploadService)
        {
            _context = context;
            _fileUploadService = fileUploadService;
        }

       // POST: api/Submissions
[HttpPost]
[Consumes("multipart/form-data")]
public async Task<IActionResult> CreateSubmission(
    [FromForm] CreateSubmissionRequest request)
{
    
    var existingSubmission = await _context.Submissions
        .FirstOrDefaultAsync(s => s.Email == request.Email);

    if (existingSubmission != null)
    {
        return BadRequest(new { message = "Bu e-posta adresi ile zaten bir başvuru yapılmıştır." });
    }

    var submission = new Submission
    {
        FirstName = request.FirstName,
        LastName = request.LastName,
        Email = request.Email,
        Country = request.Country,
        StudyTitle = request.StudyTitle,
        Session = request.Session,
        ParticipationType = request.ParticipationType,
        Status = "Pending",
        CreatedAt = DateTime.UtcNow
    };

    if (request.File != null)
    {
        submission.FilePath =
            await _fileUploadService.UploadSubmissionFileAsync(request.File);
    }
    else
    {
        submission.FilePath = string.Empty;
    }

    _context.Submissions.Add(submission);
    await _context.SaveChangesAsync();

    return CreatedAtAction(
        nameof(GetSubmission),
        new { id = submission.Id },
        submission
    );
}

        // GET: api/Submissions
        [HttpGet]
        public async Task<IActionResult> GetSubmissions()
        {
            var submissions = await _context.Submissions.ToListAsync();

            return Ok(submissions);
        }

        // GET: api/Submissions/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetSubmission(int id)
        {
            var submission = await _context.Submissions.FindAsync(id);

            if (submission == null)
                return NotFound();

            return Ok(submission);
        }

        // PUT: api/Submissions/{id}/status
        [HttpPut("{id}/status")]
        public async Task<IActionResult> UpdateStatus(
            int id,
            [FromBody] string status)
        {
            var submission = await _context.Submissions.FindAsync(id);

            if (submission == null)
                return NotFound();

            submission.Status = status;

            await _context.SaveChangesAsync();

            return Ok(submission);
        }
    }
}
