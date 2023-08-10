import React, { useEffect, useState, useRef } from "react";
//import './call'
//import './func'
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

import Motivo_Submotivo from "./Componentes/Motivo_Submotivo";
import Producto from "./Componentes/Producto";

// import Resultado from "./Componentes/Resultado";
import Nombre from "./Componentes/Nombre";
import Fono from "./Componentes/Fono";
import Genero from "./Componentes/Genero";
//import Direccion from "./Componentes/Direccion";
import Contesta from "./Componentes/Contesta";
import NoContesta from "./Componentes/NoContesta";
import Despedida from ".";

registerLocale("es", es);

const Callintro = () => {
  const { Alert } = bootstrap;
  var [message, setMessage] = useState("...");
  const alertRef = useRef();

  const [show, toggleShow] = useState(true);
  const [token, setToken] = useState("");
  const [company, setCompany] = useState("11740594");
  const [select, setSelected] = useState("");
  const [select_no_conecta, setselect_no_conecta] = useState("");


  const [selectLlamada, setSelectedLlamada] = useState("");
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
  const [selectedValueApp, setSelectedValueApp] = useState('1');

  const handleNoConectaChange = (value) => {
    setselect_no_conecta(value);
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
  const lead_id = urlParams.get("address2");
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
      "https://app.soluziona.cl/API_v1_prod/Soluziona/Generacc/Call/api/Ventas/Validacall",
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
      DatosCliente(rut_2, clave);
      GuardaURL(agente, queryString, clave);
    }
  };
  const DatosCliente = async (lead, clave) => {
    const result = await axios.post(
      "https://app.soluziona.cl/API_v1_prod/Soluziona/Generacc/Call/api/Ventas/Call/DatosCliente",
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

      // setDataFull(datoscliente);

      console.log(datafull);
    }
  };
  const GuardaURL = async (agentes, url, clave) => {
    const result = await axios.post(
      "https://app.soluziona.cl/API_v1_prod/Soluziona/Generacc/Call/api/Ventas/Call/SaveURl",
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
      "https://app.soluziona.cl/API_v1_prod/Soluziona/Generacc/Call/api/Ventas/Call/Conecta",
      { dato: company },
      { headers: { Authorization: `Bearer ${clave}` } }
    );

    if (result.status === 200) {
      setOptionList(result.data);

      // console.log(result.data)
      //  console.log(optionList)
    }
  };

  const ChangeLlamada = (valor) => {
    console.log(valor);
    setSelectedLlamada(valor);

    if (!selectLlamada) {
      return <div>Loading...</div>;
    }

    console.log(selectLlamada);
  };

  const HideLogo = () => {
    // setshowlogo(!showlogo);
    setHistoricoGestiones(!openHistoricoGestiones);
  };
  async function GuardarRegistro() {
    let ddl_tipificacion = selectLlamada;
    let ddl_detalle_tipificacion = selectLlamadaDetalle;

    // let fecha_compromiso = format(startdateini, "yyyyMMdd");
    // let observacion = selectObservacion;

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
    
    let title = "Seleccione_una_opción";
    let valor = ddl_tipificacion;
    item_sucess_gestion[title] = valor;

    title = "detalle_tipificacion";
    valor = ddl_detalle_tipificacion;
    item_sucess_gestion[title] = valor;

    // title = "fecha";
    // valor = fecha_compromiso;
    // item_sucess_gestion[title] = valor;

    // title = "observacion";
    // valor = observacion;
    // item_sucess_gestion[title] = valor;

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
      }, 5000); // 5000 milisegundos = 5 segundos
    }
  }
  // console.log("select_no_conecta:", select_no_conecta);

  return (
    <>
      <ToastContainer autoClose={3000} />{" "}
      <Container className="p-3">
        <Container className="p-5 mb-4 bg-light rounded-3">
          <h1 className="header">
            Script FALLECIMIENTO ACCIDENTAL CON AHORRO
            <br />
            Accidentes Personales con Ahorro
          </h1>
          <div className="highlight">
            <div className="centtro">
              <div className="row mt-2">
                <div className="col-4 my-2">
                  {" "}
                  <h4>
                    {" "}
                    Duración de la LLamada :{" "}
                    <span id="duracion">
                      {get_elapsed_time_string(elapsedSeconds)}
                    </span>
                  </h4>
                </div>
                <div className="col-4 d-flex justify-content-end ">
                  <h4> Id cliente </h4>
                </div>
                <div className="col-4">
                  <input
                    name="roomRent"
                    type="text"
                    value={lead_id}
                    id="lead_id"
                    className="cliente form-control"
                    disabled
                  />
                </div>
                <hr />
              </div>
              <div className="row mt-2 ">
                <section className="row my-2">
                  <div
                    className="col-lg-3 col-sm-2 my-3 ms-1"
                   >
                    LLamada
                  </div>{" "}
                  <div className="col-lg-4 col-sm-8">
                    <select
                      className="cliente form-control form-select my-3"
                      id="selectLlamada"
                      value={selectLlamada}
                      onChange={(e) => ChangeLlamada(e.target.value)}
                    >
                      <option value="">Seleccione una opción</option>
                      <option value="1">Conecta</option>
                      <option value="2">No Conecta</option>
                    </select>
                  </div>
                </section>
                {selectLlamada === "2" && (
                  <div className="container">
                    <NoContesta
                      company={selectLlamada}
                      clave={token}
                      onNoConectaChange={handleNoConectaChange}

                    ></NoContesta>

                  </div>)}

                {(select_no_conecta !== "" && select_no_conecta !== "0") && (
                  <div className="d-flex justify-content-end">
                    <button
                      className="btn btn-success btn-md "
                      value="GuardarRegistro"
                      onClick={GuardarRegistro}
                    >
                      Finalizar
                    </button>
                  </div>
                )}

                <div className="container-fluid">
                  <div className="highlight">
                    <div className="centtro">
                      <div className="row">
                        <h3>Datos Cliente</h3>
                        <hr />
                      </div>
                      {datafull.map((data, index) => (
                        <>
                          {/* {console.log(data)} */}
                          <div className="container" id="nombre_scroll">
                            <div className="row">
                              <div
                                className="col-4 offset-8 text-right position-fixed"
                                style={{ top: 0, right: 0, zIndex: 9999 }}
                              >
                                Nombre Completo
                              </div>
                              <div
                                className="col-4 offset-8 position-fixed"
                                style={{ top: 30, right: 0, zIndex: 9999 }}
                              >
                                <input
                                  name="roomRent"
                                  type="text"
                                  value={data.NOMBRE_COMPLETO}
                                  className=" form-control text-right"
                                  disabled
                                />
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-4">Rut</div>
                            <div className="col-2">Intentos</div>
                            <div className="col-4  ">Nombre Completo</div>
                          </div>
                          <div className="row">
                            <div className="col-4">
                              <input
                                name="roomRent"
                                type="text"
                                value={data.RUT_CON_GUION}
                                className=" form-control"
                                disabled
                              />
                            </div>
                            <div className="col-2">
                              <input
                                name="roomRent"
                                type="text"
                                value={data.intentos}
                                className="  form-control"
                                disabled
                              />
                            </div>
                            <div className="col-4 ">
                              <input
                                name="roomRent"
                                type="text"
                                value={data.NOMBRE_COMPLETO}
                                className=" form-control"
                                style={{ textAlign: "right" }}
                                disabled
                              />
                            </div>
                          </div>
                          <div className="row mt-3">
                            <div className="col-4">Email</div>
                            <div className="col-4">Region</div>
                            <div className="col-4">Grupo</div>
                          </div>
                          <div className="row">
                            <div className="col-4">
                              <input
                                name="roomRent"
                                type="text"
                                value={data.EMAIL}
                                className=" form-control"
                                disabled
                              />
                            </div>
                            <div className="col-4">
                              <input
                                name="roomRent"
                                type="text"
                                value={data.REGION}
                                className=" form-control"
                                disabled
                              />
                            </div>
                            <div className="col-4">
                              <input
                                name="roomRent"
                                type="text"
                                value={data.GRUPO}
                                className=" form-control"
                                disabled
                              />
                            </div>
                          </div>

                          <div className="row mt-3">
                            <div className="col">Telefono 1</div>
                            <div className="col">Telefono 2</div>
                            <div className="col">Telefono 3</div>
                            <div className="col">Telefono 4</div>
                            <div className="col">Telefono 5</div>
                            <div className="col">Telefono 6</div>
                          </div>
                          <div className="row">
                            <div className="col">
                              <input
                                name="roomRent"
                                type="text"
                                value={data.TELÉFONO_1}
                                className=" form-control"
                                disabled
                              />
                            </div>
                            <div className="col">
                              <input
                                name="roomRent"
                                type="text"
                                value={data.TELÉFONO_2}
                                className=" form-control"
                                disabled
                              />
                            </div>
                            <div className="col">
                              <input
                                name="roomRent"
                                type="text"
                                value={data.TELÉFONO_3}
                                className=" form-control"
                                disabled
                              />
                            </div>
                            <div className="col">
                              <input
                                name="roomRent"
                                type="text"
                                value={data.TELÉFONO_4}
                                className=" form-control"
                                disabled
                              />
                            </div>
                            <div className="col">
                              <input
                                name="roomRent"
                                type="text"
                                value={data.TELÉFONO_5}
                                className=" form-control"
                                disabled
                              />
                            </div>
                            <div className="col">
                              <input
                                name="roomRent"
                                type="text"
                                value={data.TELÉFONO_6}
                                className=" form-control"
                                disabled
                              />
                            </div>
                          </div>
                          <div className="row mt-3">
                            <div className="col-5">Observacion Agenda</div>
                          </div>
                          <div className="row">
                            <div className="col-5">
                              <textarea
                                rows="3"
                                name="roomRent"
                                type="text"
                                value={data.Observacion_Agenda}
                                className=" form-control"
                                disabled
                              />
                            </div>
                          </div>
                        </>
                      ))}
                    </div>
                  </div>
                </div>
                {selectLlamada === "1" && (
                  <div>
                    <hr />
                    <div className="container">
                      <Contesta
                        company={company}
                        clave={token}
                      ></Contesta>
                    </div>

                    <div className="row my-3">
                      <hr />
                    </div>

                    <div className="d-flex justify-content-end">
                      <button
                        className="btn btn-success btn-md "
                        value="GuardarRegistro"
                        onClick={GuardarRegistro}
                      >
                        Finalizar
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* <section className="row ">
                <div className="col-lg-2 col-sm-3 my-3">LLamada</div>
                <div className="col-lg-4 col-sm-8">
                  <select
                    className="form-control form-select my-3"
                    id="selectLlamada"
                    value={selectLlamada}
                    onChange={(e) => setSelectedLlamada(e.target.value)}
                  >
                    <option value="">Seleccione una opción</option>
                    <option value="1">Si</option>
                    <option value="2">No</option>

                  </select>
                </div>
              </section> */}
            </div>
          </div>

          {/* </div>
          </div> */}
        </Container>
      </Container>
    </>
  );
};

export default Callintro;
