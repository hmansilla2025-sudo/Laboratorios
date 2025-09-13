import React, { useState, useEffect } from 'react';
import '../Styles/RubrosPopup.css'; // Podés crear estilos propios para el popup

const RubrosPopup = ({ visible, onClose, onSave, rubro }) => {
  const [codigo, setCodigo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [activo, setActivo] = useState(true);

  // Carga los datos si estamos editando
  useEffect(() => {
    if (rubro) {
      setCodigo(rubro.codigo);
      setDescripcion(rubro.descripcion);
      setActivo(rubro.activo);
    } else {
      setCodigo('');
      setDescripcion('');
      setActivo(true);
    }
  }, [rubro]);

  const handleSave = () => {
    const nuevoRubro = { codigo, descripcion, activo };
    onSave(nuevoRubro);
    onClose();
  };

  if (!visible) return null; // No renderiza si no es visible

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>{rubro ? 'Editar Rubro' : 'Nuevo Rubro'}</h2>
        <div className="form-group">
          <label>Código:</label>
          <input
            type="text"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            disabled={!!rubro} // deshabilitado en edición
          />
        </div>
        <div className="form-group">
          <label>Descripción:</label>
          <input
            type="text"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={activo}
              onChange={(e) => setActivo(e.target.checked)}
            />
            Activo
          </label>
        </div>
        <div className="popup-buttons">
          <button onClick={handleSave}>Guardar</button>
          <button onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default RubrosPopup;
