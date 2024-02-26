import React, { useEffect, useState, useRef } from "react";
import { setUrl, setDireccion, getToken, get_elapsed_time_string } from './Componentes/Common';

import { Grid, Card, Box, Typography, InputLabel, MenuItem, FormControl, Select, Button, Stack } from "@mui/material";

import * as bootstrap from "bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Container from "react-bootstrap/Container";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import DatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import "react-datepicker/dist/react-datepicker.css";

import Contesta from "./Componentes/Contesta";
import DatosClientes from "./Componentes/DatosClientes";
import Encabezado from "./Componentes/Encabezado";


registerLocale("es", es);


const Callintro = () => {
  const [puedeClickear, setPuedeClickear] = useState(true);
  const [viewNoContesta, setviewNoContesta] = useState(false)

  const handleNoConecta = (valor) => {
    console.log(valor)
    setviewNoContesta(valor);
  };
  const [viewConecta, setViewConecta] = useState(false)

  const handleConecta = (valor) => {
    // Lógica para agregar adicional y habilitar Contesta
    console.log(valor)

    setViewConecta(valor);
  };

  const { Alert } = bootstrap;
  const [scrollToNoContesta, setScrollToNoContesta] = useState(false);

  const [token, setToken] = useState("");

  const [selectLlamada, setSelectLlamada] = useState("0");
  const [selectLlamada_2, setselectLlamada_2] = useState("0");

  const [dataValida, setDataValida] = useState([]);
  const [optionList, setOptionList] = useState([]);

  const [datafull, setDataFull] = useState([]);

  const [elapsedSeconds, setElapsedSeconds] = useState(0);



  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const lead_id = urlParams.get("lead_id");
  const list_id = urlParams.get("list_id");
  const id_registro = urlParams.get("id_registro");
  const id_registro_url = urlParams.get("id_registro_url");
  const phone_number = urlParams.get("phone_number");
  const user = urlParams.get("user");
  const campaign = urlParams.get("campaign");
  const company = urlParams.get("campaign");
  const epoch = urlParams.get("epoch");
  const agente = urlParams.get("user");
  const recording_filename = urlParams.get("recording_filename");


  let id_url = []; //final
  let item_sucess_llamada_url = {};

  item_sucess_llamada_url["sucess"] = true;
  item_sucess_llamada_url["campaign_name"] = company;
  item_sucess_llamada_url["campaign_id"] = "1";
  item_sucess_llamada_url["id_registro"] = id_registro;

  item_sucess_llamada_url["idcallintro"] = id_registro_url;
  item_sucess_llamada_url["campaign"] = company;
  item_sucess_llamada_url["lead_id"] = lead_id;
  item_sucess_llamada_url["list_id"] = list_id;
  item_sucess_llamada_url["duracion"] = 0;
  item_sucess_llamada_url["agente"] = agente;
  item_sucess_llamada_url["phone_number"] = phone_number;
  item_sucess_llamada_url["url"] = queryString;
  item_sucess_llamada_url["estado"] = '0';
  id_url.push(item_sucess_llamada_url);


  useEffect(() => {
    ValidaCall();

  }, [id_registro]);

  const ValidaCall = async () => {
    const result = await axios.post(
      "https://app.soluziona.cl/API_QA/Peru/Call/api/Ventas_CRM/Validacall",//"https://app.soluziona.cl/API_v1_prod/CallSouthPeru/APIVentas_Call/api/Ventas/Validacall",
      { userName: "test", password: "test" }
    );

    const { datos } = result.data;
    let { getToken } = "";

    if (result.status === 200) {
      setDataValida(datos);
      console.log(result.data);

      result.data.forEach((item) => {
        getToken = item.token;
      });

      setToken(getToken);
      // Conecta(getToken);
      DatosCliente(id_registro, getToken);
      GuardaURL2(id_url, getToken);
    }
  };


  const DatosCliente = async (lead, getToken) => {
    const result = await axios.post(
      "https://app.soluziona.cl/API_QA/Peru/Call/api/Ventas_CRM/Call/DatosCliente",
      { dato: company, dato_1: lead },
      { headers: { Authorization: `Bearer ${getToken}` } }
    );

    if (result.status === 200 && result.data[0] && result.data[0].detalle) {
      const arr = JSON.parse(result.data[0].detalle);

      // let datoscliente = "";

      // arr.forEach((element) => {
      //   datoscliente = JSON.parse(element.detalle);
      // });
      console.log(arr);
      setDataFull(arr);
      // console.log(datoscliente);
    }
  };
  //console.log(DatosCliente)
  const GuardaURL2 = async (url_id, getToken) => {

    const result = await axios.post("https://app.soluziona.cl/API_QA/Peru/Call/api/Ventas_CRM/Call/SaveURl/2", { dato: url_id }, { headers: { Authorization: `Bearer ${getToken}` } }
    );

    if (result.status === 200) {


    }
  };

  const Conecta = async (getToken) => {
    const result = await axios.post(
      "https://app.soluziona.cl/API_QA/Peru/Call/api/Ventas_CRM/Call/Conecta",
      { dato: company },
      { headers: { Authorization: `Bearer ${getToken}` } }
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

  async function GuardarRegistroNoContesta() {
    setPuedeClickear(false);
    let id = []; //final
    let item_sucess_llamada = {};
    let json_sucess_gestion = [];
    let json_sucess_gestion2 = [];
    let json_sucess_gestion3 = [];

    let item_sucess_gestion = {};
    let item_sucess_gestion2 = {};
    let item_sucess_gestion3 = {};


    const preguntas = document.querySelectorAll(".gestion");
    preguntas.forEach((obj) => {
      let title = obj.id;
      let valor = obj.value;
      item_sucess_gestion[title] = valor;
    });
    const preguntas3 = document.querySelectorAll(".cliente");
    preguntas3.forEach((obj) => {
      let title = obj.id;
      let valor = obj.value;
      item_sucess_gestion3[title] = valor;
    });
  

    json_sucess_gestion.push(item_sucess_gestion);
    json_sucess_gestion3.push(item_sucess_gestion3);



    item_sucess_llamada["sucess"] = true;
    item_sucess_llamada["campaign_name"] = company;
    item_sucess_llamada["campaign_id"] = list_id;

    datafull.map((data, index) => {
      item_sucess_llamada["campaign"] = data.campaign;
    });
    item_sucess_llamada["id_registro"] = id_registro;
    item_sucess_llamada["lead_id"] = lead_id;
    item_sucess_llamada["list_id"] = list_id;
    item_sucess_llamada["agente"] = agente;
    item_sucess_llamada["recording_filename"] = recording_filename;
    item_sucess_llamada["epoch"] = epoch;
    item_sucess_llamada["fecha_gestion"] = new Date();
    item_sucess_llamada["phone_number"] = phone_number;
    item_sucess_llamada["duracion_sec"] = elapsedSeconds;

    item_sucess_llamada["gestion"] = json_sucess_gestion;
    item_sucess_llamada["cliente"] = json_sucess_gestion3;


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
          window.location.href = "/Orkesta/CallSouthPeru/Call/AccidentesPersonales/Fin";
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






  useEffect(() => {

    const intervalId = setInterval(() => {
      setElapsedSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);



  return (
    <>
      <ToastContainer autoClose={3000} />

      <Grid container sx={{ padding: 2 }} spacing={1}>
        <Grid item xs={12} md={12} sx={{ alignItems: 'center', background: 'black' }}>
          <FormControl fullWidth class="text-white  ms-3 ">
            <Typography variant="h1" class="fw-bold "> Accidentes Personales</Typography>
            {datafull.map((data, index) => (
              <Typography variant="h5" key={index} className="col-lg-12 col-md-12 col-sm-12 my-1">
                Tipo Base: {data.tipo_base.toUpperCase()}
              </Typography>
            ))}
            <Typography variant="h5">Identificador de Llamada {" "} <label id="ident_llamdaa">{lead_id}</label> </Typography>
            <Typography variant="h5"> Duracion de la llamada {" "}
              <span id="duracion" className="cliente">
                {get_elapsed_time_string(elapsedSeconds)}
              </span></Typography>
          </FormControl>
        </Grid>
      </Grid>


      <Grid container spacing={2} >
        <Grid item xs={4} sx={{ marginLeft: 3 }} >
          <DatosClientes
            datafull={datafull}
            company={company}
            getToken={token}
          ></DatosClientes>
        </Grid>
        <Grid item xs={7} sx={{ marginLeft: 3 }}>
          <Encabezado 
          company={company}
           GuardarRegistroNoContesta={GuardarRegistroNoContesta} clave={token} getToken={token} setViewConecta={handleConecta} setviewNoContesta={handleNoConecta}> </Encabezado>
          <hr className="my-2" />
          {viewConecta && (
            <Grid>
              <hr />
                <Grid>
                  <Contesta datafull={datafull} clave={token} 
                  getToken={token} elapsedSeconds={elapsedSeconds} select_si_conecta_llamada={select_si_conecta_llamada} handleSelectChange={handleSelectChange} shouldScroll={scrollToNoContesta}></Contesta>
                </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default Callintro;
