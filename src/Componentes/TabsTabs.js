import React, { useEffect, useState, useRef } from "react";
import * as bootstrap from "bootstrap";
import axios from "axios";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import AsistenciasCoberturas2 from "./AsistenciasCoberturas2";
import AsistenciasCoberturasb from "./AsistenciasCoberturasb";

function TabsTabs() {
  const [key, setKey] = useState("bienvenida");

  return (
    <>
      <Tabs id="controlled-tab-example" activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
        <Tab eventKey="bienvenida" title="Bienvenida">
          {/* Contenido de la pestaña Bienvenida */}
          <div className=" p-2">
            <details>
              <summary className="">ASISTENCIAS Y COBERTURAS </summary>
              <div className="card-body login-card-body">
                <div className="form-row">
                  <p> ADICIONALMENTE, ahora como CLIENTE PREFERENTE/ EXCLUSIVO / podrá usar el programa Sonrie Seguro, le explico brevemente de que se trata </p>
                </div>
              </div>
            </details>
            <details>
              <summary className="">GANCHOS DE VENTA Y SENSIBILIZACIÓN</summary>
              <div className="card-body login-card-body">
                <div className="form-row">
                  <p> Opc. 1, ¿Sabía Ud. que los tratamientos dentales son costosos? Es por eso qué … </p>
                  <p> Opc. 2, Sabía Ud. Que con este seguro contará con tarifas preferenciales? Le comento cuales son … </p>
                  <p> Opc 3, Sabía que con este seguro todas las consultas con un odontólogo las podrá utilizar de forma ilimitada son costo alguno, las 24 hoas del día. Muerte Accidental </p>
                  <p> Opc. 4, ¿Tiene usted hijos, esposa o es cabeza de familia? Imagínese si usted falleciera de un momento a otro a causa de un accidente…es por ese motivo que …. </p>
                  <p> Opc 5, Se ha puesto a pensar que pasaría con el futuro económico de su familia ante una muerte accidental, Dios no lo quiera, por esta razón …  </p>
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
                    <li> ¿Sabía Ud. que los tratamientos dentales son costosos? Una Obturación anterior o posterior con resina compuesta dedientes le cuesta proximadamente 150 soles? Con nosotros por obturación con resina compuesta pagará solo 35 soles por pieza dental. </li>
                    <li> Sabía Ud. Que con este seguro contará con tarifas preferenciales? Por eje. sólo pagará 50 soles por una endodoncia molar , que en el mercado el precio real es de 300 a 350 soles. ¿Qué le parece? </li>
                    <li> Sabía que con este seguro preferencial, contará con consulta telefónica las 24 horas (orientación en caso de urgencia) ya que en el mercado cuánto cuesta una consulta con un odontólogo tiene un costo de 60soles. </li>
                    <li> Sabía Ud. Que para los tratamientos dentales que no estén en la cobertura Ud. Tendrá un descuento de 20% del precio de lista (prótesis fijas y removibles, implantes, blanqueamientos, etc.) </li>
                  </ol>
                </div>
              </div>
            </details>
            <details>
              <summary className=""> ASISTENCIAS Y COBERTURAS (2) </summary>
              <div className="card-body login-card-body">
                <div className="form-row">
                  <div>
                    <AsistenciasCoberturas2 />
                    <p> Para complementar su cobertura tenemos un rembolso de gastos médicos por accidentes, se le otorgará hasta S/1,000.00 en el año. Y si falleces por accidente, tu familia recibirá una suma asegurada de S/ 2,000 para ayudarte a cubrir los gastos de sepelio, en caso del plan Base.            </p>
                    <AsistenciasCoberturasb />
                    <p className="text-danger"> Periodo de Carencia: 3 meses para Muerte Accidental (OBLIGATORIO) </p>
                  </div>
                </div>
              </div>
            </details>
            <details>
              <summary className=""> INVERSIÓN </summary>
              <div className="card-body login-card-body">
                <div className="form-row">
                  <p> Todos estos beneficios solo le representarán un pago minimo mensual de S/. 29.90 incluido el IGV fijos y congelados , que serían cargados a su tarjeta de crédito Ripley, viéndolo reflejado en su próximo estado de cuenta. </p>
                  <p className="text-danger"> (EJEMPLO Y GANCHO DE LOS 0.90 CENTIMOS DIARIOS) simplemente por tema de calidad previa aceptación haremos una pequeña validación de datos que tenemos acá en el sistema  </p>
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
                  <p> Suicidios, intentos de suicidios, autolesión, motín, prestación militar, Lesiones preexistente, pandemias y epidemias, Acto delictuoso provocado por cualquier persona que resultase favorecida con los alcances de este seguro, incluido el asegurado, Trabajos u oficios de alto riesgo y VIH(SIDA).</p>
                </div>
              </div>
            </details>
          </div>
        </Tab>
        <Tab eventKey="PROMOCIONES RIPLEY" title="Promociones Ripley ">
          <div className=" p-2">
            <details>
              <summary className="">BENEFICIOS Y PROMOCIONES (Sólo si el cliente no las conoce - OPCIONAL) </summary>
              <div className="form-row">
                        <p> También queremos confirmar si conoce todos los beneficios y promociones de su Tarjeta de Crédito Ripley. (PROMOCIONES VARIABLES DE MES A MES) Le explico las promociones vigentes: (indicar la mejor promoción para captar al cliente)
                        </p>
                        <ul>
                          <li> Tu pollito de Norky's a solo S/ 55.90. 1 pollo a la brasa + papas + ensalada. Promoción válida del 01 al 31 de marzo de 2023. Válido para Tarjeta de Crédito y/o Débito Banco Ripley Mastercard.
                          </li>
                          <li> ADICIONAL A ESTO TENDRA En Pizza Hut, disfruta de una pizza familiar americana + 1 gaseosa 1L a solo S/29.90. Precio Regular S/ 58.90. Promoción válida del 01 al 31 de marzo de 2023 pagando con Tarjeta de Crédito Banco Ripley Mastercard.
                          </li>
                          <li>
                            ADICIONAL A ESTO TENDRA ¡Obtén S/ 9 de dscto en tu recarga de balón Primax gas! Escribe al WhatsApp: 978 292 052 o llama al: (01) 208-0100. Promoción válida del 01 al 31 de marzo del 2023. Válido para Tarjeta de Crédito y/o Débito Banco Ripley Mastercard.
                          </li>
                          <li>
                            ADICIONAL A ESTO TENDRA ¡Ponte en modo Cine con Cinemark! 2x1 en Entradas 2D y además 20% de dscto en combo personal (1 pop corn grande salado + 1 gaseosa mediana) Promoción válida del 01 al 31 de marzo del 2023. Válido para Tarjeta de Crédito y/o Débito Banco Ripley Mastercard.
                          </li>
                        </ul>
                        <p> ADICIONAL A ESTO TENDRA Para más promociones y descuentos exclusivos visita www.bancoripley.com.pe/promociones y establecimientos afiliados. (Grifos, farmacias, restaurantes entre otros. ¿Les llegaron los beneficios y promociones de su tarjeta Ripley? **Respondió: ¡¡ SI!! LE LLEGÓ LA PROMOCIÓN: Perfecto señor, gracias. (PASAR A OFRECER EL SEGURO)
                        </p>
                      </div>
            </details>
          </div>
        </Tab>
      </Tabs>
    </>
  );
}
export default TabsTabs;
