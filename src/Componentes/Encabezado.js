import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, MenuItem, InputLabel, CardContent, Card, Button, FormControl, Stack, Grid, Select, TextField, Typography } from "@mui/material";


import { setUrl } from './Common';
import { compareAsc } from "date-fns";
const url = setUrl()



const endpoint_conecta = '/Call/Select/Nivel/P';
const endpoint_subrespuesta = '/Call/Select/Nivel/H';

function Encabezado({ company, clave, onClienteChange, onIndecisoChange, onPoscicionChange, data, DatosCliente, rut, HistorialLlamados, rut_entero, onUniversidadChange, onEstado, setViewConecta, GuardarRegistroNoContesta }) {
  const [puedeClickear, setPuedeClickear] = useState(true);

  const [optionListConecta, setOptionListConecta] = useState([]);
  const [valueConecta, setValueConecta] = useState(0);

  const [optionSubRespuesta, setOptionSubRespuesta] = useState([]);
  const [valueSubRespuesta, setValueSubRespuesta] = useState(0);

  const [optionComunica, setOptionComunica] = useState([]);
  const [valueComunica, setValueComunica] = useState(0);

  const [optionInteresa, setOptionInteresa] = useState([]);
  const [valueInteresa, setValueInteresa] = useState(0);


  useEffect(() => {
    Conecta(company);
  }, [company, clave]);

  const Conecta = async (company) => {
    const result = await axios.post(url + endpoint_conecta, { dato: company }, { headers: { Authorization: `Bearer ${clave}` } }
    );

    if (result.status === 200) {
      setOptionListConecta(result.data);
    }
  };

  const changeConecta = (event) => {
    const selectedValue = event.target.value;
    setValueConecta(selectedValue);
    setValueSubRespuesta(0)
    setValueComunica(0)
    setValueInteresa(0)
    if (selectedValue === "0") {

      alert("Debe Seleccionar Una Opcion");

    } else {
      SubRespuesta(company, selectedValue)
      // You can perform additional actions based on the selected value if needed
    }
  };

  const SubRespuesta = async (company, valor) => {
    const result = await axios.post(url + endpoint_subrespuesta, { dato: company, dato_1: valor }, { headers: { Authorization: `Bearer ${clave}` } }
    );

    if (result.status === 200) {
      setOptionSubRespuesta(result.data);
    }
  };

  const handleChangeSubRespuesta = (event) => {

    const selectedValue = event.target.value;
    setValueSubRespuesta(selectedValue);
    setValueComunica(0)
    setValueInteresa(0)
    if (selectedValue === "0") {

      alert("Debe Seleccionar Una Opcion");
    } else {
      Comunica(company, selectedValue)
      // You can perform additional actions based on the selected value if needed
    }
  };

  const Comunica = async (company, valor) => {
    const result = await axios.post(url + endpoint_subrespuesta, { dato: company, dato_1: valor }, { headers: { Authorization: `Bearer ${clave}` } }
    );

    if (result.status === 200) {
      setOptionComunica(result.data);
    }
  };

  const handleChangeComunica = (event) => {

    const selectedValue = event.target.value;
    setValueComunica(selectedValue);
    setValueInteresa(0)
    setViewConecta(false)
    if (selectedValue === "0") {

      alert("Debe Seleccionar Una Opcion");
    } else {

      let valor = ''
      optionComunica.map((item) => (
        valor = item.contesta
      ))
      setViewConecta(valor)
      Interesa(company, selectedValue)
      // You can perform additional actions based on the selected value if needed
    }
  };

  const Interesa = async (company, valor) => {
    const result = await axios.post(url + endpoint_subrespuesta, { dato: company, dato_1: valor }, { headers: { Authorization: `Bearer ${clave}` } }
    );

    if (result.status === 200) {
      setOptionInteresa(result.data);
    }
  };

  //cambiar ID
  return (
    <>
      <Grid spacing={1} container>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              Conecta
              <Select className="form-control rounded cliente" id="conecta" sx={{ height: 40 }} value={valueConecta} onChange={changeConecta}>
                <MenuItem value="0">Seleccione una opción</MenuItem>
                {optionListConecta.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.detalle}
                  </MenuItem>
                ))}
              </Select>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              Sub-Conecta
              <Select className="form-control rounded cliente" id="tipificacion_detalle" sx={{ height: 40 }} disabled={valueConecta === '0'} onChange={handleChangeSubRespuesta} value={valueSubRespuesta}>
                <MenuItem value="0">Seleccione una opción</MenuItem>
                {optionSubRespuesta.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.detalle} 
                  </MenuItem>
                ))}
              </Select>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              Comunica
              <Select className="form-control rounded cliente" id="tipificacion_comunica" sx={{ height: 40 }}  onChange={handleChangeComunica} disabled={valueSubRespuesta !== 15} value={valueComunica}>
                <MenuItem value="0">Seleccione una opción</MenuItem>
                {optionComunica.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.detalle}
                  </MenuItem>
                ))}
              </Select>
            </CardContent>
          </Card>
        </Grid>

        {(valueSubRespuesta !== 0 ) && (valueConecta === 2 || valueConecta === 3 ) && (
          <Grid item xs={12} md={12} container justifyContent="flex-end">
            <Stack direction="row" spacing={2}>
              <Button className="btn text-white guardar" variant="contained"
                color="success" value="GuardarRegistro" onClick={GuardarRegistroNoContesta} disabled={!puedeClickear} >Finalizar</Button>
            </Stack>
          </Grid>
        )}

        {(valueSubRespuesta !== 15 && valueConecta === 1) && (
          <Grid item xs={12} md={12} container justifyContent="flex-end">
            <Stack direction="row" spacing={2}>
              <Button className="btn text-white guardar" variant="contained"
                color="success" value="GuardarRegistro" onClick={GuardarRegistroNoContesta} disabled={!puedeClickear} >Finalizar</Button>
            </Stack>
          </Grid>
        )}
      </Grid>
    </>
  );
}
export default Encabezado;
