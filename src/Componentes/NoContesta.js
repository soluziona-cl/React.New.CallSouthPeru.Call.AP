import React, { useEffect, useState, useRef } from "react";
import * as bootstrap from "bootstrap";
import axios from "axios";

function NoContesta({ company, clave, onNoConectaChange }) {

  const [optionListMotivo, setOptionListMotivo] = useState([]);
 
  // const sesiones = {
  //   sgui: localStorage.getItem("localgui"),
  //   scliente: localStorage.getItem("localcliente"),
  //   sid: localStorage.getItem("localid"),
  //   sid_usuario: localStorage.getItem("localid_usuario"),
  //   stoken: localStorage.getItem("token"),
  // };

  useEffect(() => {
    Company(company);
  }, []);

  const Company = async (company) => {
    const result = await axios.post(
      "https://app.soluziona.cl/API_v1_prod/Soluziona/Generacc/Call/api/Ventas/Call/ConectaDetalle",
      { dato: company },
      { headers: { Authorization: `Bearer ${clave}` } }
    );
    if (result.status === 200) {
      setOptionListMotivo(result.data);
      //console.log(result.data)
    }
    else {
      setOptionListMotivo([]);
    }
  };

  return (
    <>
      <div className="row my-2">
        <div className="col-lg-3 col-sm-3 ">No Conecta</div>
        <div className="col-lg-4 col-sm-8">
          <select className="form-select cliente" aria-label="Default select example" id="no_conecta"  onChange={(e) => onNoConectaChange(e.target.value)}  >
            <option value="0">Seleccione</option>
            <option value="1"> Congestionado</option>
            <option value="2">Fuera de Area o Apagado</option>
            <option value="3">Fuera de servicio</option>
            <option value="4">Teléfono conectado a Fax</option>
            <option value="5">Grabadora o Buzón de voz</option>
            <option value="6">No contesta</option>
            <option value="7">No contesta último intento</option>
            <option value="8">Numero No Valido</option>
            <option value="9">Ocupado</option>
            <option value="10">Fax o módem</option>

          </select>
        </div>
      </div>
    </>
  );
}
export default NoContesta;
