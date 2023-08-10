import React, { useEffect, useState, useRef } from 'react';
import * as bootstrap from 'bootstrap';
import axios from 'axios';



function Direccion({ company, clave }) {
    const [selectLlamada, setSelectedLlamada] = useState('');
    const [selectLlamadaDetalle, setSelectedLlamadaDetalle] = useState('');

    const [optionListDireccion, setOptionListDireccion] = useState([]);
    const [optionListDetalle, setOptionListDetalle] = useState([]);
    const [optionListDetalleEstadoDireccion, setOptionListDetalleEstadoDireccion] = useState(true);
    const [optionListDetalleEstadoSelect, setOptionListDetalleEstadoSelect] = useState('0');
    const sesiones = {
        sgui: localStorage.getItem("localgui"),
        scliente: localStorage.getItem("localcliente"),
        sid: localStorage.getItem("localid"),
        sid_usuario: localStorage.getItem("localid_usuario"),
        stoken: localStorage.getItem("token")
    };

    useEffect(() => {
        Company()
    }, []);



    const Company = (async () => {

        const result = await axios.post('https://app.soluziona.cl/API_v1_prod/Soluziona/Generacc/Call/api/Ventas/Call/Comuna', 
        { dato: company }, { headers: { "Authorization": `Bearer ${clave}` } })

        if (result.status === 200) {
            setOptionListDireccion(result.data)

        }

    })

    const ChangeConecta_Direccion = (async (event) => {

        if (event === '0') {
            setOptionListDetalleEstadoDireccion(true)
            setOptionListDetalleEstadoSelect('0')
            setSelectedLlamada('0')
        } else {
            const result =
                await axios.post('https://app.soluziona.cl/API_v1_prod/Soluziona/Generacc/Call/api/Ventas/Call/Ciudad', //cambiar endpoint para ciudad y provincia
                    { dato: event,  dato_2: company }, { headers: { "Authorization": `Bearer ${clave}` } })

            setSelectedLlamada(event)

            if (result.status === 200) {

                setOptionListDetalle(result.data)
                setOptionListDetalleEstadoDireccion(false)

            }
        }


    })

    const ChangeConectaDetalle_Direccion = (async (event) => {

        setOptionListDetalleEstadoDireccion(false)
        setOptionListDetalleEstadoSelect(event)
        setSelectedLlamadaDetalle(event)

    })


    return (

        <>

            <div className="col-lg-2 col-sm-3 my-2">
                <label htmlFor="ddl_departamento_lesionado"> Dpto. </label> </div>
            <div className="form rounded-3 col-lg-4 col-sm-9 my-2">
                <select className="form-control form form-select" id="ddl_departamento_lesionado"
                    disabled={false}
                    // value={select}
                    onChange={(e) => (ChangeConecta_Direccion(e.target.value))}>
                    <option value="0">Departamento</option>
                    {optionListDireccion.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.detalle}
                        </option>
                    ))}
                </select>
            </div>

            <div className="col-lg-2 col-sm-3 my-2">
                <label htmlFor="ddl_ciudad_lesionado">Provincia</label>
            </div>
            <div className="form rounded-3 col-lg-4 col-sm-9 my-2">
                <select className="form-control form-select" id="ddl_ciudad_lesionado"
                    disabled={optionListDetalleEstadoDireccion}
                    value={optionListDetalleEstadoSelect}
                    onChange={(e) => (ChangeConectaDetalle_Direccion(e.target.value))}>
                    <option value="0">Ciudad</option>
                    {optionListDetalle.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.detalle}
                        </option>
                    ))}
                </select>
            </div>

            <div className="col-lg-2 col-sm-3 my-2 ">Dirección</div>
            <div className="col-lg-10 col-sm-9 my-2">
                <input name="roomRent" type="text" className="form-control" />
            </div>


        </>
    )
}
export default Direccion

