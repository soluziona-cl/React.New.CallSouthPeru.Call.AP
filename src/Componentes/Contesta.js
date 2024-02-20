import React, { useEffect, useState, useRef } from "react";
import * as bootstrap from "bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import TabsTabs from "./TabsTabs";
import ValidaDatos from "./ValidaDatos";
import Terceros from "./Terceros";
import Tabsinformacion from "./TabsInfotmacion";
import { Box, MenuItem, InputLabel, CardContent, Stack, Card, Button, FormControl, Grid, Select, TextField, Typography, FormControlLabel, Radio } from "@mui/material";
import Adicionales from "./Adicionales";
import ValidaAdicionales from "./ValidaAdicionales";

function Contesta({
 // company,
  clave,
  onConectaTerceroValido,
  elapsedSeconds,
  select_si_conecta_llamada,
  handleSelectChange,
  datafull,
  shouldScroll,
}) {
  const [scrollToNoContesta, setScrollToNoContesta] = useState(false);

  const [buenEstadoSalud, setBuenEstadoSalud] = useState(""); // Estado para la respuesta de buen estado de salud
  const [ocupacionActual, setOcupacionActual] = useState("0"); // Estado para la ocupación actual
  const [mostrarMensajeOcupacion, setMostrarMensajeOcupacion] = useState(false); // Estado para mostrar el mensaje de ocupación
  const handleBlur = () => {
    if (ocupacionActual.trim() !== "") {
      setMostrarMensajeOcupacion(true);
    }
  };

  const [puedeClickear, setPuedeClickear] = useState(true);

  const [selectLlamada, setSelectedLlamada] = useState("");
  const [token, setToken] = useState(clave);
  const [select_conecta_llamada_pregunta_no_interesa,setselect_conecta_llamada_pregunta_no_interesa] = useState("0");

  const [setduracion, setselectduracion] = useState("0");
  const [select_conecta_llamada_pregunta_interesa,setselect_conecta_llamada_pregunta_interesa] = useState("0");
  const [no_interesa, setno_interesa] = useState("0");
  const [botonDeshabilitado_guardar, setbotonDeshabilitado_guardar] = useState(false); // Estado para controlar la habilitación del botón
  const [optionListMotivo, setOptionListMotivo] = useState([]);
  const [optionocupacion, setOptionListOcupacion] = useState([]);


  const nombreCliente =
    datafull && datafull.length > 0
      ? datafull[0].nombre
      : "Nombre de Cliente Predeterminado";

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
      "https://app.soluziona.cl/API_QA/Peru/Call/api/Ventas_CRM/Call/ConectaClienteNoInteresa",
      { dato: "20367002" },
      { headers: { Authorization: `Bearer ${clave}` } }
    );

    if (result.status === 200) {
      setno_interesa(result.data);
      // ChangeConecta_Direccion()
    }
  };
  const [adicionalCompleto, setAdicionalCompleto] = useState(false);

  const handleAgregarAdicional = (index) => {
    // Lógica para agregar adicional y habilitar Contesta
    setAdicionalCompleto(true);
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
    const preguntas2 = document.querySelectorAll(".clienteadicional");
    preguntas2.forEach((obj) => {
      let title = obj.id;
      let valor = obj.value;
      item_sucess_gestion2[title] = valor;
    });
  

    json_sucess_gestion.push(item_sucess_gestion);
    json_sucess_gestion2.push(item_sucess_gestion2);
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
    item_sucess_llamada["adicionales"] = json_sucess_gestion2;


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
          window.location.href =
            "/Orkesta/CallSouthPeru/NewCall/SonrieSeguro/Fin";
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
    
  }, [id_registro]);

  useEffect(() => {
    Company(company);
    DataOcupacion();
  }, []);
  useEffect(() => {
    setselectduracion(elapsedSeconds);
  }, [elapsedSeconds]);

  const Company = async (company) => {
    const result = await axios.post(
      "https://app.soluziona.cl/API_QA/Peru/Call/api/Ventas_CRM/Call/ConectaDetalle",
      { dato: company },
      { headers: { Authorization: `Bearer ${clave}` } }
    );

    if (result.status === 200) {
      setToken(clave); // Actualiza el valor del estado 'token' con 'clave'
      setOptionListMotivo(result.data);
    }
  };

  const DataOcupacion = async () => {
    const result = await axios.post(
      "https://app.soluziona.cl/API_v1_prod/CallSouthPeru/APIVentas_Call/api/Ventas/Call/Profesiones",
      { dato: null },
      { headers: { Authorization: `Bearer ${clave}` } }
    );

    if (result.status === 200) {
      setOptionListOcupacion(result.data);
    }
  };

  const [selectConectaLlamadaPreguntaConfirma,setSelectConectaLlamadaPreguntaConfirma] = useState("");
  const [camposCompletosAD, setCamposCompletosAD] = useState(false);

  const [camposCompletos, setCamposCompletos] = useState(false);
  const [optionValueOcupacion, setOcupacion] = useState("0");

  const handleDatosCompletosChange = (completos) => {
    setCamposCompletos(completos);
  };

  const ChangeConecta_Ocupacion = (ocupacion) => {
    setOcupacion(ocupacion);
  };
 
  return (
    <>
      <Grid className=" row my-1">

        <Grid item xs={12} md={12}>
          <Typography variant="h6" className="card-header text-white p-2 m-2 rounded" style={{backgroundImage:"linear-gradient(90deg, #646464 10%, #ffffff 120%)"}}>Script</Typography>
          <hr />
        </Grid>

      </Grid>
      {select_si_conecta_llamada && (
        <div>
          <Grid container spacing={1}> 
          <Grid item xs={12} md={4}>
            <CardContent>
              ¿Le interesa?
              <select id="select_conecta_llamada_pregunta_interesa"
                className="form-select gestion rounded" style={{ height: 60 }}
                value={select_conecta_llamada_pregunta_interesa}
                onChange={(e) =>
                  setselect_conecta_llamada_pregunta_interesa(e.target.value)
                }>
                  <option value={'0'}>Seleccione una opción</option>
                  <option value={'1'}>Interesa </option>
                  <option value={'2'}>No Interesa </option>
                  <option value={'3'}>Lo Pensará</option>
                </select>
              </CardContent>
            </Grid>
            <Grid item xs={12} md={4}>
              <CardContent>
                ¿Titular?
                <select id="select_si_conecta_llamada" value={select_si_conecta_llamada} style={{ height: 60 }} disabled={select_conecta_llamada_pregunta_interesa === '3' || select_conecta_llamada_pregunta_interesa === '2'} onChange={(event) => { const value = event.target.value; handleSelectChange(value); }} className="rounded gestion form-select">
                  <option value={'0'}>Seleccione una opción</option>
                  <option value={'1'}>Titular</option>
                  <option value={'2'}>Tercero Valido</option>
                  <option value={'3'}>Tercero no Valido</option>
                </select>
              </CardContent>
            </Grid>
          </Grid>
          <br />

          {select_conecta_llamada_pregunta_interesa === "3" && (
            <Grid>
              <Terceros
                conecta={selectLlamada}
                shouldScroll={shouldScroll}
                select_si_conecta_llamada={select_si_conecta_llamada}
                handleSelectChange={handleSelectChange}
                elapsedSeconds={elapsedSeconds}
                clave={token}
                datafull={datafull}
              />
            </Grid>
          )}
          {select_conecta_llamada_pregunta_interesa === "2" && (
            <Grid item xs={12} md={12} >
              <Grid sx={{ paddingX: 1 }}>
                <Typography variant="h7" for="observacion">
                  Me podria decir la razon por la cual no desea contratar el seguro ?
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <CardContent>
                  <select id="select_conecta_llamada_pregunta_no_interesa" className="form-select gestion rounded" disabled={select_conecta_llamada_pregunta_interesa !== "2"} value={select_conecta_llamada_pregunta_no_interesa} onChange={(e) => setselect_conecta_llamada_pregunta_no_interesa(e.target.value)} style={{ height: 60 }}>
                    <option value="0">Seleccione una opción</option>
                    {Array.isArray(no_interesa) &&
                      no_interesa.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.detalle}
                        </option>
                      ))}
                  </select>
                </CardContent>
              </Grid>

              {select_conecta_llamada_pregunta_no_interesa !== "0" && (
                <Grid container justifyContent="flex-end">
                  <Stack direction="row" spacing={2}>
                    <Button variant="contained" className="btn text-white guardar mt-3 " value="GuardarRegistro"
                      disabled={!puedeClickear}
                      onClick={GuardarRegistro}
                      style={{ background: "#8362D6" }}>Finalizar</Button>
                  </Stack>
                </Grid>
              )}
            </Grid>
          )}
          {select_conecta_llamada_pregunta_interesa === "1" && select_si_conecta_llamada === "1" && (
            <Grid >
              <Grid item xs={12} md={12} className="card my-3">
                <ValidaDatos
                  company={company}
                  clave={token}
                  elapsedSeconds={setduracion}
                  onDataComplete={handleDatosCompletosChange}
                  datafull={datafull}
                />
              </Grid>
             
              <Grid item xs={12} md={12} className="card my-3" >
                <Grid className="row m-2 rounded p-1 " >
                  <Typography variant="h7" >
                    Sr. / Sra.Actualmente se encuentra en buen estado de salud.(SÍ o NO).
                  </Typography>
                  <Grid>
                    <FormControlLabel
                      control={
                        <Radio className="ms-1 cliente" id="buenestadoSalud" name="buenEstadoSalud" value={buenEstadoSalud} checked={buenEstadoSalud === "SÍ"} onChange={() => setBuenEstadoSalud("SÍ")}
                        />
                      }
                      label="SÍ"
                      className="m-1" />
                  </Grid>
                  <Grid>
                    <FormControlLabel
                      control={
                        <Radio className="ms-1 cliente" id="buenestadoSalud" name="buenEstadoSalud" value={buenEstadoSalud} checked={buenEstadoSalud === "NO"} onChange={() => setBuenEstadoSalud("NO")}
                        />
                      }
                      label="NO"
                      className="m-1" />
                  </Grid>
                  {buenEstadoSalud === "NO" && (
                    <Typography variant="h6" style={{ color: 'red' }} sx={{ paddingY: 1 }} > Salvedad: Recuerde Sr. / Sra.que le vamos a cubrir por cualquier accidente que no sea consecuencia de alguna preexistencia.
                    </Typography>
                  )}
                  <Grid item xs={12} md={12}>
                    <Typography variant="h7">
                      Para culminar, nos podría indicar su ocupación actual:
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <select id="select-ocupacion" style={{ height: 50 }} value={optionValueOcupacion} label="Ocupación" onChange={(e) => { setOcupacion(e.target.value); ChangeConecta_Ocupacion(e.target.value); }} className=" form-select cliente rounded">
                      <option value="0">Seleccione una ocupación</option>
                      {optionocupacion.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.detalle}
                        </option>
                      ))}
                    </select>
                  </Grid>
                  {mostrarMensajeOcupacion && (
                    <Box>
                      <Typography variant="h7">
                        Si el cliente tiene una profesión de alto riesgo, se debe indicar lo siguiente.
                      </Typography>
                      <Typography variant="h6" style={{ color: 'red' }}>
                        Salvedad: Recuerde Sr. / Sra.que le vamos a cubrir por cualquier accidente fuera de sus horas de trabajo.
                      </Typography>
                    </Box>
                  )}
                </Grid>
              </Grid>
              <Grid item xs={12} md={12} className="card my-3" >
                <Adicionales datafull={datafull}  company={company} clave={token} getToken={token} elapsedSeconds={elapsedSeconds} shouldScroll={scrollToNoContesta} handleAgregarAdicional={handleAgregarAdicional} setCamposCompletosAD={setCamposCompletosAD}></Adicionales>
              </Grid>
             
              <Grid item xs={12} md={12} className="card my-3" >
                <Grid container spacing={1}>
                  <Grid item xs={12} md={12} >
                    <Typography variant="h6" className="card-header text-white rounded p-2 " style={{ backgroundImage: "linear-gradient(90deg, #646464 10%, #ffffff 120%)", }}>
                    Continuar a Confirmacion de Datos y PreCierre
                  </Typography>
                </Grid>

                <Grid item xs={12} md={12} spacing={1} sx={{marginX:1, padding:1}}>
                  ¿Don / Sra.XXXX, Usted desea que le enviemos su Póliza a través de su correo electrónico ?
                  <select style={{ height: 60 }} value={selectConectaLlamadaPreguntaConfirma} onChange={(e) => setSelectConectaLlamadaPreguntaConfirma(e.target.value)} id="select_conecta_llamada_pregunta_confirma" className="form-select gestion my-2 rounded" disabled={!camposCompletos}>
                    <option value={'0'}>Seleccione una opción</option>
                    <option value={'1'}>Si</option>
                    <option value={'2'}>No</option>
                    </select>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          )}
          {select_si_conecta_llamada === "2" && (
            <Grid container>
              <Terceros
                conecta={selectLlamada}
                shouldScroll={shouldScroll}
                select_si_conecta_llamada={select_si_conecta_llamada}
                handleSelectChange={handleSelectChange}
                elapsedSeconds={elapsedSeconds}
                clave={clave}
                datafull={datafull}
              />
            </Grid>
          )}
          {select_si_conecta_llamada === "3" && (
            <Grid container justifyContent="flex-end">
              <Stack direction="row" spacing={2}>
                <Button variant="contained" color="success" className="btn text-white guardar mt-3 " value="GuardarRegistro" onClick={GuardarRegistro} disabled={!puedeClickear} style={{ background: "#8362D6" }}>Finalizar</Button>
              </Stack>
            </Grid>
          )}

          {(selectConectaLlamadaPreguntaConfirma == "1" ||
            selectConectaLlamadaPreguntaConfirma == "2") && (
              <Grid item xs={12} md={12} sx={{ padding: 1 }} container justifyContent="flex-end">
                <Stack direction="row" spacing={2}>
                  <Button disabled={!puedeClickear || !setCamposCompletosAD} variant="contained"  onClick={GuardarRegistro} style={{ background: "#8362D6" }}>Finalizar</Button>
                </Stack>
              </Grid>
            )}
        </div>
      )}
    </>
  );
}
export default Contesta;

{/* <div>

{datafull.map((data, index) => (
    <div>
        <div className="" id="stock">
            {data.tipo_base.toUpperCase() ===
                "STOCK" && (
                    <p> El motivo de mi llamada es agradecer la permanencia que tiene con la tarjeta, RIPLEY y gracias a los pagos puntuales que ha venido efectuando este año queremos ampliar sus beneficios.
                    </p>
                )}
        </div>
        <div className="" id="welcome">
            {data.tipo_base.toUpperCase() ===
                "WELCOME" && (
                    <p> El motivo de mi llamada es agradecer la CONFIANZA y su preferencia por haber obtenido recientemente su Tarjeta de crédito Ripley con nosotros.
                    </p>
                )}
        </div>
        <div className="" id="coross">
            {data.tipo_base.toUpperCase().includes(
                "CROSS"
            ) && (
                    <p> EL MOTIVO DE MI LLAMADA Es para agradecer el tiempo de permanencia con EL SEGURO (DETALLAR NOMBRE DE SEGURO) AMPLIANDO SUS BENEFICIOS CON EL NUEVO SEGURO: SONRIE SEGURO
                    </p>
                )}
        </div>
    </div>
))}
</div> */}