import React, { useEffect, useState, useRef } from "react";
import * as bootstrap from "bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { format, parse } from "date-fns";
import { Box, MenuItem, InputLabel, CardContent, Card, Button, FormControl, Grid, Select, TextField, Typography, FormControlLabel, Radio } from "@mui/material";


function ValidaDatos({ company, clave, elapsedSeconds, onDataComplete, datafull }) {
  //console.log(clave)

  const [setduracion, setselectduracion] = useState("0");
  const [optionListMotivo, setOptionListMotivo] = useState([]);

  const [optionListMotivoDepartamento, setOptionListMotivoDepartamento] = useState([]);
  const [optionListMotivoProvincia, setOptionListMotivoProvincia] = useState([]);
  const [optionListMotivoDistrito, setOptionListMotivoDistrito] = useState([]);

  const [optionValueMotivoDepartamento, setOptionValueMotivoDepartamento] = useState("0");
  const [optionValueMotivoProvincia, setOptionValueMotivoProvincia] = useState("0");
  const [optionValueMotivoDistrito, setOptionValueMotivoDistrito] = useState("0");

  const [optionValueMotivoProvinciaView, setOptionValueMotivoProvinciaView] = useState(true);
  const [optionValueMotivoDistritoView, setOptionValueMotivoDistritoView] = useState(true);

  const [optionListDetalleEstado, setOptionListDetalleEstado] = useState(true);
  const [optionListDetalleEstadoSelect, setOptionListDetalleEstadoSelect] = useState("0");


  const [tipoDocumento, setTipoDocumento] = useState("");
  const [numeroDocumento, setNumeroDocumento] = useState("");
  const [primerNombre, setPrimerNombre] = useState("");
  const [segundoNombre, setSegundoNombre] = useState("");
  const [apellidoPaterno, setApellidoPaterno] = useState("");
  const [apellidoMaterno, setApellidoMaterno] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [telefonoMovil, setTelefonoMovil] = useState("");
  const [isTelefonoMovilValid, setIsTelefonoMovilValid] = useState(true);
  const [sexo, setSexo] = useState("");
  const [estadoCivil, setEstadoCivil] = useState("");

  const [departamento, setDepartamento] = useState("");
  const [provincia, setProvincia] = useState("");
  const [distrito, setDistrito] = useState("");
  const [direccion, setDireccion] = useState("");

  const underlineStyle = {
    textDecoration: 'underline',
  };


  useEffect(() => {
    datafull.map((datos, index) => {

      setPrimerNombre(datos.nombre.toUpperCase())
      setTipoDocumento(datos.tipo_documento)
      setNumeroDocumento(datos.numero_documento.toUpperCase())
      setFechaNacimiento(datos.fecha_nacimiento ? '' : datos.fecha_nacimiento)
      setTelefonoMovil(datos.celular1)
      setSexo(datos.sexo === 'f' ? '2' : '1')
      setEmail(datos.email.toUpperCase())
      setDireccion(datos.direccion.toUpperCase())
      setDepartamento(datos.departamento.toUpperCase())
      setProvincia(datos.provincia.toUpperCase())
      setDistrito(datos.distrito.toUpperCase())
    });

  }, [datafull]);

  const regex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

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

  const Departamento = async () => {
    const result = await axios.post(
       "https://app.soluziona.pe/API_QA/Peru/Call/api/Ventas_CRM/Call/listas",
      { dato: "S21", dato_1: "", dato_2: "", dato_3: "" },
      { headers: { Authorization: `Bearer ${clave}` } }
    );
    if (result.status === 200) {
      setOptionListMotivoDepartamento(result.data);
      setOptionListDetalleEstado(false);
      setOptionValueMotivoProvincia("0");
      setOptionValueMotivoDistrito("0");

      setOptionListDetalleEstado(false);
      setOptionListDetalleEstadoSelect(false);

    }
  };

  const ChangeConecta_Departamento = async (valor) => {
    console.log(valor)
    setOptionValueMotivoDepartamento(valor);

    setOptionValueMotivoProvincia("0")
    setOptionValueMotivoDistrito("0")

    setOptionValueMotivoProvinciaView(true)
    setOptionValueMotivoDistritoView(true)

    if (valor === "0") {

      setOptionListDetalleEstadoDireccionD(true);
      setOptionValueMotivoDepartamento("0");
      setOptionValueMotivoProvincia("0")
      setOptionValueMotivoDistrito("0")
    } else {
      setOptionValueMotivoDepartamento(valor);

      const result = await axios.post(
         "https://app.soluziona.pe/API_QA/Peru/Call/api/Ventas_CRM/Call/listas",
         //cambiar endpoint para ciudad y provincia y distrito
        {
          dato: "S22",
          dato_1: valor,
          dato_2: "",
          dato_3: "",
        },
        { headers: { Authorization: `Bearer ${clave}` } }
      );
      if (result.status === 200) {
        setOptionListMotivoProvincia(result.data);
        setOptionListDetalleEstadoDireccionD(false);
        setOptionValueMotivoProvincia("0")
        setOptionValueMotivoDistrito("0")
        setOptionValueMotivoProvinciaView(false)
        setOptionValueMotivoDistritoView(true)
      }
    }
  };

  const ChangeConecta_Provincia = async (valor) => {

    console.log(valor)
    setOptionValueMotivoProvincia(valor);
    setOptionValueMotivoDistrito("0");
    setOptionValueMotivoDistritoView(true)

    if (valor === "0") {

      setOptionValueMotivoDistritoView(true);
      setOptionValueMotivoProvincia("0")
      setOptionValueMotivoDistrito("0")

    } else {

      setOptionValueMotivoProvincia(valor);

      const result = await axios.post(
         "https://app.soluziona.pe/API_QA/Peru/Call/api/Ventas_CRM/Call/listas",
         //cambiar endpoint para ciudad y provincia y distrito
        {
          dato: "S23",
          dato_1: optionValueMotivoDepartamento,
          dato_2: valor,
          dato_3: "",
        },
        { headers: { Authorization: `Bearer ${clave}` } }
      );
      if (result.status === 200) {

        setOptionListMotivoDistrito(result.data);
        setOptionListDetalleEstadoDireccionD(false);
        setOptionValueMotivoDistrito("0")
        setOptionValueMotivoDistritoView(false)
      }

    };
  }

  const handleDistritoChange = (valor) => {
    console.log(valor)
    setOptionValueMotivoDistrito("0");
    if (valor === "0") {
      setOptionValueMotivoDistrito("0")
    } else {
      setOptionValueMotivoDistrito(valor);
    };

  };

  const [optionListDetalleEstadoDireccionD, setOptionListDetalleEstadoDireccionD,] = useState(true);

  const handleDireccionChange = (e) => {
    setDireccion(e.target.value);
  };
  const handleDepartamentoBlur = () => {
    if (optionValueMotivoDepartamento.trim() === "") {
      // Verifica el estado 'departamento'
      toast.error("El departamento es obligatorio.", {
        position: "top-right",
        autoClose: 5000,
      });
    }
    actualizarCamposCompletos();
  };
  const handleProvinciaBlur = () => {
    if (optionValueMotivoProvincia.trim() === "") {
      toast.error("La provincia es obligatoria.", {
        position: "top-right",
        autoClose: 5000,
      });
    }
    actualizarCamposCompletos();
  };
  const handleDistritoBlur = () => {
    if (optionValueMotivoDistrito.trim() === "") {
      toast.error("El distrito es obligatorio.", {
        position: "top-right",
        autoClose: 5000,
      });
    }
    actualizarCamposCompletos();
  };
  const handleDireccionBlur = () => {
    if (direccion.trim() === "") {
      toast.error("La direccion es obligatoria.", {
        position: "top-right",
        autoClose: 5000,
      });
    }
    actualizarCamposCompletos();
  };
  const handleTipoDocumentoChange = (e) => {
    setTipoDocumento(e.target.value);
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
    }
    actualizarCamposCompletos();
  };
  const handleNumeroDocumentoBlur = () => {
    // Validar que el valor tenga exactamente 8 dígitos en el evento onBlur
    if (/^\d{8}$/.test(numeroDocumento)) {
      // El número de documento es válido
    } else {
      // Mostrar un mensaje de error con toast si no cumple con la longitud requerida
      toast.error("El número de documento debe tener 8 dígitos numéricos.", {
        position: "top-right",
        autoClose: 5000,
      });
      setNumeroDocumento("");
    }
    actualizarCamposCompletos();
  };
  const handlePrimerNombreBlur = () => {
    if (primerNombre.trim() === "") {
      toast.error("El primer nombre es obligatorio.", {
        position: "top-right",
        autoClose: 5000,
      });
    }
    actualizarCamposCompletos();
  };
  const handleSegundoNombreBlur = () => {
    if (segundoNombre.trim() === "") {
      toast.error("El segundo nombre es obligatorio.", {
        position: "top-right",
        autoClose: 5000,
      });
    }
    actualizarCamposCompletos();
  };
  const handlePrimerApellidoBlur = () => {
    if (apellidoPaterno.trim() === "") {
      toast.error("El primer apellido es obligatorio.", {
        position: "top-right",
        autoClose: 5000,
      });
    }
    actualizarCamposCompletos();
  };
  const handleSegundoApellidoBlur = () => {
    if (apellidoMaterno.trim() === "") {
      toast.error("El segundo apellido es obligatorio.", {
        position: "top-right",
        autoClose: 5000,
      });
    }
    actualizarCamposCompletos();
  };
  const handleFechaNacimientoBlur = () => {
    if (fechaNacimiento) {
      const fechaNacimientoDate = parse(
        fechaNacimiento,
        "yyyy-MM-dd",
        new Date()
      );
      const edad = new Date().getFullYear() - fechaNacimientoDate.getFullYear();
      if (edad < 18) {
        // Si la edad es menor a 18 años, muestra un mensaje de error y borra el contenido del campo
        toast.error("Debes ser mayor de 18 años.", {
          position: "top-right",
          autoClose: 5000,
        });
        setFechaNacimiento("");
      }
    }

    actualizarCamposCompletos();
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
    }
    actualizarCamposCompletos();
  };
  function handleLettersOnlyChange(e, handleChange) {
    const inputValue = e.target.value.replace(/[^A-Za-záéíóúÁÉÍÓÚüÜ\s]/g, ""); // Elimina caracteres no alfabéticos, acentos y no espacios
    e.target.value = inputValue;
    handleChange(e);
  }

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
    }
    actualizarCamposCompletos();
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

  const actualizarCamposCompletos = () => {
    const camposCompletos = tipoDocumento !== "" && numeroDocumento !== "" && primerNombre !== "" && segundoNombre !== "" && apellidoPaterno !== "" && apellidoMaterno !== "" && fechaNacimiento !== "" && sexo !== "" && estadoCivil !== "" && telefonoMovil !== "" && optionValueMotivoDepartamento !== "" && optionValueMotivoProvincia !== "" && optionValueMotivoDistrito !== "" && direccion !== "" && email !== "";    onDataComplete(camposCompletos);
  };

  const Company = async (company, clave) => {
    const result = await axios.post(
       "https://app.soluziona.pe/API_QA/Peru/Call/api/Ventas_CRM/Call/ConectaDetalle",
      { dato: company },
      { headers: { Authorization: `Bearer ${clave}` } }
    );

    if (result.status === 200) {
      setOptionListMotivo(result.data);
    }
  };

  return (
    <>
      {/* style={{backgroundColor: "#E8E8E8"}} */}
      <ToastContainer autoClose={3000} />{" "}
      
      <Grid container  spacing={1}>
       
        <Grid item xs={12} md={12} >
          <Typography variant="h6" className="card-header text-white rounded" style={{ backgroundImage: "linear-gradient(90deg, #646464 10%, #ffffff 120%)", }}> Valida Datos</Typography>
        </Grid>
        <Grid container spacing={1} sx={{marginX:1, padding:1}}>
          <Grid item xs={12} md={6} >
              Tipo Documento
              <select id="tipo_documento" style={{height: 60 }} value={tipoDocumento} onChange={handleTipoDocumentoChange} onBlur={handleTipoDocumentoBlur}  className="form-select form-control  cliente rounded">
                <option value={'0'}>Seleccione una opción</option>
                <option value={'1'}>D.N.I.</option>
                <option value={'2'}>Carnet de Extranjeria</option>
              </select>
          </Grid>
          <Grid item xs={12} md={6} >
              N° Documento
              <input style={{ height: 60 }} value={numeroDocumento} inputMode="numeric" maxLength="8" onChange={(e) => { const inputValue = e.target.value.replace(/\D/g, ""); if (inputValue.length > 8) { e.target.value = inputValue.slice(0, 8); } else { e.target.value = inputValue; } setNumeroDocumento(e.target.value) }} onBlur={handleNumeroDocumentoBlur} id="numero_documento" className="cliente form-control rounded "/>
          </Grid>
          <Grid item xs={12} md={3} >
              Primer Nombre
              <input id="val_nombre1" value={primerNombre} onChange={(e) => handleLettersOnlyChange(e, handlePrimerNombreChange)} onBlur={handlePrimerNombreBlur} className="cliente form-control rounded " style={{ height: 60 }}/>
          </Grid>
          <Grid item xs={12} md={3} >
              Segundo Nombre
              <input id="val_nombre2" value={segundoNombre} onChange={(e) => handleLettersOnlyChange(e, handleSegundoNombreChange)} onBlur={handleSegundoNombreBlur} className="cliente form-control rounded " style={{ height: 60 }}/>
          </Grid>
          <Grid item xs={12} md={3} >
              Apellido Paterno
              <input id="val_paterno" value={apellidoPaterno} onChange={(e) => handleLettersOnlyChange(e, handlePrimerApellidoChange)} onBlur={handlePrimerApellidoBlur} className="cliente form-control rounded " style={{ height: 60 }}/>
          </Grid>
          <Grid item xs={12} md={3} >
              Apellido Materno
              <input id="val_materno" value={apellidoMaterno} onChange={(e) => handleLettersOnlyChange(e, handleSegundoApellidoChange)} onBlur={handleSegundoApellidoBlur} className="cliente form-control rounded " style={{ height: 60 }}/>
          </Grid>
          <Grid item xs={12} md={4} >
              Fecha de Nacimiento:
              <input type="date" style={{height: 60}}  required id="fecha_nacimiento" value={fechaNacimiento} onChange={handleFechaNacimientoChange} onBlur={handleFechaNacimientoBlur} className="cliente form-control " />
          </Grid>
          <Grid item xs={12} md={4} >
              Sexo
              <select id="sexo" value={sexo} onChange={handleSexoChange} onBlur={handleSexoBlur} style={{ height: 60 }} className="form-select form-control cliente rounded">
                <option value={'0'}>Seleccione una opción</option>
                <option value={'1'}>Masculino</option>
                <option value={'2'}>Femenino</option>
              </select>
          </Grid>
          <Grid item xs={12} md={4} >
              Estado Civil
              <select id="ddl_listas_estadocivil" value={estadoCivil} onChange={handleEstadoCivilChange} onBlur={handleEstadoCivilBlur} style={{ height: 60 }} className="form-select cliente rounded">
                <option value={'0'}>Seleccione una opción</option>
                <option value={'1'}>Otros</option>
                <option value={'2'}>No Registrado(a)</option>
                <option value={'3'}>Casado(a)</option>
                <option value={'4'}>Soltero(a)</option>
                <option value={'5'}>Divorciado(a)</option>
                <option value={'6'}>Viudo(a)</option>
                <option value={'7'}>Conviviente</option>
                <option value={'8'}>Separado(a)</option>
              </select>
          </Grid>
          <Grid item xs={12} md={4} >
              Telefono Movil
              <input id="celular1" type="text" maxLength={9} className={`cliente rounded form-control  ${!isTelefonoMovilValid ? "invalid" : ""}`} value={telefonoMovil} onChange={handleTelefonoMovilChange} onBlur={handleTelefonoMovilBlur} style={{ height: 60 }}/>
          </Grid>
          <Grid item xs={12} md={8}>
              Email
              <input type="email" id="email" style={{ height: 60 }} required className={`cliente form-control ${isValidEmail ? "" : "invalid"}`} value={email} onChange={(e) => setEmail(e.target.value)} onBlur={handleEmailBlur}
              />
              {!isValidEmail && (
                <Typography variant="h7" className="error-message">
                  Correo electrónico no válido.
                </Typography>
              )}
          </Grid>
          <Grid item xs={12} md={4} >
              Departamento - <span style={underlineStyle}> {departamento}</span>
              <select style={{ height: 60 }} className="form-control rounded cliente" id="departamento" disabled={false} value={optionValueMotivoDepartamento} onChange={(e) => { ChangeConecta_Departamento(e.target.value); }} onBlur={handleDepartamentoBlur}>
                <option value="0">Seleccione una opción</option>
                {optionListMotivoDepartamento.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.detalle}
                  </option>
                ))}
              </select>
          </Grid>
          <Grid item xs={12} md={4} >
              Provincia - <span style={underlineStyle}> {provincia}</span>
              <select style={{ height: 60 }} className="form-control rounded cliente" id="provincia" disabled={optionValueMotivoProvinciaView} value={optionValueMotivoProvincia} onChange={(e) => { ChangeConecta_Provincia(e.target.value); }} onBlur={handleProvinciaBlur}>
                <option value="0">Seleccione una opción</option>
                {optionListMotivoProvincia.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.detalle}
                  </option>
                ))}
              </select>
          </Grid>
          <Grid item xs={12} md={4} >
              Distrito - <span style={underlineStyle}> {distrito}</span>
              <select style={{ height: 60 }} className="form-control rounded cliente" disabled={optionValueMotivoDistritoView} value={optionValueMotivoDistrito} onChange={(e) => { handleDistritoChange(e.target.value); }} onBlur={handleDistritoBlur} id="distrito">
                <option value="0">Seleccione una opción</option>
                {optionListMotivoDistrito.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.detalle}
                  </option>
                ))}
              </select>
          </Grid>
          <Grid item xs={12} md={12} sx={{marginY:2}}>
          Indique Dirección
              <input style={{ height: 60 }} value={direccion} onChange={(e) => {const inputValue = e.target.value.replace(/[^A-Za-z0-9\s]/g, ""); e.target.value = inputValue; handleDireccionChange(e) }} onBlur={handleDireccionBlur} id="direccion" className="form-control rounded cliente" />
              
          </Grid>
         
        </Grid>
      </Grid>
      
    </>
  );
}
export default ValidaDatos;