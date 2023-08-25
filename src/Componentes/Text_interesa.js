import React, { useEffect, useState, useRef } from "react";
import * as bootstrap from "bootstrap";
import axios from "axios";
import Nombre from "./Nombre";
import Direccion from "./Direccion";
import Genero from "./Genero";
import { ToastContainer, toast } from "react-toastify";


function Text_Interesa({ company, clave, onConectaTerceroValido }) {



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



  return (
    <>
        <div>
          <p>
            Hoy queremos agradecer la permanencia con sus productos Entel y por
            esta razón es que a partir de hoy Entel en conjunto con Metlife
            ponemos a su disposición y la de su familia una excelente cobertura
            llamada “ACCIDENTES PERSONALES CON AHORRO Y TELEMEDICINA”, dentro de
            este seguro usted contará con un excelente beneficio de Telemedicina
            el cual podrá utilizar hasta 4 veces mensuales donde de manera
            remota un doctor de Medicina General la atenderá sin la necesidad de
            agendar hora o una cita previa. Esto es muy importante y conveniente
            para usted ya que le entregará diagnósticos, alguna segunda opinión
            médica si es que ya cuenta con otro diagnóstico, recetas médicas,
            ordenes para exámenes e incluso licencias médicas si es que
            corresponde.
          </p>
          <p>
            Este Beneficio lo podrá comenzar a utilizar después de 10 días
            contados desde la fecha de contratación y no constituye cobertura de
            Seguro. Sólo deberá activarlo a través de un link que recibirá a su
            correo electrónico, tiene correo electrónico verdad???
          </p>

        
        </div>
        
  </>
  );
}
export default Text_Interesa;