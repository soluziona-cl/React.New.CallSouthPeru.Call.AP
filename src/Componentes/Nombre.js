import React, { useEffect, useState, useRef } from "react";
import * as bootstrap from "bootstrap";
import axios from "axios";
import Direccion from "./Direccion";
import ErrorModal from "./Modal";
import { ToastContainer, toast } from "react-toastify";

function Nombre({ company, clave }) {
    const [selectLlamada, setSelectedLlamada] = useState("");
    const [fechaNacimiento, setFechaNacimiento] = useState("");
    const [selectplan, setselectplan] = useState('');
    const [rut, setRut] = useState("");
    const [valido, setValido] = useState(null);
    const [sexo, setSexo] = useState("");
    const [botonDeshabilitado, setBotonDeshabilitado] = useState(false); // Estado para controlar la habilitación del botón


    const [direccion, setDireccion] = useState("");
    const [viewedad, setViewEdad] = useState("0");
    const [email, setEmail] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(true);


    const [apellido_1, setApellido1] = useState("");
    const [apellido_2, setApellido2] = useState("");

    const [optionListMotivo, setOptionListMotivo] = useState([]);
    const [optionListDetalle, setOptionListDetalle] = useState([]);
    const [optionListDetalleEstado, setOptionListDetalleEstado] = useState(true);
    const [optionListDetalleEstadoSelect, setOptionListDetalleEstadoSelect] = useState("0");

    const [birthdate, setBirthdate] = useState("");
    const [error, setError] = useState("");
    const [showErrorModal, setShowErrorModal] = useState(false);

    const regex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

    const sesiones = {
        sgui: localStorage.getItem("localgui"),
        scliente: localStorage.getItem("localcliente"),
        sid: localStorage.getItem("localid"),
        sid_usuario: localStorage.getItem("localid_usuario"),
        stoken: localStorage.getItem("token"),
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

    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    const list_id = urlParams.get("list_id");
    const lead_id = urlParams.get("lead_id");
    // const rut = urlParams.get("address2");
    const epoch = urlParams.get("epoch");
    const lead_id_2 = urlParams.get("lead_id");
    const rut_2 = urlParams.get("lead_id");
    const phone_number = urlParams.get("phone_number");
    const uniqueid = urlParams.get("uniqueid");
    const agente = urlParams.get("user");
    const recording_filename = urlParams.get("recording_filename");



    const [token, setToken] = useState(clave);

    useEffect(() => {
        Company(company);
    }, []);

    // function handleEmailChange(e) {
    //     const emailInput = e.target;
    //     const emailValidationMessage = document.getElementById(
    //         "emailValidationMessage"
    //     );

    //     const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    //     const isValid = regex.test(emailInput.value);

    //     if (regex.test(e) || e === "") {
    //       emailValidationMessage.textContent = "El correo electrónico es válido.";
    //         emailValidationMessage.classList.remove("text-danger");
    //         emailValidationMessage.classList.add("text-success");
    //     } else {
    //         emailValidationMessage.textContent =
    //             "El correo electrónico no es válido.";
    //         emailValidationMessage.classList.remove("text-success");
    //         emailValidationMessage.classList.add("text-danger");
    //     }
    // }

    const validateEmail = (value) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(value);
    };

    const handleEmailBlur = () => {
        const isValid = validateEmail(email);
        setIsValidEmail(isValid);

        if (!isValid) {
            setEmail('');
        }
    };

    const handleChangeRut = (event) => {
        const newRutValue = event.target.value;
        setRut(newRutValue); // Actualizar el estado con el nuevo valor de RUT
    
        // Validar el formato del RUT utilizando una expresión regular
        const rutRegex = /^[0-9]+-[0-9kK]{1}$/;
        if (!rutRegex.test(newRutValue) && newRutValue !== "") {
            setValido(false); // Indicar que el RUT no es válido
        } else {
            validarRut(newRutValue);
        }
    };

    const handleBlurRut = () => {
        if (!valido) {
            setRut(""); // Borrar el contenido del campo de texto si el RUT no es válido
        }
    };

    const validarRut = (rut) => {
        let regex = /^[0-9]+-[0-9kK]{1}$/;

        if (!regex.test(rut)) {
            // alert('Formato Rut No valido');
            setRut('');
            setValido(false);
            console.log(valido);
            return;
        }

        let rutSinGuion = rut.replace("-", "");
        let rutSinDigitoVerificador = rutSinGuion.slice(0, -1);
        let digitoVerificador = rutSinGuion.slice(-1).toUpperCase();
        let factor = 2;
        let suma = 0;

        for (let i = rutSinDigitoVerificador.length - 1; i >= 0; i--) {
            suma += factor * rutSinDigitoVerificador[i];
            factor = factor === 7 ? 2 : factor + 1;
        }

        let digitoCalculado = 11 - (suma % 11);

        if (digitoCalculado === 11) {
            digitoCalculado = "0";
        } else if (digitoCalculado === 10) {
            digitoCalculado = "K";
        } else {
            digitoCalculado = digitoCalculado.toString();
        }

        if (digitoCalculado === digitoVerificador) {
            setValido(true);
        } else {
            setRut(""); // Borrar el contenido del campo de texto
            setValido(false);
        }
    };

    const Company = async (company) => {
        const result = await axios.post(
            "https://app.soluziona.cl/API_v1_prod/CallSouthPeru/ApiCall_Retenciones/api/Ventas/Call/ConectaDetalle",
            { dato: company },
            { headers: { Authorization: `Bearer ${clave}` } }
        );

        if (result.status === 200) {
            setOptionListMotivo(result.data);
            setToken(clave);
            // console.log(result.data)
            //  console.log(optionList)
        }
    };

    const ChangeConecta_nombre = async (event) => {
        if (event === "0") {
            setOptionListDetalleEstado(true);
            setOptionListDetalleEstadoSelect("0");
            setSelectedLlamada("0");
        } else {
            const result = await axios.post(
                "https://app.soluziona.cl/API_v1_prod/CallSouthPeru/ApiCall_Retenciones/api/Ventas/Call/ConectaDetalle",
                { dato: event },
                { headers: { Authorization: `Bearer ${clave}` } }
            );

            setSelectedLlamada(event);

            if (result.status === 200) {
                setOptionListDetalle(result.data);
                setOptionListDetalleEstado(false);
            }
        }
    };

    const handleDateBlur = (e) => {
        const selectedDate = new Date(e.target.value);
        const currentDate = new Date();
      
        // Sumar 70 años a la fecha actual
        const maxAllowedDate = new Date(currentDate);
        maxAllowedDate.setFullYear(currentDate.getFullYear() - 18);
        const minAllowedDate = new Date(currentDate);
        minAllowedDate.setFullYear(currentDate.getFullYear() - 70);
      
        if (!selectedDate) {
          setError("La fecha de nacimiento es requerida.");
          setShowErrorModal(true);
          setViewEdad("0");
          habilitar();
        } else if (selectedDate > maxAllowedDate) {
          setError("Debes ser mayor de 18 años.");
          setShowErrorModal(true);
          setViewEdad("2");
          desahabilitar();
        } else if (selectedDate < minAllowedDate) {
          setError("Debes tener menos de 70 años.");
          setShowErrorModal(true);
          setViewEdad("1");
          desahabilitar();
        } else {
          setError("");
          setShowErrorModal(false);
          setViewEdad("0");
          habilitar();
        }
      };
      

    function getMaxDateFor18YearsAgo() {
        const currentDate = new Date();
        const eighteenYearsAgo = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate());

        const yyyy = eighteenYearsAgo.getFullYear();
        const mm = String(eighteenYearsAgo.getMonth() + 1).padStart(2, '0');
        const dd = String(eighteenYearsAgo.getDate()).padStart(2, '0');

        return `${yyyy}-${mm}-${dd}`;
    }

    function handleDateChange(newValue) {
        setBirthdate(newValue);
        // Aquí puedes realizar validaciones adicionales si es necesario
    }

    function desahabilitar() {

        const nombres = document.getElementById('nombres');
        const apellido_paterno = document.getElementById('apellido_paterno');
        const apellido_materno = document.getElementById('apellido_materno');
        const fecha_nacimiento = document.getElementById('fecha_nacimiento');
        const RutCliente = document.getElementById('RutCliente');
        const sexo = document.getElementById('sexo');
        const email = document.getElementById('email');
        const planes = document.getElementById('planes');
        const comuna = document.getElementById('comuna');
        const ciudad = document.getElementById('ciudad');
        const calle = document.getElementById('calle');
        const numero = document.getElementById('numero');
        const depto = document.getElementById('depto');
        const referencia = document.getElementById('referencia');


        // Disable form elements
        nombres.disabled = true;
        apellido_paterno.disabled = true;
        apellido_materno.disabled = true;
        // fecha_nacimiento.disabled = true;
        RutCliente.disabled = true;
        sexo.disabled = true;
        email.disabled = true;
        planes.disabled = true;
        comuna.disabled = true;
        ciudad.disabled = true;
        calle.disabled = true;
        numero.disabled = true;
        depto.disabled = true;
        referencia.disabled = true;

    }

    function habilitar() {

        const nombres = document.getElementById('nombres');
        const apellido_paterno = document.getElementById('apellido_paterno');
        const apellido_materno = document.getElementById('apellido_materno');
        const fecha_nacimiento = document.getElementById('fecha_nacimiento');
        const RutCliente = document.getElementById('RutCliente');
        const sexo = document.getElementById('sexo');
        const email = document.getElementById('email');
        const planes = document.getElementById('planes');
        const comuna = document.getElementById('comuna');
        const ciudad = document.getElementById('ciudad');
        const calle = document.getElementById('calle');
        const numero = document.getElementById('numero');
        const depto = document.getElementById('depto');
        const referencia = document.getElementById('referencia');


        // Disable form elements
        nombres.disabled = false;
        apellido_paterno.disabled = false;
        apellido_materno.disabled = false;
        // fecha_nacimiento.disabled = false;
        RutCliente.disabled = false;
        sexo.disabled = false;
        email.disabled = false;
        planes.disabled = false;
        comuna.disabled = false;
        ciudad.disabled = false;
        calle.disabled = false;
        numero.disabled = false;
        depto.disabled = false;
        referencia.disabled = false;

    }


    async function GuardarRegistro70() {




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
        item_sucess_llamada["campaign_name"] = company;
        item_sucess_llamada["campaign_id"] = list_id;
        item_sucess_llamada["campaign"] = "Ap_Con_Ahorro";
        item_sucess_llamada["lead_id"] = lead_id;
        item_sucess_llamada["list_id"] = list_id;
        item_sucess_llamada["agente"] = agente;
        item_sucess_llamada["recording_filename"] = recording_filename;
        item_sucess_llamada["epoch"] = epoch;
        item_sucess_llamada["fecha_gestion"] = new Date();
        //item_sucess_llamada["duracion_sec"] = elapsed_seconds;
        // item_sucess_llamada["duracion_time"] =
        // get_elapsed_time_string(elapsed_seconds);
        item_sucess_llamada["phone_number"] = phone_number;
        item_sucess_llamada["gestion"] = json_sucess_gestion;
        id.push(item_sucess_llamada);



        try {
            const result = await axios.post(
                "https://app.soluziona.cl/API_v1_prod/Soluziona/Generacc/Call/api/Ventas/Call/GuardaGestion",
                { dato: id },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (result.status === 200) {
                toast.success("Registro Guardado Exitosamente");
                console.log("Registro Guardado Exitosamente");
                setBotonDeshabilitado(true); // Deshabilitar el botón después de guardar exitosamente
                setTimeout(() => {
                    window.location.href = "/Orkesta/Generacc/Call/Fin";
                }, 5000);
            }
        } catch (error) {
            // Manejo de errores
            toast.success("Error Con Guardado");
            console.log("Error Con Guardado");
        }
    }

    return (
        <>
            {/* style={{backgroundColor: "#E8E8E8"}} */}
            <ToastContainer autoClose={3000} />{" "}
            <section>
                <div className="row my-2">
                    <div className="col-lg-2 col-sm-3 my-2">Nombres</div>
                    <div className="col-lg-10 col-sm-9 my-2">
                        <input
                            name="roomRent"
                            id="nombres"
                            onChange={(e) => ChangeConecta_nombre(e.target.value)}
                            type="text"
                            className="cliente form-control"
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-2 col-sm-3 my-2">Apellido 1</div>
                    <div className="col-lg-4 col-sm-9 my-2">
                        <input
                            name="roomRent"
                            type="text"
                            id="apellido_paterno"
                            onChange={(e) => setApellido1(e.target.value)}
                            className="cliente form-control"
                        />
                    </div>
                    <div className="col-lg-2 col-sm-3 my-2">Apellido 2</div>
                    <div className="col-lg-4 col-sm-9 my-2">
                        <input
                            name="roomRent"
                            type="text"
                            id="apellido_materno"
                            onChange={(e) => setApellido2(e.target.value)}
                            className="cliente form-control"
                        />
                    </div>
                </div>
                <div className="row">
                    {/* fecha */}

                    <div className="col-lg-2 col-sm-3 my-2">Fecha de Nacimiento:</div>
                    <div className="col-lg-4 col-sm-9 my-2">
                        <input
                            type="date"
                            required
                            id="fecha_nacimiento"
                            maxLength={8}
                            className="cliente form-control"
                            value={birthdate}
                            onBlur={handleDateBlur}
                            max={getMaxDateFor18YearsAgo()}
                            onChange={(e) => handleDateChange(e.target.value)}
                        />{" "}
                        <ErrorModal
                            show={showErrorModal}
                            onHide={() => setShowErrorModal(false)}
                            error={error}
                            company={company}
                            clave={clave}
                        />
                    </div>
                    {/* fin fecha */}

                    <div className="col-lg-2 col-sm-3 my-2">N. Rut:</div>
                    <div className="col-lg-4 col-sm-3 my-2">
                        <input
                            type="text"
                            className={`form-control cliente ${valido === false ? 'invalid' : ''}`}
                            required
                            id="RutCliente"
                            value={rut}
                            minLength={8}
                            maxLength={10}
                            onChange={handleChangeRut}
                            onBlur={handleBlurRut}

                        />
                        {valido ? (
                            <p style={{ color: "green" }}>Rut válido</p>
                        ) : (
                            <p style={{ color: "red" }}>Rut inválido</p>
                        )}
                    </div>

                    <div className="col-lg-2 col-sm-3 my-2">Sexo:</div>
                    <div className="col-lg-4 col-sm-9 my-2">
                        <select
                            type="text"
                            id="sexo"
                            onChange={(e) => setSexo(e.target.value)}
                            required
                            className="cliente form-select">
                            <option value="0">Seleccione el Genero</option>
                            <option value="1">M</option>
                            <option value="2">F</option>
                        </select>

                    </div>

                    <div className="col-lg-2 col-sm-3 my-2">Email:</div>
                    <div className="col-lg-4 col-sm-9 my-2">
                        <input
                            type="email"
                            id="email"
                            required
                            className={`cliente form-control ${isValidEmail ? '' : 'invalid'}`}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onBlur={handleEmailBlur}
                        />
                        {!isValidEmail && <p className="error-message">Correo electrónico no válido.</p>}
                    </div>

                    <div className="col-lg-2 col-sm-3 my-2">Tipo Contrato:</div>
                    <div className="col-lg-4 col-sm-9 my-2">
                        <input
                            type="text"
                            id="tipo_contrato"
                            value={"Solo Titular"}
                            disabled
                            className="cliente form-control"
                        />
                    </div>
                    <div className="col-lg-2 col-sm-3 my-2">Planes:</div>
                    <div className="col-lg-4 col-sm-9 my-2">
                        <select
                            className="cliente form-control form-select"
                            id="planes"
                            disabled={false}
                            value={selectplan}

                            onChange={(e) => setselectplan(e.target.value)}>
                            <option value="0">Seleccione el plan</option>
                            <option value="1">Plan 1 UF 500</option>
                            <option value="2">Plan 2 UF 1.000</option>
                        </select>
                    </div>
                    {/* <div className="col-lg-8"></div> */}

                    {selectplan === "1" && (

                        <div >


                            <div
                                className="col-lg-2 col-sm-3 my-2">
                                Prima Mensual
                                <input
                                    type="text"
                                    id="primauf_p1"
                                    value={'UF.0,308'}
                                    disabled
                                    className="cliente form-control"
                                />

                            </div>

                            <div
                                className="cliente col-lg-2 col-sm-3 my-2"
                            >
                                Prima Mensual
                                <input
                                    type="text"
                                    id="primaclp_p1"
                                    value={'$9.240'}
                                    disabled
                                    className="cliente form-control"
                                />
                            </div>
                        </div>
                    )}

                    {selectplan === "2" && (
                        <div>
                            <div
                                className="col-lg-2 col-sm-3 my-2 cliente"
                            >
                                Prima Mensual
                                <input
                                    type="text"
                                    id="primauf_p2"
                                    value={'UF.0,381'}
                                    disabled
                                    className="cliente form-control"
                                />
                            </div>

                            <div
                                className="col-lg-2 col-sm-3 my-2 cliente"
                            >
                                Prima Mensual
                                <input
                                    type="text"
                                    id="primaclp_p2"
                                    value={'$11.430'}
                                    disabled
                                    className="cliente form-control"
                                />
                            </div>
                        </div>
                    )}

                    {viewedad === "1" &&
                        <div className="d-flex justify-content-end">
                            <button
                                className="btn btn-success btn-md "
                                value="Guardar Registro Mayor 70"
                                onClick={GuardarRegistro70}
                                disabled={botonDeshabilitado}
                            >
                                Finalizar por mayor de 70
                            </button>
                        </div>}
                        {viewedad === "2" &&
                        <div className="d-flex justify-content-end">
                            <button
                                className="btn btn-success btn-md "
                                value="Guardar Registro Menor 18"
                                onClick={GuardarRegistro70}
                                disabled={botonDeshabilitado}
                            >
                                Finalizar por menor de 18
                            </button>
                        </div>}

                </div>
            </section>
        </>
    );
}
export default Nombre;