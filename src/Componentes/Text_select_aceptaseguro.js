import React, { useEffect, useState, useRef } from "react";
import * as bootstrap from "bootstrap";
import axios from "axios";
import Nombre from "./Nombre";
import Direccion from "./Direccion";
import Genero from "./Genero";
import { ToastContainer, toast } from "react-toastify";


function Text_select_aceptaseguro({ company, clave, onConectaTerceroValido }) {
  const [token, setToken] = useState(clave);




  let queryString = window.location.search;
  let urlParams = new URLSearchParams(queryString); 

  return (
    <>
      
        <div>
        <h4> • EXCLUSIONES: (MENCIONAR OBLIGATORIO Y TEXTUAL) </h4>
          <p>
            Ahora le mencionaré las principales exclusiones de este seguro, de
            todas maneras, irán detalladas en la póliza que será enviada al
            correo que usted me acaba de corroborar.{" "}
          </p>
          <ul>
            <li>1. Guerra, declarada o no declarada,</li>
            <li>
              2. Participación del asegurado o beneficiario en un acto
              calificado como delito,
            </li>
            <li>
              3. La conducción de cualquier vehículo por parte del asegurado,
              encontrándose bajo estado de ebriedad o bajo los efectos de
              cualquier narcótico o droga,
            </li>
            <li>4. Negligencia, imprudencia o culpa grave del asegurado</li>
          </ul>
          <h4> • AUTOCERTIFICACIÓN </h4>
          <p>
            Entonces hoy con fecha xx/xx/2023 ¿Ud. acepta la contratación el
            SEGURO DE FALLECIMIENTO ACCIDENTAL CON AHORRO, y autoriza el cargo
            de la prima mensual de 0.38 UF, $11.400 aprox. en su cuenta Entel,
            ¿VERDAD?{" "}
          </p>
          <p>Esperar respuesta del cliente. </p>
          <p>“Don xxxxx el código de compra es XXXXXXX </p>
          <p>
            Además, para garantizar su completa satisfacción que usted cuenta
            con 35 días desde recibida la póliza para retractarse de su
            decisión, esto lo puede hacer a través de la web dispuesta por Entel
            para este propósito o directamente ante la Compañía al correo
            teayudamos@metlife.cl
          </p>
          <p>
            Le damos la más cordial bienvenida a Seguros Entel, que tenga un
            buen día/tarde
          </p>
        </div>
      


      

    </>
  );
}
export default Text_select_aceptaseguro;