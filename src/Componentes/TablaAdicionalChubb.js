import React, { useEffect, useState, useRef } from "react";
import * as bootstrap from "bootstrap";
import axios from "axios";
import DataTable from "react-data-table-component";

function TablaAdicionalChubb() {

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
      name: "Servicios",
      selector: "Servicios",
      center: true,
    },
    {
      name: "COBERTURAS",
      selector: "COBERTURAS",
      center: true,
    },
    {
      name: "EVENTOS POR AÑO",
      selector: "EVENTOS POR AÑO",
      center: true,
    },
  ];
  
  const tableData = [
    {
      Servicios: "ASISTENCIA MEDICA (Extensivo a Padres y empleados del hogar)",
      COBERTURAS: "MONTO MÁXIMO (EN SOLES)",
      "EVENTOS POR AÑO": "MÁXIMO DE EVENTOS",
    },
    {
      Servicios: "Orientación medica telefónica (medicina general)",
      COBERTURAS: "Sin límite",
      "EVENTOS POR AÑO": "Sin límite",
    },
    {
      Servicios: "Orientación nutricional telefónica",
      COBERTURAS: "Sin límite",
      "EVENTOS POR AÑO": "6 eventos al año",
    },
    {
      Servicios: "Telemedicina (Videollamada en medicina general)",
      COBERTURAS: "100% servicio",
      "EVENTOS POR AÑO": "Sin límite",
    },
    {
      Servicios: "Envío y coordinación de médico a domicilio",
      COBERTURAS: "Co-pago cliente S/,30.00",
      "EVENTOS POR AÑO": "Sin límite",
    },
    {
      Servicios: "Traslado de ambulancia por emergencia",
      COBERTURAS: "Hasta S/.250.00",
      "EVENTOS POR AÑO": "2 eventos al año",
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
export default TablaAdicionalChubb;
