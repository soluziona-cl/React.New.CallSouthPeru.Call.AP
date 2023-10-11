import React, { useEffect, useState, useRef } from "react";
import $ from "jquery";
import * as bootstrap from "bootstrap";
import axios from "axios";
import DataTable from "react-data-table-component";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Container from "react-bootstrap/Container";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import DatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import "react-datepicker/dist/react-datepicker.css";

import Contesta from "./Componentes/Contesta";
import NoContesta from "./Componentes/NoContesta";
import Despedida from ".";
import DatosClientes from "./Componentes/DatosClientes";
import Terceros from "./Componentes/Terceros";

registerLocale("es", es);

const Callintro = () => {
  const [opcionSeleccionada, setOpcionSeleccionada] = useState(null);

  const { Alert } = bootstrap;
  var [message, setMessage] = useState("...");
  const [scrollToNoContesta, setScrollToNoContesta] = useState(false);

  const [show, toggleShow] = useState(true);
  const [token, setToken] = useState("");
  const [company, setCompany] = useState("11740594");
  const [select, setSelected] = useState("");
  const [select_no_conecta, setselect_no_conecta] = useState("");

  const [select_conecta_tercero, setselect_conecta_tercero] = useState("");
  const [botonDeshabilitado, setBotonDeshabilitado] = useState(false); // Estado para controlar la habilitación del botón
  const [botonDeshabilitado_guardar, setbotonDeshabilitado_guardar] =
    useState(false); // Estado para controlar la habilitación del botón

  const [selectLlamada, setSelectLlamada] = useState("0");
  const [selectLlamadaDetalle, setSelectedLlamadaDetalle] = useState("");

  const [selectObservacion, setSelectedObservacion] = useState("");

  const [dataValida, setDataValida] = useState([]);
  const [optionList, setOptionList] = useState([]);
  const [optionListDetalle, setOptionListDetalle] = useState([]);
  const [optionListDetalleEstado, setOptionListDetalleEstado] = useState(true);
  const [optionListDetalleEstadoSelect, setOptionListDetalleEstadoSelect] =
    useState("0");
  const [openCalendar, setCalendar] = useState(false);
  const [openHistoricoGestiones, setHistoricoGestiones] = useState(false);

  const [startdateini, setStartDateIni] = useState(new Date());
  const [startdatefin, setStartDateFin] = useState(new Date());

  const [datafull, setDataFull] = useState([]);
  const [datafullIntervalo, setDataFullIntervalo] = useState([]);

  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [selectedValueApp, setSelectedValueApp] = useState("1");

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
    ValidaCall();
    const intervalId = setInterval(() => {
      setElapsedSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const ValidaCall = async () => {
    const result = await axios.post(
      "https://app.soluziona.cl/API_v1_prod/CallSouthPeru/APIVentas_Call/api/Ventas/Validacall",
      //  { userName: agente, password: agente }
      { userName: "test", password: "test" }
    );

    const { datos } = result.data;
    let { clave } = "";

    if (result.status === 200) {
      setDataValida(datos);
      console.log(result.data);

      result.data.forEach((item) => {
        clave = item.token;
      });

      setToken(clave);
      Conecta(clave);
    //  DatosCliente(rut_2, clave);
      GuardaURL(agente, queryString, clave);
    }
  };
  const DatosCliente = async (lead, clave) => {
    const result = await axios.post(
      "https://app.soluziona.cl/API_v1_prod/CallSouthPeru/APIVentas_Call/api/Ventas/Call/DatosCliente",
      { dato: lead },
      { headers: { Authorization: `Bearer ${clave}` } }
    );

    if (result.status === 200) {
      var arr = result.data;
      setDataFull(result.data);

      let datoscliente = "";
      arr.forEach((element) => {
        datoscliente = JSON.parse(element.detalle);
      });

      setDataFull(datoscliente);

      //console.log(datafull);
    }
  };
  const GuardaURL = async (agentes, url, clave) => {
    const result = await axios.post(
      "https://app.soluziona.cl/API_v1_prod/CallSouthPeru/APIVentas_Call/api/Ventas/Call/SaveURl",
      { dato: agentes, dato_2: url },
      { headers: { Authorization: `Bearer ${clave}` } }
    );

    if (result.status === 200) {
      console.log(result.data);
      console.log(queryString);
      // AlertDemo()

      // setTimeout(() => {
      //   AlertDemo.close()
      // }, 5000)
    }
  };
  const Conecta = async (clave) => {
    const result = await axios.post(
      "https://app.soluziona.cl/API_v1_prod/CallSouthPeru/APIVentas_Call/api/Ventas/Call/Conecta",
      { dato: company },
      { headers: { Authorization: `Bearer ${clave}` } }
    );

    if (result.status === 200) {
      setOptionList(result.data);

      // console.log(result.data)
      //  console.log(optionList)
    }
  };

  const handleSeleccion = () => {
    alert("Seleccionaste 'Lo Pensara' en el hijo.");
    // Aquí puedes realizar cualquier acción que necesites en el componente padre.
  };

  const [select_si_conecta_llamada, setSelectSiConectaLlamada] = useState("0");

  const ChangeLlamada = (value) => {
    setSelectLlamada(value);
  };

  const handleSelectChange = (value) => {
    setSelectSiConectaLlamada(value);
  };
  const handleSelectChangeLoPensara = (value) => {
    setSelectSiConectaLlamada(value);
  };
  const [showContent, setShowContent] = useState(false);

  const HideLogo = () => {
    // setshowlogo(!showlogo);
    setHistoricoGestiones(!openHistoricoGestiones);
  };

  async function GuardarRegistroTercero() {
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
    item_sucess_llamada["duracion_sec"] = elapsedSeconds;
    // item_sucess_llamada["duracion_time"] =
    // get_elapsed_time_string(elapsed_seconds);
    item_sucess_llamada["phone_number"] = phone_number;
    item_sucess_llamada["gestion"] = json_sucess_gestion;
    id.push(item_sucess_llamada);

    const result = await axios.post(
      "https://app.soluziona.cl/API_v1_prod/CallSouthPeru/APIVentas_Call/api/Ventas/Call/GuardaGestion",
      { dato: id },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (result.status === 200) {
      toast.success("Registro Guardado Exitosamente");
      console.log("Registro Guardado Exitosamente");
      setTimeout(() => {
        window.location.href = "/Soluziona/CallSouth/SonrieSeguro/Call/Fin";
      }, 5000); // 5000 milisegundos = 5 segundos
    }
  }

  async function GuardarRegistroNoContesta() {
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
    item_sucess_llamada["campaign_name"] = company; //nombre de la campana, en este caso: Cobranza_INCAP
    item_sucess_llamada["campaign_id"] = list_id;
    item_sucess_llamada["campaign"] = "Ap_Con_Ahorro";
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
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (result.status === 200) {
        toast.success("Registro Guardado Exitosamente");
        console.log("Registro Guardado Exitosamente");
        setTimeout(() => {
          window.location.href = "/Soluziona/CallSouth/SonrieSeguro/Call/Fin";
        }, 5000);
      }
    } catch (error) {
      // Manejo de errores
      toast.success("Error Con Guardado");
      console.log("Error Con Guardado");
    }
  }

  //   async function GuardarRegistro() {
  //     const nombres = document.getElementById('nombres').value
  //     const apellido_paterno = document.getElementById('apellido_paterno').value
  //     const apellido_materno = document.getElementById('apellido_materno').value
  //     const fecha_nacimiento = document.getElementById('fecha_nacimiento').value
  //     const RutCliente = document.getElementById('RutCliente').value
  //     const sexo = document.getElementById('sexo').value
  //     const email = document.getElementById('email').value
  //     const planes = document.getElementById('planes').value
  //     const comuna = document.getElementById('comuna').value
  //     const ciudad = document.getElementById('ciudad').value
  //     const calle = document.getElementById('calle').value
  //     const numero = document.getElementById('numero').value
  //     const depto = document.getElementById('depto').value
  //     const referencia = document.getElementById('referencia').value

  //     if (nombres === '' || apellido_paterno === '' || apellido_materno === '' || fecha_nacimiento === '' || RutCliente === '' || sexo === '' || email === '' || planes === '' || comuna === '' || ciudad === '' || calle === '' || numero === '' || depto === '' || referencia === '')  {
  //         alert('Debe completar todos los campos');

  //     } else {
  //         let id = []; //final
  //         let item_sucess_llamada = {};
  //         let json_sucess_gestion = [];
  //         let item_sucess_gestion = {};
  //         const preguntas = document.querySelectorAll(".cliente");
  //         preguntas.forEach((obj) => {
  //             let title = obj.id;
  //             let valor = obj.value;
  //             item_sucess_gestion[title] = valor;
  //         });

  //         json_sucess_gestion.push(item_sucess_gestion);

  //         item_sucess_llamada["sucess"] = true;
  //         item_sucess_llamada["campaign_name"] = company;
  //         item_sucess_llamada["campaign_id"] = list_id;
  //         item_sucess_llamada["campaign"] = "Ap_Con_Ahorro";
  //         item_sucess_llamada["lead_id"] = lead_id;
  //         item_sucess_llamada["list_id"] = list_id;
  //         item_sucess_llamada["agente"] = agente;
  //         item_sucess_llamada["recording_filename"] = recording_filename;
  //         item_sucess_llamada["epoch"] = epoch;
  //         item_sucess_llamada["fecha_gestion"] = new Date();
  //         item_sucess_llamada["phone_number"] = phone_number;
  //         item_sucess_llamada["gestion"] = json_sucess_gestion;
  //         id.push(item_sucess_llamada);

  //         try {
  //           const result = await axios.post(
  //             "https://app.soluziona.cl/API_v1_prod/CallSouthPeru/APIVentas_Call/api/Ventas/Call/GuardaGestion",
  //             { dato: id },
  //             { headers: { Authorization: `Bearer ${token}` } }
  //           );

  //           if (result.status === 200) {
  //             toastr.success("Registro Guardado Exitosamente");
  //             console.log("Registro Guardado Exitosamente");
  //             setbotonDeshabilitado_guardar(true); // Deshabilitar el botón después de guardar exitosamente
  //             setTimeout(() => {
  //               window.location.href = "/Orkesta/Generacc/Call/Fin";
  //             }, 5000);
  //           }
  //         } catch (error) {
  //           // Manejo de errores
  //           toastr.success("Error Con Guardado");
  //           console.log("Error Con Guardado");
  //         }
  //       }
  // }

  // console.log("select_no_conecta:", select_no_conecta);

  return (
    <>
      <ToastContainer autoClose={3000} />{" "}
      <Container className="p-1 mb-4 rounded-3">
        <div class="card card-header bg-black">
          <h3 class="text-white  ms-3 ">
            <h2 class="fw-bold "> Sonríe Seguro Stock</h2>
            Tipo Base: <label id="id_tipo_base"></label>
            <br /> Identificador de Llamada{" "}
            <label id="ident_llamdaa">{lead_id}</label>
            <br /> Duracion de la llamada{" "}
            <span id="duracion" className="cliente">
              {get_elapsed_time_string(elapsedSeconds)}
            </span>
          </h3>
        </div>
        <div class="card card-warning border-0 ">
          <div class="card-body login-card-body row">
            <div class="col-lg-3 col-md-3 col-sm-12">
              <h3 class="mt-4">Tipificador</h3>

              <label for="ddl_estado">Conecta:</label>
              <div className="col-lg-12 col-sm-12">
                <select
                  className="cliente form-control form-select my-1"
                  id="selectLlamada"
                  value={selectLlamada}
                  onChange={(e) => ChangeLlamada(e.target.value)}
                >
                  <option value="">Seleccione una opción</option>
                  <option value="1">Conecta</option>
                  <option value="no_conecta">No Conecta</option>
                </select>
              </div>
              <hr className="my-4" />

              {selectLlamada === "no_conecta" && (
                <section>
                  <NoContesta conecta={selectLlamada} />
                </section>
              )}

              {selectLlamada === "1" && select_si_conecta_llamada === "2" && (
                <section>
                  <Terceros
                    conecta={selectLlamada}
                    shouldScroll={scrollToNoContesta}
                    select_si_conecta_llamada={select_si_conecta_llamada}
                    handleSelectChange={handleSelectChange}
                  />
                </section>
              )}
              
            </div>
            <div className="col-lg-9 col-md-9 col-sm-12">
              <DatosClientes
                datafull={datafull}
                company={company}
                clave={token}
              ></DatosClientes>
            </div>
          </div>

          <div className=" mt-2 ">
            {selectLlamada === "1" && (
              <div>
                <hr />
                <div className="container">
                  <Contesta
                    datafull={datafull}
                    tercerosComponent={<Terceros />}
                    company={company}
                    clave={token}
                    elapsedSeconds={elapsedSeconds}
                    select_si_conecta_llamada={select_si_conecta_llamada}
                    handleSelectChange={handleSelectChange}
                  ></Contesta>
                </div>

              </div>
            )}
          </div>
        </div>
      </Container>
    </>
  );
};

export default Callintro;
