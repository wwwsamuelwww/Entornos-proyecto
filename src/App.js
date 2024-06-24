import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './pages/home_page';
import SimulacionRip from './pages/simulacion_rip';
import Simulacion_cableado from './pages/simulacion_cableado';
import SimulacionRipSegundaEtapa from './pages/simulacion_rip_segunda_etapa';
import SimulacionRipTerceraEtapa from './pages/simulacion_rip_tercera_etapa';
import SimulacionBGP from './pages/simulacion_bgp';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/simulacionRip' element={<SimulacionRip/>} />
        <Route path='/simulacionRipSegundaEtapa' element={<SimulacionRipSegundaEtapa/>} />
        <Route path='/simulacionRipTerceraEtapa' element={<SimulacionRipTerceraEtapa/>} />
        <Route path='/simulacion_cableado' element={<Simulacion_cableado/>}/>
        <Route path='/home_page' element={<HomePage/>}></Route>
        <Route path='/simulacionBGP' element={<SimulacionBGP/>}></Route>

      </Routes>
      
    </Router>
  );
}

export default App;
