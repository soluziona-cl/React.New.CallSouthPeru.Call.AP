import React, { useEffect, useState, useRef } from "react";
import * as bootstrap from "bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Box, MenuItem, InputLabel, CardContent, Card, Button, FormControl, Grid, Select, TextField, Typography, Stack } from "@mui/material";

function Terceros({  clave, onNoConectaChange, shouldScroll, conecta, elapsedSeconds, datafull }) {
  const [optionListMotivo, setOptionListMotivo] = useState([]);
  const [puedeClickear, setPuedeClickear] = useState(true);
  const [setduracion, setselectduracion] = useState("0");

  //  console.log(clave)
  const Conecta = conecta;
  // console.log(Conecta)

  // console.log(clave)

  useEffect(() => {
    Company(company);
    if (shouldScroll) {
      const element = document.getElementById('mySection');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [shouldScroll]);

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
    item_sucess_llamada["duracion_sec"] = setduracion;

    item_sucess_llamada["gestion"] = json_sucess_gestion;
    item_sucess_llamada["cliente"] = json_sucess_gestion3;
    item_sucess_llamada["adicionales"] = json_sucess_gestion2;


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
          window.location.href = "/Orkesta/CallSouthPeru/NewCall/AccidentesPersonales/Fin";
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

  const Company = async (company) => {
    const result = await axios.post(
      "https://app.soluziona.cl/API_QA/Peru/Call/api/Ventas_CRM/Call/ConectaDetalle",
      { dato: company },
      { headers: { Authorization: `Bearer ${clave}` } }
    );
    if (result.status === 200) {
      setOptionListMotivo(result.data);
      //console.log(result.data)
    } else {
      setOptionListMotivo([]);
    }
  };

  return (
    <>
      <Grid container sx={{ padding: 3 }} spacing={1}>
  <Grid item xs={12} md={12}>
    <textarea
      name="Observación Agenda"
      className='rounded cliente'
      id="observacion_agenda"
      style={{ width: '100%', height: '100%' }}
      rows={3}
      placeholder="Observación Agenda..."
    />
  </Grid>

  <Grid item xs={12} md={12} container justifyContent="flex-end">
    <Stack direction="row" spacing={2} sx={{ paddingTop: 2 }}>
      <Button
        variant="contained"
        color="success"
        className="btn text-white guardar"
        value="GuardarRegistro"
        onClick={GuardarRegistroNoContesta}
        disabled={!puedeClickear}
        style={{ background: "#8362D6" }}
      >
        Finalizar
      </Button>
    </Stack>
  </Grid>
</Grid>

    </>
  );
}
export default Terceros;
