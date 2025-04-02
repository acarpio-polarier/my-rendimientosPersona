import { connectionConstants } from "../constants/connection";
import {
  requestOptions,
  handleResponse,
  fetchWithTimeout,
} from "../helpers/connection";

export const rendimientoPersonasService = {
  getRendimientoPersonaMaquina,
};

function getRendimientoPersonaMaquina(idPersona, fechaIni, fechaFin) {
  const fechaIni_ = new Date(fechaIni).toISOString();
  const fechaFin_ = new Date(fechaFin).toISOString();

  console.log(
    connectionConstants.ODATA_URL +
      "getRendimientoPersonaMaquina" +
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
        resolve(data);
      })
      .catch((ex) => {
        reject(ex);
      });
  });
}
