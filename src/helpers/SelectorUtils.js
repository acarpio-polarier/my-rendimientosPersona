import DateUtils from "./FechaUtils";

/**
 * Utilidades para los selectores de período (semanal/mensual)
 */
const SelectorUtils = {
  /**
   * Obtiene el texto descriptivo del período seleccionado
   * @param {string} modo - Modo del selector ('semanal' o 'anual')
   * @param {number} seleccionActual - Índice de selección actual
   * @returns {string} Texto descriptivo del período
   */
  obtenerTextoPeriodo: (modo, seleccionActual) => {
    if (modo === "semanal") {
      if (seleccionActual === 0) {
        return "Semana actual";
      } else {
        const textoSemana = DateUtils.obtenerTextoSemana(seleccionActual);
        return `Hace ${seleccionActual} ${textoSemana}`;
      }
    } else {
      // Modo anual - mostrar el nombre del mes
      const hoy = new Date();
      const mesActual = hoy.getMonth();
      let mesSeleccionado = (mesActual - seleccionActual) % 12;
      if (mesSeleccionado < 0) mesSeleccionado += 12;

      return DateUtils.obtenerNombreMes(mesSeleccionado);
    }
  },

  /**
   * Obtiene el mes seleccionado basado en la selección actual
   * @param {number} seleccionActual - Índice de selección actual
   * @returns {number} Índice del mes seleccionado (0-11)
   */
  obtenerMesSeleccionado: (seleccionActual) => {
    const hoy = new Date();
    const mesActual = hoy.getMonth();
    let mesSeleccionado = (mesActual - seleccionActual) % 12;
    if (mesSeleccionado < 0) mesSeleccionado += 12;
    return mesSeleccionado;
  },

  /**
   * Obtiene el año seleccionado basado en la selección actual
   * @param {number} seleccionActual - Índice de selección actual
   * @returns {number} Año seleccionado
   */
  obtenerAñoSeleccionado: (seleccionActual) => {
    const hoy = new Date();
    const mesActual = hoy.getMonth();
    return hoy.getFullYear() - Math.floor((seleccionActual + mesActual) / 12);
  },

  /**
   * Determina si se puede navegar al siguiente período
   * @param {number} seleccionActual - Índice de selección actual
   * @returns {boolean} True si se puede navegar al siguiente período
   */
  puedeNavegar: (seleccionActual) => {
    return seleccionActual > 0;
  },

  /**
   * Calcula el límite máximo de navegación hacia atrás
   * @param {string} modo - Modo del selector ('semanal' o 'anual')
   * @param {number} seleccionActual - Índice de selección actual
   * @returns {boolean} True si se puede navegar al período anterior
   */
  puedeRetroceder: (modo, seleccionActual) => {
    if (modo === "anual") {
      return seleccionActual < 11; // Límite de 12 meses
    }
    return true; // En modo semanal no hay límite
  },

  /**
   * Obtiene el rango de fechas para el período seleccionado
   * @param {string} modo - Modo del selector ('semanal' o 'anual')
   * @param {number} seleccionActual - Índice de selección actual
   * @returns {Object} Objeto con las fechas de inicio y fin
   */
  obtenerRangoPeriodo: (modo, seleccionActual) => {
    if (modo === "semanal") {
      return DateUtils.obtenerRangoSemana(seleccionActual);
    } else {
      const mesSeleccionado =
        SelectorUtils.obtenerMesSeleccionado(seleccionActual);
      const añoSeleccionado =
        SelectorUtils.obtenerAñoSeleccionado(seleccionActual);
      return DateUtils.obtenerRangoMes(añoSeleccionado, mesSeleccionado);
    }
  },
};

export default SelectorUtils;
