import React, { useEffect, useState, useRef } from 'react';
import * as bootstrap from 'bootstrap';
import axios from 'axios';



function Fono({company,clave}) {
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

    const ChangeConecta_fono = (async (event) => {

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

    function permitirSoloNumeros(inputId) {
        var input = document.getElementById(inputId);
        if (input) {
          input.addEventListener('input', function (event) {
            input.value = event.target.value.replace(/\D/g, '');
          });
        }
      }
    
      permitirSoloNumeros('n_documento');
      permitirSoloNumeros('val_fono');

    return (

        <>
         <div className="col-lg-2 col-sm-3 my-2 ">Fono 1</div>
                    <div className="col-lg-4 col-sm-9 my-2">
                      <input name="val_fono" id="val_fono" type="text" className="form-control" />
                    </div>
                    <div className="col-lg-2 col-sm-3 my-2">Fono 2</div>
                    <div className="col-lg-4 col-sm-9 my-2">
                      <input name="val_fono" id="val_fono" type="text" className="form-control" />
                    </div>
            {/* <div className="row mb-2">              
                <div className="col-sm-12 col-md-12 col-lg-6">
                <div className="col-lg-2 col-sm-3 ">Motivo</div>
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
            </div> */}
        </>
    )
}
export default Fono