import { connectionConstants } from "../constants/connection";
import {
  requestOptions,
  handleResponse,
  fetchWithTimeout,
} from "../helpers/connection";
import objetoPersona from "../helpers/datosMovil/objetoPersona.json";

const movil = false;
export const rendimientoPersonasService = {
  getRendimientoPersonaMaquina,
  getTokensPersona,
  getTokensPersonaPorFecha,
  getResumenTokensPersona,
  getDetallesPersona,

  //Llamada
};

function getTokensPersona(idPersona, fechaIni, fechaFin) {
  console.log(
    connectionConstants.ODATA_URL +
      "getTokensPersona" +
      "?idPersona=" +
      idPersona +
      "&fechaIni=" +
      fechaIni +
      "&fechaFin=" +
      fechaFin,
    requestOptions("GET")
  );

  return new Promise((resolve, reject) => {
    fetch(
      connectionConstants.ODATA_URL +
        "getTokensPersona" +
        "?idPersona=" +
        idPersona +
        "&fechaIni=" +
        fechaIni +
        "&fechaFin=" +
        fechaFin,
      requestOptions("GET")
    )
      .then(handleResponse)
      .then((data) => {
        resolve(data);
      })
      .catch((ex) => {
        reject(ex);
      });
  });
}

function getTokensPersonaPorFecha(idPersona, fechaIni, fechaFin) {
  console.log(
    connectionConstants.ODATA_URL +
      "getTokensPersonaPorFecha" +
      "?idPersona=" +
      idPersona +
      "&fechaIni=" +
      fechaIni +
      "&fechaFin=" +
      fechaFin,
    requestOptions("GET")
  );

  return new Promise((resolve, reject) => {
    fetch(
      connectionConstants.ODATA_URL +
        "getTokensPersonaPorFecha" +
        "?idPersona=" +
        idPersona +
        "&fechaIni=" +
        fechaIni +
        "&fechaFin=" +
        fechaFin,
      requestOptions("GET")
    )
      .then(handleResponse)
      .then((data) => {
        resolve(data);
      })
      .catch((ex) => {
        reject(ex);
      });
  });
}

function getResumenTokensPersona(idPersona) {
  console.log(
    connectionConstants.ODATA_URL +
      "getResumenTokensPersona" +
      "?idPersona=" +
      idPersona,
    requestOptions("GET")
  );

  return new Promise((resolve, reject) => {
    fetch(
      connectionConstants.ODATA_URL +
        "getTokensPersona" +
        "?idPersona=" +
        idPersona,
      requestOptions("GET")
    )
      .then(handleResponse)
      .then((data) => {
        resolve(data);
      })
      .catch((ex) => {
        reject(ex);
      });
  });
}

function getRendimientoPersonaMaquina(idPersona, fechaIni, fechaFin) {
  const fechaIni_ = new Date(fechaIni).toISOString();
  const fechaFin_ = new Date(fechaFin).toISOString();

  console.log(
    connectionConstants.ODATA_URL +
      "getRendimientoPersonaMaquinav3" +
      "?idPersona=" +
      idPersona +
      "&fechaIni=" +
      fechaIni_ +
      "&fechaFin=" +
      fechaFin_,
    requestOptions("GET")
  );

  return new Promise((resolve, reject) => {
    fetch(
      connectionConstants.ODATA_URL +
        "getRendimientoPersonaMaquinav3" +
        "?idPersona=" +
        idPersona +
        "&fechaIni=" +
        fechaIni_ +
        "&fechaFin=" +
        fechaFin_,
      requestOptions("GET")
    )
      .then(handleResponse)
      .then((data) => {
        // resolve(data);
        resolve(data);
      })
      .catch((ex) => {
        reject(ex);
      });
  });
}

function getDetallesPersona(idPersona, fechaIni, fechaFin) {
  console.log(
    connectionConstants.ODATA_URL +
      "getDetallesPersona" +
      "?idPersona=" +
      idPersona +
      "&fechaIni=" +
      fechaIni +
      "&fechaFin=" +
      fechaFin,
    requestOptions("GET")
  );
  return new Promise((resolve, reject) => {
    fetch(
      connectionConstants.ODATA_URL +
        "getDetallesPersona" +
        "?idPersona=" +
        idPersona +
        "&fechaIni=" +
        fechaIni +
        "&fechaFin=" +
        fechaFin,
      requestOptions("GET")
    )
      .then(handleResponse)
      .then((data) => {
        resolve(data);
      })
      .catch((ex) => {
        reject(ex);
      });
  });
}

// datos para movil
// function getRendimientoPersonaMaquina(idPersona, fechaIni, fechaFin) {
//   const fechaIni_ = new Date(fechaIni).toISOString();
//   const fechaFin_ = new Date(fechaFin).toISOString();

//   return new Promise((resolve, reject) => {
//     // Filtrar los datos del JSON
//     const filteredData = objetoPersona.filter((item) => {
//       // Verificar que la idPersona coincida
//       const personaMatch = item.idPersona === idPersona;

//       // Verificar que las fechas estén dentro del rango
//       const fechaIniMatch = new Date(item.fechaIni) >= new Date(fechaIni_);
//       const fechaFinMatch = new Date(item.fechaFin) <= new Date(fechaFin_);

//       return personaMatch && fechaIniMatch && fechaFinMatch;
//     });

//     if (filteredData.length > 0) {
//       resolve(filteredData); // Retorna los datos filtrados
//     } else {
//       reject("No se encontraron registros para los criterios dados.");
//     }
//   });
// }
