import React, { useEffect, useState, useRef } from "react";
import * as bootstrap from "bootstrap";
import axios from "axios";

function Terceros({ company, clave, onNoConectaChange, shouldScroll, conecta  }) {
  const [optionListMotivo, setOptionListMotivo] = useState([]);

  const Conecta = conecta;
  console.log(Conecta)
  
  useEffect(() => {
    Company(company);
    if (shouldScroll) {
      // Coloca aquí la lógica para desplazarte a la sección deseada
      // Esto puede involucrar el uso de métodos para el desplazamiento en el DOM.
      // Por ejemplo, si deseas desplazarte a un elemento con un id 'mySection':
      const element = document.getElementById('mySection');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [shouldScroll]);

  const Company = async (company) => {
    const result = await axios.post(
      "https://app.soluziona.cl/API_v1_prod/CallSouthPeru/APIVentas_Call/api/Ventas/Call/ConectaDetalle",
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
      <div className=" row" id="">
<section className="" id="mySection">
            <div class="col-lg-12 col-sm-12 my-2">
              <label for="observacion_agenda">Observación Agenda</label>
              <textarea
                rows="4"
                class="form-control textarea cliente"
                id="observacion_agenda"
              ></textarea>
            </div>

            <div class="col-lg-12 col-sm-12 my-2">
              <label for="observacion_agenda">Fecha</label>
              <div class="input-group">
                <input
                  type="text"
                  class="form-control pickadate-disable-dates cliente"
                  id="fec_ini"
                />
                  <span class="input-group-text">
                    <i class="fa-solid fa-calendar-days"></i>
                  </span>
               
              </div>
            </div>

            <div class="col-lg-12 col-sm-12 my-2">
              <label for="observacion_agenda">Hora</label>
              <div class="input-group">
                <input
                  type="text"
                  class="form-control  cliente"
                  id="hor_ini"
                />
                  <span class="input-group-text">
                    <i class="fa-solid fa-clock "></i>
                  </span>
               
              </div>
            </div>
            <div class="col-lg-12 col-sm-12 mt-4">
            <button
              type="button"
              class="btn text-white form-control guardar my-2"
              id="btn_guardar_agenda"
              style={{ background: "#8362D6" }}
            >
              <i class="fa fa-save"></i> Guardar
            </button>
            </div>
          </section>
        </div>

     
    
      
    </>
  );
}
export default Terceros;
