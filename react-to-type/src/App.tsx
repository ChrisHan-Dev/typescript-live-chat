// import { useState } from 'react'

import "./App.css";
import Header from "./MainPages/Header";
import Side from "./MainPages/Side";
import Home from "./MainPages/Home";


function App() {


  return (
    <div className="grid-container">
      <Header />
      <Side />
      <Home />
    </div>
  );
}

export default App;
