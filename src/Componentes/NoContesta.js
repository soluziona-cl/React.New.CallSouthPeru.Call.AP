import React, { useEffect, useState, useRef } from "react";
import * as bootstrap from "bootstrap";
import axios from "axios";

function NoContesta({ company, clave, onNoConectaChange }) {
  const [selectLlamada, setSelectedLlamada] = useState("");
  const [selectLlamadaDetalle, setSelectedLlamadaDetalle] = useState("");

  

  const [optionListMotivo, setOptionListMotivo] = useState([]);
  const [optionListDetalle, setOptionListDetalle] = useState([]);
  const [optionListDetalleEstado, setOptionListDetalleEstado] = useState(true);
  const [optionListDetalleEstadoSelect, setOptionListDetalleEstadoSelect] =
    useState("0");
  const sesiones = {
    sgui: localStorage.getItem("localgui"),
    scliente: localStorage.getItem("localcliente"),
    sid: localStorage.getItem("localid"),
    sid_usuario: localStorage.getItem("localid_usuario"),
    stoken: localStorage.getItem("token"),
  };

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

      console.log(result.data)
      //  console.log(optionList)
    }
    else {
      setOptionListMotivo([]);
    }
  };

  const ChangeConecta_nombre = async (event) => {
    if (event === "0") {
      setOptionListDetalleEstado(true);
      setOptionListDetalleEstadoSelect("0");
      setSelectedLlamada(event);
      onNoConectaChange(event); // Llama a la función callback con el valor seleccionado
   
    } else {
      const result = await axios.post(
        "https://app.soluziona.cl/API_v1_prod/Soluziona/Generacc/Call/api/Ventas/Call/ConectaDetalle",
        { dato: event },
        { headers: { Authorization: `Bearer ${clave}` } }
      );

      setSelectedLlamada(event);

      if (result.status === 200) {
        setOptionListDetalle(result.data);
        setOptionListDetalleEstado(false);
      }
    }
  };
  console.log(onNoConectaChange)
  return (
    <>
      <div className="row my-2">
        <div className="col-lg-3 col-sm-3 ">No Conecta</div>
        <div className="col-lg-4 col-sm-8">
          <select className="form-select cliente" aria-label="Default select example"
                                 id="no_conecta"
                                 onChange={(e) => onNoConectaChange(e.target.value)} 
                                 >

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




      {/* <p>
        En caso de no encontrarse consultar “¿Con quién tengo el gusto de
        hablar?...”
      </p>

     

      <div className="row my-2">
        <div className="col-lg-12 col-sm-10 my-2">
          Disculpe, ¿Cuál es la mejor hora/día en la que puedo encontrar al
          Sr.(a) [NOMBRE CLIENTE]?
        </div>
        <div className="col-lg-12 col-sm-12 my-2">
          <input
            name="roomRent"
            id="nombres"
            onChange={(e) => ChangeConecta_nombre(e.target.value)}
            type="text"
            className="form-control"
          />
        </div>
      </div>

      <p>
        Agradecido(a) por su tiempo, disculpe las molestias y que tenga un buen
        día.
      </p>

      <div className="row my-2">
        <div className="col-lg-4 col-sm-10 my-2">Registro NO Válido</div>
        <div className="col-lg-3 col-sm-6 my-2">
          <select className="form-select" aria-label="Default select example">
            <option selected>Seleccione</option>
            <option value="1">No vive/trabaja ahí</option>
          </select>
        </div>
      </div>
      <p>
        Agradecido(a) por su tiempo, disculpe las molestias y que tenga un buen
        día.
      </p> */}

      {/* <div className="row">
        <div className="col-lg-2 col-sm-3 my-2">Apellido 1</div>
        <div className="col-lg-4 col-sm-9 my-2">
          <input
            name="roomRent"
            type="text"
            id="apellido_1"
            className="form-control"
          />
        </div>
        <div className="col-lg-2 col-sm-3 my-2">Apellido 2</div>
        <div className="col-lg-4 col-sm-9 my-2">
          <input
            name="roomRent"
            type="text"
            id="apellido_2"
            className="form-control"
          />
        </div>
      </div> */}
      {/* <div className="row mb-2">              
                <div className="col-sm-12 col-md-12 col-lg-6">
                <div className="col-lg-2 col-sm-3 ">Motivo</div>
                    <select className="form-control form-select" id="ddl_motivo_1"
                        disabled={false}
                        // value={select}
                        onChange={(e) => (ChangeConecta_nombre(e.target.value))}>
                        <option value="0">Motivo</option>
                        {optionListMotivo.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.detalle}
                            </option>
                        ))}
                    </select>
                </div>
               
            </div> */}
    </>
  );
}
export default NoContesta;
