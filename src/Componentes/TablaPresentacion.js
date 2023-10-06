import React, { useEffect, useState, useRef } from "react";
import * as bootstrap from "bootstrap";
import axios from "axios";
import DataTable from "react-data-table-component";

function TablaPresentacion() {

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
export default TablaPresentacion;
