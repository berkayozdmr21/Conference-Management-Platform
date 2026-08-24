namespace ConferenceApi.Entities
{
    public class ConferenceTopic
    {
        public int Id { get; set; }
        public int ConferenceId { get; set; }
        public string Name { get; set; } = string.Empty;
        public Conference Conference { get; set; } = null!;
    }
}