namespace ConferenceApi.DTOs
{
    /// <summary>
    /// Sayfalanmis liste sonucu. Items = o sayfadaki kayitlar,
    /// digerleri frontend'in "1 2 3 ... >" cubugunu cizmesi icin gereken bilgiler.
    /// </summary>
    public class PagedResult<T>
    {
        public IEnumerable<T> Items { get; set; } = new List<T>();
        public int Page { get; set; }
        public int PageSize { get; set; }
        public int TotalCount { get; set; }

        public int TotalPages => PageSize <= 0 ? 0 : (int)Math.Ceiling(TotalCount / (double)PageSize);
        public bool HasPrevious => Page > 1;
        public bool HasNext => Page < TotalPages;
    }
}
