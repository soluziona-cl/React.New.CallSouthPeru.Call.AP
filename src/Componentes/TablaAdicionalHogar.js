import React, { useEffect, useState, useRef } from "react";
import * as bootstrap from "bootstrap";
import axios from "axios";
import DataTable from "react-data-table-component";

function TablaAdicionalHogar() {

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
      name: "ASISTENCIA HOGAR",
      selector: "ASISTENCIA HOGAR",
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
      "ASISTENCIA HOGAR": "Envío y Pago de Cerrajero por Emergencia",
      "MONTO MÁXIMO (EN SOLES)": "S/. 250 por evento",
      "MÁXIMO DE EVENTOS": "2 eventos al año",
    },
    {
      "ASISTENCIA HOGAR": "Envío y Pago de Gasfitero por Emergencia",
      "MONTO MÁXIMO (EN SOLES)": "S/. 250 por evento",
      "MÁXIMO DE EVENTOS": "2 eventos al año",
    },
    {
      "ASISTENCIA HOGAR": "Envío y Pago de Electricista por Emergencia",
      "MONTO MÁXIMO (EN SOLES)": "S/. 250 por evento",
      "MÁXIMO DE EVENTOS": "2 eventos al año",
    },
    {
      "ASISTENCIA HOGAR": "Envío y Pago de Vidriero por Emergencia",
      "MONTO MÁXIMO (EN SOLES)": "S/. 250 por evento",
      "MÁXIMO DE EVENTOS": "2 eventos al año",
    },
    {
      "ASISTENCIA HOGAR": "Instalación de cortina/persianas",
      "MONTO MÁXIMO (EN SOLES)": "S/. 250 por evento",
      "MÁXIMO DE EVENTOS": "2 eventos al año",
    },
    {
      "ASISTENCIA HOGAR": "Perforación de muros para cuadros/espejos",
      "MONTO MÁXIMO (EN SOLES)": "S/. 250 por evento",
      "MÁXIMO DE EVENTOS": "2 eventos al año",
    },
    {
      "ASISTENCIA HOGAR": "Instalación de lámparas/luminarias",
      "MONTO MÁXIMO (EN SOLES)": "S/. 250 por evento",
      "MÁXIMO DE EVENTOS": "2 eventos al año",
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
export default TablaAdicionalHogar;
