import React, { useEffect, useState, useRef } from "react";
import * as bootstrap from "bootstrap";
import axios from "axios";
import DataTable from "react-data-table-component";

function TablaAdicionalEducativo() {

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
    name: "ASISTENCIA EDUCATIVA",
    selector: "ASISTENCIA EDUCATIVA",
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
    "ASISTENCIA EDUCATIVA": "Profesor apoyo virtual (Siguientes materias: Matemática, Inglés, Historia del Peru)",
    "MONTO MÁXIMO (EN SOLES)": "100% (Hasta 1 hora)",
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
export default TablaAdicionalEducativo;
