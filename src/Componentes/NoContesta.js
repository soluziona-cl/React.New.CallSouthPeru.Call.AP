
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";


function NoContesta({ company, clave, conecta,  elapsedSeconds,
}) {
  const [optionListMotivo, setOptionListMotivo] = useState([]);
  const [selectedOption, setSelectedOption] = useState("0"); // Estado para la opción seleccionada
  const [showGuardarButton, setShowGuardarButton] = useState(false); // Estado para mostrar u ocultar el botón de guardar
  const Conecta = conecta;
  const [botonDeshabilitado, setBotonDeshabilitado] = useState(false); // Estado para controlar la habilitación del botón
  const [puedeClickear, setPuedeClickear] = useState(true);


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

  async function GuardarRegistroNoContesta() {

    setPuedeClickear(false);


    let id = []; //final
    let item_sucess_llamada = {};
    let json_sucess_gestion = [];
    let item_sucess_gestion = {};
    const preguntas = document.querySelectorAll(".cliente");
    preguntas.forEach((obj) => {
      let title = obj.id;
      let valor = obj.value;
      item_sucess_gestion[title] = valor;
    });

    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    const list_id = urlParams.get("list_id");
    const lead_id = urlParams.get("lead_id");
    // const rut = urlParams.get("address2");
    const epoch = urlParams.get("epoch");
    const lead_id_2 = urlParams.get("lead_id");
    const rut_2 = urlParams.get("lead_id");
    const phone_number = urlParams.get("phone_number");
    const uniqueid = urlParams.get("uniqueid");
    const agente = urlParams.get("user");
    const recording_filename = urlParams.get("recording_filename");

    json_sucess_gestion.push(item_sucess_gestion);

    item_sucess_llamada["sucess"] = true;
    item_sucess_llamada["campaign_name"] = company; //nombre de la campana, en este caso: 
    item_sucess_llamada["campaign_id"] = list_id;
    item_sucess_llamada["campaign"] = "Sonrie Seguro";
    item_sucess_llamada["lead_id"] = lead_id;
    item_sucess_llamada["list_id"] = list_id;
    item_sucess_llamada["agente"] = agente;
    item_sucess_llamada["recording_filename"] = recording_filename;
    item_sucess_llamada["epoch"] = epoch;
    item_sucess_llamada["fecha_gestion"] = new Date();
    item_sucess_llamada["duracion_sec"] = elapsedSeconds;
    // item_sucess_llamada["duracion_time"] =
    // get_elapsed_time_string(elapsed_seconds);
    item_sucess_llamada["phone_number"] = phone_number;
    item_sucess_llamada["gestion"] = json_sucess_gestion;
    id.push(item_sucess_llamada);



    try {
      const result = await axios.post(
        "https://app.soluziona.cl/API_v1_prod/CallSouthPeru/APIVentas_Call/api/Ventas/Call/GuardaGestion",
        { dato: id },
        { headers: { Authorization: `Bearer ${clave}` } }
      );

      if (result.status === 200) {
        toast.success("Registro Guardado Exitosamente");
        console.log("Registro Guardado Exitosamente");
        setTimeout(() => {
          window.location.href = "/Orkesta/CallSouthPeru/Call_SonrieSeguro/Fin";
        }, 5000);
      }
    } catch (error) {
      // Manejo de errores
      toast.success("Error Con Guardado");
      console.log("Error Con Guardado");
      setTimeout(() => {
        setPuedeClickear(true); // Reactivamos la capacidad de clickear después de 1 segundo.
      }, 1000);
    }
  }

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
            <select
                className="browser-default form-select cliente validacion"
                id="ddl_detalle_cliente"
                onChange={handleOptionChange} // Manejar el cambio de opción
                value={selectedOption}
              >
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
                <textarea
                  rows="4"
                  className="form-control textarea cliente"
                  id="observacion_agenda"
                ></textarea>
              </div>

              <div className="col-lg-12 col-sm-12 my-2">
                <label htmlFor="observacion_agenda">Fecha</label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control pickadate-disable-dates cliente"
                    id="fec_ini"
                  />
                  <span className="input-group-text">
                    <i className="fa-solid fa-calendar-days"></i>
                  </span>
                </div>
              </div>

              <div className="col-lg-12 col-sm-12 my-2">
                <label htmlFor="observacion_agenda">Hora</label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control  cliente"
                    id="hor_ini"
                  />
                  <span className="input-group-text">
                    <i className="fa-solid fa-clock "></i>
                  </span>
                </div>
              </div>
            </>
          )}
           {/* Mostrar el botón de guardar si se elige una opción distinta de "Seleccione" */}
           {showGuardarButton && (
 <div className="d-flex justify-content-end">
 <button
   className="btn text-white guardar"
   value="GuardarRegistro"
   onClick={GuardarRegistroNoContesta}
   disabled={!puedeClickear}
   style={{ background: "#8362D6" }}

 >
   Finalizar
 </button>
</div>
          )}
        </div>
      </div>
    </>
  );
}

export default NoContesta;
