import { colors } from "../../styles/base";

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
