namespace Loja_API.Models
{
    public class Usuario
    {
        public int Id { get; set; }
        public string nome { get; set; } = string.Empty;
        public string username { get; set; } = string.Empty;
        public string senha { get; set; } = string.Empty;
        public string role { get; set; } = string.Empty;
    }
}