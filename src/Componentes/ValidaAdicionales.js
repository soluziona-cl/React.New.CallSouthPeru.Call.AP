import React, { useEffect, useState, useRef } from "react";
import * as bootstrap from "bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { format, parse } from "date-fns";
import { Button, Grid, Typography, Stack } from "@mui/material";


function ValidaAdicionales({ onDataComplete, datafull2, onChangesetCuantosAdicionales }) {
  //const [datafull2, setDatafull2] = useState([]);
  const [optionListMotivo, setOptionListMotivo] = useState([]);
  const [parentesco, setparentesco] = useState("0");
  const [tipo_asegurado, settipo_asegurado] = useState("0");
  const [doc_adicional, setdoc_adicional] = useState("0");
  const [primer_nombre_adicional, setprimer_nombre_adicional] = useState("");
  const [segundo_nombre_adicional, setsegundo_nombre_adicional] = useState("");
  const [apellido_p_adicional, setapellido_p_adicional] = useState("");
  const [apellido_m_adicional, setapellido_m_adicional] = useState("");
  const [nacimiento_adicional, setnacimiento_adicional] = useState("");
  //console.log(setDatafull2)

  const regex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

  const [botonAgregar, setbotonAgregar] = useState(false);


  const handletipo_aseguradoChange = (e) => {
    settipo_asegurado(e.target.value);
  };
  const handleparentescoChange = (e) => {
    setparentesco(e.target.value);
  };
  const handlePrimerNombreChange = (e) => {
    setprimer_nombre_adicional(e.target.value);
  };
  const handleSegundoNombreChange = (e) => {
    setsegundo_nombre_adicional(e.target.value);
  };
  const handlePrimerApellidoChange = (e) => {
    setapellido_p_adicional(e.target.value);
  };
  const handleSegundoApellidoChange = (e) => {
    setapellido_m_adicional(e.target.value);
  };
  const handleFechaNacimientoChange = (e) => {
    setnacimiento_adicional(e.target.value);
    //setbotonAgregar(e.target.value)
  };

  const handlesetparentescoBlur = () => {
    if (parentesco.trim() === "") {
      toast.error("El parentesco es obligatoria.", {
        position: "top-right",
        autoClose: 5000,
      });
    }
    actualizarCamposCompletos();
  };
  const handletipo_aseguradoBlur = () => {
    if (tipo_asegurado.trim() === "") {
      toast.error("El tipo de asegurado es obligatorio.", {
        position: "top-right",
        autoClose: 5000,
      });
    }
    actualizarCamposCompletos();
  };
  const handleNumeroDocumentoBlur = () => {
    // Validar que el valor tenga exactamente 8 dígitos en el evento onBlur
    if (/^\d{8}$/.test(doc_adicional)) {
      // El número de documento es válido
    } else {
      // Mostrar un mensaje de error con toast si no cumple con la longitud requerida
      toast.error("El número de documento debe tener 8 dígitos numéricos.", {
        position: "top-right",
        autoClose: 5000,
      });
      setdoc_adicional("");
    }
    actualizarCamposCompletos();
  };
  const handlePrimerNombreBlur = () => {
    if (primer_nombre_adicional.trim() === "") {
      toast.error("El primer nombre es obligatorio.", {
        position: "top-right",
        autoClose: 5000,
      });
    }
    actualizarCamposCompletos();
  };
  const handleSegundoNombreBlur = () => {
    if (segundo_nombre_adicional.trim() === "") {
      toast.error("El segundo nombre es obligatorio.", {
        position: "top-right",
        autoClose: 5000,
      });
    }
    actualizarCamposCompletos();
  };
  const handlePrimerApellidoBlur = () => {
    if (apellido_p_adicional.trim() === "") {
      toast.error("El primer apellido es obligatorio.", {
        position: "top-right",
        autoClose: 5000,
      });
    }
    actualizarCamposCompletos();
  };
  const handleSegundoApellidoBlur = () => {
    if (apellido_m_adicional.trim() === "") {
      toast.error("El segundo apellido es obligatorio.", {
        position: "top-right",
        autoClose: 5000,
      });
    }
    actualizarCamposCompletos();
  };
  const handlenacimiento_adicionalBlur = () => {
    if (nacimiento_adicional.trim() === "") {
      toast.error("La fecha de nacimiento es obligatorio.", {
        position: "top-right",
        autoClose: 5000,
      });
    }
    actualizarCamposCompletos();
  };

  function handleLettersOnlyChange(e, handleChange) {
    const inputValue = e.target.value.replace(/[^A-Za-záéíóúÁÉÍÓÚüÜ\s]/g, ""); // Elimina caracteres no alfabéticos, acentos y no espacios
    e.target.value = inputValue;
    handleChange(e);
  }
  const actualizarCamposCompletos = () => {
    const camposCompletos = tipo_asegurado !== "" && doc_adicional !== "" && primer_nombre_adicional !== "" && segundo_nombre_adicional !== "" && apellido_p_adicional !== "" && apellido_m_adicional !== "" && nacimiento_adicional !== "" && parentesco !== ""; onDataComplete(camposCompletos);
  };
  const handleAgregarAdicional = () => {
    toast.success('Adicional agregado')
    // setbotonAgregar()
    console.log("Agregar Adicional clicked");
  };



  return (
    <>
      {/* style={{backgroundColor: "#E8E8E8"}} */}
      <ToastContainer autoClose={3000} />{" "}
      <Grid >
        {datafull2.map((index) => (
          <Grid  className="my-2" key={index.key}>
            <Grid item xs={12} md={12} >
              <Typography variant="h6" className="text-black rounded text-decoration-underline  p-2 m-2" >  Adicional {index.id + 1}</Typography>
            </Grid>
            <Grid container spacing={1} sx={{ paddingX: 3 }}>
              <Grid item xs={12} md={3} >
                Tipo Asegurado
                <select id={'tipo_asegurado_' + index.id} value={tipo_asegurado} onBlur={handletipo_aseguradoBlur} onChange={(e) => settipo_asegurado(e.target.value, index.id
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
              <Grid item xs={12} md={3} >
                Parentesco
                <select id={'parentesco_' + index.id} onBlur={handlesetparentescoBlur} value={parentesco} onChange={(e) => setparentesco(e.target.value, index.id)} style={{ height: 60 }} className="form-select clienteadicional rounded">
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
              <Grid item xs={12} md={3} >
                Fecha de Nacimiento:
                <input id={'nacimiento_adicional_' + index.id} type="date" style={{ height: 60 }} required value={nacimiento_adicional} onChange={handleFechaNacimientoChange} onBlur={handlenacimiento_adicionalBlur} className="clienteadicional form-control " />
              </Grid>
              <Grid item xs={12} md={3} >
                DNI
                <input type="text" style={{ height: 60 }} onBlur={handleNumeroDocumentoBlur} className="form-control clienteadicionaladicional rounded" value={doc_adicional} inputMode="numeric" maxLength="8" onChange={(e) => { const inputValue = e.target.value.replace(/\D/g, ""); if (inputValue.length > 8) { e.target.value = inputValue.slice(0, 8) } else { e.target.value = inputValue } setdoc_adicional(e.target.value, index.id); }} id={'doc_adicional_' + index.id}
                />
              </Grid>
              <Grid item xs={12} md={3} >
                Primer Nombre
                <input id={'primer_nombre_adicional_' + index.id} value={primer_nombre_adicional} onChange={(e) => handleLettersOnlyChange(e, handlePrimerNombreChange)} onBlur={handlePrimerNombreBlur} className="clienteadicional form-control rounded " style={{ height: 60 }} />
              </Grid>
              <Grid item xs={12} md={3} >
                Segundo Nombre
                <input id={'segundo_nombre_adicional_' + index.id} value={segundo_nombre_adicional} onChange={(e) => handleLettersOnlyChange(e, handleSegundoNombreChange)} onBlur={handleSegundoNombreBlur} className="clienteadicional form-control rounded " style={{ height: 60 }} />
              </Grid>
              <Grid item xs={12} md={3} >
                Apellido Paterno
                <input id={'apellido_p_adicional_' + index.id} value={apellido_p_adicional} onChange={(e) => handleLettersOnlyChange(e, handlePrimerApellidoChange)} onBlur={handlePrimerApellidoBlur} className="clienteadicional form-control rounded " style={{ height: 60 }} />
              </Grid>
              <Grid item xs={12} md={3} >
                Apellido Materno
                <input id={'apellido_m_adicional_' + index.id} value={apellido_m_adicional} onChange={(e) => handleLettersOnlyChange(e, handleSegundoApellidoChange)} onBlur={handleSegundoApellidoBlur} className="clienteadicional form-control rounded " style={{ height: 60 }} />
              </Grid>
             
            </Grid>
          </Grid>
        ))}
        <Grid item xs={12} md={12} sx={{ padding: 1 }} container justifyContent="flex-end">
          {botonAgregar && (<Stack direction="row" spacing={2}>
            <Button variant="contained" color="info" onClick={() => handleAgregarAdicional()}>Agregar</Button>
          </Stack>)}

          {/* <Stack direction="row" spacing={2}>
                <Button  variant="contained" color="info" onClick={() => { handleAgregarAdicional(); alert('Registro Actualizado') }}>Agregar</Button>
              </Stack> */}
        </Grid>


      </Grid>
    </>
  );
}
export default ValidaAdicionales;