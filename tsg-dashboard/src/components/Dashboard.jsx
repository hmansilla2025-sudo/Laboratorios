import React from 'react';
import CardButton from './CardButton';

const Dashboard = () => {
  const cards = [
    "Marcas", "Rubros", "Medidas", "Monedas", "Localidades",
    "Clientes", "Proveedores", "Compras", "Ventas", "Stock", "Cerrar Sesion"
  ];

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', backgroundColor: '#000', minHeight: '100vh', padding: '20px' }}>
      {cards.map((card, idx) => (
        <CardButton key={idx} title={card} onClick={() => alert(`${card} clicked`)} />
      ))}
    </div>
  );
};

export default Dashboard;
