import React, { useEffect, useState, useRef } from "react";
import {  setUrl, setDireccion, getToken, get_elapsed_time_string} from './Componentes/Common';

import { Grid, Card, Box, Typography, InputLabel, MenuItem, FormControl, Select, Button , Stack } from "@mui/material";

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
import NoContesta from "./Componentes/NoContesta";
import DatosClientes from "./Componentes/DatosClientes";
import Terceros from "./Componentes/Terceros";
import Adicionales from "./Componentes/Adicionales";

registerLocale("es", es);




const Callintro = () => {
  const [puedeClickear, setPuedeClickear] = useState(true);
  const [adicional, setAdicional] = useState(false);



  const [viewNoContesta,setviewNoContesta]=useState(false)	
  const [viewTerceros	,setviewTerceros]=useState(false)
  const [viewDatosClientes,setviewDatosClientes]=useState(false)	
  const [viewAdicionales	,setviewAdicionales]=useState(false)
  const [viewContesta,setviewContesta]=useState(false)



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
  const id_registro_url = urlParams.get("id_registro");
  const phone_number = urlParams.get("phone_number");
  const user = urlParams.get("user");
  const campaign = urlParams.get("campaign");
  const company = urlParams.get("campaign");
  const epoch = urlParams.get("epoch");
  const agente = urlParams.get("user");


  let id_url = []; //final
  let item_sucess_llamada_url = {};

  item_sucess_llamada_url["sucess"] = true;
  item_sucess_llamada_url["campaign_name"] = company;
  item_sucess_llamada_url["campaign_id"] = "1";
  item_sucess_llamada_url["campaign"] = "SonrieSeguro";
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
      // DatosCliente(getToken);
      GuardaURL2(id_url, getToken);
    }
  };
  const DatosCliente = async (lead, getToken) => {
    const result = await axios.post(
      "https://app.soluziona.cl/API_QA/Peru/Call/api/Ventas_CRM/Call/DatosCliente",
      { dato: lead },
      { headers: { Authorization: `Bearer ${getToken}` } }
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
    setAdicional()
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
    const epoch = urlParams.get("epoch");
    const phone_number = urlParams.get("phone_number");
    const agente = urlParams.get("user");

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
    item_sucess_llamada["epoch"] = epoch;
    item_sucess_llamada["fecha_gestion"] = new Date();
    item_sucess_llamada["duracion_sec"] = elapsedSeconds;
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

  const [adicionalCompleto, setAdicionalCompleto] = useState(false);

  const handleAgregarAdicional = () => {
    // Lógica para agregar adicional y habilitar Contesta
    setAdicionalCompleto(true);
  };


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
      <Container  className="p-1 mb-4 rounded-3">
        <Box class="card card-header bg-black">
        <FormControl fullWidth class="text-white  ms-3 ">
          {/* <h3 class="text-white  ms-3 "> */}
            <Typography variant="h1" class="fw-bold "> Sonríe Seguro </Typography>
            {datafull.map((data, index) => (
              <Typography variant="h3" key={index} className="col-lg-12 col-md-12 col-sm-12 my-1">
                Tipo Base: {data.Chubb_tipo_captacion.toUpperCase()}
              </Typography>
            ))}
            <Typography variant="h4">Identificador de Llamada {" "} <label id="ident_llamdaa">{lead_id}</label> </Typography> 
            
            <Typography variant="h4"> Duracion de la llamada {" "}
            <span id="duracion" className="cliente">
              {get_elapsed_time_string(elapsedSeconds)}
            </span></Typography> 
          {/* </h3> */}
          </FormControl>
        </Box>
        <Grid container sx={{padding:4}} spacing={2}> 
          <Card class="card-body login-card-body row">
            <Grid xs={3} >
              <Typography class="mt-4">Tipificador</Typography>
              <Box >
                <FormControl fullWidth>
                  <InputLabel style={{ color: 'black' }} id="Conecta" label="Conecta" variant="standard"/>
                  <Select id="demo-simple-select" value={selectLlamada} label="Conecta" onChange={(e) => ChangeLlamada(e.target.value)} className="rounded">
                    <MenuItem value={'0'}>Seleccione una opción</MenuItem>
                    <MenuItem value={'86'}>EFECTIVO</MenuItem>
                    <MenuItem value={'87'}>NO CONTACTO</MenuItem>
                    <MenuItem value={'88'}>NO EFECTIVO</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <hr className="my-4" />
              {(selectLlamada === "85" || selectLlamada === "86") && (
                
                <div>
                   <Box >
                <FormControl fullWidth>
                  <InputLabel id="Sub-Conecta" label="Sub-Conecta" variant="standard" />
                  <Select id="selectsubllamada" value={selectLlamada_2} label="Sub-Conecta" onChange={(e) => ChangeLlamada_2(e.target.value)} className="rounded">
                    {/* colocar mapeo en todos los secto posibles */}
                  <MenuItem value={'0'}>Seleccione una opción</MenuItem>
                    <MenuItem value={"90"}>ND LO LLAMARON MAS DE UNA VEZ</MenuItem>
                    <MenuItem value={"91"}>NO DESEA - YA LE OFRECIERON </MenuItem>
                    <MenuItem value={"92"}>ND POR COSTO</MenuItem>
                    <MenuItem value={"93"}>ND NO TIENE TARJETA</MenuItem>
                    <MenuItem value={"94"}>ND COYUNTURAL</MenuItem>
                    <MenuItem value={"96"}>ND NO CONFORME RIPLEY</MenuItem>
                    <MenuItem value={"97"}>REVALIDACION</MenuItem>
                    <MenuItem value={"98"}>VOLVER A LLAMAR</MenuItem>
                    <MenuItem value={"99"}>CLIENTE CORTO LLAMADA CON INFO </MenuItem>
                    <MenuItem value={"100"}>ND NO BRINDA MOTIVO</MenuItem>
                    <MenuItem value={"101"}>ND NO CONTRATA NADA POR TELF. </MenuItem>
                    <MenuItem value={"95"}>VENTA</MenuItem>
                  </Select>
                </FormControl>
              </Box>
                 

                  {selectLlamada_2 !== "95" && selectLlamada_2 !== "89" && selectLlamada_2 !== "0" && selectLlamada_2 !== "" && (

                    
                  
                        <Stack direction="row" spacing={2}>
      <Button className="btn text-white guardar" value="GuardarRegistro" onClick={GuardarRegistroNoContesta} disabled={!puedeClickear} variant="Finalizar">Finalizar</Button>
     
    </Stack>
                   
                  )}
                </div>
              )}

              {(selectLlamada === "87" || selectLlamada === "88") && (
                <section>
                  <NoContesta conecta={selectLlamada} elapsedSeconds={elapsedSeconds} getToken={token} datafull={datafull} />
                </section>
              )}

              {selectLlamada === "85" && select_si_conecta_llamada === "2" && (
                <section>
                  <Terceros conecta={selectLlamada} shouldScroll={scrollToNoContesta} select_si_conecta_llamada={select_si_conecta_llamada} handleSelectChange={handleSelectChange} elapsedSeconds={elapsedSeconds} getToken={token} datafull={datafull} />
                </section>
              )}
            </Grid>
            <Grid xs={8}>
              <DatosClientes datafull={datafull} company={company} getToken={token}></DatosClientes>
            </Grid>
          </Card>

        
            {(selectLlamada_2 === "95" || selectLlamada_2 === "89") && (
              <Grid container>
                 <Grid xs={3} >
                  <Adicionales datafull={datafull} getToken={token} elapsedSeconds={elapsedSeconds} shouldScroll={scrollToNoContesta} handleAgregarAdicional={handleAgregarAdicional} />
                </Grid>
                <hr />
                {adicionalCompleto && (
                  <Grid xs={12}>
                    <Contesta datafull={datafull} tercerosComponent={<Terceros />} company={company} getToken={token} elapsedSeconds={elapsedSeconds} select_si_conecta_llamada={select_si_conecta_llamada} handleSelectChange={handleSelectChange} shouldScroll={scrollToNoContesta}></Contesta>
                  </Grid>

                )}

              </Grid>
            )}

        
        </Grid>
      </Container>
    </>
  );
};

export default Callintro;
