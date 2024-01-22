import React, { useEffect, useState, useRef } from "react";
import * as bootstrap from "bootstrap";
import axios from "axios";
import DataTable from "react-data-table-component";

function AsistenciasCoberturasb() {

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

  const columns2 = [
    {
      name: <div className=" "> Coberturas </div>,
      
      selector: row => row.Coberturas,
      
      center: true,
    },
    {
      name: <div className=" ">	Plan Base: Sólo titula <br /><hr />Suma Asegurada </div>,
      selector: row => row.Suma_Asegurada,
      center: true,
    }
  ];

  const tableData2 = [
    {
      Coberturas: "Muerte Accidental (periodo de carencia 3 meses ",
      Suma_Asegurada: " S/2,000"
    },
    {
      Coberturas: "Reembolso de Gastos Médicos por Accidente  ",
      Suma_Asegurada: " S/1,000"
    },
    {
      Coberturas: "Prima Bruta Mensual* ",
      Suma_Asegurada: "S/29.90"
    }

  ];


  return (
    <>
      <DataTable columns={columns2} data={tableData2} customStyles={customStyles} className="mb-3" />
    </>
  );
}
export default AsistenciasCoberturasb;
