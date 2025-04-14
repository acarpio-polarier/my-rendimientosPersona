import { connectionConstants } from "../constants/connection";
import {
  requestOptions,
  handleResponse,
  fetchWithTimeout,
} from "../helpers/connection";
import objetoPersona from "../helpers/objetoPersona.json";

export const rendimientoPersonasService = {
  getRendimientoPersonaMaquina,
  //Llamada
};

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
    fetchWithTimeout(
      connectionConstants.ODATA_URL +
        "getRendimientoPersonaMaquina" +
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
