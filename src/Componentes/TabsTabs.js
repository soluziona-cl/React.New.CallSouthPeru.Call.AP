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
      name: "Coberturas",
      selector: "Coberturas",
      center: true,
    },
    {
      name: "Opción 1",
      selector: "Opción 1",
      center: true,
    },
  ];
  
  const tableData = [
    {
      Coberturas: "Accidental",
      "Opción 1": "S/50,000",
    },
    {
      Coberturas: "Invalidez Total y Permanente por Accidente",
      "Opción 1": "S/70,000",
    },
    {
      Coberturas: "Renta Hospitalaria por Accidente (máx. 30 días)",
      "Opción 1": "S/75",
    },
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
                        <summary className="">OFRECIMIENTO DEL SEGURO</summary>
                        <div className="card-body login-card-body">
                          <div className="form-row">
                            <p> Adicional podrá hacer uso de la cobertura del PROGRAMA Protección Accidental con Asistencia Integral el cual podrá utilizar apenas corte esta llamada,
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
                              <u>Renta Hospitalaria por accidente </u>
                            </p>
                            <p> Opc. 1, Sabías que Perú es uno de los países con mayor riesgo de accidentes y que muchos de ellos requieren de una hospitalización? Es por eso por lo que …
                            </p>
                            <p>
                              Opc. 2, En Perú el _% de accidentes que ocurren
                              requieren de una hospitalización, es por eso que
                              ...
                            </p>
                            <p>
                              <u>Invalidez total y permanente por Accidente</u>
                            </p>
                            <p> Opc 3, Sabías que Perú es uno de los países con mayor riesgo de accidentes y que muchos de ellos terminan en invalidez total y permanente? Es por eso por lo que …(se menciona el detalle de la cobertura)
                            </p>
                            <p>
                              <u>Muerte Accidental</u>
                            </p>
                            <p> Opc. 4, ¿Tiene usted hijos, esposa o es cabeza de familia? Imagínese si usted falleciera de un momento a otro a causa de un accidente…es por ese motivo que …. (se menciona el detalle de la cobertura)
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
                        <summary className="">COBERTURAS</summary>
                        <div className="card-body login-card-body">
                          <div className="form-row">
                            <p>
                              <u>Renta Hospitalaria por accidente: </u>
                            </p>
                            <p> … Le otorgaremos dinero en efectivo, S/.75 por cada 24 horas que se encuentre hospitalizado a consecuencia de algún accidente (hasta un máximo de 30 días y con un 1 día de deducible) esto puede ser en cualquier clínica, hospital o centro de salud de su preferencia (legalmente establecido).
                            </p>
                            <p> Por ejemplo: Si la hospitalización dura 10 días, entonces recibirá la cantidad de S/. 675 y así sucesivamente, hasta llegar al tope de los 30 días. ¡Muy bueno! ¿Verdad?
                            </p>
                            <p>
                              <u>
                                Invalidez total y permanente por Accidente:{" "}
                              </u>
                            </p>
                            <p> … Le otorgaremos la suma S/. 70,000 a raíz de quedar con invalidez total y permanente producto de un accidente. El dinero es de libre disponibilidad y lo podrá utilizar para su familia, para la educación de sus hijos, vivienda, salud entre otros. De esta manera estaría dejando protegido a los suyos en estos momentos tan difíciles de prevenir.
                            </p>
                            <p>
                              <u>Muerte accidental:</u>
                            </p>
                            <p> … Queremos respaldar a su familia brindándoles un apoyo económico de S/50,000. Si a consecuencia de cualquier accidente Ud. pierde la vida, este dinero servirá para poder afrontar todos los gastos que se generan al ya no estar con su familia.
                            </p>
                            <br />
                            </div>
                            <div>
                            <DataTable columns={columns} data={tableData} customStyles={customStyles} className="mb-3" />
                            </div>
                        </div>
                      </details>
                      <details>
                        <summary className="">Exclusiones</summary>
                        <div className="card-body login-card-body">
                          <div className="form-row">
                            <p> Suicidios, intentos de suicidios, autolesión, motín, prestación militar, Lesiones preexistente, pandemias y epidemias, Acto delictuoso provocado por cualquier persona que resultase favorecida con los alcances de este seguro, incluido el asegurado, Trabajos u oficios de alto riesgo y VIH(SIDA).
                            </p>
                          </div>
                        </div>
                      </details>
                    </div>
                  </Tab>

                  <Tab eventKey="Adicional" title="Adicional">
                    {/* Contenido de la pestaña Exclusiones */}
                    <div className=" p-2">
                     
                        <details>
                          <summary className="">ASISTENCIAS</summary>
                          <div className="card-body login-card-body">
                            <div className="form-row">
                              <p> Adicionalmente le brindaremos un paquete de asistencia integral de salud, hogar y vial que podrán ser usados por usted y sus familiares directos (cónyuge e hijos menores de 18 años), durante las 24 horas del día. Le explico cuáles son:
                              </p>
                              <h6>DETALLE ASISTENCIAS:</h6>
                              <ul>
                                <li> MÉDICAS: Conocemos la importancia de contar con orientación médica y un respaldo ante emergencias que pongan en peligro nuestra salud, es por ello que le brindamos beneficios de asistencia médica, desde servicios de telemedicina hasta envío de médico a domicilio y traslado en ambulancia por emergencia. Nos preocupamos por usted y queremos que tenga a la mano estas facilidades.
                                </li>
                                <li> Hogar, Vial: De igual manera, podrá contar con un paquete de asistencias para el hogar, que le cubrirán hasta S/ 250.00 en caso requiera servicios de cerrajería, gasfitería o electricista por emergencia, entre otras más. Asimismo, en caso necesite auxilio vial, contará con una cobertura de S/ 525.00 por evento y S/600 por evento para el envío de una grúa o remolque en caso sufra un accidente o avería. Hoy en día, estar tranquilos en casa y seguros cuando salimos debe ser prioridad para todos.{" "}
                                </li>
                              </ul>
                            </div>
                          </div>
                        </details>
                        <details>
                          <summary className="">ASISTENCIA MEDICA</summary>
                          <div className="card-body login-card-body">
                            <div className="form-row">
                            <TablaAdicionalChubb/>
                            </div>
                          </div>
                        </details>
                     
                      <details>
                        <summary className="">ASISTENCIA HOGAR</summary>

                        <div className="card-body login-card-body">
                          <div className="form-row">
                           <TablaAdicionalHogar/>
                          </div>
                        </div>
                      </details>

                      <details>
                        <summary className="">ASISTENCIA VIAL</summary>
                        <div className="card-body login-card-body">
                          <div className="form-row">
                          <TablaAdicionalVial/>
                          </div>
                        </div>
                      </details>

                      <details>
                        <summary className="">ASISTENCIA EDUCATIVA</summary>
                        <div className="card-body login-card-body">
                          <div className="form-row">
                           <TablaAdicionalEducativo/>
                            <p> Para sus hijos, también contamos con un profesor virtual que podrá apoyarlos en las materias de Matemática, Inglés e Historia del Perú, con clases particulares de hasta 1 hora de las que no tendrá que preocuparse por el costo.
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
                            <p> Todos estos beneficios solo le representarán un pago minimo mensual de S/. 29.90 incluido el IGV fijos y congelados , que serían cargados a su tarjeta de crédito Ripley, viéndolo reflejado en su próximo estado de cuenta. (EJEMPLO Y GANCHO DE LOS 0.90 CENTIMOS DIARIOS) simplemente por tema de calidad previa aceptación haremos una pequeña validación de datos que tenemos acá en el sistema{" "}
                            </p>
                          </div>
                        </div>
                      </details>
                    </div>
                  </Tab>

                  <Tab eventKey="Adicional1" title="Adicional1">
                    <div className=" p-2">
                    <details>
                      <summary className="">
                        ASISTENCIA PROCESOS EN CASO DE SINIESTRO
                      </summary>
                      <div className="card-body login-card-body">
                        <div className="form-row">
                          <p> En caso necesites utilizar las asistencias, Llamar al (01) 613 1387 (para Lima y provincia) Ante cualquier siniestro deberá avisar a CHUBB Seguros Perú, en un plazo no mayor a treinta (30) días calendario luego de ocurrido el suceso, el número de contacto es el (01) 417-5000 o al (01) 399-1212 de lunes a viernes de 9 a.m. a 6 p.m.
                          </p>
                          <p> Además, no olvides que debe presentar los documentos señalados en su Solicitud-Certificado según cobertura. El detalle completo de coberturas y condiciones del producto las podrás encontrar en tu Solicitud-Certificado.
                          </p>
                        </div>
                      </div>
                    </details>
                    <details>
                      <summary className="">FORMA DE ACEPTACIÓN </summary>
                      <div className="card-body login-card-body">
                        <div className="form-row">
                          <p> Recuerda que la presente llamada, la misma que incluye tu aceptación al seguro y el cargo mensual en la Tarjeta Ripley, ha sido debidamente grabada, forma parte del contrato del seguro.
                          </p>
                        </div>
                      </div>
                    </details>
                    <details>
                      <summary className="">
                        LEY DE PROTECCIÓN DE DATOS{" "}
                      </summary>
                      <div className="card-body login-card-body">
                        <div className="form-row">
                          <p>
                            El ASEGURADO acepta expresamente que la COMPAÑÍA Chubb Seguros Perú S.A transfiera sus datos personales a entidades y/o personas para el cumplimiento de las actividades necesarias para el  desarrollo del servicio contratado, específicamente a la compañía de seguros Chubb.{" "}
                          </p>
                          <p> El ASEGURADO acepta y consiente que el tratamiento de los datos personales tendrá como consecuencia que estos puedan ser tratados por Chubb Seguros Perú S.A para realizar estudios estadísticos y de siniestralidad, a través de medios electrónicos, llamadas telefónicas o correspondencia escrita, así como el flujo transfronterizo de la información a otras entidades ubicadas en Estados Unidos con la finalidad de realizar actividades relacionadas a la naturaleza del contrato, garantizar la continuidad de las operaciones de la empresa ante cualquier contingencia y la gestión de otras solicitudes o contratos por parte de Chubb Seguros Perú S.A.
                          </p>
                          <p> EL ASEGURADO manifiesta que tiene conocimiento sobre sus derechos de acceso, rectificación, oposición y cancelación de sus datos personales, cuyo carácter es gratuito; bastando para ello enviar un correo consignado nombre y apellidos, tipo y número de documentos de identidad, datos respecto de los cuales busca ejercer sus derechos y medio de contacto; mediante comunicación dirigida a : atencion.seguros@chubb.com
                          </p>
                        </div>
                      </div>
                    </details>
                    <details>
                      <summary className="">DERECHO DE ARREPENTIMIENTO</summary>
                      <div className="card-body login-card-body">
                        <div className="form-row">
                          <p> Ud. podrá comunicarnos, vía telefónica, electrónica o física, su decisión de resolver el contrato en un plazo de quince días a partir de la fecha en que se le entregó su Solicitud-Certificado, sin expresión de causa ni penalidad alguna y siempre que no haya hecho uso de las coberturas ni asistencias otorgadas. En caso la prima ya hubiera sido cargada a su tarjeta de crédito, CHUBB Seguros Perú, procederá a la devolución total del importe pagado en un plazo máximo de 30 días calendarios.
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
