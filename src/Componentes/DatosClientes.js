import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

function DatosClientes({ company, clave, datafull }) {
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

        const result = await axios.post('https://app.soluziona.cl/API_v1_prod/Soluziona/Generacc/Call/api/Ventas/Call/ConectaDetalle', { dato: company }, { headers: { "Authorization": `Bearer ${clave}` } })

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
            const result = await axios.post('https://app.soluziona.cl/API_v1_prod/Soluziona/Generacc/Call/api/Ventas/Call/ConectaDetalle', { dato: event }, { headers: { "Authorization": `Bearer ${clave}` } })

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
            <div className="container-fluid">
                <div className="highlight">
                    <div className="centtro">
                        <div className="row">
                            <h3>Datos Cliente</h3>
                            <hr />
                        </div>
                        {datafull.map((data, index) => (
                            <>
                                {/* {console.log(data)} */}
                                <div className="container" id="nombre_scroll">
                                    <div className="row my-3">
                                        <div className="col-4 offset-8 text-right position-fixed" style={{ top: 0, right: 0, zIndex: 9999 }}>
                                            Nombre Completo
                                        </div>
                                        <div
                                            className="col-4 offset-8 position-fixed"
                                            style={{ top: 30, right: 0, zIndex: 9999 }}
                                        >
                                            <input
                                                name="roomRent"
                                                type="text"
                                                value={data.ENTEL_NOMBRE_COMPLETO}
                                                className=" form-control text-right"
                                                disabled
                                            />
                                        </div>
                                    </div>
                                </div>


                                <div className="row my-3">
                                    <div className="col-lg-1 col-md-2">Rut</div>
                                    <div className="col-lg-2 col-md-6">
                                        <input
                                            name="roomRent"
                                            type="text"
                                            value={data.ENTEL_RUT_CON_GUION}
                                            className="form-control"
                                            disabled
                                        />
                                    </div>
                                    <div className="col-lg-1">Intentos</div>
                                    <div className="col-lg-1 col-md-6">
                                        <input
                                            name="roomRent"
                                            type="text"
                                            value={data.intentos}
                                            className="  form-control"
                                            disabled
                                        />
                                    </div>
                                    <div className="col-lg-2">Nombre Completo</div>
                                    <div className="col-lg-5 col-md-12">
                                        <input
                                            name="roomRent"
                                            type="text"
                                            value={data.ENTEL_NOMBRE_COMPLETO}
                                            className=" form-control"

                                            disabled
                                        />
                                    </div>
                                </div>

                                <div className="row my-3">
                                    <div className="col-lg-1">Email</div>
                                    <div className="col-lg-3 col-md-12">
                                        <input
                                            name="roomRent"
                                            type="text"
                                            value={data.ENTEL_EMAIL}
                                            className=" form-control"
                                            disabled
                                        />
                                    </div>
                                    <div className="col-lg-1">Region</div>
                                    <div className="col-lg-4 col-md-6">
                                        <input
                                            name="roomRent"
                                            type="text"
                                            value={data.ENTEL_REGION}
                                            className=" form-control"
                                            disabled
                                        />
                                    </div>
                                    <div className="col-lg-1">Grupo</div>
                                    <div className="col-lg-2 col-md-6">
                                        <input
                                            name="roomRent"
                                            type="text"
                                            value={data.ENTEL_GRUPO}
                                            className=" form-control"
                                            disabled
                                        />
                                    </div>
                                </div>


                                <div className="row my-3">
                                    <div className="col-lg-2">Telefono 1</div>
                                    <div className="col-lg-2 col-md-6">
                                        <input
                                            name="roomRent"
                                            type="text"
                                            value={data.ENTEL_TELEFONO_1}
                                            className=" form-control"
                                            disabled
                                        />
                                    </div>
                                    <div className="col-lg-2">Telefono 2</div>
                                    <div className="col-lg-2 col-md-6">
                                        <input
                                            name="roomRent"
                                            type="text"
                                            value={data.ENTEL_TELEFONO_2}
                                            className=" form-control"
                                            disabled
                                        />
                                    </div>
                                    <div className="col-lg-2">Telefono 3</div>
                                    <div className="col-lg-2 col-md-6">
                                        <input
                                            name="roomRent"
                                            type="text"
                                            value={data.ENTEL_TELEFONO_3}
                                            className=" form-control"
                                            disabled
                                        />
                                    </div>
                                    <div className="col-lg-2">Telefono 4</div>
                                    <div className="col-lg-2 col-md-6">
                                        <input
                                            name="roomRent"
                                            type="text"
                                            value={data.ENTEL_TELEFONO_4}
                                            className=" form-control"
                                            disabled
                                        />
                                    </div>
                                    <div className="col-lg-2">Telefono 5</div>
                                    <div className="col-lg-2 col-md-6">
                                        <input
                                            name="roomRent"
                                            type="text"
                                            value={data.ENTEL_TELEFONO_5}
                                            className=" form-control"
                                            disabled
                                        />
                                    </div>
                                    <div className="col-lg-2">Telefono 6</div>
                                    <div className="col-lg-2 col-md-6">
                                        <input
                                            name="roomRent"
                                            type="text"
                                            value={data.ENTEL_TELEFONO_6}
                                            className=" form-control"
                                            disabled
                                        />
                                    </div>
                                </div>
                                <div className="row my-3">
                                    <div className="col-lg-5 col-md-12">Observacion Agenda</div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-12 col-md-6">
                                        <textarea
                                            rows="3"
                                            name="roomRent"
                                            type="text"
                                            value={data.Observacion_Agenda}
                                            className=" form-control"
                                            disabled
                                        />
                                    </div>
                                </div>
                            </>
                        ))}
                    </div>
                </div>
            </div>

        </>
    )
}
export default DatosClientes