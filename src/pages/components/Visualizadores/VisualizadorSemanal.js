import React, { useEffect, useState } from "react";
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
import DateUtils from "../../../helpers/FechaUtils";
import RendimientoUtils from "../../../helpers/RendimientoUtils";

const VisualizadorSemanal = ({ data, semanaActual, rangoPeriodo }) => {
  const [diasSemana, setDiasSemana] = useState([]);
  const [diaSeleccionado, setDiaSeleccionado] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [datosPorDia, setDatosPorDia] = useState([]);

  // Debug log
  useEffect(() => {
    console.log("Datos recibidos:", data);
    console.log("Rango de periodo:", rangoPeriodo);
  }, [data, rangoPeriodo]);

  // Agrupar datos cuando cambian
  useEffect(() => {
    if (data && data.length > 0) {
      // Asegurarse de usar los datos ya agrupados o agruparlos
      const datosAgrupados = Array.isArray(data[0].data)
        ? data
        : DateUtils.agruparRegistrosPorDia(data);

      setDatosPorDia(datosAgrupados);
      procesarDatosSemana(datosAgrupados);
    } else {
      // Limpiar estado si no hay datos
      setDiasSemana([]);
      setDiaSeleccionado(null);
      setCargando(false);
    }
  }, [data, semanaActual, rangoPeriodo]);

  // Prepara los datos de la semana para mostrar
  const procesarDatosSemana = (datosAgrupados) => {
    setCargando(true);

    try {
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
        const fechaFormateada = DateUtils.formatearFechaYYYYMMDD(fechaActual);

        // Buscar datos para este día en los datos agrupados
        const datosDia = datosAgrupados.find(
          (item) => item.dia === fechaFormateada
        );

        // Debug log
        console.log(`Procesando día: ${fechaFormateada}`, datosDia);

        // Calcular estadísticas si hay datos
        let estadisticas = null;
        if (datosDia && datosDia.data && datosDia.data.length > 0) {
          estadisticas = RendimientoUtils.calcularEstadisticas(
            datosDia.data,
            "Rendimiento"
          );
        }

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

      console.log("Días procesados:", dias);

      setDiasSemana(dias);
    } catch (error) {
      console.error("Error al procesar datos de la semana:", error);
    } finally {
      setCargando(false);
    }
  };

  // El resto del código permanece igual que en la versión original
  // (renderizarDia, renderizarDetallesDia, estilos, etc.)

  // Renderizar contenido existente...
  if (cargando) {
    return (
      <View style={styles.cargandoContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.cargandoTexto}>Procesando datos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Lista horizontal de días */}
      <FlatList
        horizontal
        data={diasSemana.slice(0, 7)} // Asegurar solo 7 días
        renderItem={({ item }) => {
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
        }}
        keyExtractor={(item) => item.fechaFormateada}
        showsHorizontalScrollIndicator={true}
        contentContainerStyle={styles.diasListContainer}
      />

      {/* Renderizar detalles del día seleccionado */}
      {diaSeleccionado &&
      diasSemana.find((dia) => dia.fechaFormateada === diaSeleccionado) ? (
        <View style={styles.detalleContainer}>
          {(() => {
            const diaActual = diasSemana.find(
              (dia) => dia.fechaFormateada === diaSeleccionado
            );

            if (!diaActual || !diaActual.tieneDatos) {
              return (
                <View style={styles.sinDatosContainer}>
                  <Text style={styles.sinDatosTexto}>
                    No hay datos para este día
                  </Text>
                </View>
              );
            }

            const { estadisticas, fecha } = diaActual;
            const porcentaje = estadisticas.promedio;
            const colorProgreso =
              RendimientoUtils.determinarColorProgreso(porcentaje);
            const textoEstado =
              RendimientoUtils.determinarTextoEstado(porcentaje);

            return (
              <>
                <Text style={styles.fechaCompleta}>
                  {fecha.toLocaleDateString("es-ES", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                  })}
                </Text>

                <View style={styles.estadisticasContainer}>
                  <View style={styles.estadisticaItem}>
                    <Text
                      style={[
                        styles.estadisticaValor,
                        { color: colorProgreso },
                      ]}
                    >
                      {porcentaje.toFixed(1)}%
                    </Text>
                    <Text style={styles.estadisticaLabel}>Rendimiento</Text>
                  </View>

                  <View style={styles.estadisticaItem}>
                    <Text style={styles.estadisticaValor}>
                      {diaActual.datosOriginales.length}
                    </Text>
                    <Text style={styles.estadisticaLabel}>Registros</Text>
                  </View>

                  <View style={styles.estadisticaItem}>
                    <Text style={styles.estadisticaValor}>
                      {estadisticas.maximo.toFixed(1)}%
                    </Text>
                    <Text style={styles.estadisticaLabel}>Máximo</Text>
                  </View>
                </View>

                <Text style={[styles.estadoTexto, { color: colorProgreso }]}>
                  {textoEstado}
                </Text>
              </>
            );
          })()}
        </View>
      ) : (
        <View style={styles.sinDatosContainer}>
          <Text style={styles.sinDatosTexto}>
            No hay datos disponibles para esta semana
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 10,
  },
  diasListContainer: {
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  diaItem: {
    width: 60,
    height: 80,
    marginHorizontal: 5,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
  },
  diaSeleccionado: {
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
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
  },
  estadisticasContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 15,
  },
  estadisticaItem: {
    alignItems: "center",
  },
  estadisticaValor: {
    fontSize: 18,
    fontWeight: "bold",
  },
  estadisticaLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  estadoTexto: {
    fontSize: 16,
    fontWeight: "500",
  },
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
