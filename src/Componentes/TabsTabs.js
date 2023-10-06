import React, { useEffect, useState, useRef } from "react";
import * as bootstrap from "bootstrap";
import axios from "axios";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import DataTable from "react-data-table-component";
import TablaAdicionalChubb from "./TablaAdicionalChubb";
import TablaAdicionalHogar from "./TablaAdicionalHogar";
import TablaAdicionalVial from "./TablaAdicionalVial";
import TablaAdicionalEducativo from "./TablaAdicionalEducativo";

function TabsTabs({ company, clave, onNoConectaChange }) {
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
      name:<div className=" "> ATENCIÓN EN CASO DE URGENCIAS </div>,
      selector: "ATENCIÓN_EN_CASO_DE_URGENCIAS",
      center: true,
    },
    {
      name: <div className=" ">"Servicio"</div>,
      selector: "Servicio",
      center: true,
    },
    {
      name: <div className=" ">"Carencia"</div>,
      selector: "Carencia",
      center: true,
    },
  ];
  
  const tableData = [
    {
      ATENCIÓN_EN_CASO_DE_URGENCIAS: "Consulta telefónica 24 horas (orientación) ",
      "Servicio": "100%",
      "Carencia": "5"
    },  
    {
      ATENCIÓN_EN_CASO_DE_URGENCIAS: "Servicio de citas a través de nuestra línea a nivel nacional ",
      "Servicio": "100%",
      "Carencia": "5"
    },
    {
      ATENCIÓN_EN_CASO_DE_URGENCIAS: "Atenciones de Emergencias y/o urgencias dentales 24 horas ",
      "Servicio": "100%",
      "Carencia": "5"
    },
    {
      ATENCIÓN_EN_CASO_DE_URGENCIAS: "Diagnóstico de urgencia dental y derivación a especialista  ",
      "Servicio": "100%",
      "Carencia": "5"
    },
    {
      ATENCIÓN_EN_CASO_DE_URGENCIAS: "Radiografía periapical de pieza afectada  ",
      "Servicio": "100%",
      "Carencia": "5"
    },
    {
      ATENCIÓN_EN_CASO_DE_URGENCIAS: "Radiografías bitewing de la pieza afectada ",
      "Servicio": "100%",
      "Carencia": "5"
    },
    {
      ATENCIÓN_EN_CASO_DE_URGENCIAS: "Pulpectomía (excéresis pulpar) ",
      "Servicio": "100%",
      "Carencia": "5"
    },
    {
      ATENCIÓN_EN_CASO_DE_URGENCIAS: "Tratamiento de alveolitis o hemorragia post exodoncias ",
      "Servicio": "100%",
      "Carencia": "5"
    }
  
  ];


  const columns2 = [
    {
      name:<div className=" "> Coberturas </div>,
      selector: "Coberturas",
      center: true,
    },
    {
      name: <div className=" ">	Plan Base: Sólo titula <br/><hr/>Suma Asegurada </div>,
      selector: "Suma_Asegurada",
      center: true,
    }
  ];
  
  const tableData2 = [
    {
      Coberturas: "Muerte Accidental (periodo de carencia 3 meses ",
      "Suma_Asegurada": " S/2,000"
    },  
    {
      Coberturas: "Reembolso de Gastos Médicos por Accidente  ",
      "Suma_Asegurada": " S/1,000"
    },
    {
      Coberturas: "Prima Bruta Mensual* ",
      "Suma_Asegurada": "S/29.90"
    }
  
  ];
  useEffect(() => {
    Company(company);
  }, []);

  const Company = async (company) => {
    const result = await axios.post(
      "https://app.soluziona.cl/API_v1_prod/CallSouthPeru/APIVentas_Call/api/Ventas/Call/ConectaDetalle",
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
     <Tabs id="controlled-tab-example" activeKey={key} onSelect={(k) => setKey(k)} className="mb-3  " >
                  <Tab eventKey="bienvenida" title="Bienvenida">
                    {/* Contenido de la pestaña Bienvenida */}
                    <div className=" p-2">
                      <details>
                        <summary className="">ASISTENCIAS Y COBERTURAS </summary>
                        <div className="card-body login-card-body">
                          <div className="form-row">
                            <p> ADICIONALMENTE, ahora como CLIENTE PREFERENTE/ EXCLUSIVO / podrá usar el programa Sonrie Seguro, le explico brevemente de que se trata
                            </p>
                          </div>
                        </div>
                      </details>
                      <details>
                        <summary className="">
                        GANCHOS DE VENTA Y SENSIBILIZACIÓN 
                        </summary>
                        <div className="card-body login-card-body">
                          <div className="form-row">
                            <p>
                            Opc. 1, ¿Sabía Ud. que los tratamientos dentales son costosos? Es por eso qué …
                            </p>
                            <p>Opc. 2, Sabía Ud. Que con este seguro contará con tarifas preferenciales? Le comento cuales son …
                            </p>
                            <p>
                            Opc 3, Sabía que con este seguro todas las consultas con un odontólogo las podrá utilizar de forma ilimitada son costo alguno, las 24 hoas del día. Muerte Accidental 
                            </p>
                            <p>
                            Opc. 4, ¿Tiene usted hijos, esposa o es cabeza de familia? Imagínese si usted falleciera de un momento a otro a causa de un accidente…es por ese motivo que …. 
                            </p>
                            <p> Opc 5, Se ha puesto a pensar que pasaría con el futuro económico de su familia ante una muerte accidental, Dios no lo quiera, por esta razón …
                            </p>
                          </div>
                        </div>
                      </details>
                    </div>
                  </Tab>
                  <Tab eventKey="presentacion" title="Presentación">
                    {/* Contenido de la pestaña Presentación */}
                    <div className=" p-2">
                      {" "}
                      <details>
                        <summary className=""> ASISTENCIAS Y COBERTURAS (1) </summary>
                        <div className="card-body login-card-body">
                          <div className="form-row">
                            <ol>
                              <li>
                              ¿Sabía Ud. que los tratamientos dentales son costosos? Una Obturación anterior o posterior con resina compuesta de dientes le cuesta aproximadamente 150 soles? Con nosotros por obturación con resina compuesta pagará solo 35 soles por pieza dental. 
                              </li>
                              <li>
                              Sabía Ud. Que con este seguro contará con tarifas preferenciales? Por eje. sólo pagará 50 soles por una endodoncia molar , que en el mercado el precio real es de 300 a 350 soles. ¿Qué le parece?
                              </li>
                              <li>
                              Sabía que con este seguro preferencial, contará con consulta telefónica las 24 horas (orientación en caso de urgencia) ya que en el mercado cuánto cuesta una consulta con un odontólogo tiene un costo de 60soles. 
                              </li>
                              <li>
                              Sabía Ud. Que para los tratamientos dentales que no estén en la cobertura Ud. Tendrá un descuento de 20% del precio de lista (prótesis fijas y removibles, implantes, blanqueamientos, etc.) 
                              </li>
                            </ol>
                            </div>
                            
                        </div>
                      </details>
                      <details>
                        <summary className="">  ASISTENCIAS Y COBERTURAS (2)  </summary>
                        <div className="card-body login-card-body">
                          <div className="form-row">
                          <div>
                            <DataTable columns={columns} data={tableData} customStyles={customStyles} className="mb-3" />
                            <p> Para complementar su cobertura tenemos un rembolso de gastos médicos por accidentes, se le otorgará hasta S/1,000.00 en el año. Y si falleces por accidente, tu familia recibirá una suma asegurada de S/ 2,000 para ayudarte a cubrir los gastos de sepelio, en caso del plan Base.
                            </p>

                            <DataTable columns={columns2} data={tableData2} customStyles={customStyles} className="mb-3" /> <p className="text-danger">Periodo de Carencia: 3 meses para Muerte Accidental (OBLIGATORIO)</p> 
                            </div>
                          </div>
                        </div>
                      </details>
                      <details>
                        <summary className=""> INVERSIÓN </summary>
                        <div className="card-body login-card-body">
                          <div className="form-row">
                            <p> Todos estos beneficios solo le representarán un pago minimo mensual de S/. 29.90 incluido el IGV fijos y congelados , que serían cargados a su tarjeta de crédito Ripley, viéndolo reflejado en su próximo estado de cuenta. 
                            </p>
                            <p className="text-danger">(EJEMPLO Y GANCHO DE LOS 0.90 CENTIMOS DIARIOS) simplemente por tema de calidad previa aceptación haremos una pequeña validación de datos que tenemos acá en el sistema </p> 
                          </div>
                        </div>
                      </details>
                    </div>
                  </Tab>

                  <Tab eventKey="Exclusiones" title="Exclusiones">
                    {/* Contenido de la pestaña Exclusiones */}
                    <div className=" p-2">
                     
                        <details>
                          <summary className=""> EXCLUSIONES </summary>
                          <div className="card-body login-card-body">
                            <div className="form-row">
                              <p> Suicidios, intentos de suicidios, autolesión, motín, prestación militar, Lesiones preexistente, pandemias y epidemias, Acto delictuoso provocado por cualquier persona que resultase favorecida con los alcances de este seguro, incluido el asegurado, Trabajos u oficios de alto riesgo y VIH(SIDA). 
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
export default TabsTabs;
