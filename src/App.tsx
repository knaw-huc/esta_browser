import React from 'react';
import './assets/css/esta_style.css';
import PageHeader from "./pageElements/pageHeader";
import {Outlet} from "react-router-dom";

function App() {
  return (
      <div className="App">
        <PageHeader/>
        <Outlet/>
      </div>
  );
}

export default App;
