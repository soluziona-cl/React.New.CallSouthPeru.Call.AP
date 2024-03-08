// return the token from the session storage
export const getToken = () => {
    return sessionStorage.getItem('token') || null;
}

// set the token and user from the session storage
export const setUserSession = (token, user) => {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('user', JSON.stringify(user));
}

export const setUrl = () => {
    const url = 'https://app.soluziona.cl/API_QA/Peru/Call/api/Ventas_CRM'
    return url
}

export const setDireccion = () => {
    const direccion = '/Orkesta/CallSouthPeru/NewCallQA/AccidentesPersonales'
    return direccion
}

export const sesiones = {
    sgui: '',
    scliente: '',
    sid: '',
    sid_usuario: '',
    stoken: ''
};

export const setSesiones = () => {
    // sgui: localStorage.getItem("localgui"),
    // scliente: localStorage.getItem("localcliente"),
    // sid: localStorage.getItem("localid"),
    // sid_usuario: localStorage.getItem("localid_usuario"),
    // stoken: localStorage.getItem("token"),
    sesiones.sgui = localStorage.getItem("localgui");
    sesiones.scliente = localStorage.getItem("localcliente");
    sesiones.sid = localStorage.getItem("localid");
    sesiones.sid_usuario = localStorage.getItem("localid_usuario");
    sesiones.stoken = localStorage.getItem("token");

    return sesiones
}

export const get_elapsed_time_string = (total_seconds) => {
    function pretty_time_string(num) {
        return (num < 10 ? "0" : "") + num;
      }
      var hours = Math.floor(total_seconds / 3600);
      total_seconds = total_seconds % 3600;
      var minutes = Math.floor(total_seconds / 60);
      total_seconds = total_seconds % 60;
      var seconds = Math.floor(total_seconds);
      hours = pretty_time_string(hours);
      minutes = pretty_time_string(minutes);
      seconds = pretty_time_string(seconds);
      var currentTimeString = hours + ":" + minutes + ":" + seconds;
      return currentTimeString;

}

  

