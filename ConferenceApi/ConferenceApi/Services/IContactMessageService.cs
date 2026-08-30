using ConferenceApi.DTOs;

namespace ConferenceApi.Services
{
    public interface IContactMessageService
    {
        Task<ContactMessageDto> CreateAsync(ContactMessageCreateDto dto);
        Task<PagedResult<ContactMessageDto>> GetPagedAsync(int page, int pageSize, bool? isRead, string? search);
        Task<ContactMessageDto?> GetByIdAsync(int id);
        Task<ContactMessageDto?> MarkAsReadAsync(int id);
        Task<bool> DeleteAsync(int id);
    }
}
