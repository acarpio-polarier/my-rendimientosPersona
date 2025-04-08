import moment from "moment";

/**
 * Utilidades para el manejo de fechas en los componentes de rendimiento
 */
const FechaUtils = {
  /**
   * Obtiene el nombre corto del mes según su índice (0-11)
   * @param {number} indice - Índice del mes (0 para enero, 11 para diciembre)
   * @returns {string} Nombre corto del mes
   */
  obtenerNombreMesCorto: (indice) => {
    const mesesCortos = [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dic",
    ];
    return mesesCortos[indice % 12];
  },

  /**
   * Obtiene el nombre completo del mes según su índice (0-11)
   * @param {number} indice - Índice del mes (0 para enero, 11 para diciembre)
   * @returns {string} Nombre completo del mes
   */
  obtenerNombreMes: (indice) => {
    const meses = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];
    return meses[indice % 12];
  },

  /**
   * Formatea correctamente una fecha en formato YYYY-MM-DD
   * @param {Date|string} fecha - Fecha a formatear
   * @returns {string|null} Fecha formateada o null si es inválida
   */
  formatearFechaYYYYMMDD: (fecha) => {
    try {
      const fechaObj = new Date(fecha);
      if (isNaN(fechaObj.getTime())) {
        return null;
      }

      const año = fechaObj.getFullYear();
      const mes = String(fechaObj.getMonth() + 1).padStart(2, "0");
      const dia = String(fechaObj.getDate()).padStart(2, "0");

      return `${año}-${mes}-${dia}`;
    } catch (error) {
      console.warn("Error al formatear fecha:", error);
      return null;
    }
  },

  /**
   * Obtiene el rango de fechas para una semana específica
   * @param {number} offsetSemanas - Número de semanas hacia atrás (0 para la semana actual)
   * @returns {Object} Objeto con fechas de inicio y fin
   */
  obtenerRangoSemana: (offsetSemanas) => {
    const hoy = new Date();
    const primerDiaSemana = new Date(hoy);
    const dia = hoy.getDay();
    const diff = hoy.getDate() - dia + (dia === 0 ? -6 : 1) - 7 * offsetSemanas;

    primerDiaSemana.setDate(diff);

    const ultimoDiaSemana = new Date(primerDiaSemana);
    ultimoDiaSemana.setDate(primerDiaSemana.getDate() + 6);

    return {
      inicio: primerDiaSemana.toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
      }),
      fin: ultimoDiaSemana.toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
      }),
      inicioIso: primerDiaSemana.toISOString(),
      finIso: ultimoDiaSemana.toISOString(),
      fechaInicio: primerDiaSemana,
      fechaFin: ultimoDiaSemana,
    };
  },

  /**
   * Obtiene el rango de fechas para un mes específico
   * @param {number} año - Año del rango
   * @param {number} mes - Mes del rango (0-11)
   * @returns {Object} Objeto con fechas de inicio y fin del mes
   */
  obtenerRangoMes: (año, mes) => {
    const primerDiaMes = new Date(año, mes, 1);
    const ultimoDiaMes = new Date(año, mes + 1, 0);

    return {
      inicio: primerDiaMes.toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
      }),
      fin: ultimoDiaMes.toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
      }),
      inicioIso: primerDiaMes.toISOString(),
      finIso: ultimoDiaMes.toISOString(),
      fechaInicio: primerDiaMes,
      fechaFin: ultimoDiaMes,
    };
  },

  /**
   * Obtiene el rango de fechas para un año específico
   * @param {number} año - Año del rango
   * @returns {Object} Objeto con fechas de inicio y fin del año
   */
  obtenerRangoAño: (año) => {
    const primerDiaAño = new Date(año, 0, 1);
    const ultimoDiaAño = new Date(año, 11, 31);

    return {
      inicio: `${año}-01-01`,
      fin: `${año}-12-31`,
      inicioIso: primerDiaAño.toISOString(),
      finIso: ultimoDiaAño.toISOString(),
      fechaInicio: primerDiaAño,
      fechaFin: ultimoDiaAño,
    };
  },
  obtenerRangoHora: (fecha) => {
    const fechaObj = new Date(fecha);

    const horas = fechaObj.getHours().toString().padStart(2, "0");
    const minutos = fechaObj.getMinutes().toString().padStart(2, "0");
    const segundos = fechaObj.getSeconds().toString().padStart(2, "0");

    return `${horas}:${minutos}:${segundos}`;
  },

  /**
   * Agrupa registros por día a partir de un array de datos
   * @param {Array} datos - Array de registros con atributo fechaIni
   * @returns {Array} Array de objetos agrupados por día
   */
  agruparRegistrosPorDia: (datos) => {
    const dias = new Map();

    datos.forEach((registro) => {
      if (!registro.fechaIni) return;

      try {
        const fecha = new Date(registro.fechaIni);
        if (isNaN(fecha.getTime())) return;

        const año = fecha.getFullYear();
        const mes = String(fecha.getMonth() + 1).padStart(2, "0");
        const dia = String(fecha.getDate()).padStart(2, "0");
        const fechaBonita = `${año}-${mes}-${dia}`;

        if (!dias.has(fechaBonita)) {
          dias.set(fechaBonita, {
            dia: fechaBonita,
            data: [],
          });
        }

        dias.get(fechaBonita).data.push(registro);
      } catch (error) {
        console.warn("Error al procesar fecha de registro:", error);
      }
    });
    return Array.from(dias.values());
  },

  /**
   * Formatea texto plural/singular para semanas
   * @param {number} cantidad - Cantidad de semanas
   * @returns {string} "semana" o "semanas" según corresponda
   */
  obtenerTextoSemana: (cantidad) => {
    return cantidad === 1 ? "semana" : "semanas";
  },

  /**
   * Procesa datos para un gráfico anual
   * @param {Array} data - Datos a procesar
   * @returns {Object} Objeto con valores, etiquetas e información por mes
   */
  procesarDatosAnuales: (data) => {
    const meses = [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dic",
    ];

    const infoPorMes = Array(12)
      .fill(null)
      .map((_, i) => ({
        label: meses[i],
        info: [],
      }));

    const sumas = Array(12).fill(0);
    const conteos = Array(12).fill(0);

    if (data && data.length > 0) {
      data.forEach((item) => {
        try {
          const mes = moment(item.fechaIni).month();
          infoPorMes[mes].info.push(item);
          sumas[mes] += item.RendimientoGlobal || 0;
          conteos[mes] += 1;
        } catch (error) {
          console.warn("Error al procesar ítem de datos:", error);
        }
      });
    }

    const values = sumas.map((total, i) =>
      conteos[i] > 0 ? (total / conteos[i]) * 100 : 0
    );

    return {
      values,
      labels: meses,
      infoPorMes,
    };
  },
  nombresMeses: [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ],
  nombresMesesCorto: [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ],

  /**
   * Obtiene el rango de fechas para un año
   * @param {number} offsetAnios - Número de años hacia atrás (0 = año actual)
   * @returns {Object} Objeto con fechas formateadas e ISO
   */
  obtenerRangoAnual: (offsetAnios = 0) => {
    const currentDate = new Date();
    const anio = currentDate.getFullYear() - offsetAnios;

    // Crear fecha de inicio (1 de enero) y fin (31 de diciembre)
    const inicioAnio = new Date(anio, 0, 1); // Enero es 0
    const finAnio = new Date(anio, 11, 31); // Diciembre es 11

    // Formatear para display
    const inicioFormatted = `01/01/${anio}`;
    const finFormatted = `31/12/${anio}`;

    // Formatear para API (ISO)
    const inicioIso = `${anio}-01-01T00:00:00Z`; // Añadir hora para evitar problemas de zona horaria
    const finIso = `${anio}-12-31T23:59:59Z`;

    return {
      inicio: inicioFormatted,
      fin: finFormatted,
      inicioIso,
      finIso,
      anio: anio.toString(),
    };
  },
  /**
   * Obtiene el nombre del mes actual basado en una fecha ISO o en la fecha actual
   * @param {string} [fechaIso] - Fecha en formato ISO (YYYY-MM-DD) o ISO completo
   * @returns {string} Nombre del mes
   */
  obtenerNombreMesActual: (fechaIso) => {
    // Si no se proporciona fecha, usamos la fecha actual
    if (!fechaIso) {
      return FechaUtils.obtenerNombreMes(new Date().getMonth());
    }

    try {
      // Extraer el mes del formato ISO de manera más flexible
      const fechaObj = new Date(fechaIso);

      if (isNaN(fechaObj.getTime())) {
        return FechaUtils.obtenerNombreMes(new Date().getMonth());
      }

      return FechaUtils.obtenerNombreMes(fechaObj.getMonth());
    } catch (error) {
      console.warn("Error al obtener el nombre del mes:", error);
      return FechaUtils.obtenerNombreMes(new Date().getMonth());
    }
  },
};

/**
 * Función auxiliar para obtener el nombre del mes
 * @param {number} index - Índice del mes (0-11)
 * @returns {string} Nombre del mes
 */
function obtenerNombreMes(index) {
  const nombresMeses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  return nombresMeses[index] || "";
}

export default FechaUtils;
