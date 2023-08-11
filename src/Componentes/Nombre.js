import React, { useEffect, useState, useRef } from 'react';
import * as bootstrap from 'bootstrap';
import axios from 'axios';



function Nombre({company,clave}) {
    const [selectLlamada, setSelectedLlamada] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [rut, setRut] = useState('');
    const [direccion, setDireccion] = useState('');
    const [email, setEmail] = useState('');
    const [apellido_1, setApellido1] = useState('');
    const [apellido_2, setApellido2] = useState('');

    const [optionListMotivo, setOptionListMotivo] = useState([]);
    const [optionListDetalle, setOptionListDetalle] = useState([]);
    const [optionListDetalleEstado, setOptionListDetalleEstado] = useState(true);
    const [optionListDetalleEstadoSelect, setOptionListDetalleEstadoSelect] = useState('0');
    const sesiones = {
        sgui: localStorage.getItem("localgui"),
        scliente: localStorage.getItem("localcliente"),
        sid: localStorage.getItem("localid"),
        sid_usuario: localStorage.getItem("localid_usuario"),
        stoken: localStorage.getItem("token")
    };

    useEffect(() => {
        Company(company)
    }, []);



    const Company = (async (company) => {

        const result = await axios.post('https://app.soluziona.cl/API_v1_prod/CallSouthPeru/ApiCall_Retenciones/api/Ventas/Call/ConectaDetalle', { dato: company }, { headers: { "Authorization": `Bearer ${clave}` } })

        if (result.status === 200) {
            setOptionListMotivo(result.data)

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
<section className='bg card p-3' style={{backgroundColor: "#E8E8E8"}} >
        <div className="row my-2">
          <div className="col-lg-2 col-sm-3 my-2">Nombres</div>
          <div className="col-lg-10 col-sm-9 my-2">
            <input name="roomRent"  id='nombres' onChange={(e) => (ChangeConecta_nombre(e.target.value))}type="text" className="form-control" />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-2 col-sm-3 my-2">Apellido 1</div>
          <div className="col-lg-4 col-sm-9 my-2">
            <input name="roomRent" type="text"  id='apellido_1'onChange={(e) => setApellido1(e.target.value)} className="form-control" />
          </div>
          <div className="col-lg-2 col-sm-3 my-2">Apellido 2</div>
          <div className="col-lg-4 col-sm-9 my-2">
            <input name="roomRent" type="text" id='apellido_2' onChange={(e) => setApellido2(e.target.value)} className="form-control" />
          </div>
        </div>
        <div className='row'>
            
        <div className="col-lg-2 col-sm-3 my-2">Fecha de Nacimiento:</div>
        <div className="col-lg-4 col-sm-9 my-2">
          <input
            type="date"
            value={fechaNacimiento}
            onChange={(e) => setFechaNacimiento(e.target.value)}
            required
            className="form-control cliente"
          />
        </div>
        <div className="col-lg-2 col-sm-3 my-2">N. Rut:</div>
        <div className="col-lg-4 col-sm-9 my-2">
          <input
            type="text"
            value={rut}
            onChange={(e) => setRut(e.target.value)}
            required
            className="form-control"
          />
        </div>
       
        <div className="col-lg-2 col-sm-3 my-2">Email:</div>
        <div className="col-lg-4 col-sm-9 my-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <div className="col-lg-2 col-sm-3 my-2">Tipo Contrato:</div>
        <div className="col-lg-4 col-sm-9 my-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <div className="col-lg-2 col-sm-3 my-2">Planes:</div>
        <div className="col-lg-4 col-sm-9 my-2">
        <select className="form-control form-select" id="planes"
                        disabled={false}>
                        <option value="0">Seleccione el sexo</option>
                        <option value="1">Plan 1 UF 500</option>
                        <option value="2">Plan 2 UF 1.000</option>
                        </select>

        </div>

      </div>
      </section>
        

            {/* <div className="row mb-2">              
                <div className="col-sm-12 col-md-12 col-lg-6">
                <div className="col-lg-2 col-sm-3 ">Motivo</div>
                    <select className="form-control form-select" id="ddl_motivo_1"
                        disabled={false}
                        // value={select}
                        onChange={(e) => (ChangeConecta_nombre(e.target.value))}>
                        <option value="0">Motivo</option>
                        {optionListMotivo.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.detalle}
                            </option>
                        ))}
                    </select>
                </div>
               
            </div> */}
        </>
    )
}
export default Nombre