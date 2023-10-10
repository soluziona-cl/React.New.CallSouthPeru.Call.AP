import React, { useEffect, useState, useRef } from "react";
import * as bootstrap from "bootstrap";
import axios from "axios";
import DataTable from "react-data-table-component";

function AsistenciasCoberturas2() {

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
      name:<div className=" "> ATENCIÓN EN CASO DE URGENCIAS </div>,
      selector: "ATENCIÓN_EN_CASO_DE_URGENCIAS",
      center: true,
    },
    {
      name: <div className=" ">Servicio</div>,
      selector: "Servicio",
      center: true,
    },
    {
      name: <div className=" ">Carencia</div>,
      selector: "Carencia",
      center: true,
    },
  ];
  
  const tableData = [
    {
      ATENCIÓN_EN_CASO_DE_URGENCIAS: "Consulta telefónica 24 horas (orientación) ",
      "Servicio": "100%",
      "Carencia": "5"
    },  
    {
      ATENCIÓN_EN_CASO_DE_URGENCIAS: "Servicio de citas a través de nuestra línea a nivel nacional ",
      "Servicio": "100%",
      "Carencia": "5"
    },
    {
      ATENCIÓN_EN_CASO_DE_URGENCIAS: "Atenciones de Emergencias y/o urgencias dentales 24 horas ",
      "Servicio": "100%",
      "Carencia": "5"
    },
    {
      ATENCIÓN_EN_CASO_DE_URGENCIAS: "Diagnóstico de urgencia dental y derivación a especialista  ",
      "Servicio": "100%",
      "Carencia": "5"
    },
    {
      ATENCIÓN_EN_CASO_DE_URGENCIAS: "Radiografía periapical de pieza afectada  ",
      "Servicio": "100%",
      "Carencia": "5"
    },
    {
      ATENCIÓN_EN_CASO_DE_URGENCIAS: "Radiografías bitewing de la pieza afectada ",
      "Servicio": "100%",
      "Carencia": "5"
    },
    {
      ATENCIÓN_EN_CASO_DE_URGENCIAS: "Pulpectomía (excéresis pulpar) ",
      "Servicio": "100%",
      "Carencia": "5"
    },
    {
      ATENCIÓN_EN_CASO_DE_URGENCIAS: "Tratamiento de alveolitis o hemorragia post exodoncias ",
      "Servicio": "100%",
      "Carencia": "5"
    }
  
  ];


 
 
 

  return (
    <>
      <DataTable columns={columns} data={tableData} customStyles={customStyles} className="mb-3" />
     
    </>
  );
}
export default AsistenciasCoberturas2;
