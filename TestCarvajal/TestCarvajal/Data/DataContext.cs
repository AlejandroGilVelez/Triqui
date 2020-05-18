using Microsoft.EntityFrameworkCore;
using TestCarvajal.API.Models;

namespace TestCarvajal.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        public DbSet<Usuario> Usuarios { get; set; }

        public DbSet<TipoIdentificacion> TiposIdentificacion { get; set; }

    }
}
