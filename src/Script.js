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
    if (campaign_file === 'Sonrie_Seguro') {

      setHtmlFile('https://app.soluziona.cl/Orkesta/CallSouth/Ventas_V2/CallScript/htmlscript/script-campan-a-dental-everest.html')


    } 
    // else if (campaign_file === 'Metlife_Dental_SanaSalud') {

    //   setHtmlFile('https://app.soluziona.cl/Orkesta/CallSouth/Ventas_V2/CallScript/htmlscript/script-sanasalud-enero-2024.html')

    // } else if (campaign_file === 'Metlife_Dental_UnoSalud') {

    //   setHtmlFile('https://app.soluziona.cl/Orkesta/CallSouth/Ventas_V2/CallScript/htmlscript/Script_UnoSalud_Masiva_Enero_2024.html')

    // } else if (campaign_file === 'Metlife_RGM_Entel') {

    //   setHtmlFile('https://app.soluziona.cl/Orkesta/CallSouth/Ventas_V2/CallScript/htmlscript/RGM_MetLife_BAO.html')

    // } else if (campaign_file === 'Metlife_APAhorro_Entel') {

    //   setHtmlFile('https://app.soluziona.cl/Orkesta/CallSouth/Ventas_V2/CallScript/htmlscript/APAhorroEntel.html')
    // }


  }, [campaign_file]);

  const iframeStyle = {
    display: 'block',
    marginLeft: '10%',
    marginRight: '10%',
    width: '1200px', // Make the iframe take the full width of its container
    height: '1000px', // Set the desired height
  };
  return (
    <>

      <div style={{ textAlign: 'center' }}>
        <div style={iframeStyle}>
          <iframe src={htmlFile} title={htmlFile} width={1200} height={1000} ></iframe>
        </div>
      </div>

    </>
  );
};

export default Index;
