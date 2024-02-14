import React, { useEffect, useState, useRef } from "react";
import * as bootstrap from "bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Terceros from "./Terceros";
import { Box, MenuItem, InputLabel, CardContent, Card, Button, FormControl, Grid, Select, TextField, Typography, Stack, CardHeader } from "@mui/material";
import { CalendarContainer } from "react-datepicker";

function Adicionales({ handleAgregarAdicional, datafull, clave, token, shouldScroll, elapsedSeconds, selectLlamada
}) {


    const [datosValidos, setDatosValidos] = useState("0");
    const [datafull2, setDatafull2] = useState([]);


    const [puedeClickear, setPuedeClickear] = useState(true);
    const [agregarAdicional] = useState(true);

    const [tipo_asegurado, settipo_asegurado] = useState("0");
    const [parentesco, setparentesco] = useState("0");
    const [doc_adicional, setdoc_adicional] = useState("0");
    const [primer_nombre_adicional, setprimer_nombre_adicional] = useState("");
    const [segundo_nombre_adicional, setsegundo_nombre_adicional] = useState("");
    const [apellido_p_adicional, setapellido_p_adicional] = useState("");
    const [apellido_m_adicional, setapellido_m_adicional] = useState("");
    const [nacimiento_adicional, setnacimiento_adicional] = useState("");



    const [select_si_conecta_llamada_adicional, setSelectSiConectaLlamadaAdicional] = useState("0");
    const [select_cuantos_adicionales, setSelect_cuantos_adicionales] = useState("0");

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

    const [setduracion, setselectduracion] = useState("0");
    useEffect(() => {
        setselectduracion(elapsedSeconds);
    }, [elapsedSeconds]);
    
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

    const validarDatos = () => {
        // Validación personalizada
        const datosAdicionalValidos =
            tipo_asegurado.trim() !== "" &&
            parentesco.trim() !== "" &&
            primer_nombre_adicional.trim() !== "" &&
            segundo_nombre_adicional.trim() !== "" &&
            apellido_p_adicional.trim() !== "" &&
            apellido_p_adicional.trim() !== "" &&
            nacimiento_adicional.trim() !== ""; // Agrega más validaciones según sea necesario



        // Actualizar el estado de datosValidos
        setDatosValidos("1");

        //console.log(datosValidos);

        // Devolver el resultado de la validación
        return datosAdicionalValidos;
    };

    // Efecto de efectuación para ejecutar la validación cuando cambien los datos
    useEffect(() => {
        validarDatos();
    }, [
        tipo_asegurado,
        parentesco,
        primer_nombre_adicional,
        segundo_nombre_adicional,
        apellido_p_adicional,
        apellido_m_adicional,
        nacimiento_adicional
    ]);

    const [select_si_conecta_llamada, setSelectSiConectaLlamada] = useState("0");

    const handleSelectChange = (value) => {
        setSelectSiConectaLlamada(value);

    };
    useEffect(() => {
        const isValid = validarDatos();
        setDatosValidos(isValid ? "1" : "0");
    }, []); // Solo se ejecutará una vez al montar el componente



    const onChangesetCuantosAdicionales = (event) => {

        const selectedValue = event.target.value;
        setSelect_cuantos_adicionales(selectedValue);
        console.log(selectedValue)

        const newDataFull2 = [];
        for (let i = 0; i < parseInt(selectedValue); i++) {
            newDataFull2.push({ id: i, key: i });
        }
        console.log(newDataFull2)
        setDatafull2(newDataFull2);
        if (selectedValue === "0") {

            alert("Debe Seleccionar Una Opcion");
        } else {


            setDatafull2(newDataFull2);
            setSelect_cuantos_adicionales(selectedValue);
        }

    };

    return (
        <>
            <Grid container spacing={1}>
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            ¿Titular?
                            <Select id="select_si_conecta_llamada" value={select_si_conecta_llamada} sx={{ height: 40 }} onChange={(event) => { const value = event.target.value; handleSelectChange(value); }} className="rounded cliente form-select my-2">
                                <MenuItem value={'0'}>Seleccione una opción</MenuItem>
                                <MenuItem value={'1'}>Titular</MenuItem>
                                <MenuItem value={'2'}>Tercero Valido</MenuItem>
                                <MenuItem value={'3'}>Tercero no Valido</MenuItem>
                            </Select>
                        </CardContent>
                    </Card>
                </Grid>

                {/* {select_si_conecta_llamada === "1" && ( */}

                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            ¿Con Adicional?
                            <Select id="select_si_conecta_llamada_adicional" value={select_si_conecta_llamada_adicional} onChange={(e) => setSelectSiConectaLlamadaAdicional(e.target.value)} sx={{ height: 40 }} className="form-select cliente  my-2 rounded">
                                <MenuItem value={'0'}>Seleccione una opción</MenuItem>
                                <MenuItem value={'1'}>SI</MenuItem>
                                <MenuItem value={'2'}>NO</MenuItem>
                            </Select>
                        </CardContent>
                    </Card>
                </Grid>


                {/* {select_si_conecta_llamada_adicional === "1" && ( */}
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            ¿Cuántos?
                            <Select id='select_si_conecta_llamada_adicional' value={select_cuantos_adicionales} disabled={select_si_conecta_llamada_adicional === '2'} onChange={onChangesetCuantosAdicionales} sx={{ height: 40 }} className="form-select my-2 clienteadicional rounded">
                                <MenuItem value={'0'}>Seleccione una opción</MenuItem>
                                <MenuItem value={'1'}>Titular + 1 adicional</MenuItem>
                                <MenuItem value={'2'}>Titular + 2 adicionales</MenuItem>
                                <MenuItem value={'3'}>Titular + 3 adicionales</MenuItem>
                            </Select>
                        </CardContent>
                    </Card>
                </Grid>


                {select_si_conecta_llamada_adicional === '2' && (
                    <Grid item xs={12} md={12} container justifyContent="flex-end">
                        <Stack direction="row" spacing={2}>
                            <Button variant="contained" color="info" value="Siguiente" onClick={() => { handleAgregarAdicional(); }}>Siguiente</Button>
                        </Stack>
                    </Grid>
                )}
                {/* )} */}


                {/* )} */}
                {select_si_conecta_llamada === "1" && (
                    <div>

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
                    </div>
                )}

                {select_si_conecta_llamada === "2" && (
                    <Grid container>
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
                {select_si_conecta_llamada === "3" && (
                    <Grid container justifyContent="flex-end">
                        <Stack direction="row" spacing={2}>
                            <Button variant="contained" color="success" className="btn text-white guardar mt-3 " value="GuardarRegistro" onClick={GuardarRegistroNoValido} disabled={!puedeClickear} style={{ background: "#8362D6" }}>Finalizar</Button>
                        </Stack>
                    </Grid>
                )}
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                    {select_cuantos_adicionales !== 0 && (
                        <Grid container spacing={2} >
                            {datafull2.map((item) => (
                                <Grid item xs={12} md={12} className="my-2" key={item.key}>
                                    <Typography variant="h5">Adicional {item.id} </Typography>
                                    <Card sx={{ paddingBottom: 2 }}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={3}>
                                                Tipo Asegurado
                                                <Select id={'tipo_asegurado_' + item} value={tipo_asegurado} onChange={(e) => settipo_asegurado(e.target.value, item)} sx={{ height: 60 }} className="form-select clienteadicional rounded">
                                                    <MenuItem value={'0'}>Seleccione una opción</MenuItem>
                                                    <MenuItem value={'AT'}>Titular</MenuItem>
                                                    <MenuItem value={'AC'}>Conyuge </MenuItem>
                                                    <MenuItem value={'AH'}>Hijo </MenuItem>
                                                    <MenuItem value={'AO'}>Otra Relación</MenuItem>
                                                    <MenuItem value={'TC'}>Titular de Cuenta - Contratante</MenuItem>
                                                    <MenuItem value={'BN'}>Beneficiario </MenuItem>
                                                </Select>
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                Parentesco
                                                <Select id={'parentesco_' + item} value={parentesco} onChange={(e) => setparentesco(e.target.value, item)} sx={{ height: 60 }} className="form-select clienteadicional rounded">
                                                    <MenuItem value={'0'}>Seleccione una opción</MenuItem>
                                                    <MenuItem value={'38'}>Conyuge </MenuItem>
                                                    <MenuItem value={'39'}>Hijo </MenuItem>
                                                    <MenuItem value={'40'}>Hermano </MenuItem>
                                                    <MenuItem value={'41'}>Primo(A)</MenuItem>
                                                    <MenuItem value={'42'}>Padre</MenuItem>
                                                    <MenuItem value={'43'}>Madre</MenuItem>
                                                    <MenuItem value={'44'}>Otro Familiar</MenuItem>
                                                    <MenuItem value={'45'}>Otra Relacion</MenuItem>
                                                    <MenuItem value={'125'}>Titular</MenuItem>
                                                    <MenuItem value={'1347'}>Hija </MenuItem>
                                                    <MenuItem value={'1348'}>Hermana</MenuItem>
                                                    <MenuItem value={'1349'}>Sobrino</MenuItem>
                                                    <MenuItem value={'1350'}>Abuelo </MenuItem>
                                                    <MenuItem value={'1351'}>Abuela </MenuItem>
                                                    <MenuItem value={'1352'}>Sobrina</MenuItem>
                                                    <MenuItem value={'1353'}>Viuda</MenuItem>
                                                    <MenuItem value={'1356'}>Suegro</MenuItem>
                                                    <MenuItem value={'1357'}>Suegra</MenuItem>
                                                </Select>

                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                Primer Nombre
                                                <TextField
                                                    id={'primer_nombre_adicional_' + item}
                                                    onChange={(e) => { setprimer_nombre_adicional(e.target.value, item); }}
                                                    className="clienteadicional form-control rounded "
                                                    sx={{ height: 40 }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                Segundo Nombre
                                                <TextField
                                                    id={'segundo_nombre_adicional_' + item}
                                                    onChange={(e) => { setsegundo_nombre_adicional(e.target.value, item); }}
                                                    className="clienteadicional form-control rounded"
                                                    sx={{ height: 40 }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                Apellido Paterno
                                                <TextField
                                                    id={'apellido_p_adicional_' + item}
                                                    onChange={(e) => { setapellido_p_adicional(e.target.value, item); }}
                                                    className="clienteadicional form-control rounded"
                                                    sx={{ height: 40 }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                Apellido Materno
                                                <TextField
                                                    id={'apellido_m_adicional_' + item}
                                                    onChange={(e) => { setapellido_m_adicional(e.target.value, item); }}
                                                    className="clienteadicional form-control rounded"
                                                    sx={{ height: 40 }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                Fecha de Nacimiento
                                                <input
                                                    id={'nacimiento_adicional_' + item}
                                                    type="date"
                                                    onChange={(e) => { setnacimiento_adicional(e.target.value, item); }}
                                                    className="clienteadicional form-control rounded"
                                                    style={{ height: 60 }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                DNI
                                                <input type="text" style={{ height: 60 }} className="form-control clienteadicional rounded" value={doc_adicional} inputMode="numeric" maxLength="8" onChange={(e) => { const inputValue = e.target.value.replace(/\D/g, ""); if (inputValue.length > 8) { e.target.value = inputValue.slice(0, 8) } else { e.target.value = inputValue } setdoc_adicional(e.target.value, item); }} id={'doc_adicional_' + item}
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
                            <Button disabled={!datosValidos} variant="contained" color="info" value={agregarAdicional} onClick={() => { handleAgregarAdicional();alert('Registro Actualizado') }}>Agregar</Button>
                        </Stack>
                    </Grid>
                )}
            </Grid>
        </>
    );
}
export default Adicionales;
