import React, { useEffect, useState, useRef } from "react";
import * as bootstrap from "bootstrap";
import axios from "axios";
import Nombre from "./Nombre";
import Direccion from "./Direccion";
import Genero from "./Genero";
import { ToastContainer, toast } from "react-toastify";


function Contesta({ company, clave, onConectaTerceroValido }) {
  const [selectLlamada, setSelectedLlamada] = useState("");
  const [Comunica_con_tercero_valido, setComunica_con_tercero_valido] = useState("0");
  const [token, setToken] = useState(clave);
  const [botonDeshabilitado, setBotonDeshabilitado] = useState(false); // Estado para controlar la habilitación del botón


  const [horario_tercero, sethorario_tercero] = useState("");
  const [selectcorreo, setselectcorreo] = useState("");
  const [selectaceptaseguro, setselectaceptaseguro] = useState("");
  const [selectLlamadaDetalle, setSelectedLlamadaDetalle] = useState("");
  const [selectinteresa, setselectinteresa] = useState("0");
  const [selectnointeresa, setselectnointeresa] = useState("0");
  const [datafull, setDataFull] = useState([]);
  const [otra_razon_noacepta, setotra_razon_noacepta] = useState('');


  const [optionListMotivo, setOptionListMotivo] = useState([]);
  const [optionListDetalle, setOptionListDetalle] = useState([]);
  const [optionListDetalleEstado, setOptionListDetalleEstado] = useState(true);
  const [optionListDetalleEstadoSelect, setOptionListDetalleEstadoSelect] = useState("0");
  const sesiones = {

    sgui: localStorage.getItem("localgui"),
    scliente: localStorage.getItem("localcliente"),
    sid: localStorage.getItem("localid"),
    sid_usuario: localStorage.getItem("localid_usuario"),
    stoken: localStorage.getItem("token"),

  };

  function get_elapsed_time_string(total_seconds) {
    function pretty_time_string(num) {
      return (num < 10 ? "0" : "") + num;
    }
    var hours = Math.floor(total_seconds / 3600);
    total_seconds = total_seconds % 3600;
    var minutes = Math.floor(total_seconds / 60);
    total_seconds = total_seconds % 60;
    var seconds = Math.floor(total_seconds);
    hours = pretty_time_string(hours);
    minutes = pretty_time_string(minutes);
    seconds = pretty_time_string(seconds);
    var currentTimeString = hours + ":" + minutes + ":" + seconds;
    return currentTimeString;
  }

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
      setToken(clave); // Actualiza el valor del estado 'token' con 'clave'

      setOptionListMotivo(result.data);

      // console.log(result.data)
      //  console.log(optionList)
    }
  };
  console.log(token)

  const ChangeConecta_nombre = async (event) => {
    if (event === "0") {
      setOptionListDetalleEstado(true);
      setOptionListDetalleEstadoSelect("0");
      setSelectedLlamada("0");
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


  async function GuardarRegistroNoValido() {



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



    json_sucess_gestion.push(item_sucess_gestion);

    item_sucess_llamada["sucess"] = true;
    item_sucess_llamada["campaign_name"] = company; //nombre de la campana, en este caso: Cobranza_INCAP
    item_sucess_llamada["campaign_id"] = list_id;
    item_sucess_llamada["campaign"] = "Ap_Con_Ahorro";
    item_sucess_llamada["lead_id"] = lead_id;
    item_sucess_llamada["list_id"] = list_id;
    item_sucess_llamada["agente"] = agente;
    item_sucess_llamada["recording_filename"] = recording_filename;
    item_sucess_llamada["epoch"] = epoch;
    item_sucess_llamada["fecha_gestion"] = new Date();
    //item_sucess_llamada["duracion_sec"] = elapsed_seconds;
    // item_sucess_llamada["duracion_time"] =
    // get_elapsed_time_string(elapsed_seconds);
    item_sucess_llamada["phone_number"] = phone_number;
    item_sucess_llamada["gestion"] = json_sucess_gestion;
    id.push(item_sucess_llamada);



    try {
      const result = await axios.post(
        "https://app.soluziona.cl/API_v1_prod/Soluziona/Generacc/Call/api/Ventas/Call/GuardaGestion",
        { dato: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (result.status === 200) {
        toast.success("Registro Guardado Exitosamente");
        console.log("Registro Guardado Exitosamente");
        setBotonDeshabilitado(true); // Deshabilitar el botón después de guardar exitosamente
        setTimeout(() => {
          window.location.href = "/Orkesta/Generacc/Call/Fin";
        }, 5000);
      }
    } catch (error) {
      toast.error("Error Con Guardado");
      console.log("Error Con Guardado");
      // Manejo de errores
    }
  }


  const SelectedLlamadaChange = (event) => {

    setComunica_con_tercero_valido('0')
    setSelectedLlamada(event)

  };
  const setselectinteresaChange = (event) => {

    setselectnointeresa('0')
    setselectinteresa(event)

  };
  const setselectnointeresaChange = (event) => {

    setselectnointeresa('0')
    setselectnointeresa(event)

  };





  return (
    <>
      <h6>
        {" "}
        Buenos días/tardes hablo con el Sr. /Sra. xxxxx, (primer nombre más los
        dos apellidos) usted habla con xxx (nombre y apellido) ejecutivo (a) de
        Entel, gusto en saludarlo, espero que se encuentre muy bien junto a su
        familia ¡!!…
      </h6>

      <p>Le informo que para su respaldo la conversación es grabada.</p>
      <hr />
      <div className="row my-2">
        <div className="col-lg-3 col-sm-6 my-2">Registro Válido</div>
        <div className="col-lg-4 col-sm-6 my-2">
          <select
            className="cliente form-select" id="registro_valido"
            aria-label="Default select example"
            value={selectLlamada}
            // onChange={(e) => segundaFuncion(e.target.value)}
            onChange={(e) => SelectedLlamadaChange(e.target.value)}
          >
            <option value="0">Seleccione</option>
            <option value="1">Comunica con cliente</option>
            <option value="2">Comunica con tercero válido</option>
            {/* <option value="3">Comunica con tercero no válido</option> */}
          </select>
        </div>
      </div>
      {selectLlamada === "1" && (
        <div className="row my-2">
          <div className="col-lg-3 col-sm-6 my-2">Interesa</div>
          <div className="col-lg-4 col-sm-6 my-2">
            <select id="interesa"
              className="cliente form-select"
              aria-label="Default select example"
              value={selectinteresa}
              onChange={(e) => setselectinteresaChange(e.target.value)}
            >
              <option value="0">Seleccione</option>
              <option value="1">Interesa</option>
              <option value="2">No Interesa</option>
              <option value="3">Lo Pensara</option>
            </select>
          </div>
          {selectinteresa === "3" &&
            <div className="d-flex justify-content-end">
              <button
                className="btn btn-success btn-md "
                value="GuardarRegistro"
                onClick={GuardarRegistroNoValido}
              >
                Finalizar
              </button>
            </div>}
        </div>
      )}



      {selectLlamada === "1" && selectinteresa === "1" && (
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

          <div className="row my-2">
            <div className=" col-lg-3 col-sm-10 my-2">
              tiene correo electrónico verdad???
            </div>
            <div className="col-lg-4 col-sm-6 my-2">
              <select id="tiene_correo"
                className="cliente form-select"
                aria-label="Default select example"
                value={selectcorreo}
                onChange={(e) => setselectcorreo(e.target.value)}
              >
                <option value="0">Seleccione</option>
                <option value="1">Si</option>
                <option value="2">No</option>
              </select>
            </div>
          </div>
        </div>
        
      )}
       {selectcorreo === "2" &&
            <div className="d-flex justify-content-end">
              <button
                className="btn btn-success btn-md "
                value="GuardarRegistro"
                onClick={GuardarRegistroNoValido}
                disabled={botonDeshabilitado}

              >
                Finalizar
              </button>
            </div>}
      {selectinteresa === "2" && (
        <div className="row my-2">
          <div className="col-lg-3 col-sm-10 my-2">Motivos no interesa</div>
          <div className="col-lg-4 col-sm-6 my-2">
            <select
              id="motivos_no_interesa"
              className="cliente form-select"
              aria-label="Default select example"
              value={selectnointeresa}
              onChange={(e) => setselectnointeresaChange(e.target.value)}
            >
              <option value="0">Seleccione</option>
              <option value="1">Mala experiencia con MetLife</option>
              <option value="2">Cliente cerrará cuenta</option>
              <option value="3">Cliente molesto (No volver a llamar)</option>
              <option value="4">Uniformado Activo</option>
              <option value="5">Ya tiene Seguro</option>
              <option value="6">Mala experiencia con Compañía/Entel/Corredora</option>
              <option value="7">Mejor oferta en la Competencia</option>
              <option value="8">No interesa seguro</option>
              <option value="9">No le gusta la venta telefonica</option>
              <option value="10">Ya no es cliente</option>
              <option value="11">Problemas de señal con Entel</option>
              <option value="12">No quiere más seguros</option>
              <option value="13">Problemas Economicos</option>
              <option value="14">No es titular</option>
              <option value="15">Producto le parece caro</option>
              <option value="16">Otro (Registrar)</option>
              <option value="17">Ya tiene un seguro similar con otra compañía </option>
            </select>
          </div>

          {selectnointeresa !== "0" &&  (
            <div className="d-flex justify-content-end">
              <button
                className="btn btn-success btn-md "
                value="GuardarRegistro"
                onClick={GuardarRegistroNoValido}
                disabled={botonDeshabilitado}

              >
                Finalizar
              </button>
            </div>)}

        </div>




      )}
      {selectnointeresa === "16" && (
        <div>
          <div className="col-lg-2 col-sm-3 my-2">Otro</div>
          <div className="col-lg-4 col-sm-9 my-2">
            <textarea
              type="text"
              rows="3"
              id="otro"
              value={otra_razon_noacepta}
              onChange={(e) => setotra_razon_noacepta(e.target.value)}
              required
              className="cliente form-control"
            />
          </div>
          <div className="d-flex justify-content-end">
              <button
                className="btn btn-success btn-md "
                value="GuardarRegistro"
                onClick={GuardarRegistroNoValido}
                disabled={botonDeshabilitado}

              >
                Finalizar
              </button>
            </div>
        </div>
      )}
      {selectcorreo === "1" && (
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
          <div className="row my-2" style={{ backgroundColor: "#E8E8E8" }}>
            <div className="col-lg-12 col-sm-10 my-2">
              ¿acepta la contratación del SEGURO DE FALLECIMIENTO ACCIDENTAL CON AHORRO por un valor mensual de UF xx, aproximadamente $xxxx?
            </div>
            <div className="col-lg-4 col-sm-6 my-2">
              <select id="acepta_seguro"
                className="cliente form-select"
                aria-label="Default select example"
                value={selectaceptaseguro}
                onChange={(e) => setselectaceptaseguro(e.target.value)}
              >
                <option value="0">Seleccione</option>
                <option value="1">Si</option>
                <option value="2">No</option>
              </select>
            </div>
          </div>
        </div>
      )}
        {selectaceptaseguro === "2" &&
            <div className="d-flex justify-content-end">
              <button
                className="btn btn-success btn-md "
                value="GuardarRegistro"
                onClick={GuardarRegistroNoValido}
                disabled={botonDeshabilitado}

              >
                Finalizar
              </button>
            </div>}

      {selectcorreo === "2" && (
        <div>
          <p>
            Sr, Lamentablemente no podremos continuar con la información ya que
            necesitamos que usted cuente con un correo electrónico ya sea propio
            o de algún familiar ya que la póliza del seguro con todo el detalle
            llega por correo. Agradezco su tiempo y que tenga un excelente día
            ¡!!
          </p>
        </div>
      )}

      {selectaceptaseguro === "1" && (
        <div>
          <p>
            Perfecto le recuerdo que mi nombre es XXXXXX, Ejecutivo(a) de Entel,
            y para efectos de grabación vamos a corroborar sus datos personales,
            indíqueme por favor:
          </p>
          <div className='row bg card p-3 my-3' style={{ backgroundColor: "#E8E8E8" }}>
            <Nombre company={company} clave={token}></Nombre>
            {/* <Genero></Genero> */}
            <Direccion
              company={company}
              clave={token}>
            </Direccion>
          </div>
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
      )}
      {selectLlamada === "2" ||
        selectLlamada === "3" ||
        selectLlamada === "4" ? (
        <div className="row my-2">
          <div className="col-lg-3 col-sm-10 my-2">
            Seleccione{" "}
          </div>
          <div className="col-lg-4 col-sm-6 my-2">
            <select id="comunica_tercero_valido"
              className="cliente form-select"
              aria-label="Default select example"
              value={Comunica_con_tercero_valido}
              onChange={(e) => setComunica_con_tercero_valido(e.target.value)}
            >
              <option value="0">Seleccione</option>
              <option value="1">Cliente no Vive Ahí</option>
              <option value="2">No desesa contestar</option>
              <option value="3">Número equivocado</option>
              <option value="4">Problema de horario</option>
              <option value="5">Tercero pide dejar pendiente</option>
            </select>
          </div>
          {Comunica_con_tercero_valido !== "0" &&
            <div className="d-flex justify-content-end">
              <button
                className="btn btn-success btn-md "
                value="GuardarRegistro"
                onClick={GuardarRegistroNoValido}
                disabled={botonDeshabilitado}

              >
                Finalizar
              </button>
            </div>}


        </div>
      ) : null}
    </>
  );
}
export default Contesta;