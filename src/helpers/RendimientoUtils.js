import { colors } from "../../styles/base";
import { rendimientoPersonasService } from "../services/RendimientoPersonaService";

/**
 * Utilidades para manejar los datos de rendimiento en la aplicación
 */
const RendimientoUtils = {
  /**
   * Determina el color del progreso según el porcentaje
   * @param {number} porcentaje - Porcentaje de rendimiento
   * @returns {string} Color hexadecimal correspondiente
   */
  determinarColorProgreso: (porcentaje) => {
    if (porcentaje < 70) return colors.danger;
    if (porcentaje >= 70 && porcentaje <= 90) return colors.primary;
    return colors.success;
  },

  /**
   * Determina el texto descriptivo del estado según el porcentaje
   * @param {number} porcentaje - Porcentaje de rendimiento
   * @returns {string} Texto descriptivo del estado
   */
  determinarTextoEstado: (porcentaje) => {
    if (porcentaje < 70) return "Bajo rendimiento";
    if (porcentaje >= 70 && porcentaje <= 90) return "Rendimiento medio";
    return "Alto rendimiento";
  },

  /**
   * Genera un número de tokens de forma aleatoria
   * @returns {int} - Devuelve un numero aleatorio
   */
  generarTokensRandom: () => {
    tokens = Math.floor(Math.random() * (150 - 50 + 1)) + 50;
    return tokens;
  },

  /**
   * Calcula el rendimiento promedio de un conjunto de datos
   * @param {Array} datos - Array de datos de rendimiento
   * @param {string} campoRendimiento - Nombre del campo que contiene el valor de rendimiento
   * @returns {number} Rendimiento promedio
   */
  calcularRendimientoPromedio: (datos, campoRendimiento = "Rendimiento") => {
    if (!datos || datos.length === 0) return 0;

    try {
      const suma = datos.reduce((acum, item) => {
        return acum + (item[campoRendimiento] || 0);
      }, 0);

      return suma / datos.length;
    } catch (error) {
      console.error("Error al calcular rendimiento promedio", error);
      return 0;
    }
  },

  /**
   * Calcula y devuelve los tokens ganados durante una fecha en especifico
   * @param {string} idPersona - Id de la persona
   * @param {string} fechaInicio - Fecha de inicio del filtro
   * @param {string} fechaFin - Fecha del final del turno
   * @returns {Object} Objeto con estadísticas
   */
  getTokensPersona: async (idPersona, fechaInicio, fechaFinal) => {
    try {
      const fechaIni = new Date(fechaInicio).toISOString().split("T")[0];
      const fechaFin = new Date(fechaFinal).toISOString().split("T")[0];
      console.log("rendimiento utils fecha", idPersona, fechaIni, fechaFin);
      const datos = await rendimientoPersonasService.getTokensPersona(
        idPersona,
        fechaIni,
        fechaFin
      );
      console.log("rendimiento utils TP", datos);
      return datos;
    } catch (error) {
      console.log("Error obteniendo tokens", error);
    }
  },

  getTokensPersonaPorFecha: async (idPersona, fechaInicio, fechaFin) => {
    try {
      console.log("rendimiento utils TPPF", idPersona, fechaInicio, fechaFin);
      const datos = await rendimientoPersonasService.getTokensPersonaPorFecha(
        idPersona,
        fechaInicio,
        fechaFin
      );
      console.log("rendimiento utils", datos);
      return datos;
    } catch (error) {
      console.log("Error obteniendo tokens", error);
    }
  },
  getResumenTokensPersona: async (idPersona) => {
    try {
      const datos = await rendimientoPersonasService.getResumenTokensPersona(
        idPersona
      );
      console.log("RendimientoUtils RTP", datos);
      return datos;
    } catch (error) {
      console.log("Error obtenido getResumenTokensPersona", error);
    }
  },

  /**
   * Calcula los detalles de una persona por fecha
   * @param {string} idPersona - Id de la persona
   * @param {string} fechaInicio - Fecha de inicio del filtro
   * @param {string} fechaFin - Fecha del final del turno
   * @returns {Object} Objeto con estadísticas {TiempoTrabajado, TotalPrendas, MediaPrendasHora}
   */

  getDetallesPersona: async (idPersona, fechaInicio, fechaFin) => {
    console.log("rendimiento utils DP", idPersona, fechaInicio, fechaFin);

    try {
      console.log("rendimiento utils DP", idPersona, fechaInicio, fechaFin);
      const datos = await rendimientoPersonasService.getDetallesPersona(
        idPersona,
        fechaInicio,
        fechaFin
      );
      console.log("rendimiento utils detallesPersona", datos);
      return datos;
    } catch (error) {
      console.log("Error al obtener DetallesPersona", error);
    }
  },

  getVideosPorPersona: async (idPersona) => {
    console.log("rendimiento utils VPP", idPersona);
    try {
      const datos = await rendimientoPersonasService.getVideosPorPersona(
        idPersona
      );
      console.log("rendimiento utils getVideosPorPersona", datos);
      return datos;
    } catch (error) {
      console.log("Error al obtener getVideosPorPersona", error);
    }
  },

  getEtiquetasVideos: async (idVideo) => {
    console.log("rendimiento utils EV");
    try {
      const datos = await rendimientoPersonasService.getEtiquetasVideos(
        idVideo
      );
      console.log("rendimiento utils EV");
      return datos;
    } catch (error) {
      console.log("Error al obtener getEtiquetasVideos", error);
    }
  },

  getNoImage: async () => {
    console.log("rendimiento utils NI");
    try {
      const datos = await rendimientoPersonasService.getNoImage();
      return datos;
    } catch (error) {
      console.log("Error al cargar la imagen noImage", error);
    }
  },
  solicitarCanje: async (idPersona, idProducto) => {
    console.log("rendimiento utils SC");
    try {
      await rendimientoPersonasService.solicitarCanje(idPersona, idProducto);
    } catch (error) {
      console.log("Error al solicitar canje", error);
    }
  },

  setIdEstado: async (idVideo, idEstado) => {
    console.log("rendimiento utils IE");
    try {
      await rendimientoPersonasService.setIdEstado(idVideo, idEstado);
    } catch (error) {
      console.log("Error al añadir a setIdEstado", error);
    }
  },
  registrarSesionVisualizacion: async (datos) => {
    console.log("rendimiento utils RSV");
    const datosSesion = {
      idPersonaVideo: datos.idPersonaVideo,
      segundosVisualizados: datos.segundosVisualizados,
      finalizadoYoutube: datos.finalizadoYoutube,
      finalizadoManual: datos.finalizadoManual,
    };
    try {
      await rendimientoPersonasService.registrarSesionVisualizacion(
        datosSesion
      );
    } catch (error) {
      console.log(
        "Error al añadir a registrarSesionVisualizacion",
        error,
        datosSesion
      );
    }
  },

  getProductos: async () => {
    console.log("rendimiento utils getProductos");
    try {
      const datos = await rendimientoPersonasService.getProductos();
      return datos;
    } catch (error) {
      console.log("Error al rebir los productos", error);
    }
  },

  getMinMaxPrecio: async () => {
    console.log("rendimiento utils getMinMaxPrecio");
    try {
      const data = await rendimientoPersonasService.getMinMaxPrecio();
      return data;
    } catch (error) {
      console.log("Error al obtener un precio max o min", error);
    }
  },

  /**
   * Calcula estadísticas básicas para un conjunto de datos
   * @param {Array} datos - Array de datos de rendimiento
   * @param {string} campoRendimiento - Nombre del campo que contiene el valor de rendimiento en el visualizador.
   * @returns {Object} Objeto con estadísticas
   */
  calcularEstadisticas: (datos, campoRendimiento = "Rendimiento") => {
    if (!datos || datos.length === 0) {
      return {
        promedio: 0,
        cantidad: 0,
      };
    }

    try {
      let total = 0;
      let maximo = -Infinity;
      let minimo = Infinity;

      datos.forEach((item) => {
        const valor = item[campoRendimiento] || 0;
        total += valor;

        if (valor > maximo) maximo = valor;
        if (valor < minimo) minimo = valor;
      });

      return {
        promedio: total / datos.length,
        maximo,
        minimo,
        total,
        cantidad: datos.length,
      };
    } catch (error) {
      console.error("Error al calcular estadísticas", error);
      return {
        promedio: 0,
        maximo: 0,
        minimo: 0,
        total: 0,
        cantidad: 0,
      };
    }
  },
};

export default RendimientoUtils;
