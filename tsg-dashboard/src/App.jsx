import React, { useState } from "react";
import Layout from "./components/Layout";
import "./Styles/Layout.css";

function App() {
  const [currentModule, setCurrentModule] = useState("Home");

  return (
    <Layout currentModule={currentModule} setCurrentModule={setCurrentModule} />
  );
}

export default App;
