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
      console.error("Error al calcular rendimiento promedio:", error);
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
      console.error("Error al calcular estadísticas:", error);
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
