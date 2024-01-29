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
  const [puedeClickear, setPuedeClickear] = useState(true);

  const { Alert } = bootstrap;
  const [scrollToNoContesta, setScrollToNoContesta] = useState(false);

  const [show, toggleShow] = useState(true);
  const [token, setToken] = useState("");
  const [company, setCompany] = useState("11740594");

  const [selectLlamada, setSelectLlamada] = useState("0");
  const [selectLlamada_2, setselectLlamada_2] = useState("0");

  const [dataValida, setDataValida] = useState([]);
  const [optionList, setOptionList] = useState([]);
  const [openHistoricoGestiones, setHistoricoGestiones] = useState(false);

  const [datafull, setDataFull] = useState([]);

  const [elapsedSeconds, setElapsedSeconds] = useState(0);

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
 // const lead_id_2 = urlParams.get("lead_id");
 // const rut_2 = urlParams.get("lead_id");
  const phone_number = urlParams.get("phone_number");
 // const uniqueid = urlParams.get("uniqueid");
  const agente = urlParams.get("user");
 // const recording_filename = urlParams.get("recording_filename");

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
       "https://app.soluziona.cl/API_QA/Peru/Call/api/Ventas_CRM/Validacall",//"https://app.soluziona.cl/API_v1_prod/CallSouthPeru/APIVentas_Call/api/Ventas/Validacall",
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
      DatosCliente(clave);
      GuardaURL(agente, queryString, clave);
    }
  };
  const DatosCliente = async (lead, clave) => {
    const result = await axios.post(
       "https://app.soluziona.cl/API_QA/Peru/Call/api/Ventas_CRM/Call/DatosCliente",
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
       "https://app.soluziona.cl/API_QA/Peru/Call/api/Ventas_CRM/Call/SaveURl",
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
       "https://app.soluziona.cl/API_QA/Peru/Call/api/Ventas_CRM/Call/Conecta",
      { dato: company },
      { headers: { Authorization: `Bearer ${clave}` } }
    );

    if (result.status === 200) {
      setOptionList(result.data);

      // console.log(result.data)
      //  console.log(optionList)
    }
  };

 

  const [select_si_conecta_llamada, setSelectSiConectaLlamada] = useState("0");

  const ChangeLlamada = (value) => {
    setSelectLlamada(value);
  };
  const ChangeLlamada_2 = (value) => {
    setselectLlamada_2(value);
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
    //const lead_id_2 = urlParams.get("lead_id");
    //const rut_2 = urlParams.get("lead_id");
    const phone_number = urlParams.get("phone_number");
    //const uniqueid = urlParams.get("uniqueid");
    const agente = urlParams.get("user");
    //const recording_filename = urlParams.get("recording_filename");

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
    //item_sucess_llamada["recording_filename"] = recording_filename;
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
         "https://app.soluziona.cl/API_QA/Peru/Call/api/Ventas_CRM/Call/GuardaGestion",
        { dato: id },
        { headers: { Authorization: `Bearer ${token}` } }
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

  return (
    <>
      <ToastContainer autoClose={3000} />
      <Container className="p-1 mb-4 rounded-3">
        <div class="card card-header bg-black">
          <h3 class="text-white  ms-3 ">
            <h2 class="fw-bold "> Sonríe Seguro </h2>
            {datafull.map((data, index) => (
              <div key={index} className="col-lg-12 col-md-12 col-sm-12 my-1">
                Tipo Base: {data.Chubb_tipo_captacion.toUpperCase()}
              </div>
            ))}
            Identificador de Llamada <label id="ident_llamdaa">{lead_id}</label>
            <br /> Duracion de la llamada
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
                <select className="cliente form-control form-select my-1" id="selectLlamada" value={selectLlamada} onChange={(e) => ChangeLlamada(e.target.value)}>
                  <option value="0">Seleccione una opción</option>
                  <option value="86">EFECTIVO</option>
                  <option value="87">NO CONTACTO</option>
                  <option value="88">NO EFECTIVO</option>
                </select>
              </div>

              <hr className="my-4" />
              {(selectLlamada === "85" || selectLlamada === "86") && (
                <div>
                  <label for="ddl_estado">Sub-Conecta:</label>
                  <div className="col-lg-12 col-sm-12">
                    <select className="cliente form-control form-select my-1" id="selectsubllamada" value={selectLlamada_2} onChange={(e) => ChangeLlamada_2(e.target.value)} >
                      <option value="0">Seleccione una opción</option>
                      {selectLlamada === "85" && (
                        <React.Fragment>
                          <option value="89">Ampliacion de Linea</option>
                        </React.Fragment>
                      )}
                      {selectLlamada === "86" && (
                        <React.Fragment>
                          <option value="90">ND LO LLAMARON MAS DE UNA VEZ</option>
                          <option value="91">NO DESEA - YA LE OFRECIERON </option>
                          <option value="92">ND POR COSTO</option>
                          <option value="93">ND NO TIENE TARJETA</option>
                          <option value="94">ND COYUNTURAL</option>
                          <option value="96">ND NO CONFORME RIPLEY</option>
                          <option value="97">REVALIDACION</option>
                          <option value="98">VOLVER A LLAMAR</option>
                          <option value="99">CLIENTE CORTO LLAMADA CON INFO </option>
                          <option value="100">ND NO BRINDA MOTIVO</option>
                          <option value="101">ND NO CONTRATA NADA POR TELF. </option>
                        </React.Fragment>
                      )}
                      {(selectLlamada === "85" || selectLlamada === "86") && (
                        <React.Fragment>
                          <option value="95">VENTA</option>
                        </React.Fragment>
                      )}
                    </select>
                  </div>

                  {selectLlamada_2 !== "95" && selectLlamada_2 !== "89" && selectLlamada_2 !== "0" && selectLlamada_2 !== "" && (
                      <div className="d-flex justify-content-end m-1 mt-2">
                        <button className="btn text-white guardar" value="GuardarRegistro" onClick={GuardarRegistroNoContesta} disabled={!puedeClickear} style={{ background: "#8362D6" }}>
                          Finalizar
                        </button>
                      </div>
                    )}
                </div>
              )}

              {(selectLlamada === "87" || selectLlamada === "88") && (
                <section>
                  <NoContesta conecta={selectLlamada} elapsedSeconds={elapsedSeconds} clave={token} datafull={datafull} />
                </section>
              )}

              {selectLlamada === "85" && select_si_conecta_llamada === "2" && (
                <section>
                  <Terceros conecta={selectLlamada} shouldScroll={scrollToNoContesta} select_si_conecta_llamada={select_si_conecta_llamada} handleSelectChange={handleSelectChange} elapsedSeconds={elapsedSeconds} clave={token} datafull={datafull}/>
                </section>
              )}
            </div>
            <div className="col-lg-9 col-md-9 col-sm-12">
              <DatosClientes datafull={datafull} company={company} clave={token}></DatosClientes>
            </div>
          </div>

          <div className=" mt-2 ">
            {(selectLlamada_2 === "95" || selectLlamada_2 === "89") && (
              <div>
                
                <hr />
                <div className="container">
                  <Contesta datafull={datafull} tercerosComponent={<Terceros />} company={company} clave={token} elapsedSeconds={elapsedSeconds} select_si_conecta_llamada={select_si_conecta_llamada} handleSelectChange={handleSelectChange} shouldScroll={scrollToNoContesta}></Contesta>
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
