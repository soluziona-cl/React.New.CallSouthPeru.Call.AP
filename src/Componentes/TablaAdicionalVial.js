import React, { useEffect, useState, useRef } from "react";
import * as bootstrap from "bootstrap";
import axios from "axios";
import DataTable from "react-data-table-component";

function TablaAdicionalVial() {

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
      name: "ASISTENCIA VIAL",
      selector: "ASISTENCIA VIAL",
      center: true,
    },
    {
      name: "MONTO MÁXIMO (EN SOLES)",
      selector: "MONTO MÁXIMO (EN SOLES)",
      center: true,
    },
    {
      name: "MÁXIMO DE EVENTOS",
      selector: "MÁXIMO DE EVENTOS",
      center: true,
    },
  ];
  
  const tableData = [
    {
      "ASISTENCIA VIAL": "Envío de grúa (remolque) por accidente o avería.",
      "MONTO MÁXIMO (EN SOLES)": "S/. 600.00 por evento",
      "MÁXIMO DE EVENTOS": "8 eventos",
    },
    {
      "ASISTENCIA VIAL": "Auxilio vial (Cambio de llanta, paso de corriente, envío de gasolina).",
      "MONTO MÁXIMO (EN SOLES)": "S/. 525.00 por evento",
      "MÁXIMO DE EVENTOS": "4 eventos",
    },
    {
      "ASISTENCIA VIAL": "Cerrajero por perdida o extravío de las llaves del vehículo.",
      "MONTO MÁXIMO (EN SOLES)": "S/. 200.00 por evento",
      "MÁXIMO DE EVENTOS": "3 eventos",
    },
    {
      "ASISTENCIA VIAL": "Referencias de talleres mecánicos.",
      "MONTO MÁXIMO (EN SOLES)": "Sin límite",
      "MÁXIMO DE EVENTOS": "Sin límite",
    },
    {
      "ASISTENCIA VIAL": "Conductor de reemplazo para revisión",
      "MONTO MÁXIMO (EN SOLES)": "S/. 150.00 POR EVENTO",
      "MÁXIMO DE EVENTOS": "1 evento",
    },
    {
      "ASISTENCIA VIAL": "Conductor de reemplazo para eventos sociales",
      "MONTO MÁXIMO (EN SOLES)": "Conexión",
      "MÁXIMO DE EVENTOS": "Sin límite",
    },
  ];
 

  return (
    <>
      <DataTable
        columns={columns}
        data={tableData}
        customStyles={customStyles}
        className="mb-3"
      />
    </>
  );
}
export default TablaAdicionalVial;
