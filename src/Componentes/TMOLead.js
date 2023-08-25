


// import React, { useEffect, useState, useRef } from "react";
// import * as bootstrap from "bootstrap";
// import axios from "axios";

// function TMOLead() {

//     const [elapsedSeconds, setElapsedSeconds] = useState(0);
//     let urlParams = new URLSearchParams(queryString); 
//     let queryString = window.location.search;
//     const lead_id = urlParams.get("lead_id");


//     useEffect(() => {
       
//         const intervalId = setInterval(() => {
//           setElapsedSeconds((prevSeconds) => prevSeconds + 1);
//         }, 1000);
//         return () => {
//           clearInterval(intervalId);
//         };
//       }, []);

//     function get_elapsed_time_string(total_seconds) {
//         function pretty_time_string(num) {
//           return (num < 10 ? "0" : "") + num;
//         }
//         var hours = Math.floor(total_seconds / 3600);
//         total_seconds = total_seconds % 3600;
//         var minutes = Math.floor(total_seconds / 60);
//         total_seconds = total_seconds % 60;
//         var seconds = Math.floor(total_seconds);
//         hours = pretty_time_string(hours);
//         minutes = pretty_time_string(minutes);
//         seconds = pretty_time_string(seconds);
//         var currentTimeString = hours + ":" + minutes + ":" + seconds;
//         return currentTimeString;
//       }
  

//   return (
//     <>
//       <div className="row mt-2">
// <div className="col-4 my-2">
//   {" "}
//   <h4>
//     {" "}
//     Duración de la LLamada :{" "}
//     <span id="duracion" className="cliente">
//       {get_elapsed_time_string(elapsedSeconds)}
//     </span>
//   </h4>
// </div>
// <div className="col-4 d-flex justify-content-end ">
//   <h4> Id cliente </h4>
// </div>
// <div className="col-4">
//   <input
//     name="roomRent"
//     type="text"
//     value={lead_id}
//     id="lead_id"
//     className="cliente form-control"
//     disabled
//   />
// </div>
// <hr />
// </div>
//     </>
//   );
// }
// export default TMOLead;
