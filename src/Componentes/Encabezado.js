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
              <select className="form-control rounded gestion" id="conecta" style={{ height: 60 }} value={valueConecta} onChange={changeConecta}>
                <option value="0">Seleccione una opción</option>
                {optionListConecta.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.detalle}
                  </option>
                ))}
              </select>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              Sub-Conecta
              <select className="form-control rounded gestion" id="tipificacion_detalle" style={{ height: 60 }} disabled={valueConecta === '0'} onChange={handleChangeSubRespuesta} value={valueSubRespuesta}>
                <option value="0">Seleccione una opción</option>
                {optionSubRespuesta.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.detalle}  
                  </option>
                ))}
              </select>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              Comunica
              <select className="form-control rounded gestion" id="tipificacion_comunica" style={{ height: 60 }}  onChange={handleChangeComunica} disabled={valueSubRespuesta !== '61'} value={valueComunica}>
                <option value="0">Seleccione una opción</option>
                {optionComunica.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.detalle}  
                  </option>
                ))}
              </select>
            </CardContent>
          </Card>
        </Grid>

        {(valueSubRespuesta === '62' || valueSubRespuesta === '63' || valueSubRespuesta === '64' || valueSubRespuesta === '65' || valueSubRespuesta === '66' || valueSubRespuesta === '67' || valueSubRespuesta === '68' ) && (

          <Grid item xs={12} md={12} container justifyContent="flex-end">
            <Stack direction="row" spacing={2}>
              <Button className="btn text-white guardar" variant="contained"
                color="success" value="GuardarRegistro" onClick={GuardarRegistroNoContesta} disabled={!puedeClickear} >Finalizar</Button>
            </Stack>
          </Grid>
        )}

        {( valueSubRespuesta === '50' ||valueSubRespuesta === '51' || valueSubRespuesta === '52' || valueSubRespuesta === '53' || valueSubRespuesta === '54' || valueSubRespuesta === '55' || valueSubRespuesta === '56' || valueSubRespuesta === '57' || valueSubRespuesta === '58' || valueSubRespuesta === '59' || valueSubRespuesta === '60') && valueConecta === '47' && (
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
