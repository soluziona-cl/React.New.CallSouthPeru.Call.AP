import React, { useEffect, useState, useRef } from 'react';
import * as bootstrap from 'bootstrap';
import axios from 'axios';
import { event } from 'jquery';



function Resultado({ clave }) {
    const [selectLlamada, setSelectedLlamada] = useState('');
    const [selectLlamadaDetalle, setSelectedLlamadaDetalle] = useState('');

    const [optionListMotivoProducto, setOptionListMotivoProducto] = useState([]);
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
        Company()
    }, []);



    const Company = (async () => {

        const result = await axios.post('https://app.soluziona.cl/API_v1_prod/CallSouthPeru/ApiCall_Retenciones/api/Ventas/Call/Resultado', { dato: null }, { headers: { "Authorization": `Bearer ${clave}` } })

        if (result.status === 200) {
            setOptionListMotivoProducto(result.data)

            // console.log(result.data)
            //  console.log(optionList)

        }

    })

    const ChangeConecta_producto = (async (event) => {

        if (event === '0') {
            setOptionListDetalleEstado(true)
            setOptionListDetalleEstadoSelect('0')
            setSelectedLlamada('0')
        } else {



            setOptionListDetalleEstado(false)


        }


    })


    return (

        <>

           
                <select className="form-control form-select cliente" id="ddl_resultado" onChange={(e) => (ChangeConecta_producto(e.target.value))}>
                    <option value="0">Seleccione Resultado</option>
                    {optionListMotivoProducto.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.detalle}
                        </option>
                    ))}
                </select>
        

            {/* <div className="col-lg-2 col-sm-3 ">Resultado</div>
                        <div className="col-lg-4 col-sm-9">
                            <select className="form-control form-select cliente" id="ddl_resultado" onChange={(e) => (ChangeConecta_producto(e.target.value))}>
                                <option value="0">Seleccione Resultado</option>
                                {optionListMotivoProducto.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.detalle}
                                    </option>
                                ))}
                            </select>
                        </div> */}


        </>
    )
}
export default Resultado