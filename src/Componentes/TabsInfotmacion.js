import React, { useEffect, useState, useRef } from "react";
import * as bootstrap from "bootstrap";
import axios from "axios";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";


function Tabsinformacion({ company, clave, onNoConectaChange }) {
  const [optionListMotivo, setOptionListMotivo] = useState([]);
  const [key, setKey] = useState("bienvenida");
  // const sesiones = {
  //   sgui: localStorage.getItem("localgui"),
  //   scliente: localStorage.getItem("localcliente"),
  //   sid: localStorage.getItem("localid"),
  //   sid_usuario: localStorage.getItem("localid_usuario"),
  //   stoken: localStorage.getItem("token"),
  // };
  const customStyles = {
    rows: {
      style: {
        minHeight: "40px",
        maxHeight: "60px",
        border: "1px solid #9E9E9E",
        borderRadius: "3px",
      },
      striped: {
        backgroundColor: "#9E9E9E",
      },
    },
    headCells: {
      style: {
        paddingLeft: "4px",
        paddingRight: "4px",
        color: "#FFFFFF",
        backgroundColor: "#9E9E9E",
      },
    },
    cells: {
      style: {
        paddingLeft: "4px",
        paddingRight: "4px",
        fontSize: "12px",
      },
    },
  };

  const columns = [
    {
      name: "Coberturas",
      selector: row => row.Coberturas,
      center: true,
    },
    {
      name: "Plan 1",
      selector: row => row.Plan_1,
      center: true,
    },
    {
      name: "Límites",
      selector: row => row.Límites,
      center: true,
    },
  ];

  const tableData = [
    {
      Coberturas: "AcciRobo de Contenido de Bolso* (con un deducible de 5%)dental",
      "Plan_1": "S/1,500",
      Límites: "Máximo 2 eventos por año**// Límite Anual Asegurable: S/1,500",
    },
    {
      Coberturas: "Muerte Accidental",
      "Plan_1": "S/30,000",
      Límites: "",
    },
    {
      Coberturas: "Renta Hospitalaria por Accidente (máx. 30 días)",
      "Plan_1": "S/500",
      Límites: "	Límite Anual Asegurable: S/500",
    },
  ];
  useEffect(() => {
    Company(company);
  }, []);

  const Company = async (company) => {
    const result = await axios.post(
       "https://app.soluziona.cl/API_QA/Peru/Call/api/Ventas_CRM/Call/ConectaDetalle",
      { dato: company },
      { headers: { Authorization: `Bearer ${clave}` } }
    );
    if (result.status === 200) {
      setOptionListMotivo(result.data);
      //console.log(result.data)
    } else {
      setOptionListMotivo([]);
    }
  };

  return (
    <>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3  "
      >
        <Tab eventKey="Adicional1" title="Información Adicional">
          <div className=" p-2">
            <details>
              <summary className="">
                ASISTENCIA PROCESOS EN CASO DE SINIESTRO
              </summary>
              <div className="card-body login-card-body">
                <div className="form-row">
                  <p>
                    {" "}
                    En caso necesites utilizar las asistencias, Llamar al (01)
                    613 1387 (para Lima y provincia) Ante cualquier siniestro
                    deberá avisar a CHUBB Seguros Perú, en un plazo no mayor a
                    treinta (30) días calendario luego de ocurrido el suceso, el
                    número de contacto es el (01) 417-5000 o al (01) 399-1212 de
                    lunes a viernes de 9 a.m. a 6 p.m.
                  </p>
                  <p>
                    {" "}
                    Además, no olvides que debe presentar los documentos
                    señalados en su Solicitud-Certificado según cobertura. El
                    detalle completo de coberturas y condiciones del producto
                    las podrás encontrar en tu Solicitud-Certificado.
                  </p>
                </div>
              </div>
            </details>
            <details>
              <summary className="">FORMA DE ACEPTACIÓN </summary>
              <div className="card-body login-card-body">
                <div className="form-row">
                  <p>
                    {" "}
                    Recuerda que la presente llamada, la misma que incluye tu
                    aceptación al seguro y el cargo mensual en la Tarjeta
                    Ripley, ha sido debidamente grabada, forma parte del
                    contrato del seguro.
                  </p>
                </div>
              </div>
            </details>
            <details>
              <summary className="">LEY DE PROTECCIÓN DE DATOS </summary>
              <div className="card-body login-card-body">
                <div className="form-row">
                  <p>
                    El ASEGURADO acepta expresamente que la COMPAÑÍA Chubb
                    Seguros Perú S.A transfiera sus datos personales a entidades
                    y/o personas para el cumplimiento de las actividades
                    necesarias para el desarrollo del servicio contratado,
                    específicamente a la compañía de seguros Chubb.{" "}
                  </p>
                  <p>
                    {" "}
                    El ASEGURADO acepta y consiente que el tratamiento de los
                    datos personales tendrá como consecuencia que estos puedan
                    ser tratados por Chubb Seguros Perú S.A para realizar
                    estudios estadísticos y de siniestralidad, a través de
                    medios electrónicos, llamadas telefónicas o correspondencia
                    escrita, así como el flujo transfronterizo de la información
                    a otras entidades ubicadas en Estados Unidos con la
                    finalidad de realizar actividades relacionadas a la
                    naturaleza del contrato, garantizar la continuidad de las
                    operaciones de la empresa ante cualquier contingencia y la
                    gestión de otras solicitudes o contratos por parte de Chubb
                    Seguros Perú S.A.
                  </p>
                  <p>
                    {" "}
                    EL ASEGURADO manifiesta que tiene conocimiento sobre sus
                    derechos de acceso, rectificación, oposición y cancelación
                    de sus datos personales, cuyo carácter es gratuito; bastando
                    para ello enviar un correo consignado nombre y apellidos,
                    tipo y número de documentos de identidad, datos respecto de
                    los cuales busca ejercer sus derechos y medio de contacto;
                    mediante comunicación dirigida a :
                    atencion.seguros@chubb.com
                  </p>
                </div>
              </div>
            </details>
            <details>
              <summary className="">DERECHO DE ARREPENTIMIENTO</summary>
              <div className="card-body login-card-body">
                <div className="form-row">
                  <p>
                    {" "}
                    Ud. podrá comunicarnos, vía telefónica, electrónica o
                    física, su decisión de resolver el contrato en un plazo de
                    quince días a partir de la fecha en que se le entregó su
                    Solicitud-Certificado, sin expresión de causa ni penalidad
                    alguna y siempre que no haya hecho uso de las coberturas ni
                    asistencias otorgadas. En caso la prima ya hubiera sido
                    cargada a su tarjeta de crédito, CHUBB Seguros Perú,
                    procederá a la devolución total del importe pagado en un
                    plazo máximo de 30 días calendarios.
                  </p>
                </div>
              </div>
            </details>
          </div>
        </Tab>
      </Tabs>
    </>
  );
}
export default Tabsinformacion;
