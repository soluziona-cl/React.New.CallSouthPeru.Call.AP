import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Box, MenuItem, InputLabel, CardContent, Card, Button, FormControl, Grid, Select, TextField, Typography } from "@mui/material";


function DatosClientes({ company, clave, datafull }) {


  const sesiones = {
    sgui: localStorage.getItem("localgui"),
    scliente: localStorage.getItem("localcliente"),
    sid: localStorage.getItem("localid"),
    sid_usuario: localStorage.getItem("localid_usuario"),
    stoken: localStorage.getItem("token"),
  };

  return (
    <>
      <Grid container spacing={1} >


        {/* {datafull.map((data, index) => ( */}
        <>
          {/* {console.log(data)} */}
          <Card>
            <Grid item xs={12} md={12}>
              <Typography variant="h6" className="card-header text-white p-2 m-2 rounded" style={{ backgroundImage: 'linear-gradient(90deg, #646464 10%, #ffffff 120%)' }}>Datos Cliente</Typography>
              <hr />
            </Grid>
            <CardContent>
              <Grid container spacing={1} sx={{ marginY: 1 }} >
                <Grid item xs={12} md={4}>
                  <TextField id='id_cliente' disabled variant="outlined" label="ID Cliente" className="cliente form-control rounded" />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField id='dni' disabled variant="outlined" label="DNI" className="cliente form-control rounded " />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField id='nacimiento' disabled variant="outlined" label="Fecha de Nacimiento" className="cliente form-control rounded" />
                </Grid>
                <Grid item xs={12} md={10}>
                  <TextField id='nombre' disabled variant="outlined" label="Nombre" className="cliente form-control rounded " />
                </Grid>
                <Grid item xs={12} md={2}>
                  <TextField id='edad' disabled variant="outlined" label="Edad" className="cliente form-control rounded " />
                </Grid>
               
                <Grid item xs={12} md={4}>
                  <TextField id='edad' disabled variant="outlined" label="Condicion Laboral" className="cliente form-control rounded " />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField id='apellido_2' disabled variant="outlined" label="Tipo Tarjeta" className="cliente form-control rounded " />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField id='id_cliente' disabled variant="outlined" label="Tienda Colocacion" className="cliente form-control rounded" />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField id='dni' disabled variant="outlined" label="Fecha Colocacion" className="cliente form-control rounded " />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField id='apellido_2' disabled variant="outlined" label="Cantidad Seguros" className="cliente form-control rounded " />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField id='id_cliente' disabled variant="outlined" label="Seguros Contratados" className="cliente form-control rounded" />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField id='' disabled variant="outlined" label="Departamento" className="cliente form-control rounded " />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField id='' disabled variant="outlined" label="Provincia" className="cliente form-control rounded " />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField id='' disabled variant="outlined" label="Distrito" className="cliente form-control rounded " />
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField id='dni' disabled variant="outlined" label="Dirección" className="cliente form-control rounded " />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </>
        {/* ))} */}

      </Grid>
    </>
  );
}
export default DatosClientes;
