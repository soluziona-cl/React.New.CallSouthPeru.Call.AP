
import React, { useEffect, useState } from "react";
import axios from "axios";

function NoContesta({ company, clave, conecta }) {
  const [optionListMotivo, setOptionListMotivo] = useState([]);
  const [selectedOption, setSelectedOption] = useState("0"); // Estado para la opción seleccionada
  const [showGuardarButton, setShowGuardarButton] = useState(false); // Estado para mostrar u ocultar el botón de guardar
  const Conecta = conecta;
console.log(Conecta)

  useEffect(() => {
    Company(company);
   
    
  }, []);

  const Company = async (company) => {
    const result = await axios.post(
      "https://app.soluziona.cl/API_v1_prod/CallSouthPeru/APIVentas_Call/api/Ventas/Call/ConectaDetalle",
      { dato: company },
      { headers: { Authorization: `Bearer ${clave}` } }
    );
    if (result.status === 200) {
      setOptionListMotivo(result.data);
    } else {
      setOptionListMotivo([]);
    }
  };

  // Manejar el cambio en la opción seleccionada
  // const handleOptionChange = (e) => {
  //   setSelectedOption(e.target.value);
  // };
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    // Mostrar el botón de guardar si se elige una opción distinta de "Seleccione"
    setShowGuardarButton(e.target.value !== "0");
  };
  return (
    <>
      <div className="row" id="no_conecta">
        <div className="">
          <div className="" id="">
            <label htmlFor="ddl_detalle_cliente">Detalle:</label>
            <div className="col-lg-12 col-sm-12 my-2">
            <select className="browser-default form-select cliente validacion" id="ddl_detalle_cliente" onChange={handleOptionChange} >
                 <option value="0">Seleccione</option>
                 <option value="9">BUZON / FAX / GRABADORA</option>
                 <option value="3">CITA TELEFONICA CON TERCERO</option>
                 <option value="4">CLIENTE INUBICABLE</option>
                 <option value="5">CONTACTO CON TERCEROS CASA</option>
                 <option value="6">CONTACTO CON TERCEROS OFICINA</option>
                 <option value="8">NO CONTACTADOS</option>
                 <option value="10">NO CONTESTA</option>
                 <option value="7">NO CORRESPONDE</option>
                 <option value="11">TELEFONO OCUPADO</option>
               </select>
             
            </div>
          </div>
          <hr className="my-4"/>
          {/* Mostrar elementos solo cuando se selecciona "CITA TELEFONICA CON TERCERO" */}
         
           {(selectedOption === "3" || selectedOption === "5" || selectedOption === "6") && (
            <>
              <div className="col-lg-12 col-sm-12 my-2">
                <label htmlFor="observacion_agenda">Observación Agenda</label>
                <textarea rows="4" className="form-control textarea cliente" id="observacion_agenda"></textarea>
              </div>

              <div className="col-lg-12 col-sm-12 my-2">
                <label htmlFor="observacion_agenda">Fecha</label>
                <div className="input-group">
                  <input type="text" className="form-control pickadate-disable-dates cliente" id="fec_ini"/>
                  <span className="input-group-text">
                    <i className="fa-solid fa-calendar-days"></i>
                  </span>
                </div>
              </div>

              <div className="col-lg-12 col-sm-12 my-2">
                <label htmlFor="observacion_agenda">Hora</label>
                <div className="input-group">
                  <input type="text" className="form-control  cliente" id="hor_ini"/>
                  <span className="input-group-text">
                    <i className="fa-solid fa-clock "></i>
                  </span>
                </div>
              </div>
            </>
          )}
           {/* Mostrar el botón de guardar si se elige una opción distinta de "Seleccione" */}
           {showGuardarButton && (
            <div className="col-lg-12 col-sm-12 mt-4">
              <button type="button" className="btn text-white form-control guardar my-2" id="btn_guardar_agenda" style={{ background: "#8362D6" }}>
                <i className="fa fa-save"></i> Guardar
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default NoContesta;
