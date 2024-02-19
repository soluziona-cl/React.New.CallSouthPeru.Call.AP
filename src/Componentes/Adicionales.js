import React, { useEffect, useState, useRef } from "react";
import * as bootstrap from "bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Terceros from "./Terceros";
import { Box, InputLabel, CardContent, Card, Button, FormControl, Grid, Select, Typography, Stack, CardHeader } from "@mui/material";
import { CalendarContainer } from "react-datepicker";
import ValidaAdicionales from "./ValidaAdicionales";

function Adicionales({ handleAgregarAdicional, onDataComplete, company, datafull, clave, token, shouldScroll, elapsedSeconds, selectLlamada
}) {

    const [datosValidos, setDatosValidos] = useState("0");
    const [datafull2, setDatafull2] = useState([]);


    const [puedeClickear, setPuedeClickear] = useState(true);
    const [select_si_conecta_llamada_adicional, setSelectSiConectaLlamadaAdicional] = useState("0");
    const [select_cuantos_adicionales, setSelect_cuantos_adicionales] = useState("0");
    const [select_si_conecta_llamada, setSelectSiConectaLlamada] = useState("0");

    const handleSelectChange = (value) => {
        setSelectSiConectaLlamada(value);
    };
  
    const onChangesetCuantosAdicionales = (event) => {
        const selectedValue = event.target.value;
        console.log(selectedValue);
    
       
        const newDataFull2 = [];
        for (let i = 0; i < parseInt(selectedValue); i++) {
            newDataFull2.push({ id: i, key: i });
        }
        setDatafull2(newDataFull2);
        if (selectedValue === "0") {

            alert("Debe Seleccionar Una Opcion");
        } else {
            setDatafull2(newDataFull2);
            setSelect_cuantos_adicionales(selectedValue);
        }

        console.log("Selected Cuantos Adicionales:", selectedValue);
    };

    return (
        <>
        
            <Grid container spacing={1}>
            <Grid item xs={12} md={12} >
              <Typography variant="h6" className="card-header text-white rounded " style={{ backgroundImage: "linear-gradient(90deg, #646464 10%, #ffffff 120%)", }}> Datos Adicionales</Typography>
            </Grid>
            <Grid container spacing={1}>
           
                <Grid item xs={12} md={6}>
                        <CardContent>
                            ¿Con Adicional?
                            <select id="select_si_conecta_llamada_adicional" value={select_si_conecta_llamada_adicional} onChange={(e) => setSelectSiConectaLlamadaAdicional(e.target.value)} style={{ height: 60 }} className="form-select clienteadicional  my-2 rounded">
                                <option value={'0'}>Seleccione una opción</option>
                                <option value={'1'}>SI</option>
                                <option value={'2'}>NO</option>
                            </select>
                        </CardContent>
                   
                </Grid>
                <Grid item xs={12} md={6}>
                        <CardContent>
                            ¿Cuántos?
                            <select id='select_si_conecta_llamada_adicional' value={select_cuantos_adicionales} disabled={select_si_conecta_llamada_adicional === '2'} onChange={onChangesetCuantosAdicionales} style={{ height: 60 }} className="form-select my-2 clienteadicional rounded">
                                <option value={'0'}>Seleccione una opción</option>
                                <option value={'1'}>Titular + 1 adicional</option>
                                <option value={'2'}>Titular + 2 adicionales</option>
                                <option value={'3'}>Titular + 3 adicionales</option>
                            </select>
                        </CardContent>
                </Grid>
            </Grid>
            <Grid container spacing={1}>
            {select_cuantos_adicionales  !== '0' && (
            <Grid item xs={12} md={12}>
                <ValidaAdicionales
                    onDataComplete={onDataComplete} 
                    onChangesetCuantosAdicionales={onChangesetCuantosAdicionales}
                    datafull2={datafull2}
                ></ValidaAdicionales>
            </Grid>
            )}
             </Grid>

             </Grid>
        </>
    );
}
export default Adicionales;



  {/* <Grid item xs={12} md={12}>
                    {select_cuantos_adicionales !== 0 && (
                        <Grid container spacing={2} >
                            {datafull2.map((index) => (
                                <Grid item xs={12} md={12} className="my-2" key={index.key}>
                                    <Typography variant="h5">Adicional {index.id + 1} </Typography>
                                    <Card sx={{ paddingBottom: 2 }}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={3}>
                                                Tipo Asegurado
                                                <select id={'tipo_asegurado_' + index.id} value={tipo_asegurado} onChange={(e) => settipo_asegurado(e.target.value, index.id
                                                )} style={{ height: 60 }} className="form-select clienteadicional rounded">
                                                    <option value={'0'}>Seleccione una opción</option>
                                                    <option value={'AT'}>Titular</option>
                                                    <option value={'AC'}>Conyuge </option>
                                                    <option value={'AH'}>Hijo </option>
                                                    <option value={'AO'}>Otra Relación</option>
                                                    <option value={'TC'}>Titular de Cuenta - Contratante</option>
                                                    <option value={'BN'}>Beneficiario </option>
                                                </select>
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                Parentesco
                                                <select id={'parentesco_' + index.id} value={parentesco} onChange={(e) => setparentesco(e.target.value, index.id)} style={{ height: 60 }} className="form-select clienteadicional rounded">
                                                    <option value={'0'}>Seleccione una opción</option>
                                                    <option value={'38'}>Conyuge </option>
                                                    <option value={'39'}>Hijo </option>
                                                    <option value={'40'}>Hermano </option>
                                                    <option value={'41'}>Primo(A)</option>
                                                    <option value={'42'}>Padre</option>
                                                    <option value={'43'}>Madre</option>
                                                    <option value={'44'}>Otro Familiar</option>
                                                    <option value={'45'}>Otra Relacion</option>
                                                    <option value={'125'}>Titular</option>
                                                    <option value={'1347'}>Hija </option>
                                                    <option value={'1348'}>Hermana</option>
                                                    <option value={'1349'}>Sobrino</option>
                                                    <option value={'1350'}>Abuelo </option>
                                                    <option value={'1351'}>Abuela </option>
                                                    <option value={'1352'}>Sobrina</option>
                                                    <option value={'1353'}>Viuda</option>
                                                    <option value={'1356'}>Suegro</option>
                                                    <option value={'1357'}>Suegra</option>
                                                </select>

                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                Primer Nombre
                                                <input
                                                    id={'primer_nombre_adicional_' + index.id}
                                                    onChange={(e) => { setprimer_nombre_adicional(e.target.value, index.id); }}
                                                    className="clienteadicional form-control rounded "
                                                    style={{ height: 60 }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                Segundo Nombre
                                                <input
                                                    id={'segundo_nombre_adicional_' + index.id}
                                                    onChange={(e) => { setsegundo_nombre_adicional(e.target.value, index.id); }}
                                                    className="clienteadicional form-control rounded"
                                                    style={{ height: 60 }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                Apellido Paterno
                                                <input
                                                    id={'apellido_p_adicional_' + index.id}
                                                    onChange={(e) => { setapellido_p_adicional(e.target.value, index.id); }}
                                                    className="clienteadicional form-control rounded"
                                                    style={{ height: 60 }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                Apellido Materno
                                                <input
                                                    id={'apellido_m_adicional_' + index.id}
                                                    onChange={(e) => { setapellido_m_adicional(e.target.value, index.id); }}
                                                    className="clienteadicional form-control rounded"
                                                    style={{ height: 60 }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                Fecha de Nacimiento
                                                <input
                                                    id={'nacimiento_adicional_' + index.id}
                                                    type="date"
                                                    onChange={(e) => { setnacimiento_adicional(e.target.value, index.id); }}
                                                    className="clienteadicional form-control rounded"
                                                    style={{ height: 60 }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                DNI
                                                <input type="text" style={{ height: 60 }} className="form-control clienteadicional rounded" value={doc_adicional} inputMode="numeric" maxLength="8" onChange={(e) => { const inputValue = e.target.value.replace(/\D/g, ""); if (inputValue.length > 8) { e.target.value = inputValue.slice(0, 8) } else { e.target.value = inputValue } setdoc_adicional(e.target.value, index.id); }} id={'doc_adicional_' + index.id}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Card>
                                </Grid>
                            ))}



                        </Grid>
                    )}

                </Grid>
                {select_si_conecta_llamada_adicional === "1" && select_cuantos_adicionales !== "0" && (
                    <Grid item xs={12} md={12} sx={{ padding: 1 }} container justifyContent="flex-end">
                        <Stack direction="row" spacing={2}>
                            <Button disabled={!datosValidos} variant="contained" color="info" value={agregarAdicional} onClick={() => { handleAgregarAdicional(); alert('Registro Actualizado') }}>Agregar</Button>
                        </Stack>
                    </Grid>
                )} */}
