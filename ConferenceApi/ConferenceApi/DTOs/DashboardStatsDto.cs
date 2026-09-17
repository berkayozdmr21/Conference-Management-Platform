namespace ConferenceApi.DTOs
{
    public class DashboardStatsDto
    {
        // Basvuru sayaclari
        public int TotalSubmissions { get; set; }
        public int PendingSubmissions { get; set; }
        public int ApprovedSubmissions { get; set; }
        public int RejectedSubmissions { get; set; }

        // Katilim sekli
        public int OnlineCount { get; set; }
        public int PhysicalCount { get; set; }

        // Diger sayaclar
        public int TotalParticipants { get; set; }
        public int TotalSpeakers { get; set; }
        public int TotalTopics { get; set; }
        public int TotalBooks { get; set; }
        public int UnreadMessages { get; set; }

        // Dagilimlar
        public List<CountByKeyDto> ByCountry { get; set; } = new();
        public List<CountByKeyDto> BySession { get; set; } = new();
    }

    public class CountByKeyDto
    {
        public string Key { get; set; } = string.Empty;
        public int Count { get; set; }
    }
}
