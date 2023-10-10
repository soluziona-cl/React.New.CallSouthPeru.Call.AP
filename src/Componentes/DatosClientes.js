import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

function DatosClientes({ company, clave, datafull }) {
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
      // "https://app.soluziona.cl/API_v1_prod/CallSouthPeru/APIVentas_Call/api/Ventas/Call/ConectaDetalle",
      "https://app.soluziona.cl/API_v1_prod/CallSouthPeru/APIVentas_Call/api/Ventas/Call/ConectaDetalle",
      { dato: company },
      { headers: { Authorization: `Bearer ${clave}` } }
    );

    if (result.status === 200) {
      setOptionListMotivo(result.data);
      // console.log(result.data)
      //  console.log(optionList)
    }
  };

  const ChangeConecta_motivo = async (event) => {
    if (event === "0") {
      setOptionListDetalleEstado(true);
      setOptionListDetalleEstadoSelect("0");
      setSelectedLlamada("0");
    } else {
      const result = await axios.post(
        "https://app.soluziona.cl/API_v1_prod/CallSouthPeru/APIVentas_Call/api/Ventas/Call/ConectaDetalle",
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

  const ChangeConectaDetalle_submotivo = async (event) => {
    setOptionListDetalleEstado(false);
    setOptionListDetalleEstadoSelect(event);
    setSelectedLlamadaDetalle(event);
  };

  return (
    <>
      <div className="container-fluid">
        <div className="">
          <div className="">
           
            {datafull.map((data, index) => (
              <>
                {/* {console.log(data)} */}
                <div className="row">
                 <h3 className="card-header text-white" style={{backgroundImage: 'linear-gradient(90deg, #646464 10%, #ffffff 120%)'}}>Datos Cliente</h3>
                  <hr />
                </div>
                <div className="row my-3">
                 
                  <div className="col-lg-4 col-md-5 col-sm-12 my-1">ID Cliente
                    <input name="roomRent" type="text" value={data.ENTEL_RUT_CON_GUION} className="form-control" disabled />
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-12 my-1">DNI
                    <input name="roomRent" type="text" value={data.intentos} className="  form-control" disabled />
                  </div>
                  <div className="col-lg-2 col-md-3 col-sm-12 my-1">Edad
                    <input name="roomRent" type="text" value={data.intentos} className="  form-control" disabled />
                  </div>
                  <div className="col-lg-8 col-md-12 col-sm-12 my-1">Nombre
                    <input name="roomRent" type="text" value={data.NOMBRE} className="  form-control" disabled />
                  </div>
                  <div className="col-lg-6 col-md-7 col-sm-12 my-1">Email
                    <input name="roomRent" type="text" value={data.ENTEL_EMAIL} className=" form-control" disabled />
                  </div>
                  <div className="col-lg-3 col-md-5 col-sm-12 my-1">Fecha de Nacimiento
                    <input name="roomRent" type="date" value={data.ENTEL_EMAIL} className=" form-control" disabled />
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-12 my-1">Condicion Laboral
                    <input name="roomRent" type="text" value={data.ENTEL_REGION} className=" form-control" disabled />
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-12 my-1">Tipo Tarjeta
                    <input name="roomRent" type="text" value={data.ENTEL_GRUPO} className=" form-control" disabled />
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-12 my-1">Tienda Colocacion
                    <input name="roomRent" type="text" value={data.ENTEL_TELEFONO_1} className=" form-control" disabled />
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-12 my-1">Fecha Colocacion
                    <input name="roomRent" type="text" value={data.ENTEL_TELEFONO_2} className=" form-control" disabled />
                  </div>
                   <div className="col-lg-4 col-md-4 col-sm-12 my-1">Cantidad Seguros
                    <input name="roomRent" type="text" value={data.ENTEL_TELEFONO_3} className=" form-control" disabled />
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-12 my-1">Seguros Contratados
                    <input name="roomRent" type="text" value={data.ENTEL_TELEFONO_4} className=" form-control" disabled />
                  </div>
                  <div className="col-lg-10 col-md-12 col-sm-12 my-1">Dirección
                    <input name="roomRent" type="text" value={data.ENTEL_TELEFONO_5} className=" form-control" disabled />
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-12 my-1">Departamento
                    <input name="roomRent" type="text" value={data.ENTEL_TELEFONO_6} className=" form-control" disabled />
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-12 my-1">Provincia
                    <input name="roomRent" type="text" value={data.ENTEL_TELEFONO_6} className=" form-control" disabled />
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-12 my-1">Distrito
                    <input name="roomRent" type="text" value={data.ENTEL_TELEFONO_6} className=" form-control" disabled />
                  </div>
                </div>
              
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
export default DatosClientes;
