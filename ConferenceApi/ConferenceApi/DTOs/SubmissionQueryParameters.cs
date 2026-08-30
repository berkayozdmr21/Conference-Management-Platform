namespace ConferenceApi.DTOs
{
    /// <summary>
    /// GET /api/submissions adresine query string olarak gelen parametreler.
    /// Ornek: /api/submissions?page=2&amp;pageSize=20&amp;status=Pending&amp;search=gozde
    /// </summary>
    public class SubmissionQueryParameters
    {
        private const int MaxPageSize = 100;
        private int _pageSize = 10;
        private int _page = 1;

        public int Page
        {
            get => _page;
            set => _page = value < 1 ? 1 : value;
        }

        public int PageSize
        {
            get => _pageSize;
            set
            {
                if (value < 1) _pageSize = 10;
                else if (value > MaxPageSize) _pageSize = MaxPageSize;
                else _pageSize = value;
            }
        }

        // Filtreler
        public string? Status { get; set; }
        public string? Country { get; set; }
        public string? Session { get; set; }
        public string? ParticipationType { get; set; }

        // Arama: ad, soyad, e-posta, calisma basligi icinde arar
        public string? Search { get; set; }

        // Siralama: submittedAt | firstName | lastName | country | status
        public string? SortBy { get; set; }
        public bool Desc { get; set; } = true;
    }
}
