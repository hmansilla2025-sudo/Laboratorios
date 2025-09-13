import React, { useState } from "react";

const SidebarItem = ({ icon, label, isOpen, nested = false, logout = false, children, onClick }) => {
  const [open, setOpen] = useState(false);

  const hasChildren = !!children;

  return (
    <div className={`sidebar-item ${nested ? "nested" : ""} ${logout ? "logout-item" : ""}`}  onClick={onClick}>
      <div className="sidebar-link" onClick={() => hasChildren && setOpen(!open)}>
        {icon && <span className="icon">{icon}</span>}
        {isOpen && <span className="label">{label}</span>}
        {hasChildren && isOpen && <span className="arrow">{open ? "▲" : "▼"}</span>}
      </div>
      {open && <div className="submenu">{children}</div>}
    </div>
  );
};

export default SidebarItem;
