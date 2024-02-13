import React, { useEffect, useState, useRef } from "react";
import * as bootstrap from "bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import TabsTabs from "./TabsTabs";
import ValidaDatos from "./ValidaDatos";
import Terceros from "./Terceros";
import Tabsinformacion from "./TabsInfotmacion";
import { Box, MenuItem, InputLabel, CardContent, Stack, Card, Button, FormControl, Grid, Select, TextField, Typography, FormControlLabel, Radio } from "@mui/material";

function Contesta({
  company,
  clave,
  onConectaTerceroValido,
  elapsedSeconds,
  select_si_conecta_llamada,
  handleSelectChange,
  tercerosComponent,
  datafull,
  shouldScroll,
}) {
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
  const [
    select_conecta_llamada_pregunta_no_interesa,
    setselect_conecta_llamada_pregunta_no_interesa,
  ] = useState("0");

  const [setduracion, setselectduracion] = useState("0");
  const [
    select_conecta_llamada_pregunta_interesa,
    setselect_conecta_llamada_pregunta_interesa,
  ] = useState("0");
  const [no_interesa, setno_interesa] = useState("0");

  const [botonDeshabilitado_guardar, setbotonDeshabilitado_guardar] =
    useState(false); // Estado para controlar la habilitación del botón

  const [optionListMotivo, setOptionListMotivo] = useState([]);
  const [optionocupacion, setOptionListOcupacion] = useState([]);


  const nombreCliente =
    datafull && datafull.length > 0
      ? datafull[0].Chubb_nombre
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

    let item_sucess_gestion = {};
    let item_sucess_gestion2 = {};

    const preguntas = document.querySelectorAll(".cliente");
    preguntas.forEach((obj) => {
      let title = obj.id;
      let valor = obj.value;
      item_sucess_gestion[title] = valor;
    });
    const preguntas2 = document.querySelectorAll(".clienteadicional");
    preguntas2.forEach((obj) => {
      let title = obj.id;
      let valor = obj.value;
      item_sucess_gestion2[title] = valor;
    });
    json_sucess_gestion.push(item_sucess_gestion);
    json_sucess_gestion2.push(item_sucess_gestion2);


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
    item_sucess_llamada["adicionales"] = json_sucess_gestion2;


    item_sucess_llamada["duracion_sec"] = setduracion;
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

  const [
    selectConectaLlamadaPreguntaConfirma,
    setSelectConectaLlamadaPreguntaConfirma,
  ] = useState("");

  const [camposCompletos, setCamposCompletos] = useState(false);
  const [optionValueOcupacion, setOcupacion] = useState("0");

  const handleDatosCompletosChange = (completos) => {
    setCamposCompletos(completos);
  };

  const ChangeConecta_Ocupacion = (ocupacion) => {
    setOcupacion(ocupacion);
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
        "https://app.soluziona.cl/API_QA/Peru/Call/api/Ventas_CRM/Call/GuardaGestion",
        { dato: id },
        { headers: { Authorization: `Bearer ${clave}` } }
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
      toast.error("Error Con Guardado");
      console.log("Error Con Guardado");
      // Manejo de errores
    }
  }

  return (
    <>
      <Grid className=" row my-1">

        <Grid item xs={12} md={12}>
          <Typography variant="h6" className="card-header text-white p-2 m-2 rounded" style={{
            backgroundImage:
              "linear-gradient(90deg, #646464 10%, #ffffff 120%)",
          }}>Script</Typography>
          <hr />
        </Grid>

        <Grid item xs={12} md={12}>
          {/* <Typography variant="h7" className="p-2 m-2"> Buenos días / tardes, me podría comunicar con el(la)
            señor(a) {nombreCliente}, Cómo le va mucho gusto! Encantado / a de saludarle mi nombre es XXXX le llamamos de Banco Ripley
            por encargo de Chubb Seguros Perú.</Typography> */}

          <Typography variant="h7" className=" p-2 m-1"> Antes de continuar le informamos que por su seguridad esta
            llamada está siendo grabada.</Typography>
        </Grid>
      </Grid>
      {select_si_conecta_llamada && (
        <div>
          <Grid item xs={12} md={6}>
            <CardContent>
              ¿Le interesa?
              <Select id="select_conecta_llamada_pregunta_interesa"
                className="form-select cliente rounded" sx={{ height: 40 }}
                value={select_conecta_llamada_pregunta_interesa}
                onChange={(e) =>
                  setselect_conecta_llamada_pregunta_interesa(e.target.value)
                }>
                <MenuItem value={'0'}>Seleccione una opción</MenuItem>
                <MenuItem value={'1'}>Interesa </MenuItem>
                <MenuItem value={'2'}>No Interesa </MenuItem>
                <MenuItem value={'3'}>Lo Pensará</MenuItem>
              </Select>
            </CardContent>
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
                  <Select id="select_conecta_llamada_pregunta_no_interesa" className="form-select cliente rounded" disabled={select_conecta_llamada_pregunta_interesa !== "2"} value={select_conecta_llamada_pregunta_no_interesa} onChange={(e) => setselect_conecta_llamada_pregunta_no_interesa(e.target.value)} sx={{ height: 40 }}>
                    <MenuItem value="0">Seleccione una opción</MenuItem>
                    {Array.isArray(no_interesa) &&
                      no_interesa.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.detalle}
                        </MenuItem>
                      ))}
                  </Select>
                </CardContent>
              </Grid>

              {select_conecta_llamada_pregunta_no_interesa !== "0" && (
                <Grid container justifyContent="flex-end">
                  <Stack direction="row" spacing={2}>
                    <Button variant="contained" className="btn text-white guardar mt-3 " value="GuardarRegistro"
                      disabled={!puedeClickear}
                      onClick={GuardarRegistroNoValido}
                      style={{ background: "#8362D6" }}>Finalizar</Button>
                  </Stack>
                </Grid>
              )}
            </Grid>
          )}
          {select_conecta_llamada_pregunta_interesa === "1" && (
            <Grid id="vw_script_cliente_valida" class="">
              <Grid className=" row m-2 rounded p-2" style={{ background: "#EDEDED" }} >
                <Typography variant="h7">
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
                  <Typography variant="h7" sx={{ paddingY: 1 }}> Salvedad: Recuerde Sr. / Sra.que le vamos a cubrir por cualquier accidente que no sea consecuencia de alguna preexistencia.
                  </Typography>
                )}
                <Grid item xs={12} md={12}>
                  <Typography variant="h7">
                    Para culminar, nos podría indicar su ocupación actual:
                  </Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                  <Select id="select-ocupacion" style={{ width: '50%', height: '80%' }} value={optionValueOcupacion} label="Ocupación" onChange={(e) => { setOcupacion(e.target.value); ChangeConecta_Ocupacion(e.target.value); }} className="rounded">
                    <MenuItem value="0">Seleccione una opción</MenuItem>
                    {optionocupacion.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.detalle}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                {mostrarMensajeOcupacion && (
                  <Box>
                    <Typography variant="h7">
                      Si el cliente tiene una profesión de alto riesgo, se debe indicar lo siguiente.
                    </Typography>
                    <Typography variant="h7">
                      Salvedad: Recuerde Sr. / Sra.que le vamos a cubrir por cualquier accidente fuera de sus horas de trabajo.
                    </Typography>
                  </Box>
                )}
              </Grid>

              <Grid className="card my-3">
                <ValidaDatos
                  company={company}
                  clave={token}
                  elapsedSeconds={setduracion}
                  onDataComplete={handleDatosCompletosChange}
                  datafull={datafull}
                />
              </Grid>
              <Grid className="card my-3" >
              <Grid container  spacing={1}>
                <Grid item xs={12} md={12} >
                  <Typography variant="h6" className="card-header text-white rounded p-2 " style={{ backgroundImage: "linear-gradient(90deg, #646464 10%, #ffffff 120%)", }}>
                    Continuar a Confirmacion de Datos y PreCierre
                  </Typography>
                </Grid>

                <Grid item xs={12} md={12} spacing={1} sx={{marginX:1, padding:1}}>
                  ¿Don / Sra.XXXX, Usted desea que le enviemos su Póliza a través de su correo electrónico ?
                  <Select sx={{ height: 60 }} value={selectConectaLlamadaPreguntaConfirma} onChange={(e) => setSelectConectaLlamadaPreguntaConfirma(e.target.value)} id="select_conecta_llamada_pregunta_confirma" className="form-select cliente my-2 rounded" disabled={!camposCompletos}>
                    <MenuItem value={'0'}>Seleccione una opción</MenuItem>
                    <MenuItem value={'1'}>Si</MenuItem>
                    <MenuItem value={'2'}>No</MenuItem>
                  </Select>
                </Grid>
              </Grid>
            </Grid>
            </Grid>
          )}
          {(selectConectaLlamadaPreguntaConfirma == "1" ||
            selectConectaLlamadaPreguntaConfirma == "2") && (
              <Grid item xs={12} md={12} sx={{ padding: 1 }} container justifyContent="flex-end">
                <Stack direction="row" spacing={2}>
                  <Button disabled={!puedeClickear} variant="contained" value={GuardarRegistro} onClick={GuardarRegistro} style={{ background: "#8362D6" }}>Finalizar</Button>
                </Stack>
              </Grid>
            )}
        </div>
      )}
    </>
  );
}
export default Contesta;