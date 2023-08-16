import React, { useEffect, useState, useRef } from 'react';
import * as bootstrap from 'bootstrap';
import axios from 'axios';
import Direccion from './Direccion';



function Nombre({company,clave}) {
    const [selectLlamada, setSelectedLlamada] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');

    const [rut, setRut] = useState('');
    const [valido, setValido] = useState(null);
    const [sexo, setSexo] = useState('');

    const [direccion, setDireccion] = useState('');
   // const [email, setEmail] = useState('');
    const [apellido_1, setApellido1] = useState('');
    const [apellido_2, setApellido2] = useState('');

    const [optionListMotivo, setOptionListMotivo] = useState([]);
    const [optionListDetalle, setOptionListDetalle] = useState([]);
    const [optionListDetalleEstado, setOptionListDetalleEstado] = useState(true);
    const [optionListDetalleEstadoSelect, setOptionListDetalleEstadoSelect] = useState('0');

    const regex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

    const sesiones = {
        sgui: localStorage.getItem("localgui"),
        scliente: localStorage.getItem("localcliente"),
        sid: localStorage.getItem("localid"),
        sid_usuario: localStorage.getItem("localid_usuario"),
        stoken: localStorage.getItem("token")
    };
    const [token, setToken] = useState(clave);

    useEffect(() => {
        Company(company)
    }, []);

    function handleEmailChange(e) {
      const emailInput = e.target;
      const emailValidationMessage = document.getElementById("emailValidationMessage");
      
      const regex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
      const isValid = regex.test(emailInput.value);
      
      if (isValid) {
        emailValidationMessage.textContent = "El correo electrónico es válido.";
        emailValidationMessage.classList.remove("text-danger");
        emailValidationMessage.classList.add("text-success");
      } else {
        emailValidationMessage.textContent = "El correo electrónico no es válido.";
        emailValidationMessage.classList.remove("text-success");
        emailValidationMessage.classList.add("text-danger");
      }
    }

    const handleChangeRut = (event) => {
      setRut(event.target.value);
      validarRut(event.target.value);
    };
  
    const validarRut = (rut) => {
      let regex = /^[0-9]+-[0-9kK]{1}$/;
  
      if (!regex.test(rut)) {
        // alert('Formato Rut No valido');
        // setRut('');
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
        setValido(false);
      }
    };

    const Company = (async (company) => {

        const result = await axios.post('https://app.soluziona.cl/API_v1_prod/CallSouthPeru/ApiCall_Retenciones/api/Ventas/Call/ConectaDetalle', { dato: company }, { headers: { "Authorization": `Bearer ${clave}` } })

        if (result.status === 200) {
            setOptionListMotivo(result.data)
            setToken(clave); 
            // console.log(result.data)
            //  console.log(optionList)

        }

    })
    

    const ChangeConecta_nombre = (async (event) => {

        if (event === '0') {
            setOptionListDetalleEstado(true)
            setOptionListDetalleEstadoSelect('0')
            setSelectedLlamada('0')
        } else {
            const result = await axios.post('https://app.soluziona.cl/API_v1_prod/CallSouthPeru/ApiCall_Retenciones/api/Ventas/Call/ConectaDetalle', { dato: event }, { headers: { "Authorization": `Bearer ${clave}` } })

            setSelectedLlamada(event)

            if (result.status === 200) {
                setOptionListDetalle(result.data)
                setOptionListDetalleEstado(false)
            }
        }


    })

    return (

        <>
        {/* style={{backgroundColor: "#E8E8E8"}} */}
<section  >
        <div className="row my-2">
          <div className="col-lg-2 col-sm-3 my-2">Nombres</div>
          <div className="col-lg-10 col-sm-9 my-2">
            <input name="roomRent"  id='nombres' onChange={(e) => (ChangeConecta_nombre(e.target.value))}type="text" className="cliente form-control" />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-2 col-sm-3 my-2">Apellido 1</div>
          <div className="col-lg-4 col-sm-9 my-2">
            <input name="roomRent" type="text"  id='apellido_paterno'onChange={(e) => setApellido1(e.target.value)} className="cliente form-control" />
          </div>
          <div className="col-lg-2 col-sm-3 my-2">Apellido 2</div>
          <div className="col-lg-4 col-sm-9 my-2">
            <input name="roomRent" type="text" id='apellido_materno' onChange={(e) => setApellido2(e.target.value)} className="cliente form-control" />
          </div>
        </div>
        <div className='row'>
        <div className="col-lg-2 col-sm-3 my-2">Fecha de Nacimiento:</div>
        <div className="col-lg-4 col-sm-9 my-2">
        <input
            type="date"
            required
            id='fecha_nacimiento'
            maxLength={8}
            className="cliente form-control"
          />
        </div>
        <div className="col-lg-2 col-sm-3 my-2">N. Rut:</div>
        <div className="col-lg-4 col-sm-3 my-2">

        <input type="text" className="form-control cliente" required id="RutCliente" value={rut} onChange={handleChangeRut} />
                            {valido ? (
                              <p style={{ color: "green" }}>Rut válido</p>
                            ) : (
                              <p style={{ color: "red" }}>Rut inválido</p>
                            )}
          </div>
          
          <div className="col-lg-2 col-sm-3 my-2">Sexo:</div>
        <div className="col-lg-4 col-sm-9 my-2">
          <input
            type="text"
            value={sexo}
            id='sexo'
            onChange={(e) => setSexo(e.target.value)}
            required
            className="cliente form-control"
          />
        </div>
       
        <div className="col-lg-2 col-sm-3 my-2">Email:</div>
<div className="col-lg-4 col-sm-9 my-2">
  <input
    type="email"
    id="email"
    required
    className="cliente form-control"
    onChange={handleEmailChange}
  />
  <div id="emailValidationMessage"  className="validation-message"></div>
</div>


        <div className="col-lg-2 col-sm-3 my-2">Tipo Contrato:</div>
        <div className="col-lg-4 col-sm-9 my-2">
          <input
            type="text"
            id='tipo_contrato'
            value={'Solo Titular'}
            disabled
            className="cliente form-control"
          />
        </div>
        <div className="col-lg-2 col-sm-3 my-2">Planes:</div>
        <div className="col-lg-4 col-sm-9 my-2">
        <select className="cliente form-control form-select" id="planes"
                        disabled={false}>
                        <option value="0">Seleccione el plan</option>
                        <option value="1">Plan 1 UF 500</option>
                        <option value="2">Plan 2 UF 1.000</option>
                        </select>

        </div>

      </div>
      </section>
        

        </>
    )
}
export default Nombre