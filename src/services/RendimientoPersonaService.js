import { connectionConstants } from "../constants/connection";
import {
  requestOptions,
  handleResponse,
  fetchWithTimeout,
} from "../helpers/connection";

const movil = false;
export const rendimientoPersonasService = {
  getRendimientoPersonaMaquina,
  getTokensPersona,
  getTokensPersonaPorFecha,
  getResumenTokensPersona,
  getDetallesPersona,
  getVideosPorPersona,
  getEtiquetasVideos,
  setIdEstado,

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

// Llamadas para los Videos

function getVideosPorPersona(idPersona) {
  console.log(
    connectionConstants.ODATA_URL +
      "getVideosPorPersona" +
      "?idPersona=" +
      idPersona,
    requestOptions("GET")
  );
  return new Promise((resolve, reject) => {
    fetch(
      connectionConstants.ODATA_URL +
        "getVideosPorPersona" +
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
function getEtiquetasVideos(idVideo) {
  console.log(
    connectionConstants.ODATA_URL + "getEtiquetasVideo" + "?idVideo=" + idVideo,
    requestOptions("GET")
  );
  return new Promise((resolve, reject) => {
    fetch(
      connectionConstants.ODATA_URL +
        "getEtiquetasVideo" +
        "?idVideo=" +
        idVideo,
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

function setIdEstado(idPersonaVideo, idEstadoNuevo) {
  console.log(
    connectionConstants.ODATA_URL +
      "updateAsignacion" +
      "?idPersonaVideo=" +
      idPersonaVideo +
      "&idEstadoNuevo=" +
      idEstadoNuevo,
    requestOptions("PUT")
  );
  return new Promise((resolve, reject) => {
    fetch(
      connectionConstants.ODATA_URL +
        "updateAsignacion" +
        "?idPersonaVideo=" +
        idPersonaVideo +
        "&idEstadoNuevo=" +
        idEstadoNuevo,
      requestOptions("PUT")
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
