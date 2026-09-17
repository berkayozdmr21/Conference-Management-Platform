using ConferenceApi.DTOs;

namespace ConferenceApi.Services
{
    public interface IBookService
    {
        Task<IEnumerable<BookDto>> GetAllAsync(int? year);
        Task<BookDto?> GetByIdAsync(int id);
        Task<BookDto> CreateAsync(BookCreateDto dto, string? filePath);
        Task<BookDto?> UpdateAsync(int id, BookCreateDto dto, string? filePath);
        Task<bool> DeleteAsync(int id);
    }
}
