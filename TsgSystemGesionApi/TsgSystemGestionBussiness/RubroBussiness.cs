using Microsoft.Extensions.Configuration;
using TsgSystemGestionDataAccess;
using TsgSystemGestionEntities;
namespace TsgSystemGestionBussiness
{

    public interface IRubroService
    {
        List<Rubros> GetAll();
        void InsertRubro(Rubros rubro);
        void UpdateRubro(Rubros rubro);
    }

    public class RubroBussiness : IRubroService
    {

        private readonly RubroDataAccess _rubroDAL;

        // Recibe la DAL ya configurada con la cadena de conexión
        public RubroBussiness(IConfiguration configuration)
        {
            _rubroDAL = new RubroDataAccess(configuration);
        }

        public List<Rubros> GetAll()
        {
            return _rubroDAL.GetAll();
        }

        public void InsertRubro(Rubros rubro)
        {
            _rubroDAL.AltaRubro(rubro);
        }

        public void UpdateRubro(Rubros rubro)
        {
            _rubroDAL.ModificaRubro(rubro);
        }
    }
}
