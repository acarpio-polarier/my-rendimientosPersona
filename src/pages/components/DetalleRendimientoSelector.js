import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../../../styles/base";
import DateUtils from "../../helpers/FechaUtils";
import VisualizadorSemanal from "./Visualizadores/VisualizadorSemanal";
import VisualizadorAnual from "./Visualizadores/VisualizadorAnual";
import { rendimientoPersonasService } from "../../services/RendimientoPersonaService";
import { PERSONA_ID } from "../Index";
import FechaUtils from "../../helpers/FechaUtils";

// Recibir props directamente con destructuring
export default function DetalleRendimientoSelector({
  datosPorDia: datosInicialesPorDia = [],
  modoInicial = "semanal",
  semanaInicial = 0,
  anioSeleccionado: anioInicial = new Date().getFullYear(),
  mesSeleccionado: mesInicial = new Date().getMonth(),
  datosAnuales: datosAnualesIniciales = null,
  onSemanaChange = () => {},
}) {
  console.log("DetalleRendimientoSelector - Props recibidas:", {
    modoInicial,
    semanaInicial,
    tieneDataDias: datosInicialesPorDia ? datosInicialesPorDia.length : 0,
    tieneDataAnual: !!datosAnualesIniciales,
  });

  // Estados
  const [modo, setModo] = useState(modoInicial || "semanal");
  const [seleccionActual, setSeleccionActual] = useState(semanaInicial || 0);
  const [mesSeleccionado, setMesSeleccionado] = useState(mesInicial);
  const [anioSeleccionado, setAnioSeleccionado] = useState(anioInicial);

  // Asegurarse de que el modo y selecciones se inicialicen correctamente
  useEffect(() => {
    console.log("Actualizando modo a:", modoInicial);
    setModo(modoInicial || "semanal");
  }, [modoInicial]);

  // Actualizar semana cuando cambia desde fuera
  useEffect(() => {
    setSeleccionActual(semanaInicial || 0);
  }, [semanaInicial]);

  // Actualizar año/mes cuando cambian desde fuera
  useEffect(() => {
    setAnioSeleccionado(anioInicial);
    setMesSeleccionado(mesInicial);
  }, [anioInicial, mesInicial]);

  // Caché para almacenar datos por año y evitar llamadas repetidas
  const [datosCache, setDatosCache] = useState(() => {
    const cache = {};
    // Si tenemos datos iniciales, los añadimos a la caché
    if (datosAnualesIniciales && datosAnualesIniciales.values) {
      const anioActual = new Date().getFullYear();
      cache[anioActual] = datosAnualesIniciales;
    }
    return cache;
  });

  const [datosMensualesCompletos, setDatosMensualesCompletos] = useState([]);
  const [datosAnuales, setDatosAnuales] = useState(datosAnualesIniciales || []);
  const [cargandoDatosAnuales, setCargandoDatosAnuales] = useState(false);

  const [rangoPeriodo, setRangoPeriodo] = useState(
    modo === "semanal"
      ? DateUtils.obtenerRangoSemana(0)
      : DateUtils.obtenerRangoMes(anioSeleccionado, mesSeleccionado)
  );
  const [datosPorDia, setDatosPorDia] = useState(datosInicialesPorDia || []);
  const [datosPorMes, setDatosPorMes] = useState([]);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    let nuevoRango;

    if (modo === "semanal") {
      nuevoRango = DateUtils.obtenerRangoSemana(seleccionActual);
      cargarDatosSemana(nuevoRango.inicioIso, nuevoRango.finIso);
    } else {
      nuevoRango = DateUtils.obtenerRangoMes(anioSeleccionado, mesSeleccionado);

      // Caché medio fake para no hacer llamadas a la api cada dos por tres
      if (datosCache[anioSeleccionado]) {
        console.log(`Usando datos en caché para el año ${anioSeleccionado}`);
        setDatosAnuales(datosCache[anioSeleccionado]);
        setDatosPorMes(datosCache[anioSeleccionado]);
      }
      // Si no hay en caché pero tenemos datos anuales y el año seleccionado coincide, usarlos
      else if (
        datosAnuales &&
        datosAnuales.labels &&
        anioSeleccionado === (datosAnuales.anio || new Date().getFullYear())
      ) {
        setDatosPorMes(datosAnuales);
      }
      // Si no tenemos datos o cambió el año, cargar los datos del año seleccionado
      else {
        cargarDatosAnuales(anioSeleccionado);
      }
    }

    setRangoPeriodo(nuevoRango);
  }, [seleccionActual, modo, mesSeleccionado, anioSeleccionado]);

  // Función para cargar datos anuales con cache
  const cargarDatosAnuales = async (anio) => {
    setCargandoDatosAnuales(true);
    try {
      console.log(`Cargando datos anuales para el año: ${anio}`);

      const rangoAnio = FechaUtils.obtenerRangoAño(anio);
      const fechaIni = rangoAnio.inicio;
      const fechaFin = rangoAnio.fin;

      const response =
        await rendimientoPersonasService.getRendimientoPersonaMaquina(
          PERSONA_ID,
          fechaIni,
          fechaFin
        );

      if (response && response.length > 0) {
        const datosProcesados = FechaUtils.procesarDatosAnuales(response);
        // Añadir el año a los datos procesados para saber a qué año corresponden
        datosProcesados.anio = anio;

        // Actualizar la caché con los nuevos datos
        setDatosCache((prevCache) => ({
          ...prevCache,
          [anio]: datosProcesados,
        }));

        setDatosAnuales(datosProcesados);
        setDatosPorMes(datosProcesados);
        console.log(`Datos anuales cargados para ${anio}:`, datosProcesados);
      } else {
        console.log(`No hay datos para el año ${anio}`);
        const datosVacios = { labels: [], values: [], anio: anio };

        // Guardar también los datos vacíos en caché para no volver a hacer la llamada
        setDatosCache((prevCache) => ({
          ...prevCache,
          [anio]: datosVacios,
        }));

        setDatosAnuales(datosVacios);
        setDatosPorMes(datosVacios);
      }
    } catch (error) {
      console.error(`Error al cargar datos anuales para ${anio}:`, error);
      const datosVacios = { labels: [], values: [], anio: anio };

      setDatosAnuales(datosVacios);
      setDatosPorMes(datosVacios);
    } finally {
      setCargandoDatosAnuales(false);
    }
  };

  const obtenerMesDelPeriodo = () => {
    if (modo === "anual") {
      // Usar formato de mes corto y año
      return (
        FechaUtils.nombresMesesCorto[mesSeleccionado] + " " + anioSeleccionado
      );
    }

    if (!rangoPeriodo || !rangoPeriodo.inicioIso) {
      return FechaUtils.nombresMesesCorto[new Date().getMonth()];
    }

    try {
      const fechaObj = new Date(rangoPeriodo.inicioIso);
      if (isNaN(fechaObj.getTime())) {
        throw new Error("Fecha inválida");
      }
      return FechaUtils.nombresMesesCorto[fechaObj.getMonth()];
    } catch (error) {
      console.error("Error al obtener mes del periodo:", error);
      return FechaUtils.nombresMesesCorto[new Date().getMonth()];
    }
  };

  // Función para cargar datos desde la API
  const cargarDatosSemana = async (fechaInicio, fechaFin) => {
    setCargando(true);
    try {
      console.log(`Cargando datos: ${fechaInicio} - ${fechaFin}`);

      // Si tenemos datos iniciales y estamos en la semana actual, los usamos
      if (
        seleccionActual === 0 &&
        datosInicialesPorDia &&
        datosInicialesPorDia.length > 0
      ) {
        setDatosPorDia(datosInicialesPorDia);
      } else {
        // En otro caso, cargar datos para la semana seleccionada
        const datos =
          await rendimientoPersonasService.getRendimientoPersonaMaquina(
            PERSONA_ID,
            fechaInicio,
            fechaFin
          );

        if (datos && datos.length > 0) {
          // Agrupar datos por día
          const datosAgrupados = DateUtils.agruparRegistrosPorDia(datos);
          console.log("Datos agrupados:", datosAgrupados.length, "días");
          setDatosPorDia(datosAgrupados);
        } else {
          console.log("No hay datos para esta semana");
          setDatosPorDia([]);
        }
      }
    } catch (error) {
      console.error("Error al cargar datos:", error);
      setDatosPorDia([]);
    } finally {
      setCargando(false);
    }
  };

  // Función para seleccionar periodo anterior
  const periodoAnterior = () => {
    if (modo === "semanal") {
      const nuevaSeleccion = seleccionActual + 1;
      setSeleccionActual(nuevaSeleccion);
      // Notificar al componente padre del cambio
      onSemanaChange(nuevaSeleccion);
    } else {
      let nuevoMes = mesSeleccionado - 1;
      let nuevoAnio = anioSeleccionado;

      if (nuevoMes < 0) {
        nuevoMes = 11;
        nuevoAnio--;
      }

      setMesSeleccionado(nuevoMes);
      setAnioSeleccionado(nuevoAnio);
    }
  };

  const periodoSiguiente = () => {
    if (modo === "semanal") {
      if (seleccionActual > 0) {
        const nuevaSeleccion = seleccionActual - 1;
        setSeleccionActual(nuevaSeleccion);
        // Notificar al componente padre del cambio
        onSemanaChange(nuevaSeleccion);
      }
    } else {
      const fechaActual = new Date();
      const mesActual = fechaActual.getMonth();
      const anioActual = fechaActual.getFullYear();

      if (
        anioSeleccionado < anioActual ||
        (anioSeleccionado === anioActual && mesSeleccionado < mesActual)
      ) {
        let nuevoMes = mesSeleccionado + 1;
        let nuevoAnio = anioSeleccionado;

        if (nuevoMes > 11) {
          nuevoMes = 0; // Enero
          nuevoAnio++;
        }

        setMesSeleccionado(nuevoMes);
        setAnioSeleccionado(nuevoAnio);
      }
    }
  };

  // Renderizar mensaje cuando no hay datos
  const renderizarSinDatos = (periodo) => {
    return (
      <View style={styles.sinDatosContainer}>
        <MaterialCommunityIcons name="calendar-blank" size={40} color="#999" />
        <Text style={styles.sinDatosTexto}>
          No hay datos disponibles para{" "}
          {periodo === "semana"
            ? "esta semana"
            : periodo === "mes"
            ? "este mes"
            : "este año"}
          .
        </Text>
      </View>
    );
  };

  // Renderizar el visualizador adecuado según el modo
  const renderizarVisualizador = () => {
    if (cargando || (modo === "anual" && cargandoDatosAnuales)) {
      return (
        <View style={styles.cargandoContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.cargandoTexto}>Cargando datos...</Text>
        </View>
      );
    }

    if (modo === "semanal") {
      if (!datosPorDia || datosPorDia.length === 0) {
        return renderizarSinDatos("semana");
      }

      return (
        <VisualizadorSemanal
          data={datosPorDia}
          semanaActual={seleccionActual}
          rangoPeriodo={{
            fechaInicio: rangoPeriodo.inicioIso,
            fechaFin: rangoPeriodo.finIso,
          }}
        />
      );
    } else {
      // Modo anual (ahora por mes)
      if (
        !datosPorMes ||
        !datosPorMes.values ||
        datosPorMes.values.length === 0
      ) {
        return renderizarSinDatos("año");
      }

      return (
        <View style={styles.visualizadorContainer}>
          <VisualizadorAnual
            data={datosPorMes}
            mesSeleccionado={mesSeleccionado}
          />
        </View>
      );
    }
  };

  // Verificar si estamos en el mes y año actual (para deshabilitar el botón siguiente)
  const esMesActual = () => {
    if (modo === "semanal") {
      return seleccionActual === 0;
    } else {
      const fechaActual = new Date();
      return (
        mesSeleccionado === fechaActual.getMonth() &&
        anioSeleccionado === fechaActual.getFullYear()
      );
    }
  };

  return (
    <View style={styles.contenedor}>
      {/* Selector de periodo */}
      <View style={styles.contenido}>
        <View style={styles.selectorContainer}>
          <TouchableOpacity onPress={periodoAnterior} style={styles.button}>
            <MaterialCommunityIcons
              name="chevron-left"
              size={30}
              color={colors.primary}
            />
          </TouchableOpacity>

          <View style={styles.dateRange}>
            <Text style={styles.dateText}>
              {
                modo === "semanal"
                  ? `${rangoPeriodo.inicio} - ${rangoPeriodo.fin}`
                  : obtenerMesDelPeriodo() /* Nombre del mes y año */
              }
            </Text>
            <Text style={styles.weekInfo}>
              {esMesActual()
                ? modo === "semanal"
                  ? "Semana actual"
                  : "Mes actual"
                : modo === "semanal"
                ? `Hace ${seleccionActual} ${
                    seleccionActual === 1 ? "semana" : "semanas"
                  }`
                : ""}
            </Text>
          </View>

          <TouchableOpacity
            onPress={periodoSiguiente}
            disabled={esMesActual()}
            style={[styles.button, esMesActual() && styles.disabledButton]}
          >
            <MaterialCommunityIcons
              name="chevron-right"
              size={30}
              color={esMesActual() ? "#ccc" : colors.primary}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Rendirizado condicional */}
      <View style={styles.visualizadorContainer}>
        {renderizarVisualizador()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    width: "95%",
    alignSelf: "center",
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
    marginVertical: 10,
  },
  header: {
    paddingVertical: 5,
    paddingHorizontal: 7,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  headerText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  modeToggle: {
    position: "absolute",
    right: 8,
    padding: 4,
  },
  contenido: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  selectorContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
    width: "100%",
  },
  button: {
    padding: 8,
    backgroundColor: "transparent",
  },
  disabledButton: {
    opacity: 0.3,
  },
  dateRange: {
    marginHorizontal: 16,
    alignItems: "center",
  },
  dateText: {
    fontWeight: "500",
    fontSize: 16,
  },
  weekInfo: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  visualizadorContainer: {
    width: "100%",
    paddingBottom: 15,
  },
  sinDatosContainer: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  sinDatosTexto: {
    marginTop: 12,
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    maxWidth: 200,
  },
  cargandoContainer: {
    padding: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  cargandoTexto: {
    marginTop: 12,
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  // Estilos para el visualizador mensual
  tituloMes: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: colors.primary,
  },
  proximamenteContainer: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  proximamenteTexto: {
    color: "#666",
    fontSize: 14,
    fontStyle: "italic",
  },
});
