import React, { useEffect, useState, useReducer } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../../../../styles/base";
import FechaUtils from "../../../helpers/FechaUtils";
import RendimientoUtils from "../../../helpers/RendimientoUtils";

// Constantes
const TOKENS_DISPONIBLES = 150;
const UMBRAL_DIFERENCIA_RENDIMIENTO = 0.01;

/**
 * Componente que visualiza el rendimiento en una vista semanal
 *
 * @param {Object} props - Propiedades del componente
 * @param {Array} props.data - Datos de rendimiento a visualizar
 * @param {number} props.semanaActual - Índice de la semana actual (0 para la semana actual)
 * @param {Object} props.rangoPeriodo - Objeto con fechas de inicio y fin del período
 * @param {string} props.rangoPeriodo.fechaInicio - Fecha de inicio del período (o inicioIso)
 * @param {string} props.rangoPeriodo.fechaFin - Fecha de fin del período (o finIso)
 */
const VisualizadorSemanal = ({ data, semanaActual, rangoPeriodo }) => {
  // Estados
  const [diasSemana, setDiasSemana] = useState([]);
  const [diaSeleccionado, setDiaSeleccionado] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [datosPorDia, setDatosPorDia] = useState([]);

  // Log para debug
  useEffect(() => {
    console.log("Datos recibidos:", data);
    console.log("Rango de periodo:", rangoPeriodo);
  }, [data, rangoPeriodo]);

  // Agrupar y procesar datos cuando cambian
  useEffect(() => {
    if (!data || data.length === 0) {
      setDiasSemana([]);
      setDiaSeleccionado(null);
      setCargando(false);
      return;
    }

    const datosAgrupados = Array.isArray(data[0].data)
      ? data
      : FechaUtils.agruparRegistrosPorDia(data);

    setDatosPorDia(datosAgrupados);
    procesarDatosSemana(datosAgrupados);
  }, [data, semanaActual, rangoPeriodo]);

  /**
   * Obtiene los datos estadísticos para un día específico
   * @param {Object} datosDia - Datos para un día específico
   * @returns {Object|null} - Objeto con estadísticas o null si no hay datos
   */
  const obtenerEstadisticasDia = (datosDia) => {
    if (!datosDia || !datosDia.data || datosDia.data.length === 0) {
      return null;
    }

    // Ordenar los registros por fecha para obtener el último
    const registrosOrdenados = [...datosDia.data].sort((a, b) => {
      return new Date(b.fechaFin) - new Date(a.fechaFin);
    });

    // Tomar el último registro del día
    const ultimoRegistro = registrosOrdenados[0];

    return {
      // Usamos el RendimientoAcumulado del último registro
      promedio: ultimoRegistro.RendimientoAcumulado || 0,
      cantidad: datosDia.data.length,
    };
  };

  /**
   * Encuentra el día con mejor rendimiento entre los días con datos
   * @param {Array} dias - Array de objetos día
   * @returns {Object} - Objeto con id del mejor día y flag si todos son iguales
   */
  const encontrarMejorDia = (dias) => {
    const diasConDatos = dias.filter(
      (dia) => dia.tieneDatos && dia.estadisticas
    );

    // Si no hay días con datos o solo hay uno, no hay "mejor día"
    if (diasConDatos.length <= 1) {
      return { mejorDiaId: null, todosIguales: true };
    }

    // Comprobamos si todos tienen el mismo rendimiento
    const primerRendimiento = diasConDatos[0]?.estadisticas?.promedio || 0;
    const todosIguales = diasConDatos.every(
      (dia) =>
        Math.abs((dia.estadisticas?.promedio || 0) - primerRendimiento) <
        UMBRAL_DIFERENCIA_RENDIMIENTO
    );

    // Si todos tienen el mismo rendimiento, no hay "mejor día"
    if (todosIguales) {
      return { mejorDiaId: null, todosIguales: true };
    }

    // Encontrar el día con mejor rendimiento
    let mejorDiaId = null;
    let mejorRendimiento = -1;

    diasConDatos.forEach((dia) => {
      if (dia.estadisticas && dia.estadisticas.promedio > mejorRendimiento) {
        mejorRendimiento = dia.estadisticas.promedio;
        mejorDiaId = dia.fechaFormateada;
      }
    });

    return { mejorDiaId, todosIguales: false };
  };

  /**
   * Prepara los datos de la semana para visualizar
   * @param {Array} datosAgrupados - Datos agrupados por día
   */
  const procesarDatosSemana = (datosAgrupados) => {
    setCargando(true);

    try {
      const dias = generarDiasSemana(datosAgrupados);
      const { mejorDiaId, todosIguales } = encontrarMejorDia(dias);

      // Marcar el mejor día si corresponde
      const diasConMejorMarcado = dias.map((dia) => ({
        ...dia,
        mejorDia: !todosIguales && dia.fechaFormateada === mejorDiaId,
      }));

      setDiasSemana(diasConMejorMarcado);
    } catch (error) {
      console.error("Error al procesar datos de la semana:", error);
      setDiasSemana([]);
    } finally {
      setCargando(false);
    }
  };

  /**
   * Genera un array con los datos de cada día de la semana
   * @param {Array} datosAgrupados - Datos agrupados por día
   * @returns {Array} - Array de objetos con los datos de cada día
   */
  const generarDiasSemana = (datosAgrupados) => {
    // Obtener fechas de inicio y fin del período
    const fechaInicio = new Date(
      rangoPeriodo.fechaInicio || rangoPeriodo.inicioIso
    );
    const fechaFin = new Date(rangoPeriodo.fechaFin || rangoPeriodo.finIso);

    // Ajustar fechaFin para incluir 7 días (semana completa)
    fechaFin.setDate(fechaInicio.getDate() + 6);

    // Crear array con los 7 días de la semana
    const dias = [];
    const fechaActual = new Date(fechaInicio);

    while (fechaActual <= fechaFin) {
      const fechaFormateada = FechaUtils.formatearFechaYYYYMMDD(fechaActual);

      // Buscar datos para este día en los datos agrupados
      const datosDia = datosAgrupados.find(
        (item) => item.dia === fechaFormateada
      );

      // Calcular estadísticas para el día
      const estadisticas = obtenerEstadisticasDia(datosDia);

      // Agregar día al array
      dias.push({
        fecha: new Date(fechaActual),
        fechaFormateada,
        nombreDia: fechaActual.toLocaleDateString("es-ES", {
          weekday: "short",
        }),
        numeroDia: fechaActual.getDate(),
        tieneDatos: Boolean(
          datosDia && datosDia.data && datosDia.data.length > 0
        ),
        estadisticas,
        datosOriginales: datosDia ? datosDia.data : [],
      });

      // Avanzar al siguiente día
      fechaActual.setDate(fechaActual.getDate() + 1);
    }

    return dias;
  };

  // Componente para la pantalla de carga
  const RenderizarCargando = () => (
    <View style={styles.cargandoContainer}>
      <ActivityIndicator size="large" color={colors.primary} />
      <Text style={styles.cargandoTexto}>Procesando datos...</Text>
    </View>
  );

  // Componente para un día individual en la lista horizontal
  const DiaItem = ({ item }) => {
    const esSeleccionado = diaSeleccionado === item.fechaFormateada;
    const colorTexto = item.tieneDatos
      ? esSeleccionado
        ? "white"
        : colors.primary
      : "#999";

    // Determinar color de fondo basado en si tiene datos y está seleccionado
    let colorFondo = "transparent";
    if (esSeleccionado && item.tieneDatos) {
      colorFondo = colors.primary;
    } else if (item.tieneDatos) {
      colorFondo = "#f0f0f0";
    }

    // Calcular porcentaje si hay datos
    const porcentaje = item.estadisticas ? item.estadisticas.promedio : 0;

    return (
      <TouchableOpacity
        style={[
          styles.diaItem,
          { backgroundColor: colorFondo },
          esSeleccionado && styles.diaSeleccionado,
        ]}
        onPress={() =>
          item.tieneDatos && setDiaSeleccionado(item.fechaFormateada)
        }
        disabled={!item.tieneDatos}
      >
        {/* Estrella para el mejor día */}
        {item.mejorDia && item.tieneDatos && (
          <View style={styles.estrella}>
            <MaterialCommunityIcons name="star" size={14} color="#FFD700" />
          </View>
        )}
        <Text style={[styles.nombreDia, { color: colorTexto }]}>
          {item.nombreDia}
        </Text>
        <Text style={[styles.numeroDia, { color: colorTexto }]}>
          {item.numeroDia}
        </Text>
        {item.tieneDatos ? (
          <View style={styles.indicadorRendimiento}>
            <Text style={[styles.porcentaje, { color: colorTexto }]}>
              {porcentaje.toFixed(1)}%
            </Text>
          </View>
        ) : (
          <View style={styles.indicadorSinDatos}>
            <MaterialCommunityIcons
              name="minus-circle-outline"
              size={16}
              color="#999"
            />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  // Componente para mostrar cuando no hay datos
  const MensajeSinDatos = ({ mensaje }) => (
    <View style={styles.sinDatosContainer}>
      <Text style={styles.sinDatosTexto}>{mensaje}</Text>
    </View>
  );

  // Componente para mostrar detalles de un día seleccionado
  const DetallesDia = ({ dia }) => {
    if (!dia || !dia.tieneDatos) {
      return <MensajeSinDatos mensaje="No hay datos para este día" />;
    }

    const { estadisticas, fecha } = dia;
    const porcentaje = estadisticas.promedio;
    const colorProgreso = RendimientoUtils.determinarColorProgreso(porcentaje);
    const textoEstado = RendimientoUtils.determinarTextoEstado(porcentaje);
    const esMejorDia = dia.mejorDia;

    return (
      <>
        <Text style={styles.fechaCompleta}>
          {fecha.toLocaleDateString("es-ES", {
            weekday: "long",
            day: "numeric",
            month: "long",
          })}
          {esMejorDia && (
            <Text style={styles.mejorDiaTexto}> 🌟 Mejor día</Text>
          )}
        </Text>

        <View style={styles.tarjetasContainer}>
          {/* Tarjeta de Rendimiento */}
          <TarjetaEstadistica
            icono="chart-line"
            titulo="Rendimiento"
            valor={`${porcentaje.toFixed(1)}%`}
            descripcion={textoEstado}
            color={colorProgreso}
          />

          {/* Tarjeta de Registros */}
          <TarjetaEstadistica
            icono="clipboard-list"
            titulo="Registros"
            valor={estadisticas.cantidad}
            descripcion="Total del día"
            color={colors.primary}
          />

          {/* Tarjeta de Tokens especial (hardcodeado) */}
          {/* Tarjeta de Tokens con ribete amarillo */}
          <View style={styles.tarjetaTokens}>
            <View style={styles.tarjetaHeader}>
              <MaterialCommunityIcons
                name="ticket-confirmation"
                size={20}
                color="#F5B700"
              />
              <Text style={styles.tarjetaTitulo}>Tokens</Text>
            </View>
            <Text style={[styles.tarjetaValor, { color: "#F5B700" }]}>
              {TOKENS_DISPONIBLES}
            </Text>
            <Text style={styles.tarjetaDescripcion}>Disponibles</Text>
          </View>
        </View>
      </>
    );
  };

  // Componente reutilizable para tarjetas de estadísticas
  const TarjetaEstadistica = ({ icono, titulo, valor, descripcion, color }) => (
    <View style={styles.tarjeta}>
      <View style={styles.tarjetaHeader}>
        <MaterialCommunityIcons name={icono} size={20} color={color} />
        <Text style={styles.tarjetaTitulo}>{titulo}</Text>
      </View>
      <Text style={[styles.tarjetaValor, { color }]}>{valor}</Text>
      <Text style={styles.tarjetaDescripcion}>{descripcion}</Text>
    </View>
  );

  // Renderizado principal
  if (cargando) {
    return <RenderizarCargando />;
  }

  return (
    <View style={styles.container}>
      {/* Lista horizontal de días */}
      <FlatList
        horizontal
        data={diasSemana}
        renderItem={({ item }) => <DiaItem item={item} />}
        keyExtractor={(item) => item.fechaFormateada}
        showsHorizontalScrollIndicator={true}
        contentContainerStyle={styles.diasListContainer}
      />

      {/* Detalles del día seleccionado */}
      <View style={styles.detalleContainer}>
        {diaSeleccionado &&
        diasSemana.find((dia) => dia.fechaFormateada === diaSeleccionado) ? (
          <DetallesDia
            dia={diasSemana.find(
              (dia) => dia.fechaFormateada === diaSeleccionado
            )}
          />
        ) : (
          <MensajeSinDatos mensaje="Selecciona un día para ver detalles" />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 10,
  },
  diasListContainer: {
    paddingHorizontal: 2,
    paddingVertical: 2,
    justifyContent: "center",
  },
  diaItem: {
    width: 45,
    height: 80,
    marginHorizontal: 2.5,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    position: "relative", // Para posicionar la estrella
  },
  diaSeleccionado: {
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  estrella: {
    position: "absolute",
    top: 2,
    right: 2,
    zIndex: 1,
  },
  nombreDia: {
    fontSize: 12,
    fontWeight: "500",
    textTransform: "capitalize",
  },
  numeroDia: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 4,
  },
  indicadorRendimiento: {
    marginTop: 4,
  },
  porcentaje: {
    fontSize: 12,
    fontWeight: "500",
  },
  indicadorSinDatos: {
    marginTop: 4,
  },
  detalleContainer: {
    padding: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    marginHorizontal: 10,
    marginTop: 10,
    alignItems: "center",
  },
  fechaCompleta: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 15,
    textTransform: "capitalize",
    flexDirection: "row",
    alignItems: "center",
  },
  mejorDiaTexto: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFD700",
    marginLeft: 5,
  },
  // Estilos para tarjetas
  tarjetasContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 10,
  },
  tarjeta: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 12,
    width: "31%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    alignItems: "center",
  },
  tarjetaHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  tarjetaTitulo: {
    fontSize: 12,
    fontWeight: "500",
    marginLeft: 4,
    color: "#555",
  },
  tarjetaValor: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 4,
  },
  tarjetaDescripcion: {
    fontSize: 10,
    color: "#777",
    textAlign: "center",
  },
  // Estilos para tarjeta especial de tokens
  tarjetaTokens: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 12,
    width: "31%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#F5B700",
  },
  estadoTexto: {
    fontSize: 10,
    color: "#666",
    textAlign: "center",
  },
  // Estilos para mensajes y carga
  sinDatosContainer: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  sinDatosTexto: {
    color: "#666",
    fontSize: 14,
    fontStyle: "italic",
  },
  cargandoContainer: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  cargandoTexto: {
    color: "#666",
    fontSize: 14,
    marginTop: 10,
  },
});

export default VisualizadorSemanal;
