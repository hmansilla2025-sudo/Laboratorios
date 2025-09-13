// Rubros.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { FaEdit, FaPlus } from 'react-icons/fa';
import '../Styles/Rubros.css';
import RubrosPopup from './RubrosPopup';
import { getRubros } from "../services/RubroService";
import { Switch } from "./ui/Switch";  // ajustá la ruta según tu proyecto


const Rubros = () => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedRubro, setSelectedRubro] = useState(null);

  // Estado de rubros cargados desde la API
  const [rubros, setRubros] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'codigo', direction: 'asc' });
  const [pagina, setPagina] = useState(1);
  const ITEMS_POR_PAGINA = 10;

  // useEffect para cargar los rubros al montar el componente
  useEffect(() => {
    const fetchRubros = async () => {
      const data = await getRubros();
      // Mapear los datos de la API al formato de tu tabla si es necesario
      const mapped = data.map(r => ({
        rubro: r.rubro,
        codigo: r.codigo, // fallback si tu API no tiene código
        descripcion: r.descripcion,
        activo: r.activo ? 'Activo' : 'Inactivo'
      }));
      setRubros(mapped);
    };
    fetchRubros();
  }, []);

  const handleEdit = (rubro) => {
    setSelectedRubro(rubro);
    setPopupVisible(true);
  };

  const handleNuevo = () => {
    setSelectedRubro(null);
    setPopupVisible(true);
  };

  const handleSave = (rubro) => {
    console.log('Guardado:', rubro);
    // Aquí podés actualizar la API y refrescar la grilla si querés
  };

  // Filtrado
  const rubrosFiltrados = useMemo(() => {
    return rubros.filter(r =>
      r.descripcion.toLowerCase().startsWith(filtro.toLowerCase())
    );
  }, [rubros, filtro]);

  // Ordenamiento
  const rubrosOrdenados = useMemo(() => {
    const sorted = [...rubrosFiltrados];
    if (sortConfig !== null) {
      sorted.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return sorted;
  }, [rubrosFiltrados, sortConfig]);

  // Paginación
  const totalPaginas = Math.ceil(rubrosOrdenados.length / ITEMS_POR_PAGINA);
  const rubrosPagina = rubrosOrdenados.slice(
    (pagina - 1) * ITEMS_POR_PAGINA,
    pagina * ITEMS_POR_PAGINA
  );

  const requestSort = key => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
    setSortConfig({ key, direction });
  };

  return (
    <div className="rubros-container">
      <div className="rubros-header">
        <input
          type="text"
          placeholder="Filtrar por descripción"
          value={filtro}
          onChange={e => setFiltro(e.target.value)}
        />
        <button className="btn-nuevo" onClick={handleNuevo}>
          <FaPlus /> Nuevo
        </button>
      </div>

      <table className="rubros-table">
        <thead>
          <tr>
            <th style={{ display: 'none' }}>Id</th>
            <th onClick={() => requestSort('codigo')}>Código</th>
            <th onClick={() => requestSort('descripcion')}>Descripción</th>
            <th onClick={() => requestSort('activo')}>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>

          {rubrosPagina.map(r => (

            <tr key={r.rubro}>
              <td style={{ display: 'none' }}>{r.rubro}</td>
              <td>{r.codigo}</td>
              <td>{r.descripcion}</td>
  <td className="text-center">
    <Switch checked={!!r.activo} />
  </td>
              <td>
                <button className="btn-editar" onClick={() => handleEdit(r)}>
                  <FaEdit />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="rubros-paginacion">
        <button onClick={() => setPagina(p => Math.max(p - 1, 1))} disabled={pagina === 1}>
          {'<'}
        </button>
        <span>{pagina} / {totalPaginas}</span>
        <button onClick={() => setPagina(p => Math.min(p + 1, totalPaginas))} disabled={pagina === totalPaginas}>
          {'>'}
        </button>
      </div>

      <RubrosPopup
        visible={popupVisible}
        onClose={() => setPopupVisible(false)}
        onSave={handleSave}
        rubro={selectedRubro}
      />
    </div>
  );
};

export default Rubros;
