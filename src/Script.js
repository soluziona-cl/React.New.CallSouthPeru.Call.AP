import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";

import "bootstrap/dist/css/bootstrap.min.css";
import { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import "react-datepicker/dist/react-datepicker.css";


registerLocale("es", es);

function nobackbutton() {
  window.location.hash = "no-back-button";
  window.location.hash = "Again-No-back-button"; //chrome
  window.onhashchange = function () {
    window.location.hash = "no-back-button";
  };
}

const Index = () => {

  let queryString = window.location.search;
  let urlParams = new URLSearchParams(queryString);
  const campaign_file = urlParams.get("campaign");
  const [htmlFile, setHtmlFile] = useState(null);

  useEffect(() => {
    if (campaign_file === 'Chubb_AP') {

      setHtmlFile('https://app.soluziona.pe/Orkesta/CallSouth/Ventas/Script/SonrieSeguro.html')

    } 

  }, [campaign_file]);

  const iframeStyle = {
    maxWidth: '100vw', // Make the iframe take the full width of its container
    height: '100vh', // Set the desired height
  };
  return (
    <>

      <div style={{ textAlign: 'center' }}>
        <div style={iframeStyle}>
          <iframe src={htmlFile} title={htmlFile} width={1300} height={1000}></iframe>
        </div>
      </div>

    </>
  );
};

export default Index;
