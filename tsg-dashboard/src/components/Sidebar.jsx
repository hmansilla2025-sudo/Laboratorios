import React, { useState } from "react";
import { FaBars, FaBox, FaUsers, FaShoppingCart, FaChartBar, FaSignOutAlt } from "react-icons/fa";
import SidebarItem from "./SidebarItem";
import "../Styles/SiderBar.css";

const Sidebar = ( { isOpen, setIsOpen, setCurrentModule }) => {

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className={`sidebar ${isOpen ? "open" : "collapsed"}`}>
      <div className="top-section">
        <h2  className="logo"  onClick={() => setCurrentModule("Home")} >{isOpen ? "TSG" : "T"} </h2>
        <div className="toggle-btn" onClick={toggleSidebar}>
            <FaBars />
        </div>
        </div>


      <SidebarItem icon={<FaBox />} label="Catálogos" isOpen={isOpen}>
        <SidebarItem label="Marcas" isOpen={isOpen} nested />
        <SidebarItem 
        label="Rubros" 
        isOpen={isOpen} 
        nested 
        onClick={() => setCurrentModule('Rubros')}
/>
        <SidebarItem label="Medidas" isOpen={isOpen} nested />
        <SidebarItem label="Monedas" isOpen={isOpen} nested />
        <SidebarItem label="Localidades" isOpen={isOpen} nested />
      </SidebarItem>

      <SidebarItem icon={<FaUsers />} label="Clientes" isOpen={isOpen} />
      <SidebarItem icon={<FaUsers />} label="Proveedores" isOpen={isOpen} />
      <SidebarItem icon={<FaShoppingCart />} label="Compras" isOpen={isOpen} />
      <SidebarItem icon={<FaChartBar />} label="Ventas" isOpen={isOpen} />
      <SidebarItem icon={<FaBox />} label="Stock" isOpen={isOpen} />

      <div className="logout">
        <SidebarItem icon={<FaSignOutAlt />} label="Cerrar Sesión" isOpen={isOpen} logout />
      </div>
    </div>
  );
};

export default Sidebar;
