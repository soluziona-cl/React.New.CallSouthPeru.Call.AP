import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

function Motivo_Submotivo({company,clave}) {
    const [selectLlamada, setSelectedLlamada] = useState('');
    const [selectLlamadaDetalle, setSelectedLlamadaDetalle] = useState('');

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

    const ChangeConecta_motivo = (async (event) => {

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

    const ChangeConectaDetalle_submotivo = (async (event) => {

        setOptionListDetalleEstado(false)
        setOptionListDetalleEstadoSelect(event)
        setSelectedLlamadaDetalle(event)

    })


    return (
        <>   
                    <div className="col-lg-2 col-sm-3 my-2">Motivo</div>
                    <div className="col-lg-4 col-sm-9 my-2">
                    <select className="form-control form-select" id="ddl_motivo_1"
                        disabled={false}
                        // value={select}
                        onChange={(e) => (ChangeConecta_motivo(e.target.value))}>
                        <option value="0">Motivo</option>
                        {optionListMotivo.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.detalle}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="col-lg-2 col-sm-3 my-2"> Sub-Motivo</div>
                    <div className="col-lg-4 col-sm-9 my-2">
                    <select className="form-control form-select" id="ddl_submotivo_1"
                        disabled={optionListDetalleEstado}
                        value={optionListDetalleEstadoSelect}
                        onChange={(e) => (ChangeConectaDetalle_submotivo(e.target.value))}>
                        <option value="0">Sub-Motivo</option>
                        {optionListDetalle.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.detalle}
                            </option>
                        ))}
                    </select>
                </div>
        
        </>
    )
}
export default Motivo_Submotivo