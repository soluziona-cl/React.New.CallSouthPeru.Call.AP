import React, { useEffect, useState, useRef } from "react";
import * as bootstrap from "bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import TabsTabs from "./TabsTabs";
import ValidaDatos from "./ValidaDatos";
import NoContesta from "./NoContesta";
import { Routes, Route, Link, Outlet, useNavigate } from "react-router-dom";
import TextPromocionesRipley from "./TextPromocionesRipley";
import TextPreCierre from "./TextPreCierre";
import Terceros from "./Terceros";
import Tabsinformacion from "./TabsInfotmacion";



function Contesta({ company, clave, onConectaTerceroValido, elapsedSeconds, select_si_conecta_llamada, handleSelectChange, tercerosComponent, datafull, shouldScroll}) {

  const [buenEstadoSalud, setBuenEstadoSalud] = useState(""); // Estado para la respuesta de buen estado de salud
  const [ocupacionActual, setOcupacionActual] = useState(""); // Estado para la ocupación actual
  const [mostrarMensajeOcupacion, setMostrarMensajeOcupacion] = useState(false); // Estado para mostrar el mensaje de ocupación
  const handleBlur = () => {
    if (ocupacionActual.trim() !== "") {
      setMostrarMensajeOcupacion(true);
    }
  };
  const [puedeClickear, setPuedeClickear] = useState(true);

  const [selectLlamada, setSelectedLlamada] = useState("");
  const [Comunica_con_tercero_valido, setComunica_con_tercero_valido] = useState("0");
  const [token, setToken] = useState(clave);
  const [botonDeshabilitado, setBotonDeshabilitado] = useState(false); // Estado para controlar la habilitación del botón
  const [select_conecta_llamada_pregunta_no_interesa, setselect_conecta_llamada_pregunta_no_interesa] = useState("0");

  const [horario_tercero, sethorario_tercero] = useState("");
  const [selectcorreo, setselectcorreo] = useState("");
  const [selectaceptaseguro, setselectaceptaseguro] = useState("");
  const [selectinteresa, setselectinteresa] = useState("0");
  const [selectnointeresa, setselectnointeresa] = useState("0");
  const [setduracion, setselectduracion] = useState("0");
  const [select_conecta_llamada_pregunta_interesa, setselect_conecta_llamada_pregunta_interesa] = useState("0");
  const [no_interesa, setno_interesa] = useState("0");


  const [botonDeshabilitado_guardar, setbotonDeshabilitado_guardar] =
    useState(false); // Estado para controlar la habilitación del botón

  const [optionListMotivo, setOptionListMotivo] = useState([]);
  const [optionListDetalle, setOptionListDetalle] = useState([]);
  const [optionocupacion, setOptionListOcupacion] = useState([]);
  const [optionListDetalleEstado, setOptionListDetalleEstado] = useState(true);
  const [optionListDetalleEstadoSelect, setOptionListDetalleEstadoSelect] = useState("0");

  const nombreCliente = datafull && datafull.length > 0 ? datafull[0].Chubb_nombre : 'Nombre de Cliente Predeterminado';

// console.log(datafull)
  const sesiones = {
    sgui: localStorage.getItem("localgui"),
    scliente: localStorage.getItem("localcliente"),
    sid: localStorage.getItem("localid"),
    sid_usuario: localStorage.getItem("localid_usuario"),
    stoken: localStorage.getItem("token"),
  };
  useEffect(() => {
    Nointeresa();
  }, []);
  const Nointeresa = async () => {
    const result = await axios.post(
      // "https://app.soluziona.cl/API_v1_prod/CallSouthPeru/APIVentas_Call/api/Ventas/Call/ConectaClienteNoInteresa",
      { dato: "20367002" },
      { headers: { Authorization: `Bearer ${clave}` } }
    );

    if (result.status === 200) {
      setno_interesa(result.data);
      // ChangeConecta_Direccion()
    }
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

    json_sucess_gestion.push(item_sucess_gestion);

    item_sucess_llamada["sucess"] = true;
    item_sucess_llamada["campaign_name"] = "Sonrie_Seguro";
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
    item_sucess_llamada["phone_number"] = phone_number;
    item_sucess_llamada["gestion"] = json_sucess_gestion;
    item_sucess_llamada["duracion_sec"] = setduracion;
    id.push(item_sucess_llamada);

    try {
      const result = await axios.post(
        // "https://app.soluziona.cl/API_v1_prod/CallSouthPeru/APIVentas_Call/api/Ventas/Call/GuardaGestion",
        { dato: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (result.status === 200) {
        toast.success("Registro Guardado Exitosamente");
        console.log("Registro Guardado Exitosamente");
        setTimeout(() => {
          window.location.href =
            "/Orkesta/NewCallSouthPeru/Call_SonrieSeguro/Fin";
        }, 5000);
      }
    } catch (error) {
      // Manejo de errores
      setTimeout(() => {
        setbotonDeshabilitado_guardar(false); // Habilitar el botón después de 3 segundos
      }, 3000); // 3000 milisegundos = 3 segundos
      toast.success("Error Con Guardado");
      console.log("Error Con Guardado");
      setTimeout(() => {
        setPuedeClickear(true); // Reactivamos la capacidad de clickear después de 1 segundo.
      }, 1000);

    }
  }

  let queryString = window.location.search;
  let urlParams = new URLSearchParams(queryString);
  const list_id = urlParams.get("list_id");
  const lead_id = urlParams.get("lead_id");
  // const rut = urlParams.get("address2");
  const epoch = urlParams.get("epoch");
  const lead_id_2 = urlParams.get("lead_id");

  const phone_number = urlParams.get("phone_number");
  const uniqueid = urlParams.get("uniqueid");
  const agente = urlParams.get("user");
  const recording_filename = urlParams.get("recording_filename");

  useEffect(() => {
    Company(company);
    DataOcupacion()
  }, []);
  useEffect(() => {
    setselectduracion(elapsedSeconds);
  }, [elapsedSeconds]);

  const Company = async (company) => {
    const result = await axios.post(
      // "https://app.soluziona.cl/API_v1_prod/CallSouthPeru/APIVentas_Call/api/Ventas/Call/ConectaDetalle",
      { dato: company },
      { headers: { Authorization: `Bearer ${clave}` } }
    );

    if (result.status === 200) {
      setToken(clave); // Actualiza el valor del estado 'token' con 'clave'
      setOptionListMotivo(result.data);
    }
  };

  const ChangeConecta_nombre = async (event) => {
    if (event === "0") {
      setOptionListDetalleEstado(true);
      setOptionListDetalleEstadoSelect("0");
      setSelectedLlamada("0");
    } else {
      const result = await axios.post(
        // "https://app.soluziona.cl/API_v1_prod/CallSouthPeru/APIVentas_Call/api/Ventas/Call/ConectaDetalle",
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
  const DataOcupacion = async () => {

    const result = await axios.post(
      // "https://app.soluziona.cl/API_v1_prod/CallSouthPeru/APIVentas_Call/api/Ventas/Call/Profesiones",
      { dato: null },
      { headers: { Authorization: `Bearer ${clave}` } }
    );

    if (result.status === 200) {
      setOptionListOcupacion(result.data);

    }

  };

  async function GuardarRegistroNoValido() {
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
    item_sucess_llamada["duracion_sec"] = setduracion;
    //item_sucess_llamada["duracion_sec"] = elapsed_seconds;
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
  const [selectConectaLlamadaPreguntaConfirma, setSelectConectaLlamadaPreguntaConfirma] = useState("");

  const [camposCompletos, setCamposCompletos] = useState(false);
  const [optionValueOcupacion, setOcupacion] = useState('0');

  const handleDatosCompletosChange = (completos) => {
    setCamposCompletos(completos);
  };

  const ChangeConecta_Ocupacion = (ocupacion) => {
    setOcupacion(ocupacion);
  };

  return (
    <>
      <div className="row my-1">
        <div className="   ">
          <h3 className="card-header text-white" style={{backgroundImage:"linear-gradient(90deg, #646464 10%, #ffffff 120%)"}}>
            Script
          </h3>
        </div>
        <div className="card-body">
          <div className="col-md-12" id="tipificador_script">
            <div className=" card-warning " id="vw_script">
              <div className="card-body login-card-body">
                <div className="form-row">
                  <p>
                    Buenos días/tardes, me podría comunicar con el (la) señor(a) {nombreCliente}, Cómo le va mucho gusto! Encantado/a de saludarle mi nombre es XXXX le llamamos de Banco Ripley por encargo de Chubb Seguros Perú.
                  </p>
                </div>
                <div>
                  <div className="form-row">
                    <p className="col-5">
                      <select id="select_si_conecta_llamada" className="form-select cliente" value={select_si_conecta_llamada} onChange={(event) => {const value = event.target.value;  handleSelectChange(value); }}>
                        <option value="0">Seleccione</option>
                        <option value="1">Titular</option>
                        <option value="2">Titular y adicional</option>
                        <option value="3">Titular y adicionales</option>
                        <option value="4">Tercero Valido</option>
                        <option value="5">Tercero no Valido</option>
                      </select>
                    </p>
                  </div>
                  {(select_si_conecta_llamada === "1" || select_si_conecta_llamada === "2" || select_si_conecta_llamada === "3") && (
                    <div>

                      {select_si_conecta_llamada === "2" && (
                        <div className="mb-5 p-4">
                          <strong>
                            <h5>Adicional </h5>
                            <section className="row">
                              <div className="col-lg-3 col-md-3 col-sm-12 ">
                                Primer Nombre
                                <input name="roomRent" type="text" className="cliente form-control  my-2" />
                              </div>
                              <div className="col-lg-3 col-md-3 col-sm-12 ">
                                Segundo Nombre
                                <input name="roomRent" type="text" className="cliente form-control my-2" />
                              </div>
                              <div className="col-lg-3 col-md-3 col-sm-12 ">
                                Apellido Paterno
                                <input name="roomRent" type="text" className="cliente form-control my-2" />
                              </div>
                              <div className="col-lg-3 col-md-3 col-sm-12 ">
                                Apellido Materno
                                <input name="roomRent" className="cliente form-control my-2" />
                              </div>
                              <div className="col-lg-6 col-md-6 col-sm-12 ">
                                Fecha de Nacimiento:
                                <input type="date" className="cliente form-control my-2" />
                              </div>
                            </section>
                          </strong>
                        </div>
                      )}
                      {select_si_conecta_llamada === "3" && (
                        <div className="mb-5 p-4">
                          <strong>
                            <h5>Adicional 1</h5>
                            <section className="row">
                              <div className="col-lg-3 col-md-3 col-sm-12 ">
                                Primer Nombre
                                <input name="roomRent" type="text" className="cliente form-control  my-2" />
                              </div>
                              <div className="col-lg-3 col-md-3 col-sm-12 ">
                                Segundo Nombre
                                <input name="roomRent" type="text" className="cliente form-control my-2" />
                              </div>
                              <div className="col-lg-3 col-md-3 col-sm-12 ">
                                Apellido Paterno
                                <input name="roomRent" type="text" className="cliente form-control my-2" />
                              </div>
                              <div className="col-lg-3 col-md-3 col-sm-12 ">
                                Apellido Materno
                                <input name="roomRent" className="cliente form-control my-2" />
                              </div>
                              <div className="col-lg-6 col-md-6 col-sm-12 ">
                                Fecha de Nacimiento:
                                <input type="date" className="cliente form-control my-2" />
                              </div>
                            </section>

                            <h5 className="mt-4">Adicional 2</h5>
                            <section className="row">
                              <div className="col-lg-3 col-md-3 col-sm-12 ">
                                Primer Nombre
                                <input name="roomRent" type="text" className="cliente form-control  my-2" />
                              </div>
                              <div className="col-lg-3 col-md-3 col-sm-12 ">
                                Segundo Nombre
                                <input name="roomRent" type="text" className="cliente form-control my-2" />
                              </div>
                              <div className="col-lg-3 col-md-3 col-sm-12 ">
                                Apellido Paterno
                                <input name="roomRent" type="text" className="cliente form-control my-2" />
                              </div>
                              <div className="col-lg-3 col-md-3 col-sm-12 ">
                                Apellido Materno
                                <input name="roomRent" className="cliente form-control my-2" />
                              </div>
                              <div className="col-lg-6 col-md-6 col-sm-12 ">
                                Fecha de Nacimiento:
                                <input type="date" className="cliente form-control my-2" />
                              </div>
                            </section>
                          </strong>

                        </div>

                      )}
                      <hr></hr>
                      {datafull.map((data, index) => (
                        <div>
                          <div className="" id="stock">
                            {data.Chubb_tipo_captacion.toUpperCase() === "STOCK" && (
                              <p> El motivo de mi llamada es agradecer la permanencia que tiene con la tarjeta, RIPLEY y gracias a los pagos puntuales que ha venido efectuando este año queremos ampliar sus beneficios.
                              </p>
                            )}
                          </div>
                          <div className="" id="welcome">
                            {data.Chubb_tipo_captacion.toUpperCase() === "WELCOME" && (
                              <p> El motivo de mi llamada es agradecer la CONFIANZA y su preferencia por haber obtenido recientemente su Tarjeta de crédito Ripley con nosotros.
                              </p>
                            )}
                          </div>
                          <div className="" id="coross">
                            {data.Chubb_tipo_captacion.toUpperCase().includes("CROSS") && (
                              <p> EL MOTIVO DE MI LLAMADA Es para agradecer el tiempo de permanencia con EL SEGURO (DETALLAR NOMBRE DE SEGURO) AMPLIANDO SUS BENEFICIOS CON EL NUEVO SEGURO: SONRIE SEGURO
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <p>
                    Antes de continuar le informamos que por su seguridad esta llamada está siendo grabada.
                  </p>
                  {select_si_conecta_llamada === "5" && (
                    <div className="d-flex justify-content-end">
                      <button className="btn text-white guardar" value="GuardarRegistro" onClick={GuardarRegistroNoValido} disabled={!puedeClickear} style={{ background: "#8362D6" }}>
                        Finalizar
                      </button>
                    </div>
                  )}
                </div>
                <div className="text-justify" id="adicional">
                  <TextPromocionesRipley></TextPromocionesRipley>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {(select_si_conecta_llamada === "1" || select_si_conecta_llamada === "2" || select_si_conecta_llamada === "3") && (
        <div>
      
          <div className="mb-3 p-3">
            <TabsTabs></TabsTabs>
          </div>
          <div className="mt-1 p-3">
            <h6>
              <strong> EJECUTIVO Y CORROBORACION DE DATOS </strong>
            </h6>
          </div>
          <div className="form-row p-2 ">
            <label for="observacion">
              ¿Entonces Sr. … Siendo el día de hoy (DD/MM/AAAA) acepta la contratación de “Sonríe Seguro”, con un cargo fijo mensual de S/. 29.90 en su tarjeta de crédito Ripley? - Esperar respuesta afirmativa del cliente (Sí - Sí acepto).
            </label>
            <div className="col-lg-6 col-md-6 col-sm-12 my-2">
              <select id="select_conecta_llamada_pregunta_interesa" className="form-select cliente" value={select_conecta_llamada_pregunta_interesa} onChange={(e) =>   setselect_conecta_llamada_pregunta_interesa(e.target.value) } disabled={select_si_conecta_llamada !== "1" && select_si_conecta_llamada !== "2" && select_si_conecta_llamada !== "3"} >
                <option value="0">Seleccione</option>
                <option value="1">Interesa</option>
                <option value="2">No Interesa</option>
                <option value="3">Lo Pensara</option>
              </select>
            </div>
          </div>
          <br />

          <div className="d-none" id="no_acepta">
            <p> <strong> Agendo:</strong> Por supuesto (Primer nombre del cliente) se programará la llamada para el día (validar fecha con cliente).  Muchas gracias, buenos días/buenas tardes/buenas noches </p>
          </div>

          {select_conecta_llamada_pregunta_interesa === "3" && (
            <section>
              <Terceros conecta={selectLlamada} shouldScroll={shouldScroll} select_si_conecta_llamada={select_si_conecta_llamada} handleSelectChange={handleSelectChange} elapsedSeconds={elapsedSeconds} clave={token} datafull={datafull}/>
            </section>
          )}
          {select_conecta_llamada_pregunta_interesa === "2" && (
            <div className="col-12 pb-3">
              <div id="vw_script_cliente_nointeresa" className="">
                <p> <strong> En caso la respuesta es NO: </strong> </p>
                <p> Cuando NO desea, me despido. Cuando solicita se le llame en otra oportunidad, se agenda nueva llamada. </p>
                <p><strong> Agendo:</strong> Por supuesto (Primer nombre del cliente) se programará la llamada para el día (validar fecha con cliente). Muchas gracias, buenos días/buenas tardes/buenas noches </p>
                <div className=" card-body">
                  <div className="form-row">
                    <label for="observacion"> Me podria decir la razon por la cual no desea contratar el seguro ? </label>
                  </div>

                  <div className="form-row col-6">
                    <select id="select_conecta_llamada_pregunta_no_interesa" className="form-select cliente" disabled={   select_conecta_llamada_pregunta_interesa !== "2" } value={select_conecta_llamada_pregunta_no_interesa} onChange={(e) =>   setselect_conecta_llamada_pregunta_no_interesa(e.target.value) } >
                      <option value="0">Seleccione</option>
                      {no_interesa.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.detalle}
                        </option>
                      ))}
                    </select>
                  </div>

                  {select_conecta_llamada_pregunta_no_interesa !== "0" && (
                    <div className="form-row col-6 mt-2">
                      <button className="btn text-white guardar" value="GuardarRegistro" disabled={!puedeClickear} onClick={GuardarRegistroNoValido} style={{ background: "#8362D6" }} >
                        Finalizar
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          {select_conecta_llamada_pregunta_interesa === "1" && (
            <div id="vw_script_cliente_valida" class="">
              <div className=" row m-1 rounded py-2" style={{ background: "#EDEDED" }}>
                <h4>
                  Sr./Sra. Actualmente se encuentra en buen estado de salud. (SÍ o NO).
                </h4>
                <div>
                  <input className="ms-1 cliente" type="radio" id="buenestadoSalud" name="buenEstadoSalud" value={buenEstadoSalud} checked={buenEstadoSalud === "SÍ"} onChange={() => setBuenEstadoSalud("SÍ")} />
                  <label className="m-1">SÍ</label>
                </div>
                <div>
                  <input type="radio" className="ms-1 " name="buenEstadoSalud" value={buenEstadoSalud} checked={buenEstadoSalud === "NO"} onChange={() => setBuenEstadoSalud("NO")}/>
                  <label className="m-1">NO</label>
                </div>
                {buenEstadoSalud === "NO" && (
                  <p> Salvedad: Recuerde Sr./Sra. que le vamos a cubrir por cualquier accidente que no sea consecuencia de alguna preexistencia.</p>
                )}
                <div className=" row col-6 ms-2">
                  <div className="form rounded-3 col-lg-12 col-md-6 col-sm-12 ">
                    <label for="ocupacion"> Para culminar, nos podría indicar su ocupación actual:</label>
                    <select className="form-control form-select my-2 cliente" id="ocupacion" value={optionValueOcupacion} onChange={(e) => {ChangeConecta_Ocupacion(e.target.value)}} >
                      <option value="0">Selec.</option>
                      {optionocupacion.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.detalle}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {mostrarMensajeOcupacion && (
                  <div>
                    <p> Si el cliente tiene una profesión de alto riesgo, se debe indicar lo siguiente.</p>
                    <p> Salvedad: Recuerde Sr./Sra. que le vamos a cubrir por cualquier accidente fuera de sus horas de trabajo.</p>
                  </div>
                )}
              </div>
              <section className=" mt-2">
                <p>¡Felicitaciones, desde este momento ya se encuentra protegido con Sonríe Seguro de Chubb Seguros…! </p>
                <p> Recuerde que el cargo mensual aparecerá en su estado de cuenta y podrá acceder a todos los beneficios del seguro desde la fecha de afiliación. </p>
               
                <p>Adicionalmente, vamos a validar sus datos para el correcto envío de la póliza.</p>

                <div className="card my-3">
                  <ValidaDatos company={company} clave={token} elapsedSeconds={setduracion} onDataComplete={handleDatosCompletosChange} datafull={datafull}/>
                </div>
              </section>
              <div className="card " id="pre_cierre">
                <div className="">
                  <h3 className=" card-header text-white" style={{backgroundImage:"linear-gradient(90deg, #646464 10%, #ffffff 120%)"}}>
                    Continuar a Confirmacion de Datos y PreCierre
                  </h3>
                </div>
                <div className=" card-body">
                  <div>
                    <label for="observacion">
                      ¿Don/Sra. XXXX, Usted desea que le enviemos su Póliza a través de su correo electrónico?
                    </label>
                    <select value={selectConectaLlamadaPreguntaConfirma} onChange={(e) => setSelectConectaLlamadaPreguntaConfirma(e.target.value) } id="select_conecta_llamada_pregunta_confirma" className="form-select cliente my-2" disabled={!camposCompletos} >
                      <option value="0">Seleccione</option>
                      <option value="1">Si</option>
                      <option value="2">No</option>
                    </select>

                    {selectConectaLlamadaPreguntaConfirma === "1" && (
                      <div className="my-4" id="si_correo">
                        <p> Muy bien Sr/Sra. XXXXXX le recuerdo que el envío de tu Solicitud-Certificado digital es el sustento de la contratación del presente seguro. Entonces le estaremos enviando el mismo al correo XXXXX declarado por usted, en un plazo de 15 DIAS CALENDARIO, contados a partir del día de hoy.
                        </p>
                      </div>
                    )}
                    {selectConectaLlamadaPreguntaConfirma === "2" && (
                      <div className="my-4" id="no_correo">
                        <p> Te estaremos enviando la Solicitud-Certificado a tu domicilio en 15 días calendario, contados a partir del día de hoy Revalidar (LA DIRECCIÓN: distrito/provincia/departamento/referencias).
                        </p>
                      </div>
                    )}
                  </div>
                  <div>
                    <Tabsinformacion></Tabsinformacion>
                  </div>
                </div>
              </div>
            </div>
          )}

          {(selectConectaLlamadaPreguntaConfirma == "1" ||
            selectConectaLlamadaPreguntaConfirma == "2") && (
              <div className="col-12 my-3">
                <div id="vw_script_cliente_despedida" className="">
                  <div className="">
                    <h3 className=" card-header text-white" style={{ backgroundImage:"linear-gradient(90deg, #646464 10%, #ffffff 120%)",
                      }}>
                      DESPEDIDA
                    </h3>
                  </div>
                  <div className="card card-body">
                    <div className="form-row col-12 text-justify">
                      <p> Por cualquier consulta puede comunicarse con nosotros al Banco Ripley al 611-5757 o a Chubb Seguros Perú al (01) 3991212 de lunes a viernes de 9:00am a 6:00pm. Sr. XXX le agradezco su atención y su tiempo, a nombre del Banco Ripley y Chubb Seguros Perú le damos una cordial bienvenida; se despide que tenga buenos (días, tardes, noches).
                      </p>
                    </div>
                    <div className="d-flex justify-content-end">
                      <button className="btn text-white guardar" value="GuardarRegistro" onClick={GuardarRegistro} disabled={!puedeClickear} style={{ background: "#8362D6" }} >
                        Finalizar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
        </div>
      )}
    </>
  );
}
export default Contesta;
