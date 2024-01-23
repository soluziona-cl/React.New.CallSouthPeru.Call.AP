import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Despedida from "./Despedida";
import Callintro from "./Callintro";


function App() {

  // const rutaservidor="/"; //Pruebas
  const rutaservidor = "/Orkesta/NewCallSouthPeru/Call_SonrieSeguro"; //Produccion

  return (
    <Router>
      <Routes>
        <Route index path={rutaservidor} element={<Callintro />} />
        <Route path={rutaservidor + "/Fin"} element={<Despedida />} /> 
      </Routes>
    </Router>
  );
}

export default App;