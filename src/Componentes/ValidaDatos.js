import React, { useEffect, useState, useRef } from "react";
import * as bootstrap from "bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



function ValidaDatos({ company, clave, elapsedSeconds, onDataComplete }) {
  //console.log(clave)


  const [selectLlamada, setSelectedLlamada] = useState("");
  const [setduracion, setselectduracion] = useState("0");








  const [optionListMotivo, setOptionListMotivo] = useState([]);

  const [optionListMotivoDepartamento, setOptionListMotivoDepartamento] = useState([]);
  const [optionListMotivoProvincia, setOptionListMotivoProvincia] = useState([]);
  const [optionListMotivoDistrito, setOptionListMotivoDistrito] = useState([]);

  const [optionValueMotivoDepartamento, setOptionValueMotivoDepartamento] = useState("0");
  const [optionValueMotivoProvincia, setOptionValueMotivoProvincia] = useState("0");
  const [optionValueMotivoDistrito, setOptionValueMotivoDistrito] = useState("0");


  const [optionListDetalle, setOptionListDetalle] = useState([]);
  const [optionListDetalleEstado, setOptionListDetalleEstado] = useState(true);
  const [optionListDetalleEstadoSelect, setOptionListDetalleEstadoSelect] = useState("0");

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

  const [token, setToken] = useState(clave);

  useEffect(() => {
    Company(company);
  }, []);
  useEffect(() => {
    setselectduracion(elapsedSeconds);
  }, [elapsedSeconds]);

  useEffect(() => {
    Departamento();

  }, []);
  //console.log(clave)
  const Departamento = async () => {

    const result = await axios.post(
      "https://app.soluziona.cl/API_v1_prod/CallSouthPeru/APIVentas_Call/api/Ventas/Call/listas",
      { "dato": 'S21', "dato_1": '', "dato_2": '', "dato_3": '' },
      { headers: { Authorization: `Bearer ${clave}` } }
    );

    if (result.status === 200) {

      setOptionListMotivoDepartamento(result.data)
      setOptionListDetalleEstado(false)
      setOptionValueMotivoProvincia("0")
      setOptionValueMotivoDistrito("0")

    }
  };





  // revisar y agregar distrito y provincia
  const ChangeConecta_Departamento = async (event) => {


    // console.log(event.value)

    // if (departamento === "0") {

    //   setOptionListDetalleEstadoDireccionD(true);
    //   setOptionListDetalleEstadoSelectD("0");
    //   setSelectedLlamadaD("0");
    // } else {

    //   console.log(departamento)

    const result = await axios.post(
      "https://app.soluziona.cl/API_v1_prod/CallSouthPeru/APIVentas_Call/api/Ventas/Call/listas", //cambiar endpoint para ciudad y provincia y distrito
      { "dato": 'S22', "dato_1": optionValueMotivoDepartamento, "dato_2": '', "dato_3": '' },
      { headers: { Authorization: `Bearer ${clave}` } }
    );

    // setSelectedLlamadaD(event);

    if (result.status === 200) {

      setOptionListMotivoProvincia(result.data);
      setOptionListDetalleEstadoDireccionD(false);
      setOptionValueMotivoDistrito("0")
      // ChangeConecta_Distrito ()
      // console.log(result.data);
    }
    // }
  };




  const ChangeConecta_Provincia = async (event) => {


    // console.log(provincia)
    // console.log(departamento)
    // if (provincia === "0") {
    //   setOptionListDetalleEstadoDireccionD(true);
    //   setOptionListDetalleEstadoSelectD("0");
    //   setSelectedLlamadaD("0");
    // } else {
    const result = await axios.post(
      "https://app.soluziona.cl/API_v1_prod/CallSouthPeru/APIVentas_Call/api/Ventas/Call/listas", //cambiar endpoint para ciudad y provincia y distrito
      { "dato": 'S23', "dato_1": optionValueMotivoDepartamento, "dato_2": optionValueMotivoProvincia, "dato_3": '' },
      { headers: { Authorization: `Bearer ${clave}` } }
    );

    // setSelectedLlamadaD(event);

    if (result.status === 200) {

      setOptionListMotivoDistrito(result.data);
      setOptionListDetalleEstadoDireccionD(false);
      // console.log(result.data);
    }
    // }
  };


  const ChangeConectaDetalle_Direccion = async (event) => {



    console.log(event)

    setOptionListDetalleEstadoDireccionD(false);
    setOptionListDetalleEstadoSelectD(event);
    setSelectedLlamadaDetalleD(event);


  };





  const [tipoDocumento, setTipoDocumento] = useState('');
  const [numeroDocumento, setNumeroDocumento] = useState('');
  const [primerNombre, setPrimerNombre] = useState('');
  const [segundoNombre, setSegundoNombre] = useState('');
  const [apellidoPaterno, setApellidoPaterno] = useState('');
  const [apellidoMaterno, setApellidoMaterno] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [telefonoMovil, setTelefonoMovil] = useState("");
  const [isTelefonoMovilValid, setIsTelefonoMovilValid] = useState(true);
  const [sexo, setSexo] = useState("");
  const [estadoCivil, setEstadoCivil] = useState("");

  const [departamento, setDepartamento] = useState("");
  const [provincia, setProvincia] = useState("");
  const [distrito, setDistrito] = useState("");
  const [direccion, setDireccion] = useState("");

  const [selectLlamadaD, setSelectedLlamadaD] = useState("");
  const [selectLlamadaDetalleD, setSelectedLlamadaDetalleD] = useState("");




  const [optionListDireccionD, setOptionListDireccionD] = useState([]);
  const [optionListDetalleD, setOptionListDetalleD] = useState([]);
  const [optionListDetalleEstadoDireccionD, setOptionListDetalleEstadoDireccionD] = useState(true);
  const [optionListDetalleEstadoSelectD, setOptionListDetalleEstadoSelectD] = useState("");

  const handleDistritoChange = (e) => {
    setOptionValueMotivoDistrito(e.target.value);
  };

  const handleDireccionChange = (e) => {
    setDireccion(e.target.value);
  };
  const handleDepartamentoBlur = () => {

    if (optionValueMotivoDepartamento.trim() === "") { // Verifica el estado 'departamento'
      toast.error("El departamento es obligatorio.", {
        position: "top-right",
        autoClose: 5000,
      });
    } actualizarCamposCompletos();

  };
  const handleProvinciaBlur = () => {

    if (optionValueMotivoProvincia.trim() === "") {
      toast.error("La provincia es obligatoria.", {
        position: "top-right",
        autoClose: 5000,
      });
    } actualizarCamposCompletos();

  };
  const handleDistritoBlur = () => {

    if (optionValueMotivoDistrito.trim() === "") {
      toast.error("El distrito es obligatorio.", {
        position: "top-right",
        autoClose: 5000,
      });
    } actualizarCamposCompletos();

  };

  const handleDireccionBlur = () => {
    if (direccion.trim() === "") {
      toast.error("La direccion es obligatoria.", {
        position: "top-right",
        autoClose: 5000,
      });
    } actualizarCamposCompletos();
  };

  const handleTipoDocumentoChange = (e) => {
    setTipoDocumento(e.target.value);

  };

  const handleNumeroDocumentoChange = (e) => {
    setNumeroDocumento(e.target.value);

  };

  const handlePrimerNombreChange = (e) => {
    setPrimerNombre(e.target.value);

  };
  const handleSegundoNombreChange = (e) => {
    setSegundoNombre(e.target.value);

  };
  const handlePrimerApellidoChange = (e) => {
    setApellidoPaterno(e.target.value);

  };
  const handleSegundoApellidoChange = (e) => {
    setApellidoMaterno(e.target.value);

  };
  const handleFechaNacimientoChange = (e) => {
    setFechaNacimiento(e.target.value);

  };
  const handleTipoDocumentoBlur = () => {
    if (tipoDocumento.trim() === "") {
      toast.error("El tipo de documento es obligatorio.", {
        position: "top-right",
        autoClose: 5000,
      });
    } actualizarCamposCompletos();
  };
  const handleNumeroDocumentoBlur = () => {
    // Validar que el valor tenga exactamente 8 dígitos en el evento onBlur
    if (/^\d{8}$/.test(numeroDocumento)) {
      // El número de documento es válido
    } else {
      // Mostrar un mensaje de error con toast si no cumple con la longitud requerida
      toast.error('El número de documento debe tener 8 dígitos numéricos.', {
        position: 'top-right',
        autoClose: 5000,
      });
    } actualizarCamposCompletos();
  };

  const handlePrimerNombreBlur = () => {
    if (primerNombre.trim() === "") {
      toast.error("El primer nombre es obligatorio.", {
        position: "top-right",
        autoClose: 5000,
      });
    } actualizarCamposCompletos();
  };

  const handleSegundoNombreBlur = () => {
    if (segundoNombre.trim() === "") {
      toast.error("El segundo nombre es obligatorio.", {
        position: "top-right",
        autoClose: 5000,
      });
    } actualizarCamposCompletos();
  };

  const handlePrimerApellidoBlur = () => {
    if (apellidoPaterno.trim() === "") {
      toast.error("El primer apellido es obligatorio.", {
        position: "top-right",
        autoClose: 5000,
      });
    } actualizarCamposCompletos();
  };

  const handleSegundoApellidoBlur = () => {
    if (apellidoMaterno.trim() === "") {
      toast.error("El segundo apellido es obligatorio.", {
        position: "top-right",
        autoClose: 5000,
      });
    } actualizarCamposCompletos();
  };

  const handleFechaNacimientoBlur = () => {
    if (fechaNacimiento.trim() === "") {
      toast.error("La fecha de nacimiento es obligatoria.", {
        position: "top-right",
        autoClose: 5000,
      });
    } actualizarCamposCompletos();
  };
  const handleTelefonoMovilChange = (e) => {
    const value = e.target.value;
    // Remover cualquier caracter que no sea un número
    const numericValue = value.replace(/\D/g, "");
    setTelefonoMovil(numericValue);
  };

  const handleTelefonoMovilBlur = () => {
    if (telefonoMovil.length < 9) {
      setIsTelefonoMovilValid(false);
    } else {
      setIsTelefonoMovilValid(true);
      //(true); // Llama a  con true cuando los datos estén completos
    } actualizarCamposCompletos();
  };

  const validateEmail = (value) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(value);
    // /();
  };

  const handleEmailBlur = () => {
    const isValid = validateEmail(email);
    setIsValidEmail(isValid);

    if (!isValid) {
      setEmail("");
    } actualizarCamposCompletos();
  };
  const handleSexoChange = (e) => {
    setSexo(e.target.value);
  };

  const handleSexoBlur = () => {
    const isSexoValid = sexo.trim() !== "";
    if (!isSexoValid) {
      toast.error("El sexo es obligatorio.", {
        position: "top-right",
        autoClose: 5000,
      });
    }
    actualizarCamposCompletos();
  };

  const handleEstadoCivilChange = (e) => {
    setEstadoCivil(e.target.value);
  };

  const handleEstadoCivilBlur = () => {
    const isEstadoCivilValid = estadoCivil.trim() !== "";
    if (!isEstadoCivilValid) {
      toast.error("El estado civil es obligatorio.", {
        position: "top-right",
        autoClose: 5000,
      });
    }
    actualizarCamposCompletos();
  };
  // Repite el patrón anterior para los demás campos

  const actualizarCamposCompletos = () => {
    const camposCompletos =
      tipoDocumento !== "" &&
      numeroDocumento !== "" &&
      primerNombre !== "" &&
      segundoNombre !== "" &&
      apellidoPaterno !== "" &&
      apellidoMaterno !== "" &&
      fechaNacimiento !== "" &&
      sexo !== "" &&
      estadoCivil !== "" &&
      telefonoMovil !== "" &&
      optionValueMotivoDepartamento !== "" &&
      optionValueMotivoProvincia !== "" &&
      optionValueMotivoDistrito !== "" &&
      direccion !== "" &&
      email !== "";

    //console.log("Campos completos:", camposCompletos);
    onDataComplete(camposCompletos);
  };

  // Luego, en tus eventos onBlur o onChange de los campos relevantes, llama a esta función



  const Company = async (company, clave) => {
    const result = await axios.post(
      "https://app.soluziona.cl/API_v1_prod/CallSouthPeru/APIVentas_Call/api/Ventas/Call/ConectaDetalle",
      { dato: company },
      { headers: { Authorization: `Bearer ${clave}` } }
    );

    if (result.status === 200) {
      setOptionListMotivo(result.data);
      // console.log(result.data)
      //  console.log(optionList)
    }
  };


  return (
    <>
      {/* style={{backgroundColor: "#E8E8E8"}} */}
      <ToastContainer autoClose={3000} />{" "}
      <section>
        <div className="row my-2">
          <div className="col-lg-4 col-md-4 col-sm-12 ">
            Tipo Documento
            <select id="ddl_listas_tipodocumentodeidentidad" value={tipoDocumento} onChange={handleTipoDocumentoChange} onBlur={handleTipoDocumentoBlur} className="form-select cliente my-2" >
              <option>Seleccione una opcion</option>
              <option>D.N.I.</option>
              <option>carnet de Extranjeria</option>
              <option>Pasaporte</option>
              <option>Otros</option>
            </select>
          </div>

          <div className="col-lg-4 col-md-4 col-sm-12">
            N° Documento
            <input
              type="text"
              className="form-control cliente my-2"
              value={numeroDocumento}
              onChange={handleNumeroDocumentoChange}
              onBlur={handleNumeroDocumentoBlur}
              id="n_documento"
            />
          </div>

          <div className="col-lg-5 col-md-6 col-sm-12 ">
            Primer Nombre
            <input name="roomRent" id="val_nombre1" value={primerNombre}
              onChange={handlePrimerNombreChange} onBlur={handlePrimerNombreBlur} type="text" className="cliente form-control my-2" />
          </div>

          <div className="col-lg-5 col-md-6 col-sm-12 ">
            Segundo Nombre
            <input name="roomRent" id="val_nombre2" value={segundoNombre}
              onChange={handleSegundoNombreChange} onBlur={handleSegundoNombreBlur} type="text" className="cliente form-control my-2" />
          </div>

          <div className="col-lg-5 col-md-6 col-sm-12 ">
            Apellido Paterno
            <input name="roomRent" type="text" id="val_paterno" value={apellidoPaterno}
              onChange={handlePrimerApellidoChange} onBlur={handlePrimerApellidoBlur} className="cliente form-control my-2" />
          </div>

          <div className="col-lg-5 col-md-6 col-sm-12 ">
            Apellido Materno
            <input name="roomRent" type="text" id="val_materno" value={apellidoMaterno}
              onChange={handleSegundoApellidoChange} onBlur={handleSegundoApellidoBlur} className="cliente form-control my-2" />
          </div>

          <div className="col-lg-4 col-md-4 col-sm-12 ">
            Fecha de Nacimiento:
            <input type="date" required id="fecha_nacimiento" value={fechaNacimiento}
              onChange={handleFechaNacimientoChange} onBlur={handleFechaNacimientoBlur} className="cliente form-control my-2" />
          </div>

          <div className="col-lg-4 col-md-4 col-sm-12 ">
            Sexo
            <select
              className="form-select my-2"
              id="ddl_listas_sexo"
              value={sexo}
              onChange={handleSexoChange}
              onBlur={handleSexoBlur}
            >
              <option value="0">Seleccione el sexo</option>
              <option value="1">Masculino</option>
              <option value="2">Femenino</option>
            </select>
          </div>

          <div className="col-lg-4 col-md-4 col-sm-12 ">
            Estado Civil
            <select
              id="ddl_listas_estadocivil"
              className="form-select cliente my-2"
              value={estadoCivil}
              onChange={handleEstadoCivilChange}
              onBlur={handleEstadoCivilBlur}
            >
              <option value="0">Seleccione una opción</option>
              <option value="1">Otros</option>
              <option value="2">No Registrado(a)</option>
              <option value="3">Casado(a)</option>
              <option value="4">Soltero(a)</option>
              <option value="5">Divorciado(a)</option>
              <option value="6">Viudo(a)</option>
              <option value="7">Conviviente</option>
              <option value="8">Separado(a)</option>
            </select>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12">
            Telefono Movil
            <input
              name="val_fono"
              id="val_fon_venta"
              type="text"
              className={`form-control my-2 ${!isTelefonoMovilValid ? "invalid" : ""}`}
              value={telefonoMovil}
              onChange={handleTelefonoMovilChange}
              onBlur={handleTelefonoMovilBlur}
            />
          </div>
          <div className="col-lg-5 col-md-6 col-sm-12 ">
            Email:
            <input
              type="email"
              id="val_email"
              required
              className={`cliente form-control my-2 ${isValidEmail ? "" : "invalid"
                }`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={handleEmailBlur}
            />
            {!isValidEmail && (
              <p className="error-message">Correo electrónico no válido.</p>
            )}
          </div>


          <div className="form rounded-3 col-lg-4 col-md-6 col-sm-12 ">
            Departamento
            <select
              className="cliente form-control form form-select my-2"
              id="ddl_listas_departamento"
              disabled={false}
              value={optionValueMotivoDepartamento} // Usar el estado 'departamento' en lugar de 'select'
              onChange={(e) => {
                setOptionValueMotivoDepartamento(e.target.value);
                ChangeConecta_Departamento(e.target.value);
              }}
              onBlur={handleDepartamentoBlur}
            >
              <option value="0">Selec.</option>
              {optionListMotivoDepartamento.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.detalle}
                </option>
              ))}
            </select>
          </div>

          <div className="form rounded-3 col-lg-4 col-md-6 col-sm-12 ">
            Provincia
            <select
              className="cliente form-control form-select my-2 "
              id="ddl_listas_provincia"
              disabled={optionListDetalleEstado}
              value={optionValueMotivoProvincia} // Usar el estado 'provincia' en lugar de 'optionListDetalleEstadoSelect'
              onChange={(e) => {
                setOptionValueMotivoProvincia(e.target.value);
                ChangeConecta_Provincia(e.target.value);
              }}
              onBlur={handleProvinciaBlur}
            >
              <option value="0">Selec.</option>
              {optionListMotivoProvincia.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.detalle}
                </option>
              ))}
            </select>
          </div>

          <div className="col-lg-4 col-md-6 col-sm-12 ">
            Distrito
            <select
              className="cliente form-control form-select my-2 "
              value={optionValueMotivoDistrito}
              onChange={handleDistritoChange}
              onBlur={handleDistritoBlur}
              id="ddl_listas_distrito"
            >
              <option value="0">Selec.</option>
              {optionListMotivoDistrito.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.detalle}
                </option>
              ))}
            </select>
          </div>

          <div className="col-lg-12 col-md-12 col-sm-12 ">
            Indique Dirección
            <input
              name="roomRent"
              type="text"
              value={direccion}
              onChange={handleDireccionChange}
              onBlur={handleDireccionBlur}
              id="val_direccion"
              className="cliente my-2 form-control"
            />
          </div>


        </div>
      </section>
    </>
  );
}
export default ValidaDatos;
