import React, { useEffect, useState, useRef } from "react";
import * as bootstrap from "bootstrap";
import axios from "axios";
import Nombre from "./Nombre";
import Direccion from "./Direccion";
import Genero from "./Genero";
import { ToastContainer, toast } from "react-toastify";


function Text_select_correo({ company, clave, onConectaTerceroValido }) {
  const [token, setToken] = useState(clave);




  let queryString = window.location.search;
  let urlParams = new URLSearchParams(queryString); 

  return (
    <>
      
        <div>
          <p>Conveniente Verdad ¿??</p>
          <p>
            Adicionalmente usted también contará con una Indemnización en caso
            de Fallecimiento Accidental, por lo tanto desde hoy su familia o a
            quienes usted deje de beneficiarios recibirán una Indemnización de
            PLAN 2 UF 1000 es decir $30.000.000 aprox, si usted llegase a
            fallecer por cualquier tipo de accidente, me refiero a un accidente
            de tránsito, atropello, etc.. Teniendo así la tranquilidad de
            proteger a quienes más quiere cuando usted no este
          </p>{" "}
          <p>
            Pero para que sea aún más atractivo y conveniente para usted de
            manera paralela al Seguro se creará una Cuenta de Capitalización y
            Ahorro a la que se irá el 50% de la prima que usted pague de manera
            mensual, esto quiere decir, que se estará protegiendo y ahorrando al
            mismo tiempo.{" "}
          </p>
          <p>
            {" "}
            <table
              border="1"
              style={{ borderCollapse: "collapse", width: "100%" }}
            >
              <thead>
                <tr>
                  <th
                    style={{ border: "1px solid black", padding: "8px" }}
                  ></th>
                  <th style={{ border: "1px solid black", padding: "8px" }}>
                    Plan 1
                  </th>
                  <th style={{ border: "1px solid black", padding: "8px" }}>
                    Plan 2
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    Capital Asegurado
                  </td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    UF 500
                  </td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    UF 1.000
                  </td>

                </tr>
                <tr>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    Prima Mensual UF
                  </td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    0,308
                  </td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    0,381
                  </td>
                </tr>
                <tr>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    Prima Mensual $
                  </td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    $9.240
                  </td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    $11.430
                  </td>
                </tr>
              </tbody>
            </table>
          </p>
          <p>Por ejemplo : </p>
          <p>
            {" "}
            La prima mensual es de tan sólo UF 0,38, es decir, $11.400 aprox,
            por lo tanto el 50% de esta prima mensual se va a cubrir el seguro y
            el otro 50% se va a su cuenta de Capitalización y Ahorro la que
            además tendrá una rentabilidad garantizada del 1%, por lo tanto se
            estará protegiendo y ahorrando al mismo tiempo.
          </p>
          <p>
            Esta cuenta de Capitalización y Ahorro es totalmente suya por lo
            tanto usted podrá realizar rescates de sus ahorros cuando lo
            necesite, tiene como tope 1 retiro al mes y 4 al año. Para solicitud
            de retiro de ahorro, puede ingresar a la página Entel, la cual
            dispone de una sección especial para la administración de sus
            seguros, y serán entregados en 10 días hábiles.
          </p>
          <p>
            Es importante destacar que no tiene costo de Administración por lo
            tanto su dinero siempre estará seguro y generando ganancia
            independiente a la fluctuación de la economía. El cargo de la prima
            mensual será en la Boleta de Entel en el próximo período de
            facturación.
          </p>
          <p>
            Como puede ver son Coberturas y Beneficios muy convenientes para
            usted y familia.{" "}
          </p>
          <p>
            Y para finalizar le menciono que al aceptar este seguro usted
            también contará con Beneficios Adicionales por ser Cliente MetLife
            dentro de los cuales tenemos :
            <ul>
              <li>
                Convenios y Descuentos con Clínicas Dentales, Ópticas,
                Gimnasios, Farmacias, Asistencias de Hogar, etc..
              </li>
              <li>
                {" "}
                El detalle lo podrá revisar en el link que llegará con su
                Póliza.{" "}
              </li>
            </ul>
            Como puede ver son Coberturas y Beneficios muy convenientes para
            usted y familia.
          </p>
        </div>
      


      

    </>
  );
}
export default Text_select_correo;