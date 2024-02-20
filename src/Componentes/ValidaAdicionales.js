import React, { useEffect, useState, useRef } from "react";
import * as bootstrap from "bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { format, parse } from "date-fns";
import { Button, Grid, Typography, Stack } from "@mui/material";


function ValidaAdicionales({  camposCompletosActualizados, datafull2, onChangesetCuantosAdicionales }) {
  //const [datafull2, setDatafull2] = useState([]);
  const [optionListMotivo, setOptionListMotivo] = useState([]);
  const regex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

  const [tiposAsegurado, setTiposAsegurado] = useState(Array(datafull2.length).fill('0'));

  const handleTipoAseguradoChange = (value, index) => {
    const nuevosTiposAsegurado = [...tiposAsegurado];
    nuevosTiposAsegurado[index] = value;
    setTiposAsegurado(nuevosTiposAsegurado);
  };
  const [tipoParentesco, setTipoParentesco] = useState(Array(datafull2.length).fill('0'));
  const [tipoDoc_adicional, setTipoDoc_adicional] = useState(Array(datafull2.length).fill('0'));
  const [tipoPrimer_nombre_adicional, setTipoPrimer_nombre_adicional] = useState(Array(datafull2.length).fill('0'));
  const [tipoSegundo_nombre_adicional, setTipoSegundo_nombre_adicional] = useState(Array(datafull2.length).fill('0'));
  const [tipoApellido_p_adicional, setTipoApellido_p_adicional] = useState(Array(datafull2.length).fill('0'));
  const [tipoApellido_m_adicional, setTipoApellido_m_adicional] = useState(Array(datafull2.length).fill('0'));
  const [tipoNacimiento_adicional, setTipoNacimiento_adicional] = useState(Array(datafull2.length).fill('0'));


  const handleTipoParentescoChange = (value, index) => {
    const nuevosTiposParentesco = [...tipoParentesco];
    nuevosTiposParentesco[index] = value;
    setTipoParentesco(nuevosTiposParentesco);
  };
  const handleTipodoc_adicionalChange = (value, index) => {
    const nuevosTipoDoc_adicional = [...tipoDoc_adicional];
    nuevosTipoDoc_adicional[index] = value;
    setTipoDoc_adicional(nuevosTipoDoc_adicional);
    actualizarCamposCompletos();
  };
  const handleTipoPrimer_nombre_adicionalChange = (value, index) => {
    const nuevosTiposParentesco = [...tipoPrimer_nombre_adicional];
    nuevosTiposParentesco[index] = value;
    setTipoPrimer_nombre_adicional(nuevosTiposParentesco);
    actualizarCamposCompletos();
  };
  const handleTipoSegundo_nombre_adicionalChange = (value, index) => {
    const nuevosTiposSegundo_nombre_adicional = [...tipoSegundo_nombre_adicional];
    nuevosTiposSegundo_nombre_adicional[index] = value;
    setTipoSegundo_nombre_adicional(nuevosTiposSegundo_nombre_adicional);
    actualizarCamposCompletos();
  };
  const handleTipoApellido_p_adicionalChange = (value, index) => {
    const nuevosTiposApellido_p_adicional = [...tipoApellido_p_adicional];
    nuevosTiposApellido_p_adicional[index] = value;
    setTipoApellido_p_adicional(nuevosTiposApellido_p_adicional);
    actualizarCamposCompletos();
  };
  const handleTipoApellido_m_adicionalChange = (value, index) => {
    const nuevosTiposApellido_m_adicional = [...tipoApellido_m_adicional];
    nuevosTiposApellido_m_adicional[index] = value;
    setTipoApellido_m_adicional(nuevosTiposApellido_m_adicional);
    actualizarCamposCompletos();
  };
  const handleTipoNacimiento_adicionalChange = (value, index) => {
    const nuevosTiposNacimiento_adicional = [...tipoNacimiento_adicional];
    nuevosTiposNacimiento_adicional[index] = value;
    setTipoNacimiento_adicional(nuevosTiposNacimiento_adicional);
    actualizarCamposCompletos();
  };

  const handleNumeroDocumentoBlur = () => {
    // Validar que el valor tenga exactamente 8 dígitos en el evento onBlur
    if (/^\d{8}$/.test(tipoDoc_adicional)) {
      // El número de documento es válido
    } else {
      // Mostrar un mensaje de error con toast si no cumple con la longitud requerida
      toast.error("El número de documento debe tener 8 dígitos numéricos.", {
        position: "top-right",
        autoClose: 5000,
      });
      setTipoDoc_adicional("");
    }
    actualizarCamposCompletos();
  };
  const handlePrimerNombreBlur = () => {
    if (tipoPrimer_nombre_adicional.trim() === "") {
      toast.error("El primer nombre es obligatorio.", {
        position: "top-right",
        autoClose: 5000,
      });
    }
    actualizarCamposCompletos();
  };
  const handleSegundoNombreBlur = () => {
    if (tipoSegundo_nombre_adicional.trim() === "") {
      toast.error("El segundo nombre es obligatorio.", {
        position: "top-right",
        autoClose: 5000,
      });
    }
    actualizarCamposCompletos();
  };
  const handlePrimerApellidoBlur = () => {
    if (tipoApellido_p_adicional.trim() === "") {
      toast.error("El primer apellido es obligatorio.", {
        position: "top-right",
        autoClose: 5000,
      });
    }
    actualizarCamposCompletos();
  };
  const handleSegundoApellidoBlur = () => {
    if (tipoApellido_m_adicional.trim() === "") {
      toast.error("El segundo apellido es obligatorio.", {
        position: "top-right",
        autoClose: 5000,
      });
    }
    actualizarCamposCompletos();
  };
  const handlenacimiento_adicionalBlur = () => {
    if (tipoNacimiento_adicional.trim() === "") {
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

  const [camposCompletosAD, setCamposCompletosAD] = useState(false);


const actualizarCamposCompletos = () => {
  const camposCompletosActualizados =
  tiposAsegurado.every(value => value !== "0") &&
  tipoDoc_adicional !== "0" &&
  tipoPrimer_nombre_adicional.trim() !== "" &&
  tipoSegundo_nombre_adicional.trim() !== "" &&
  tipoApellido_p_adicional.trim() !== "" &&
  tipoApellido_m_adicional.trim() !== "" &&
  tipoNacimiento_adicional.trim() !== "" &&
  tipoParentesco.every(value => value !== "0");


  setCamposCompletosAD(camposCompletosActualizados);
};

const handleAgregarAdicional = () => {
  // --actualizarCamposCompletos();

  // if (camposCompletosAD) {
    toast.success('Adicional agregado');
  //   console.log("Agregar Adicional clicked");
  //   // Agrega aquí la lógica para agregar el adicional
  // } else {
  //   toast.error('Completa todos los campos antes de agregar.');
  // }
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
                <select id={'tipo_asegurado_' + index.id} value={tiposAsegurado[index]} onChange={(e) => handleTipoAseguradoChange(e.target.value, index.id)} style={{ height: 60 }} className="form-select clienteadicional rounded">
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
                <select id={'parentesco_' + index.id} value={tipoParentesco[index]} onChange={(e) => handleTipoParentescoChange(e.target.value, index.id)} style={{ height: 60 }} className="form-select clienteadicional rounded">
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
                <input id={'nacimiento_adicional_' + index.id} type="date" style={{ height: 60 }} required  value={tipoNacimiento_adicional[index]} onChange={(e) => handleTipoNacimiento_adicionalChange(e.target.value, index.id)} onBlur={handlenacimiento_adicionalBlur} className="clienteadicional form-control " />
              </Grid>
              <Grid item xs={12} md={3} >
                DNI
                <input type="text" style={{ height: 60 }} onBlur={handleNumeroDocumentoBlur} className="form-control clienteadicionaladicional rounded" value={tipoDoc_adicional[index]} inputMode="numeric" maxLength="8" onChange={(e) => { const inputValue = e.target.value.replace(/\D/g, ""); if (inputValue.length > 8) { e.target.value = inputValue.slice(0, 8) } else { e.target.value = inputValue } handleTipodoc_adicionalChange(e.target.value, index.id); }} id={'doc_adicional_' + index.id}
                />
              </Grid>
              <Grid item xs={12} md={3} >
                Primer Nombre
                <input id={'primer_nombre_adicional_' + index.id} value={tipoPrimer_nombre_adicional[index]} onChange={(e) => handleLettersOnlyChange(e, handleTipoPrimer_nombre_adicionalChange, index.id)} onBlur={handlePrimerNombreBlur} className="clienteadicional form-control rounded " style={{ height: 60 }} />
              </Grid>
              <Grid item xs={12} md={3} >
                Segundo Nombre
                <input id={'segundo_nombre_adicional_' + index.id} value={tipoSegundo_nombre_adicional[index]} onChange={(e) => handleLettersOnlyChange(e, handleTipoSegundo_nombre_adicionalChange, index.id)} onBlur={handleSegundoNombreBlur} className="clienteadicional form-control rounded " style={{ height: 60 }} />
              </Grid>
              <Grid item xs={12} md={3} >
                Apellido Paterno
                <input id={'apellido_p_adicional_' + index.id} value={tipoApellido_p_adicional[index]} onChange={(e) => handleLettersOnlyChange(e, handleTipoApellido_p_adicionalChange, index.id)} onBlur={handlePrimerApellidoBlur} className="clienteadicional form-control rounded " style={{ height: 60 }} />
              </Grid>
              <Grid item xs={12} md={3} >
                Apellido Materno
                <input id={'apellido_m_adicional_' + index.id} value={tipoApellido_m_adicional[index]} onChange={(e) => handleLettersOnlyChange(e, handleTipoApellido_m_adicionalChange, index.id)} onBlur={handleSegundoApellidoBlur} className="clienteadicional form-control rounded " style={{ height: 60 }} />
              </Grid>
             
            </Grid>
          </Grid>
        ))}
        <Grid item xs={12} md={2} sx={{ padding: 1 }} container justifyContent="flex-end">
        <Stack direction="row" spacing={2}>
            <Button variant="contained" color="info" onClick={() => handleAgregarAdicional()} >Agregar</Button>
          </Stack>
        </Grid>


      </Grid>
    </>
  );
}
export default ValidaAdicionales;