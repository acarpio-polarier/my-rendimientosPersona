import { connectionConstants } from "../constants/connection";
import {
  requestOptions,
  handleResponse,
  fetchWithTimeout,
} from "../helpers/connection";
import { Dimensions } from "react-native";

export const LockerService = {
  getLavanderias,
  getChofersPorLavanderia,
  getVehiculosDisponiblesParaEntregar,
  getVehiculosDisponiblesParaRecoger,
  RPH,
  abrirTaquilla,
  revertirAccion,
  reportarIncidencia,

  //Llamada
};

/** Devuelve las lavanderías, usada en el dropdown. */

function getLavanderias() {
  console.log(connectionConstants.ODATA_URL + "getLavanderias");

  return new Promise((resolve, reject) => {
    fetchWithTimeout(
      connectionConstants.ODATA_URL + "getLavanderias",
      requestOptions("GET")
    )
      .then(handleResponse)
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
}

/** Devuelve los chofers de una lavandería, usada en el dropdown. */
function getChofersPorLavanderia(idLavanderia) {
  console.log(connectionConstants.ODATA_URL + "getLavanderias");

  return new Promise((resolve, reject) => {
    fetchWithTimeout(
      connectionConstants.ODATA_URL +
        "getChofers" +
        "?idLavanderia=" +
        idLavanderia,
      requestOptions("GET")
    )
      .then(handleResponse)
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
}

/** Devuelve los vehículos que se pueden entregar, usado en el filtro del SelectorVehiculos. */
function getVehiculosDisponiblesParaEntregar(idLavanderia) {
  console.log(
    connectionConstants.ODATA_URL + "getVehiculosDisponiblesParaEntregar"
  );

  return new Promise((resolve, reject) => {
    fetchWithTimeout(
      connectionConstants.ODATA_URL +
        "getVehiculosDisponiblesParaEntregar" +
        "?idLavanderia=" +
        idLavanderia,
      requestOptions("GET")
    )
      .then(handleResponse)
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
}
/** Devuelve los vehículos que se pueden recoger, usado en el filtro del SelectorVehiculos. */

function getVehiculosDisponiblesParaRecoger(idLavanderia) {
  console.log(
    connectionConstants.ODATA_URL + "getVehiculosDisponiblesParaRecoger"
  );

  return new Promise((resolve, reject) => {
    fetchWithTimeout(
      connectionConstants.ODATA_URL +
        "getVehiculosDisponiblesParaRecoger" +
        "?idLavanderia=" +
        idLavanderia,
      requestOptions("GET")
    )
      .then(handleResponse)
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
}
/** Llamada para abrir la taquilla, encapsula la lógica de recoger y devolver. */

function abrirTaquilla(cuerpo) {
  console.log(connectionConstants.ODATA_URL + "abrirTaquilla");

  return new Promise((resolve, reject) => {
    fetchWithTimeout(
      connectionConstants.ODATA_URL + "abrirTaquilla",
      requestOptions("POST", cuerpo)
    )
      .then(handleResponse)
      // No entiendo muy bien el handle response del helper ais que añado un nuevo .then
      // para ver la respuesta: https://www.codemzy.com/blog/response-body-from-fetch-in-javascript
      // en otro contexto aprendería a usar vuestro handleResponse.
      .then((response) => {
        console.log("Ultimo evento:", response);
        resolve(response);
      })

      .then((data) => resolve(data))

      .catch((error) => {
        console.error("Error en la petición:", error);
        reject(error);
      });
  });
}

function revertirAccion(cuerpo) {
  console.log(connectionConstants.ODATA_URL + "revertirApertura");
  console.log("REVERTIR ACCION", cuerpo);
  return new Promise((resolve, reject) => {
    fetchWithTimeout(
      connectionConstants.ODATA_URL + "revertirApertura",
      requestOptions("POST", cuerpo)
    )
      .then(handleResponse)
      // No entiendo muy bien el handle response del helper ais que añado un nuevo .then
      // para ver la respuesta: https://www.codemzy.com/blog/response-body-from-fetch-in-javascript
      // en otro contexto aprendería a usar vuestro handleResponse.
      .then((response) => {
        console.log("Ultimo evento:", response);
        resolve(response);
      })

      .then((data) => resolve(data))

      .catch((error) => {
        console.error("Error en la petición:", error);
        reject(error);
      });
  });
}

function reportarIncidencia(cuerpo) {
  console.log("cuerpo inci", cuerpo);
  return new Promise((resolve, reject) => {
    fetchWithTimeout(
      connectionConstants.ODATA_URL + "registrarEventoTaquilla",
      requestOptions("POST", cuerpo)
    )
      .then(handleResponse)

      .then((response) => {
        console.log("Ultimo evento:", response);
        resolve(response);
      })

      .then((data) => resolve(data))

      .catch((error) => {
        console.error("Error en la petición:", error);
        reject(error);
      });
  });
}

// Tamaño responsive
// Fuente: https://medium.com/@youness.makhfi.contact/creating-a-responsive-design-in-react-native-using-percentage-of-height-and-width-5bedebfe1be3

const screenHeight = Dimensions.get("window").height;

function RPH(percentage) {
  return (percentage / 100) * screenHeight;
}
const screenWidth = Dimensions.get("window").width;

function RPW(percentage) {
  return (percentage / 100) * screenWidth;
}
