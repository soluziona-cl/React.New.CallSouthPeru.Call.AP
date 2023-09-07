import React, { useEffect, useState, useRef } from "react";
import * as bootstrap from "bootstrap";
import axios from "axios";
import Nombre from "./Nombre";
import Direccion from "./Direccion";
import { ToastContainer, toast } from "react-toastify";
import Text_Interesa from "./Text_interesa";
import Text_select_aceptaseguro from "./Text_select_aceptaseguro";
import Text_select_correo from "./Text_select_correo";

function Contesta({ company, clave, onConectaTerceroValido, elapsedSeconds }) {
  const [selectLlamada, setSelectedLlamada] = useState("");
  const [Comunica_con_tercero_valido, setComunica_con_tercero_valido] =
    useState("0");
  const [token, setToken] = useState(clave);
  const [botonDeshabilitado, setBotonDeshabilitado] = useState(false); // Estado para controlar la habilitación del botón

  const [horario_tercero, sethorario_tercero] = useState("");
  const [selectcorreo, setselectcorreo] = useState("");
  const [selectaceptaseguro, setselectaceptaseguro] = useState("");
  const [selectLlamadaDetalle, setSelectedLlamadaDetalle] = useState("");
  const [selectinteresa, setselectinteresa] = useState("0");
  const [selectnointeresa, setselectnointeresa] = useState("0");
  const [setduracion, setselectduracion] = useState("0");
  const [datafull, setDataFull] = useState([]);
  const [otra_razon_noacepta, setotra_razon_noacepta] = useState("");
  const [botonDeshabilitado_guardar, setbotonDeshabilitado_guardar] =
    useState(false); // Estado para controlar la habilitación del botón

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

  async function GuardarRegistro() {
    setbotonDeshabilitado_guardar(true); // Deshabilitar el botón después de guardar exitosamente
    const nombres = document.getElementById("nombres").value;
    const apellido_paterno = document.getElementById("apellido_paterno").value;
    const apellido_materno = document.getElementById("apellido_materno").value;
    const fecha_nacimiento = document.getElementById("fecha_nacimiento").value;
    const RutCliente = document.getElementById("RutCliente").value;
    const sexo = document.getElementById("sexo").value;
    const email = document.getElementById("email").value;
    const planes = document.getElementById("planes").value;
    const comuna = document.getElementById("comuna").value;
    const ciudad = document.getElementById("ciudad").value;
    const calle = document.getElementById("calle").value;
    const numero = document.getElementById("numero").value;
    const depto = document.getElementById("depto").value;
    const referencia = document.getElementById("referencia").value;

    const campos = [
      nombres,
      apellido_paterno,
      apellido_materno,
      fecha_nacimiento,
      RutCliente,
      sexo,
      email,
      planes,
      comuna,
      ciudad,
      calle,
      numero,
      depto,
      referencia,
    ];

    const nombresCampos = [
      "Nombres",
      "Apellido Paterno",
      "Apellido Materno",
      "Fecha Nacimiento",
      "Rut Cliente",
      "Sexo",
      "Email",
      "Planes",
      "Comuna",
      "ciudad",
      "calle",
      "numero",
      "depto",
      "referencia",

      // ... (otros nombres de campos en el mismo orden)
    ];

    let camposIncompletos = [];

    for (let i = 0; i < campos.length; i++) {
      if (campos[i] === "" || campos[i] === "0") {
        camposIncompletos.push(nombresCampos[i]);
      }
    }

    if (camposIncompletos.length > 0) {
      const camposFaltantesTexto = camposIncompletos.join(", ");
      alert(`Debe completar los siguientes campos: ${camposFaltantesTexto}`);
      return; // Detener la ejecución si hay campos faltantes
    } else {
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
      item_sucess_llamada["campaign_name"] = company;
      item_sucess_llamada["campaign_id"] = list_id;
      item_sucess_llamada["campaign"] = "Ap_Con_Ahorro";
      item_sucess_llamada["lead_id"] = lead_id;
      item_sucess_llamada["list_id"] = list_id;
      item_sucess_llamada["agente"] = agente;
      item_sucess_llamada["recording_filename"] = recording_filename;
      item_sucess_llamada["epoch"] = epoch;
      item_sucess_llamada["fecha_gestion"] = new Date();
      item_sucess_llamada["phone_number"] = phone_number;
      item_sucess_llamada["gestion"] = json_sucess_gestion;
      item_sucess_llamada["duracion_sec"] = setduracion;
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
          setTimeout(() => {
            window.location.href = "/Orkesta/Generacc/Call/Fin";
          }, 5000);
        }
      } catch (error) {
        // Manejo de errores

        toast.success("Error Con Guardado");
        console.log("Error Con Guardado");
      }
    }
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
  useEffect(() => {
    setselectduracion(elapsedSeconds);
  }, [elapsedSeconds]);

  const Company = async (company) => {
    const result = await axios.post(
      "https://app.soluziona.cl/API_v1_prod/Soluziona/Generacc/Call/api/Ventas/Call/ConectaDetalle",
      { dato: company },
      { headers: { Authorization: `Bearer ${clave}` } }
    );

    if (result.status === 200) {
      setToken(clave); // Actualiza el valor del estado 'token' con 'clave'
      setOptionListMotivo(result.data);
    }
  };
  console.log(token);

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
    setBotonDeshabilitado(true); // Deshabilitar el botón después de guardar exitosamente
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
    item_sucess_llamada["campaign_name"] = company;
    item_sucess_llamada["campaign_id"] = list_id;
    item_sucess_llamada["campaign"] = "Ap_Con_Ahorro";
    item_sucess_llamada["lead_id"] = lead_id;
    item_sucess_llamada["list_id"] = list_id;
    item_sucess_llamada["agente"] = agente;
    item_sucess_llamada["recording_filename"] = recording_filename;
    item_sucess_llamada["epoch"] = epoch;
    item_sucess_llamada["fecha_gestion"] = new Date();
    item_sucess_llamada["duracion_sec"] = setduracion;
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
        { headers: { Authorization: `Bearer ${clave}` } }
      );

      if (result.status === 200) {
        toast.success("Registro Guardado Exitosamente");
        console.log("Registro Guardado Exitosamente");
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
    setComunica_con_tercero_valido("0");
    setSelectedLlamada(event);
    setselectnointeresa("0");
    setselectinteresaChange("0");
    setselectaceptaseguro("0");
    setselectcorreo("0");
  };

  const setselectinteresaChange = (event) => {
    setselectinteresa(event);
    setselectnointeresa("0");
    setselectaceptaseguro("0");
    setselectcorreo("0");


  };

  const setselectnointeresaChange = (event) => {
    setselectnointeresa("0");
    setselectnointeresa(event);
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
            className="cliente form-select"
            id="registro_valido"
            aria-label="Default select example"
            value={selectLlamada}
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
            <select
              id="interesa"
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
          {selectinteresa === "3" && (
            <div className="d-flex justify-content-end">
              <button
                className="btn btn-success btn-md"
                value="GuardarRegistro"
                onClick={GuardarRegistroNoValido}
              >
                Finalizar
              </button>
            </div>
          )}
        </div>
      )}

      {selectLlamada === "1" && selectinteresa === "1" && (
        <div>
          <Text_Interesa></Text_Interesa>

          <div className="row my-2">
            <div className=" col-lg-3 col-sm-10 my-2">
              tiene correo electrónico verdad???
            </div>
            <div className="col-lg-4 col-sm-6 my-2">
              <select
                id="tiene_correo"
                className="cliente form-select"
                aria-label="Default select example"
                value={selectcorreo}
                onChange={(e) => {
                  setselectcorreo(e.target.value);
                  setselectaceptaseguro("0"); // Establecer selectaceptaseguro en "0" cuando cambie selectcorreo
                }}
              >
                <option value="0">Seleccione</option>
                <option value="1">Si</option>
                <option value="2">No</option>
              </select>
            </div>
          </div>
        </div>
      )}
      {selectcorreo === "2" && (
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
      )}
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
              <option value="17">Ya tiene un seguro similar con otra compañía</option>
            </select>
          </div>

          {selectnointeresa !== "0" && selectnointeresa !== "16" && (
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
          )}
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
          <Text_select_correo></Text_select_correo>
          <div className="row my-2" style={{ backgroundColor: "#E8E8E8" }}>
            <div className="col-lg-12 col-sm-10 my-2">
              ¿acepta la contratación del SEGURO DE FALLECIMIENTO ACCIDENTAL CON
              AHORRO por un valor mensual de UF xx, aproximadamente $xxxx?
            </div>
            <div className="col-lg-4 col-sm-6 my-2">
              <select
                id="acepta_seguro"
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
      {selectaceptaseguro === "2" && (
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
      )}

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
          <div
            className="row bg card p-3 my-3"
            style={{ backgroundColor: "#E8E8E8" }}
          >
            <Nombre company={company} clave={token}  elapsedSeconds={setduracion}></Nombre>
            <Direccion company={company} clave={token}></Direccion>
          </div>
          <Text_select_aceptaseguro></Text_select_aceptaseguro>
          <div className="d-flex justify-content-end">
            <button
              className="btn btn-success btn-md "
              value="GuardarRegistro"
              onClick={GuardarRegistro}
              disabled={botonDeshabilitado_guardar}
            >
              Finalizar
            </button>
          </div>
        </div>
      )}
      {selectLlamada === "2" ||
        selectLlamada === "3" ||
        selectLlamada === "4" ? (
        <div className="row my-2">
          <div className="col-lg-3 col-sm-10 my-2">Seleccione </div>
          <div className="col-lg-4 col-sm-6 my-2">
            <select
              id="comunica_tercero_valido"
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
          {Comunica_con_tercero_valido !== "0" && (
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
          )}
        </div>
      ) : null}
    </>
  );
}
export default Contesta;
