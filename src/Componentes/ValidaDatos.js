import React, { useEffect, useState, useRef } from "react";
import * as bootstrap from "bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { format, parse } from "date-fns";

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

      setPrimerNombre(datos.Chubb_nombre.toUpperCase())
      setTipoDocumento(datos.Chubb_tipo_documento)
      setNumeroDocumento(datos.Chubb_numero_documento.toUpperCase())
      setFechaNacimiento(datos.Chubb_fecha_nacimiento ? '' : datos.Chubb_fecha_nacimiento)
      setTelefonoMovil(datos.Chubb_celular1)
      setSexo(datos.Chubb_sexo === 'f' ? '2' : '1')
      setEmail(datos.Chubb_email.toUpperCase())
      setDireccion(datos.Chubb_direccion.toUpperCase())
      setDepartamento(datos.Chubb_departamento.toUpperCase())
      setProvincia(datos.Chubb_provincia.toUpperCase())
      setDistrito(datos.Chubb_distrito.toUpperCase())
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
      // "https://app.soluziona.cl/API_v1_prod/CallSouthPeru/APIVentas_Call/api/Ventas/Call/listas",
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
        // "https://app.soluziona.cl/API_v1_prod/CallSouthPeru/APIVentas_Call/api/Ventas/Call/listas",
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
        // "https://app.soluziona.cl/API_v1_prod/CallSouthPeru/APIVentas_Call/api/Ventas/Call/listas",
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
      // "https://app.soluziona.cl/API_v1_prod/CallSouthPeru/APIVentas_Call/api/Ventas/Call/ConectaDetalle",
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
      <div class="   ">
                  <h3 class="card-header text-white" style={{ backgroundImage:"linear-gradient(90deg, #646464 10%, #ffffff 120%)"}}>
                    Valida Datos
                  </h3>
                </div>
      <section>
        
        <div className="row my-2 p-3">
          <div className="col-lg-6 col-md-6 col-sm-12 ">
            Tipo Documento
            <select id="ddl_listas_tipodocumentodeidentidad" value={tipoDocumento} onChange={handleTipoDocumentoChange} onBlur={handleTipoDocumentoBlur} className="form-select cliente my-2">
              <option value="0">Seleccione una opcion</option>
              <option value="1">D.N.I.</option>
              <option value="2">carnet de Extranjeria</option>
            </select>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12">
            N° Documento
            <input type="text" className="form-control cliente my-2" value={numeroDocumento} inputMode="numeric"  maxLength="8" onChange={(e) => {const inputValue = e.target.value.replace(/\D/g, ""); if (inputValue.length > 8) { e.target.value = inputValue.slice(0, 8);} else { e.target.value = inputValue;}setNumeroDocumento(e.target.value)}} onBlur={handleNumeroDocumentoBlur} id="n_documento" />
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 ">
            Primer Nombre
            <input name="roomRent" id="val_nombre1" value={primerNombre} onChange={(e) =>handleLettersOnlyChange(e, handlePrimerNombreChange) } onBlur={handlePrimerNombreBlur} type="text" className="cliente form-control my-2" />
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 ">
            Segundo Nombre
            <input name="roomRent" id="val_nombre2" value={segundoNombre} onChange={(e) => handleLettersOnlyChange(e, handleSegundoNombreChange) } onBlur={handleSegundoNombreBlur} type="text" className="cliente form-control my-2"/>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 ">
            Apellido Paterno
            <input name="roomRent" type="text" id="val_paterno" value={apellidoPaterno} onChange={(e) => handleLettersOnlyChange(e, handlePrimerApellidoChange) } onBlur={handlePrimerApellidoBlur} className="cliente form-control my-2" />
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 ">
            Apellido Materno
            <input name="roomRent" type="text" id="val_materno" value={apellidoMaterno} onChange={(e) => handleLettersOnlyChange(e, handleSegundoApellidoChange) } onBlur={handleSegundoApellidoBlur} className="cliente form-control my-2"/>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12 ">
            Fecha de Nacimiento:
            <input type="date" required id="fecha_nacimiento" value={fechaNacimiento} onChange={handleFechaNacimientoChange} onBlur={handleFechaNacimientoBlur} className="cliente form-control my-2" />
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12 ">
            Sexo
            <select className="form-select cliente my-2" id="ddl_listas_sexo" value={sexo} onChange={handleSexoChange} onBlur={handleSexoBlur} >
              <option value="0">Seleccione el sexo</option>
              <option value="1">Masculino</option>
              <option value="2">Femenino</option>
            </select>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12 ">
            Estado Civil
            <select id="ddl_listas_estadocivil" className="form-select cliente my-2" value={estadoCivil} onChange={handleEstadoCivilChange} onBlur={handleEstadoCivilBlur}>
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
            <input name="val_fono" id="val_fon_venta" type="text" maxLength={9} className={`cliente form-control my-2 ${!isTelefonoMovilValid ? "invalid" : ""   }`} value={telefonoMovil} onChange={handleTelefonoMovilChange} onBlur={handleTelefonoMovilBlur} />
          </div>
          <div className="col-lg-8 col-md-6 col-sm-12 ">
            Email:
            <input type="email" id="val_email" required className={`cliente form-control my-2 ${isValidEmail ? "" : "invalid"   }`} value={email} onChange={(e) => setEmail(e.target.value)} onBlur={handleEmailBlur}
            />
            {!isValidEmail && (
              <p className="error-message">Correo electrónico no válido.</p>
            )}
          </div>
          <div className="form rounded-3 col-lg-4 col-md-6 col-sm-12 ">
            <label for="ddl_listas_departamento"> Departamento - <span style={underlineStyle}> {departamento}</span></label>
            <select className="cliente form-control form form-select my-2" id="ddl_listas_departamento" disabled={false} value={optionValueMotivoDepartamento}  onChange={(e) => {   ChangeConecta_Departamento(e.target.value); }} onBlur={handleDepartamentoBlur} >
              <option value="0">Selec.</option>
              {optionListMotivoDepartamento.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.detalle}
                </option>
              ))}
            </select>
          </div>
          <div className="form rounded-3 col-lg-4 col-md-6 col-sm-12 ">
            <label for="ddl_listas_provincia">  Provincia - <span style={underlineStyle}> {provincia}</span></label>
            <select className="cliente form-control form-select my-2 " id="ddl_listas_provincia" disabled={optionValueMotivoProvinciaView} value={optionValueMotivoProvincia} onChange={(e) => {   ChangeConecta_Provincia(e.target.value); }} onBlur={handleProvinciaBlur} >
              <option value="0">Selec.</option>
              {optionListMotivoProvincia.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.detalle}
                </option>
              ))}
            </select>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 ">
            <label for="ddl_listas_provincia">  Distrito - <span style={underlineStyle}> {distrito}</span></label>
            <select className="cliente form-control form-select my-2 " disabled={optionValueMotivoDistritoView} value={optionValueMotivoDistrito} onChange={(e) => { handleDistritoChange(e.target.value); }} onBlur={handleDistritoBlur} id="ddl_listas_distrito">
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
            <input name="roomRent" type="text" value={direccion} onChange={(e) => {   const inputValue = e.target.value.replace(     /[^A-Za-z0-9\s]/g, "" ); e.target.value = inputValue; handleDireccionChange(e)}}onBlur={handleDireccionBlur}id="val_direccion" className="cliente my-2 form-control" />
          </div>
        </div>
      </section>
    </>
  );
}
export default ValidaDatos;