import React, { useEffect, useState, useRef } from "react";
import * as bootstrap from "bootstrap";
import axios from "axios";
import DataTable from "react-data-table-component";

function TextPromocionesRipley() {

  return (
    <>
      <details>
                    <summary className="">
                      PROMOCIONES RIPLEY (Sólo si el cliente no las conoce - OPCIONAL)
                    </summary>
                    <div className="card-body login-card-body">
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
                    </div>
                  </details>
    </>
  );
}
export default TextPromocionesRipley;
