import React, { useEffect, useState, useRef } from "react";
import * as bootstrap from "bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";


function Terceros({ company, clave, onNoConectaChange, shouldScroll, conecta,elapsedSeconds,datafull  }) {
  const [optionListMotivo, setOptionListMotivo] = useState([]);
  const [puedeClickear, setPuedeClickear] = useState(true);

// console.log(clave)
  const Conecta = conecta;
  // console.log(Conecta)

  console.log(clave)

  useEffect(() => {
    Company(company);
    if (shouldScroll) {
      const element = document.getElementById('mySection');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [shouldScroll]);

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
    item_sucess_llamada["campaign_name"] = "Sonrie Seguro ";
    item_sucess_llamada["campaign_id"] = list_id;
    datafull.map((data, index) => {
      item_sucess_llamada["campaign"] = data.campaign;
    });
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
        // "https://app.soluziona.cl/API_v1_prod/CallSouthPeru/APIVentas_Call/api/Ventas/Call/GuardaGestion",
        { dato: id },
        { headers: { Authorization: `Bearer ${clave}` } }
      );

      if (result.status === 200) {
        toast.success("Registro Guardado Exitosamente");
        console.log("Registro Guardado Exitosamente");
        setTimeout(() => {
          window.location.href = "/Orkesta/NewCallSouthPeru/Call_SonrieSeguro/Fin";
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

  const Company = async (company) => {
    const result = await axios.post(
      // "https://app.soluziona.cl/API_v1_prod/CallSouthPeru/APIVentas_Call/api/Ventas/Call/ConectaDetalle",
      { dato: company },
      { headers: { Authorization: `Bearer ${clave}` } }
    );
    if (result.status === 200) {
      setOptionListMotivo(result.data);
      //console.log(result.data)
    } else {
      setOptionListMotivo([]);
    }
  };

  return (
    <>
      <div className="p-3 row" id="">
        <section className="" id="mySection">
          <div class="col-lg-12 col-sm-12 my-2">
            <label for="observacion_agenda">Observación Agenda</label>
            <textarea rows="4" class="form-control textarea cliente" id="observacion_agenda" ></textarea>
          </div>
         
          <div className="d-flex justify-content-end">
            <button className="btn text-white guardar" value="GuardarRegistro" onClick={GuardarRegistroNoContesta} disabled={!puedeClickear} style={{ background: "#8362D6" }} >
              Finalizar
            </button>
          </div>
        </section>
      </div>

     
    
      
    </>
  );
}
export default Terceros;
