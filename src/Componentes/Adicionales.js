import React, { useEffect, useState, useRef } from "react";
import * as bootstrap from "bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Terceros from "./Terceros";
import { Box, MenuItem, InputLabel, CardContent, Card, Button, FormControl, Grid, Select, TextField } from "@mui/material";
import { CalendarContainer } from "react-datepicker";

function Adicionales({ handleAgregarAdicional, datafull, clave, token, shouldScroll, elapsedSeconds,
}) {


    const [datosValidos, setDatosValidos] = useState("0");


    const [puedeClickear, setPuedeClickear] = useState(true);
    const [agregarAdicional] = useState(true);

    const [tipo_asegurado1, settipo_asegurado1] = useState("0");
    const [parentesco1, setparentesco1] = useState("0");
    const [doc_adicional1, setdoc_adicional1] = useState("0");
    const [primer_nombre_adicional1, setprimer_nombre_adicional1] = useState("");
    const [segundo_nombre_adicional1, setsegundo_nombre_adicional1] =
        useState("");
    const [apellido_p_adicional1, setapellido_p_adicional1] = useState("");
    const [apellido_m_adicional1, setapellido_m_adicional1] = useState("");
    const [nacimiento_adicional1, setnacimiento_adicional1] = useState("");

    const [tipo_asegurado2, settipo_asegurado2] = useState("0");
    const [parentesco2, setparentesco2] = useState("0");
    const [doc_adicional2, setdoc_adicional2] = useState("0");
    const [primer_nombre_adicional2, setprimer_nombre_adicional2] = useState("");
    const [segundo_nombre_adicional2, setsegundo_nombre_adicional2] =
        useState("");
    const [apellido_p_adicional2, setapellido_p_adicional2] = useState("");
    const [apellido_m_adicional2, setapellido_m_adicional2] = useState("");
    const [nacimiento_adicional2, setnacimiento_adicional2] = useState("");

    const [tipo_asegurado3, settipo_asegurado3] = useState("0");
    const [parentesco3, setparentesco3] = useState("0");
    const [doc_adicional3, setdoc_adicional3] = useState("0");
    const [primer_nombre_adicional3, setprimer_nombre_adicional3] = useState("");
    const [segundo_nombre_adicional3, setsegundo_nombre_adicional3] =
        useState("");
    const [apellido_p_adicional3, setapellido_p_adicional3] = useState("");
    const [apellido_m_adicional3, setapellido_m_adicional3] = useState("");
    const [nacimiento_adicional3, setnacimiento_adicional3] = useState("");

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
                        "/Orkesta/NewCallSouthPeru/Call_SonrieSeguro/Fin";
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
        const datosAdicional1Validos =
            tipo_asegurado1.trim() !== "" &&
            parentesco1.trim() !== "" &&
            primer_nombre_adicional1.trim() !== "" &&
            segundo_nombre_adicional1.trim() !== "" &&
            apellido_p_adicional1.trim() !== "" &&
            apellido_m_adicional1.trim() !== ""; // Agrega más validaciones según sea necesario

        const datosAdicional2Validos =
            tipo_asegurado2.trim() !== "" &&
            parentesco2.trim() !== "" &&
            primer_nombre_adicional2.trim() !== "" &&
            apellido_p_adicional2.trim() !== ""; // Agrega más validaciones según sea necesario

        const datosAdicional3Validos =
            tipo_asegurado3.trim() !== "" &&
            parentesco3.trim() !== "" &&
            primer_nombre_adicional3.trim() !== "" &&
            apellido_p_adicional3.trim() !== ""; // Agrega más validaciones según sea necesario

        // La condición general para que los datos sean válidos
        const datosTotalesValidos =
            datosAdicional1Validos &&
            (select_cuantos_adicionales !== "2" || datosAdicional2Validos) &&
            (select_cuantos_adicionales !== "3" || datosAdicional3Validos);

        // Actualizar el estado de datosValidos
        setDatosValidos("1");

        console.log(datosValidos);

        // Devolver el resultado de la validación
        return datosTotalesValidos;
    };

    // Efecto de efectuación para ejecutar la validación cuando cambien los datos
    useEffect(() => {
        validarDatos();
    }, [
        tipo_asegurado1,
        parentesco1,
        primer_nombre_adicional1,
        apellido_p_adicional1,
        tipo_asegurado2,
        parentesco2,
        primer_nombre_adicional2,
        apellido_p_adicional2,
        tipo_asegurado3,
        parentesco3,
        primer_nombre_adicional3,
        apellido_p_adicional3,
    ]);

    const [select_si_conecta_llamada, setSelectSiConectaLlamada] = useState("0");

    const handleSelectChange = (value) => {
        setSelectSiConectaLlamada(value);

    };
    useEffect(() => {
        const isValid = validarDatos();
        setDatosValidos(isValid ? "1" : "0");
    }, []); // Solo se ejecutará una vez al montar el componente

    datafull.map((data, index) => {
        item_sucess_llamada["campaign"] = data.campaign;
    });


    return (
        <>

            <Grid container spacing={1}>
                <Grid item xs={12} md={12}>
                    <Card>
                        <CardContent>
                            ¿Titular?
                            <Select id="select_si_conecta_llamada" value={select_si_conecta_llamada} sx={{ height: 40 }} label="Conecta" onChange={(event) => { const value = event.target.value; handleSelectChange(value); }} className="rounded">
                                <MenuItem value={'0'}>Seleccione una opción</MenuItem>
                                <MenuItem value={'1'}>Titular</MenuItem>
                                <MenuItem value={'2'}>Tercero Valido</MenuItem>
                                <MenuItem value={'3'}>Tercero no Valido</MenuItem>
                            </Select>

                        </CardContent>
                    </Card>
                </Grid>



                <Grid item xs={12} md={12}>
                    <Card>
                        <CardContent>
                            ¿Con Adicional?
                            <Select id="select_si_conecta_llamada_adicional" value={select_si_conecta_llamada_adicional} onChange={(e) => setSelectSiConectaLlamadaAdicional(e.target.value)} sx={{ height: 40 }} className="form-select cliente rounded">
                                <MenuItem value={'0'}>Seleccione una opción</MenuItem>
                                <MenuItem value={'1'}>SI</MenuItem>
                                <MenuItem value={'2'}>NO</MenuItem>
                            </Select>

                        </CardContent>
                    </Card>
                </Grid>



                <Grid item xs={12} md={12}>
                    <Card>
                        <CardContent>
                            ¿Cuántos?
                            <Select id="select_si_conecta_llamada_adicional" value={select_cuantos_adicionales} onChange={(e) => setSelect_cuantos_adicionales(e.target.value)} sx={{ height: 40 }} className="form-select cliente rounded" label="¿Cuántos?">
                                <MenuItem value={'0'}>Seleccione una opción</MenuItem>
                                <MenuItem value={'1'}>Titular + 1 adicional</MenuItem>
                                <MenuItem value={'2'}>Titular + 2 adicionales</MenuItem>
                                <MenuItem value={'3'}>Titular + 3 adicionales</MenuItem>
                            </Select>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Card>
                        <CardContent>
                            Tipo Asegurado
                            <Select id="tipo_asegurado" value={tipo_asegurado1} onChange={(e) => settipo_asegurado1(e.target.value)} sx={{ height: 40 }} className="form-select cliente rounded">
                                <MenuItem value={'0'}>Seleccione una opción</MenuItem>
                                <MenuItem value={'AT'}>Titular</MenuItem>
                                <MenuItem value={'AC'}>Conyuge </MenuItem>
                                <MenuItem value={'AH'}>Hijo </MenuItem>
                                <MenuItem value={'AO'}>Otra Relación</MenuItem>
                                <MenuItem value={'TC'}>Titular de Cuenta - Contratante</MenuItem>
                                <MenuItem value={'BN'}>Beneficiario </MenuItem>

                            </Select>

                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Card>
                        <CardContent>
                            Parentesco
                            <Select id="parentesco1" value={parentesco1} onChange={(e) => setparentesco1(e.target.value)} sx={{ height: 40 }} className="form-select cliente rounded">
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
                        </CardContent>
                    </Card>
                </Grid>
               
                <Grid item xs={12} md={12}>
    <Card>
        <CardContent>
            Primer Nombre
            <TextField
                id="primer_nombre_adicional1"
                onChange={(e) => { setprimer_nombre_adicional1(e.target.value); }}
                className="clienteadicional rounded my-2"
                sx={{ height: 40 }}
            />
        </CardContent>
    </Card>
</Grid>

<Grid item xs={12} md={12}>
    <Card>
        <CardContent>
            Segundo Nombre
            <TextField
                id="segundo_nombre_adicional1"
                onChange={(e) => { setsegundo_nombre_adicional1(e.target.value); }}
                className="clienteadicional my-2"
                sx={{ height: 40 }}
            />
        </CardContent>
    </Card>
</Grid>

<Grid item xs={12} md={12}>
    <Card>
        <CardContent>
            Apellido Paterno
            <TextField
                id="apellido_p_adicional1"
                onChange={(e) => { setapellido_p_adicional1(e.target.value); }}
                className="clienteadicional my-2"
                sx={{ height: 40 }}
            />
        </CardContent>
    </Card>
</Grid>

<Grid item xs={12} md={12}>
    <Card>
        <CardContent>
            Apellido Materno
            <TextField
                id="apellido_m_adicional1"
                onChange={(e) => { setapellido_m_adicional1(e.target.value); }}
                className="clienteadicional my-2"
                sx={{ height: 40 }}
            />
        </CardContent>
    </Card>
</Grid>

<Grid item xs={12} md={12}>
    <Card>
        <CardContent>
            Fecha de Nacimiento
            <input
                type="date"
                id="nacimiento_adicional1"
                onChange={(e) => { setnacimiento_adicional1(e.target.value); }}
                className="clienteadicional form-control my-2"
            />
        </CardContent>
    </Card>
</Grid>

                <Grid item xs={12} md={12}>
                    <Card>
                        <CardContent>
                        Apellido Materno
                            <InputLabel id="apellido_m_adicional1" onChange={(e) => { setapellido_m_adicional1(e.target.value); }} className="clienteadicional   my-2" sx={{ height: 40 }} />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Card>
                        <CardContent>
                        Fecha de Nacimiento
                        <input
                                                              type="date"
                                                              id="nacimiento_adicional1"
                                                              onChange={(e) => {
                                                                  setnacimiento_adicional1(
                                                                      e.target.value
                                                                  );
                                                              }}
                                                              className="clienteadicional form-control my-2"
                                                          />
                        </CardContent>
                    </Card>
                </Grid>













          

                {select_si_conecta_llamada === "1" && (
                    <Grid >
                        {select_si_conecta_llamada_adicional === "1" && (
                            <Grid className="row">
                                <Box >
                                    <FormControl fullWidth>
                                        <InputLabel id="adicional" label="¿Con Adicional?" variant="standard" />
                                        <Select id="select_si_conecta_llamada_adicional" value={select_cuantos_adicionales} onChange={(e) => setSelect_cuantos_adicionales(e.target.value)} className="form-select cliente rounded" label="¿Cuántos?">
                                            <MenuItem value={'0'}>Seleccione una opción</MenuItem>
                                            <MenuItem value={'1'}>Titular + 1 adicional</MenuItem>
                                            <MenuItem value={'2'}>Titular + 2 adicionales</MenuItem>
                                            <MenuItem value={'3'}>Titular + 3 adicionales</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>

                                {(select_cuantos_adicionales === "1" || select_cuantos_adicionales === "2" || select_cuantos_adicionales === "3") && (
                                    <div className="mb-2  p-4">
                                        <strong>

                                            <section className="row">
                                             
                                                <div className="col-lg-3 col-md-6 col-sm-12 ">
                                                    Fecha de Nacimiento:
                                                    <input
                                                        type="date"
                                                        id="nacimiento_adicional1"
                                                        onChange={(e) => {
                                                            setnacimiento_adicional1(
                                                                e.target.value
                                                            );
                                                        }}
                                                        className="clienteadicional form-control my-2"
                                                    />
                                                </div>
                                                <div className="col-lg-3 col-md-6 col-sm-12 ">
                                                    N° Documento
                                                    <input
                                                        type="text"
                                                        className="form-control clienteadicional my-2"
                                                        value={doc_adicional1}
                                                        inputMode="numeric"
                                                        maxLength="8"
                                                        onChange={(e) => {
                                                            const inputValue =
                                                                e.target.value.replace(/\D/g, "");
                                                            if (inputValue.length > 8) {
                                                                e.target.value = inputValue.slice(
                                                                    0,
                                                                    8
                                                                );
                                                            } else {
                                                                e.target.value = inputValue;
                                                            }
                                                            setdoc_adicional1(e.target.value);
                                                        }}
                                                        // onBlur={handleNumeroDocumentoBlur}
                                                        id="doc_adicional1"
                                                    />
                                                </div>
                                            </section>
                                            {(select_cuantos_adicionales === "2" || select_cuantos_adicionales === "3") && (
                                                <div>
                                                    <h5>Adicional 2</h5>
                                                    <section className="row">
                                                        <div className="col-lg-3 col-md-6 col-sm-12 ">
                                                            Tipo Asegurado
                                                            <select
                                                                id="tipo_asegurado2"
                                                                value={tipo_asegurado2}
                                                                onChange={(e) =>
                                                                    settipo_asegurado2(e.target.value)
                                                                }
                                                                className="form-select clienteadicional"
                                                            >
                                                                <option value="0">Seleccione</option>
                                                                <option value="AT">Titular</option>
                                                                <option value="AC">Conyugue </option>
                                                                <option value="AH">Hijo </option>
                                                                <option value="AO">
                                                                    Otra Relación{" "}
                                                                </option>
                                                                <option value="TC">
                                                                    Titular de Cuenta - Contratante{" "}
                                                                </option>
                                                                <option value="BN">
                                                                    Beneficiario{" "}
                                                                </option>
                                                            </select>
                                                        </div>
                                                        <div className="col-lg-3 col-md-6 col-sm-12 ">
                                                            Parentesco
                                                            <select
                                                                id="parentesco1"
                                                                value={parentesco2}
                                                                onChange={(e) =>
                                                                    setparentesco2(e.target.value)
                                                                }
                                                                className="form-select clienteadicional"
                                                            >
                                                                <option value="0">Seleccione</option>
                                                                <option value="38">Conyugue</option>
                                                                <option value="39">Hijo</option>
                                                                <option value="40">Hermano </option>
                                                                <option value="41">Primo(A)</option>
                                                                <option value="42">Padre</option>
                                                                <option value="43">Madre </option>
                                                                <option value="44">
                                                                    Otro Familiar{" "}
                                                                </option>
                                                                <option value="45">
                                                                    Otra Relacion{" "}
                                                                </option>
                                                                <option value="125">Titular </option>
                                                                <option value="1347">Hija </option>
                                                                <option value="1348">Hermana </option>
                                                                <option value="1349">Sobrino </option>
                                                                <option value="1350">Abuelo </option>
                                                                <option value="1351">Abuela </option>
                                                                <option value="1352">Sobrina </option>
                                                                <option value="1353">Viuda </option>
                                                                <option value="1356">Suegro </option>
                                                                <option value="1357">Suegra</option>
                                                            </select>
                                                        </div>
                                                        <div className="col-lg-3 col-md-6 col-sm-12 ">
                                                            Primer Nombre
                                                            <input
                                                                name="roomRent"
                                                                type="text"
                                                                id="primer_nombre_adicional2"
                                                                onChange={(e) => {
                                                                    setprimer_nombre_adicional2(
                                                                        e.target.value
                                                                    );
                                                                }}
                                                                className="clienteadicional form-control  my-2"
                                                            />
                                                        </div>
                                                        <div className="col-lg-3 col-md-6 col-sm-12 ">
                                                            Segundo Nombre
                                                            <input
                                                                name="roomRent"
                                                                type="text"
                                                                id="segundo_nombre_adicional2"
                                                                onChange={(e) => {
                                                                    setsegundo_nombre_adicional2(
                                                                        e.target.value
                                                                    );
                                                                }}
                                                                className="clienteadicional form-control my-2"
                                                            />
                                                        </div>
                                                        <div className="col-lg-3 col-md-6 col-sm-12 ">
                                                            Apellido Paterno
                                                            <input
                                                                name="roomRent"
                                                                type="text"
                                                                id="apellido_p_adicional2"
                                                                onChange={(e) => {
                                                                    setapellido_p_adicional2(
                                                                        e.target.value
                                                                    );
                                                                }}
                                                                className="clienteadicional form-control my-2"
                                                            />
                                                        </div>
                                                        <div className="col-lg-3 col-md-6 col-sm-12 ">
                                                            Apellido Materno
                                                            <input
                                                                name="roomRent"
                                                                id="apellido_m_adicional2"
                                                                onChange={(e) => {
                                                                    setapellido_m_adicional2(
                                                                        e.target.value
                                                                    );
                                                                }}
                                                                className="clienteadicional form-control my-2"
                                                            />
                                                        </div>
                                                        <div className="col-lg-3 col-md-6 col-sm-12 ">
                                                            Fecha de Nacimiento:
                                                            <input
                                                                type="date"
                                                                id="nacimiento_adicional2"
                                                                onChange={(e) => {
                                                                    setnacimiento_adicional2(
                                                                        e.target.value
                                                                    );
                                                                }}
                                                                className="clienteadicional form-control my-2"
                                                            />
                                                        </div>
                                                        <div className="col-lg-3 col-md-6 col-sm-12">
                                                            N° Documento
                                                            <input
                                                                type="text"
                                                                className="form-control clienteadicional my-2"
                                                                value={doc_adicional2}
                                                                inputMode="numeric"
                                                                maxLength="8"
                                                                onChange={(e) => {
                                                                    const inputValue =
                                                                        e.target.value.replace(/\D/g, "");
                                                                    if (inputValue.length > 8) {
                                                                        e.target.value = inputValue.slice(
                                                                            0,
                                                                            8
                                                                        );
                                                                    } else {
                                                                        e.target.value = inputValue;
                                                                    }
                                                                    setdoc_adicional2(e.target.value);
                                                                }}
                                                                // onBlur={handleNumeroDocumentoBlur}
                                                                id="doc_adicional2"
                                                            />
                                                        </div>
                                                    </section>
                                                </div>
                                            )}
                                            {select_cuantos_adicionales === "3" && (
                                                <div>
                                                    <h5>Adicional 3</h5>
                                                    <section className="row">
                                                        <div className="col-lg-3 col-md-6 col-sm-12 ">
                                                            Tipo Asegurado
                                                            <select
                                                                id="tipo_asegurado3"
                                                                value={tipo_asegurado3}
                                                                onChange={(e) =>
                                                                    settipo_asegurado3(e.target.value)
                                                                }
                                                                className="form-select clienteadicional"
                                                            >
                                                                <option value="0">Seleccione</option>
                                                                <option value="AT">Titular</option>
                                                                <option value="AC">Conyugue </option>
                                                                <option value="AH">Hijo </option>
                                                                <option value="AO">
                                                                    Otra Relación{" "}
                                                                </option>
                                                                <option value="TC">
                                                                    Titular de Cuenta - Contratante{" "}
                                                                </option>
                                                                <option value="BN">
                                                                    Beneficiario{" "}
                                                                </option>
                                                            </select>
                                                        </div>
                                                        <div className="col-lg-3 col-md-6 col-sm-12 ">
                                                            Parentesco
                                                            <select
                                                                id="parentesco3"
                                                                value={parentesco3}
                                                                onChange={(e) =>
                                                                    setparentesco3(e.target.value)
                                                                }
                                                                className="form-select clienteadicional"
                                                            >
                                                                <option value="0">Seleccione</option>
                                                                <option value="38">Conyugue</option>
                                                                <option value="39">Hijo</option>
                                                                <option value="40">Hermano </option>
                                                                <option value="41">Primo(A)</option>
                                                                <option value="42">Padre</option>
                                                                <option value="43">Madre </option>
                                                                <option value="44">
                                                                    Otro Familiar{" "}
                                                                </option>
                                                                <option value="45">
                                                                    Otra Relacion{" "}
                                                                </option>
                                                                <option value="125">Titular </option>
                                                                <option value="1347">Hija </option>
                                                                <option value="1348">Hermana </option>
                                                                <option value="1349">Sobrino </option>
                                                                <option value="1350">Abuelo </option>
                                                                <option value="1351">Abuela </option>
                                                                <option value="1352">Sobrina </option>
                                                                <option value="1353">Viuda </option>
                                                                <option value="1356">Suegro </option>
                                                                <option value="1357">Suegra</option>
                                                            </select>
                                                        </div>
                                                        <div className="col-lg-3 col-md-6 col-sm-12 ">
                                                            Primer Nombre
                                                            <input
                                                                name="roomRent"
                                                                type="text"
                                                                id="primer_nombre_adicional3"
                                                                onChange={(e) => {
                                                                    setprimer_nombre_adicional3(
                                                                        e.target.value
                                                                    );
                                                                }}
                                                                className="clienteadicional form-control  my-2"
                                                            />
                                                        </div>
                                                        <div className="col-lg-3 col-md-6 col-sm-12 ">
                                                            Segundo Nombre
                                                            <input
                                                                name="roomRent"
                                                                type="text"
                                                                id="segundo_nombre_adicional3"
                                                                onChange={(e) => {
                                                                    setsegundo_nombre_adicional3(
                                                                        e.target.value
                                                                    );
                                                                }}
                                                                className="clienteadicional form-control my-2"
                                                            />
                                                        </div>
                                                        <div className="col-lg-3 col-md-6 col-sm-12 ">
                                                            Apellido Paterno
                                                            <input
                                                                name="roomRent"
                                                                type="text"
                                                                id="apellido_p_adicional3"
                                                                onChange={(e) => {
                                                                    setapellido_p_adicional3(
                                                                        e.target.value
                                                                    );
                                                                }}
                                                                className="clienteadicional form-control my-2"
                                                            />
                                                        </div>
                                                        <div className="col-lg-3 col-md-6 col-sm-12 ">
                                                            Apellido Materno
                                                            <input
                                                                name="roomRent"
                                                                id="apellido_m_adicional3"
                                                                onChange={(e) => {
                                                                    setapellido_m_adicional3(
                                                                        e.target.value
                                                                    );
                                                                }}
                                                                className="clienteadicional form-control my-2"
                                                            />
                                                        </div>
                                                        <div className="col-lg-3 col-md-6 col-sm-12 ">
                                                            Fecha de Nacimiento:
                                                            <input
                                                                type="date"
                                                                id="nacimiento_adicional3"
                                                                onChange={(e) => {
                                                                    setnacimiento_adicional3(
                                                                        e.target.value
                                                                    );
                                                                }}
                                                                className="clienteadicional form-control my-2"
                                                            />
                                                        </div>
                                                        <div className="col-lg-3 col-md-6 col-sm-12 ">
                                                            N° Documento
                                                            <input
                                                                type="text"
                                                                className="form-control clienteadicional my-2"
                                                                value={doc_adicional3}
                                                                inputMode="numeric"
                                                                maxLength="8"
                                                                onChange={(e) => {
                                                                    const inputValue =
                                                                        e.target.value.replace(/\D/g, "");
                                                                    if (inputValue.length > 8) {
                                                                        e.target.value = inputValue.slice(
                                                                            0,
                                                                            8
                                                                        );
                                                                    } else {
                                                                        e.target.value = inputValue;
                                                                    }
                                                                    setdoc_adicional3(e.target.value);
                                                                }}
                                                                // onBlur={handleNumeroDocumentoBlur}
                                                                id="doc_adicional3"
                                                            />
                                                        </div>
                                                    </section>
                                                </div>
                                            )}
                                        </strong>
                                    </div>
                                )}
                                <Button disabled={!datosValidos} value="agregarAdicional" onClick={() => { handleAgregarAdicional(); }} variant="Agregar">Agregar</Button>

                            </Grid>
                        )}


                    </Grid>
                )}
                {select_si_conecta_llamada === "1" && (
                    <div>

                        {datafull.map((data, index) => (
                            <div>
                                <div className="" id="stock">
                                    {data.Chubb_tipo_captacion.toUpperCase() ===
                                        "STOCK" && (
                                            <p> El motivo de mi llamada es agradecer la permanencia que tiene con la tarjeta, RIPLEY y gracias a los pagos puntuales que ha venido efectuando este año queremos ampliar sus beneficios.
                                            </p>
                                        )}
                                </div>
                                <div className="" id="welcome">
                                    {data.Chubb_tipo_captacion.toUpperCase() ===
                                        "WELCOME" && (
                                            <p> El motivo de mi llamada es agradecer la CONFIANZA y su preferencia por haber obtenido recientemente su Tarjeta de crédito Ripley con nosotros.
                                            </p>
                                        )}
                                </div>
                                <div className="" id="coross">
                                    {data.Chubb_tipo_captacion.toUpperCase().includes(
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
                    <section>
                        <Terceros
                            conecta={selectLlamada}
                            shouldScroll={shouldScroll}
                            select_si_conecta_llamada={select_si_conecta_llamada}
                            handleSelectChange={handleSelectChange}
                            elapsedSeconds={elapsedSeconds}
                            clave={token}
                            datafull={datafull}
                        />
                    </section>
                )}
                {select_si_conecta_llamada === "3" && (
                    <div className="d-flex justify-content-end">
                        <button
                            className="btn text-white guardar"
                            value="GuardarRegistro"
                            onClick={GuardarRegistroNoValido}
                            disabled={!puedeClickear}
                            style={{ background: "#8362D6" }}
                        >
                            Finalizar
                        </button>
                    </div>
                )}

            </Grid>

        </>
    );
}
export default Adicionales;
