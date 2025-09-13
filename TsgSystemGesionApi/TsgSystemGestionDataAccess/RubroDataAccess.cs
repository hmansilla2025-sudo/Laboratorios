using System;
using System.Collections.Generic;
using System.Data;
using Microsoft.Data.SqlClient;
using TsgSystemGestionEntities;
using Microsoft.Extensions.Configuration;

namespace TsgSystemGestionDataAccess
{
    public class RubroDataAccess
    {
        private readonly string _connectionString;

        public RubroDataAccess(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("Cnn");
        }

        public List<Rubros> GetAll()
        {
            var list = new List<Rubros>();

            using SqlConnection conn = new SqlConnection(_connectionString);
            conn.Open();

            using SqlCommand cmd = new SqlCommand("GetRubros", conn)
            {
                CommandType = CommandType.StoredProcedure
            };

            using SqlDataReader reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                list.Add(ObtenerRubro(reader));
            }

            return list;
        }

        private Rubros ObtenerRubro(SqlDataReader reader)
        {
            return new Rubros
            {
                rubro = Convert.ToInt32(reader["rubro"]),
                descripcion = Convert.ToString(reader["descripcion"]),
                codigo = Convert.ToInt32(reader["codigo"]),
                activo = Convert.ToBoolean(reader["activo"])
            };
        }

        public void AltaRubro(Rubros rubro)
        {
            using SqlConnection conn = new SqlConnection(_connectionString);
            conn.Open();

            using SqlCommand cmd = new SqlCommand("AltaRubro", conn)
            {
                CommandType = CommandType.StoredProcedure
            };

            cmd.Parameters.Add("@PDESCRIPCION", SqlDbType.VarChar).Value = rubro.descripcion;
            cmd.Parameters.Add("@PACTIVO", SqlDbType.Bit).Value = rubro.activo;

            cmd.ExecuteNonQuery();
        }

        public void ModificaRubro(Rubros rubro)
        {
            using SqlConnection conn = new SqlConnection(_connectionString);
            conn.Open();

            using SqlCommand cmd = new SqlCommand("MODIFICARUBRO", conn)
            {
                CommandType = CommandType.StoredProcedure
            };

            cmd.Parameters.Add("@PRUBRO", SqlDbType.Int).Value = rubro.rubro;
            cmd.Parameters.Add("@PDESCRIPCION", SqlDbType.VarChar).Value = rubro.descripcion;
            cmd.Parameters.Add("@PACTIVO", SqlDbType.Bit).Value = rubro.activo;

            cmd.ExecuteNonQuery();
        }

    }
}
