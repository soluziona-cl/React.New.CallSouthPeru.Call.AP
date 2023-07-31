import React, { useEffect, useState, useRef } from 'react';
import * as bootstrap from 'bootstrap';
import axios from 'axios';
import { event } from 'jquery';
import { ToastContainer, toast } from 'react-toastify';
import Resultado from "./Resultado";

function Producto({ clave }) {
    const [selectLlamada, setSelectedLlamada] = useState('');

    const [optionListMotivoProducto, setOptionListMotivoProducto] = useState([]);
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

        const result = await axios.post('https://app.soluziona.cl/API_v1_prod/CallSouthPeru/ApiCall_Retenciones/api/Ventas/Call/Producto', { dato: null }, { headers: { "Authorization": `Bearer ${clave}` } })

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
    const [productos, setProductos] = useState([{ id: 1 }]);
    const handleAgregarProducto = () => {
        setProductos([...productos, { id: productos.length + 1 }]);
    };

    const presionpoliza = (event) => {
        toast(event)
        alert(event)
    }

    return (

        <>
            {/* <ToastContainer></ToastContainer>            */}
            {productos.map((producto, index) => (
                <section className="row my-1 bg-info text-white ms-1" key={index}>
                    <div className="col-lg-1 col-sm-3">Producto</div>
                    <div className="col-lg-5 col-sm-9 my-1">
                        <select className="form-control form-select cliente" id={index} onChange={(e) => (ChangeConecta_producto(e.target.value))}>
                            <option value="0">Seleccione un producto</option>
                            {optionListMotivoProducto.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.detalle}
                                </option>
                            ))}
                        </select>
                    </div>
                    {/* <div className="col-lg-2 col-sm-3">

                    </div> */}
                    <div className="col-lg-2 col-sm-3 col-xs-12 my-1">
                        <button className="btn btn-secondary form-control ">INFO </button>
                    </div>
                    <div className="col-lg-2 col-sm-3 col-xs-12 my-1">
                        <button className="btn btn-secondary form-control" id='presionpoliza' value={index} onClick={(e) => presionpoliza(e.target.value)} > PÓLIZA</button>
                    </div>
                    <div className="col-lg-2 col-sm-4 col-xs-12 my-1">
                        <Resultado clave={clave}></Resultado>
                    </div>

                </section>
            ))}

            <div className=" col-lg-1 col-sm-2">
                <button className="btn btn-outline-secondary form-control" onClick={handleAgregarProducto}>
                    <i className="fa-solid fa-plus"></i>
                </button>
            </div>

        </>
    )
}
export default Producto