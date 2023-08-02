import React, { useEffect, useState, useRef } from "react";
import * as bootstrap from "bootstrap";
import axios from "axios";
import Nombre from "./Nombre";

function Contesta({ company, clave }) {
  const [selectLlamada, setSelectedLlamada] = useState("");
  const [Comunica_con_tercero_valido, setComunica_con_tercero_valido] =
    useState("");
  const [horario_tercero, sethorario_tercero] = useState("");
  const [selectcorreo, setselectcorreo] = useState("");
  const [selectaceptaseguro, setselectaceptaseguro] = useState("");
  const [selectLlamadaDetalle, setSelectedLlamadaDetalle] = useState("");

  const [optionListMotivo, setOptionListMotivo] = useState([]);
  const [optionListDetalle, setOptionListDetalle] = useState([]);
  const [optionListDetalleEstado, setOptionListDetalleEstado] = useState(true);
  const [optionListDetalleEstadoSelect, setOptionListDetalleEstadoSelect] =
    useState("0");
  const sesiones = {
    sgui: localStorage.getItem("localgui"),
    scliente: localStorage.getItem("localcliente"),
    sid: localStorage.getItem("localid"),
    sid_usuario: localStorage.getItem("localid_usuario"),
    stoken: localStorage.getItem("token"),
  };

  useEffect(() => {
    Company(company);
  }, []);

  const Company = async (company) => {
    const result = await axios.post(
      "https://app.soluziona.cl/API_v1_prod/CallSouthPeru/ApiCall_Retenciones/api/Ventas/Call/ConectaDetalle",
      { dato: company },
      { headers: { Authorization: `Bearer ${clave}` } }
    );

    if (result.status === 200) {
      setOptionListMotivo(result.data);

      // console.log(result.data)
      //  console.log(optionList)
    }
  };

  const ChangeConecta_nombre = async (event) => {
    if (event === "0") {
      setOptionListDetalleEstado(true);
      setOptionListDetalleEstadoSelect("0");
      setSelectedLlamada("0");
    } else {
      const result = await axios.post(
        "https://app.soluziona.cl/API_v1_prod/CallSouthPeru/ApiCall_Retenciones/api/Ventas/Call/ConectaDetalle",
        { dato: event },
        { headers: { Authorization: `Bearer ${clave}` } }
      );

      setSelectedLlamada(event);

      if (result.status === 200) {
        setOptionListDetalle(result.data);
        setOptionListDetalleEstado(false);
      }
    }
  };

  return (
    <>
      <h6>
        {" "}
        Buenos días/tardes hablo con el Sr. /Sra. xxxxx, (primer nombre más los
        dos apellidos) usted habla con xxx (nombre y apellido) ejecutivo (a) de
        Entel, gusto en saludarlo, espero que se encuentre muy bien junto a su
        familia ¡!!…
      </h6>

      <p>Le informo que para su respaldo la conversación es grabada.</p>
      <hr />
      <div className="row my-2">
        <div className="col-lg-4 col-sm-10 my-2">Registro Válido</div>
        <div className="col-lg-3 col-sm-6 my-2">
          <select
            className="form-select"
            aria-label="Default select example"
            value={selectLlamada}
            onChange={(e) => setSelectedLlamada(e.target.value)}
          >
            <option selected>Seleccione</option>
            <option value="1">Comunica con cliente</option>
            <option value="2">Comunica con secretaria </option>
            <option value="3">Comunica con cónyuge</option>
            <option value="4">Comunica con tercero válido</option>
            <option value="5">
              Comunica con registro no válido (no vive/ no trabaja ahí)
            </option>
          </select>
        </div>
      </div>

      {selectLlamada === "1" && (
        <div>
          <p>
            Hoy queremos agradecer la permanencia con sus productos Entel y por
            esta razón es que a partir de hoy Entel en conjunto con Metlife
            ponemos a su disposición y la de su familia una excelente cobertura
            llamada “ACCIDENTES PERSONALES CON AHORRO Y TELEMEDICINA”, dentro de
            este seguro usted contará con un excelente beneficio de Telemedicina
            el cual podrá utilizar hasta 4 veces mensuales donde de manera
            remota un doctor de Medicina General la atenderá sin la necesidad de
            agendar hora o una cita previa. Esto es muy importante y conveniente
            para usted ya que le entregará diagnósticos, alguna segunda opinión
            médica si es que ya cuenta con otro diagnóstico, recetas médicas,
            ordenes para exámenes e incluso licencias médicas si es que
            corresponde.
          </p>
          <p>
            Este Beneficio lo podrá comenzar a utilizar después de 10 días
            contados desde la fecha de contratación y no constituye cobertura de
            Seguro. Sólo deberá activarlo a través de un link que recibirá a su
            correo electrónico, tiene correo electrónico verdad???
          </p>

          <div className="row my-2">
            <div className="col-lg-4 col-sm-10 my-2">
              tiene correo electrónico verdad???
            </div>
            <div className="col-lg-3 col-sm-6 my-2">
              <select
                className="form-select"
                aria-label="Default select example"
                value={setselectcorreo}
                onChange={(e) => setselectcorreo(e.target.value)}
              >
                <option selected>Seleccione</option>
                <option value="1">Si</option>
                <option value="2">No</option>
              </select>
            </div>
          </div>
        </div>
      )}
      {selectcorreo === "1" && (
        <div>
          <p>Conveniente Verdad ¿??</p>
          <p>
            Adicionalmente usted también contará con una Indemnización en caso
            de Fallecimiento Accidental, por lo tanto desde hoy su familia o a
            quienes usted deje de beneficiarios recibirán una Indemnización de
            PLAN 2 UF 1000 es decir $30.000.000 aprox, si usted llegase a
            fallecer por cualquier tipo de accidente, me refiero a un accidente
            de tránsito, atropello, etc.. Teniendo así la tranquilidad de
            proteger a quienes más quiere cuando usted no este
          </p>
          |{" "}
          <p>
            Pero para que sea aún más atractivo y conveniente para usted de
            manera paralela al Seguro se creará una Cuenta de Capitalización y
            Ahorro a la que se irá el 50% de la prima que usted pague de manera
            mensual, esto quiere decir, que se estará protegiendo y ahorrando al
            mismo tiempo.{" "}
          </p>
          <p>
            {" "}
            <table border="1">
              <thead>
                <tr>
                  <th>
                    &nbsp;&nbsp;&nbsp;
                    <br />
                    &nbsp;&nbsp;&nbsp;
                  </th>
                  <th>
                    &nbsp;&nbsp;&nbsp;
                    <br />
                    Plan 1&nbsp;&nbsp;&nbsp;
                  </th>
                  <th>
                    &nbsp;&nbsp;&nbsp;
                    <br />
                    Plan 2&nbsp;&nbsp;&nbsp;
                  </th>
                  <th>
                    &nbsp;&nbsp;&nbsp;
                    <br />
                    Plan 3&nbsp;&nbsp;&nbsp;
                  </th>
                  <th>
                    &nbsp;&nbsp;&nbsp;
                    <br />
                    Plan 4&nbsp;&nbsp;&nbsp;
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    &nbsp;&nbsp;&nbsp;
                    <br />
                    Capital Asegurado&nbsp;&nbsp;&nbsp;
                  </td>
                  <td>
                    &nbsp;&nbsp;&nbsp;
                    <br />
                    UF&nbsp;&nbsp;&nbsp;500&nbsp;&nbsp;&nbsp;
                  </td>
                  <td>
                    &nbsp;&nbsp;&nbsp;
                    <br />
                    UF 1.000&nbsp;&nbsp;&nbsp;
                  </td>
                  <td>
                    &nbsp;&nbsp;&nbsp;
                    <br />
                    UF 1.500&nbsp;&nbsp;&nbsp;
                  </td>
                  <td>
                    &nbsp;&nbsp;&nbsp;
                    <br />
                    UF 2.000&nbsp;&nbsp;&nbsp;
                  </td>
                </tr>
                <tr>
                  <td>
                    &nbsp;&nbsp;&nbsp;
                    <br />
                    Prima&nbsp;&nbsp;&nbsp;Mensual UF&nbsp;&nbsp;&nbsp;
                  </td>
                  <td>
                    &nbsp;&nbsp;&nbsp;
                    <br />
                    0,308&nbsp;&nbsp;&nbsp;
                  </td>
                  <td>
                    &nbsp;&nbsp;&nbsp;
                    <br />
                    0,381&nbsp;&nbsp;&nbsp;
                  </td>
                  <td>
                    &nbsp;&nbsp;&nbsp;
                    <br />
                    0,439&nbsp;&nbsp;&nbsp;
                  </td>
                  <td>
                    &nbsp;&nbsp;&nbsp;
                    <br />
                    0,502&nbsp;&nbsp;&nbsp;
                  </td>
                </tr>
                <tr>
                  <td>
                    &nbsp;&nbsp;&nbsp;
                    <br />
                    Prima&nbsp;&nbsp;&nbsp;Mensual $&nbsp;&nbsp;&nbsp;
                  </td>
                  <td>
                    &nbsp;&nbsp;&nbsp;
                    <br />
                    $9.240&nbsp;&nbsp;&nbsp;
                  </td>
                  <td>
                    &nbsp;&nbsp;&nbsp;
                    <br />
                    $11.430&nbsp;&nbsp;&nbsp;
                  </td>
                  <td>
                    &nbsp;&nbsp;&nbsp;
                    <br />
                    $13.170&nbsp;&nbsp;&nbsp;
                  </td>
                  <td>
                    &nbsp;&nbsp;&nbsp;
                    <br />
                    $15.060&nbsp;&nbsp;&nbsp;
                  </td>
                </tr>
              </tbody>
            </table>
          </p>
          <p>Por ejemplo : </p>
          <p>
            {" "}
            La prima mensual es de tan sólo UF 0,38, es decir, $11.400 aprox,
            por lo tanto el 50% de esta prima mensual se va a cubrir el seguro y
            el otro 50% se va a su cuenta de Capitalización y Ahorro la que
            además tendrá una rentabilidad garantizada del 1%, por lo tanto se
            estará protegiendo y ahorrando al mismo tiempo.
          </p>
          <p>
            Esta cuenta de Capitalización y Ahorro es totalmente suya por lo
            tanto usted podrá realizar rescates de sus ahorros cuando lo
            necesite, tiene como tope 1 retiro al mes y 4 al año. Para solicitud
            de retiro de ahorro, puede ingresar a la página Entel, la cual
            dispone de una sección especial para la administración de sus
            seguros, y serán entregados en 10 días hábiles.
          </p>
          <p>
            Es importante destacar que no tiene costo de Administración por lo
            tanto su dinero siempre estará seguro y generando ganancia
            independiente a la fluctuación de la economía. El cargo de la prima
            mensual será en la Boleta de Entel en el próximo período de
            facturación.
          </p>
          <p>
            Como puede ver son Coberturas y Beneficios muy convenientes para
            usted y familia.{" "}
          </p>
          <p>
            Y para finalizar le menciono que al aceptar este seguro usted
            también contará con Beneficios Adicionales por ser Cliente MetLife
            dentro de los cuales tenemos :
            <ul>
              <li>
                Convenios y Descuentos con Clínicas Dentales, Ópticas,
                Gimnasios, Farmacias, Asistencias de Hogar, etc..
              </li>
              <li>
                {" "}
                El detalle lo podrá revisar en el link que llegará con su
                Póliza.{" "}
              </li>
            </ul>
            Como puede ver son Coberturas y Beneficios muy convenientes para
            usted y familia.
          </p>
          <div className="row my-2">
            <div className="col-lg-4 col-sm-10 my-2">
              Acepta la contratación de este Seguro ??
            </div>
            <div className="col-lg-3 col-sm-6 my-2">
              <select
                className="form-select"
                aria-label="Default select example"
                value={setselectaceptaseguro}
                onChange={(e) => setselectaceptaseguro(e.target.value)}
              >
                <option selected>Seleccione</option>
                <option value="1">Si</option>
                <option value="2">No</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {selectcorreo === "2" && (
        <div>
          <p>
            Sr, Lamentablemente no podremos continuar con la información ya que
            necesitamos que usted cuente con un correo electrónico ya sea propio
            o de algún familiar ya que la póliza del seguro con todo el detalle
            llega por correo. Agradezco su tiempo y que tenga un excelente día
            ¡!!
          </p>
        </div>
      )}

      {selectaceptaseguro === "1" && (
        <div>
          <p>
            Perfecto le recuerdo que mi nombre es XXXXXX, Ejecutivo(a) de Entel,
            y para efectos de grabación vamos a corroborar sus datos personales,
            indíqueme por favor:
          </p>
          <Nombre></Nombre>
          <h4> • EXCLUSIONES: (MENCIONAR OBLIGATORIO Y TEXTUAL) </h4>
          <p>
            Ahora le mencionaré las principales exclusiones de este seguro, de
            todas maneras, irán detalladas en la póliza que será enviada al
            correo que usted me acaba de corroborar.{" "}
          </p>
          <ul>
            <li>1. Guerra, declarada o no declarada,</li>
            <li>
              2. Participación del asegurado o beneficiario en un acto
              calificado como delito,
            </li>
            <li>
              3. La conducción de cualquier vehículo por parte del asegurado,
              encontrándose bajo estado de ebriedad o bajo los efectos de
              cualquier narcótico o droga,
            </li>
            <li>4. Negligencia, imprudencia o culpa grave del asegurado</li>
          </ul>
          <h4>	• 	AUTOCERTIFICACIÓN   </h4>
          <p>Entonces hoy con fecha xx/xx/2023 ¿Ud. acepta la contratación el SEGURO DE FALLECIMIENTO ACCIDENTAL CON AHORRO, y autoriza el cargo de la prima mensual de 0.38 UF, $11.400 aprox. en su cuenta Entel, ¿VERDAD?  </p>
          <p>Esperar respuesta del cliente.  </p>
          <p>“Don xxxxx el código de compra es XXXXXXX  </p>
          <p>Además, para garantizar su completa satisfacción que usted cuenta con 35 días desde recibida la póliza para retractarse de su decisión, esto lo puede hacer a través de la web dispuesta por Entel para este propósito o directamente ante la Compañía al correo teayudamos@metlife.cl</p>
          <p>Le damos la más cordial bienvenida a Seguros Entel, que tenga un buen día/tarde</p>
        </div>

      )}
      {selectLlamada === "2" ||
      selectLlamada === "3" ||
      selectLlamada === "4" ? (
        <div className="row my-2">
          <div className="col-lg-4 col-sm-10 my-2">
            4. Comunica con tercero válido{" "}
          </div>
          <div className="col-lg-3 col-sm-6 my-2">
            <select
              className="form-select"
              aria-label="Default select example"
              value={Comunica_con_tercero_valido}
              onChange={(e) => setComunica_con_tercero_valido(e.target.value)}
            >
              <option selected>Seleccione</option>
              <option value="1">Tercero pide dejar pendiente</option>
              <option value="2">Viaje</option>
              <option value="3">Fallecido</option>
              <option value="4">Problema de horario</option>
              <option value="5">No desea contestar</option>
            </select>
          </div>
        </div>
      ) : null}

      {Comunica_con_tercero_valido === "1" ||
      Comunica_con_tercero_valido === "2" ||
      Comunica_con_tercero_valido === "4" ? (
        <div className="row my-2">
          <div className="col-lg-4 col-sm-10 my-2">
            5. Disculpe, ¿Cuál es la mejor hora/día en la que puedo encontrar al
            Sr.(a) [NOMBRE CLIENTE]?{" "}
          </div>
          <div className="col-lg-3 col-sm-6 my-2">
            <select
              className="form-select"
              aria-label="Default select example"
              value={horario_tercero}
              onChange={(e) => sethorario_tercero(e.target.value)}
            >
              <option selected>Seleccione</option>
              <option value="1">Entrega horario</option>
              <option value="2">No Entrega horario </option>
              <option value="3">No Entrega horario - último intento </option>
            </select>
          </div>
        </div>
      ) : null}

      {Comunica_con_tercero_valido === "3" ||
      Comunica_con_tercero_valido === "5" ? (
        <div className="row my-2">
          <h4>
            Agradecido(a) por su tiempo, disculpe las molestias y que tenga un
            buen día.
          </h4>
        </div>
      ) : null}

      {horario_tercero === "1" ||
      horario_tercero === "2" ||
      horario_tercero === "3" ? (
        <div className="row my-2">
          <h4>
            Agradecido(a) por su tiempo, disculpe las molestias y que tenga un
            buen día.
          </h4>
        </div>
      ) : null}

      {selectLlamada === "5" && (
        <div>
          <h4>
            Agradecido(a) por su tiempo, disculpe las molestias y que tenga un
            buen día.
          </h4>
        </div>
      )}

      {/* <div className="row my-2">
        <div className="col-lg-12 col-sm-10 my-2">
          4.- Sr. / a XXXX El ejecutivo ¿lo asesoro o ayudo en temas de cobros
          de beneficios como: seguros, cierre de tarjetas de crédito, posesión
          efectiva, entre otros?
          <br />
          Si o no
        </div>
        <div className="col-lg-12 col-sm-12 my-2">
          <input
            name="roomRent"
            id="nombres"
            onChange={(e) => ChangeConecta_nombre(e.target.value)}
            type="text"
            className="form-control"
          />
        </div>
      </div> */}

      {/* <div className="row">
        <div className="col-lg-2 col-sm-3 my-2">Apellido 1</div>
        <div className="col-lg-4 col-sm-9 my-2">
          <input
            name="roomRent"
            type="text"
            id="apellido_1"
            className="form-control"
          />
        </div>
        <div className="col-lg-2 col-sm-3 my-2">Apellido 2</div>
        <div className="col-lg-4 col-sm-9 my-2">
          <input
            name="roomRent"
            type="text"
            id="apellido_2"
            className="form-control"
          />
        </div>
      </div> */}
      {/* <div className="row mb-2">              
                <div className="col-sm-12 col-md-12 col-lg-6">
                <div className="col-lg-2 col-sm-3 ">Motivo</div>
                    <select className="form-control form-select" id="ddl_motivo_1"
                        disabled={false}
                        // value={select}
                        onChange={(e) => (ChangeConecta_nombre(e.target.value))}>
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
  );
}
export default Contesta;
