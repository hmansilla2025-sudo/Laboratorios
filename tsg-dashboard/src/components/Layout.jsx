import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Rubros from "./Rubros";
import Home from "./Home";

const Layout = ({ setCurrentModule, currentModule }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (

    <div className="layout">
     <Sidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setCurrentModule={setCurrentModule}
      />
      <main className={`content ${isOpen ? "open" : "collapsed"}`}>

        <header className="content-header">
          <h1 className="system-title" onClick={() => setCurrentModule("Home")}>TSG System Gestión</h1>
          <p className="system-subtitle">La solución para tu negocio</p>
        </header>

        <div className="content-body">
          {currentModule === "Home" && <Home />}
         {currentModule === "Rubros" && <Rubros />}
        </div>
      </main>
    </div>
  );
};

export default Layout;
