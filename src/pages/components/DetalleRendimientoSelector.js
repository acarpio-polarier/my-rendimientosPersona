import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { colors } from "../../../styles/base";
import DateUtils from "../../helpers/FechaUtils";
import VisualizadorSemanal from "./Visualizadores/VisualizadorSemanal";
import { rendimientoPersonasService } from "../../services/RendimientoPersonaService";
import { PERSONA_ID } from "../Index";

export default function DetalleRendimientoSelector() {
  // Hooks
  const navigation = useNavigation();
  const route = useRoute();

  // Estado inicial (puede recibir datos iniciales para la primera carga)
  const {
    datosPorDia: datosInicialesPorDia,
    modoInicial = "semanal",
    semanaInicial = 0, // Recibimos la semana inicial desde la navegación
  } = route.params || {};

  // Estados
  const [modo, setModo] = useState(modoInicial);
  const [seleccionActual, setSeleccionActual] = useState(semanaInicial || 0); // Usar semanaInicial si existe
  const [mesSeleccionado, setMesSeleccionado] = useState(new Date().getMonth()); // Mes actual (0-11)
  const [anioSeleccionado, setAnioSeleccionado] = useState(
    new Date().getFullYear()
  ); // Año actual

  // Estado para almacenar datos mensuales que vienen del padre/navegación
  const [datosMensualesCompletos, setDatosMensualesCompletos] = useState([]);

  // En un useEffect inicial, podríamos recibir estos datos
  useEffect(() => {
    // Supongamos que estos datos vienen de route.params
    const { datosMensuales } = route.params || {};
    if (datosMensuales && datosMensuales.length > 0) {
      setDatosMensualesCompletos(datosMensuales);
    }
  }, []);

  const [rangoPeriodo, setRangoPeriodo] = useState(
    modo === "semanal"
      ? DateUtils.obtenerRangoSemana(0)
      : DateUtils.obtenerRangoMes(anioSeleccionado, mesSeleccionado)
  );
  const [datosPorDia, setDatosPorDia] = useState(datosInicialesPorDia || []);
  const [datosPorMes, setDatosPorMes] = useState([]);
  const [cargando, setCargando] = useState(false);

  // Efecto para actualizar datos cuando cambia la selección o el modo
  useEffect(() => {
    let nuevoRango;

    if (modo === "semanal") {
      // Manejo de datos semanales
      nuevoRango = DateUtils.obtenerRangoSemana(seleccionActual);
      cargarDatosSemana(nuevoRango.inicioIso, nuevoRango.finIso);
    } else {
      // Manejo de datos mensuales
      nuevoRango = DateUtils.obtenerRangoMes(anioSeleccionado, mesSeleccionado);
      cargarDatosMes(nuevoRango.inicioIso, nuevoRango.finIso);
    }

    // Actualizamos el rango del periodo
    setRangoPeriodo(nuevoRango);

    // Para debug
    console.log("Nuevo rango:", nuevoRango, "Modo:", modo);
  }, [seleccionActual, modo, mesSeleccionado, anioSeleccionado]);

  const obtenerMesDelPeriodo = () => {
    // Definimos aquí también los nombres cortos de meses para la visualización
    const nombresMesesCorto = [
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

    if (modo === "anual") {
      // Usar formato de mes corto y año
      return nombresMesesCorto[mesSeleccionado] + " " + anioSeleccionado;
    }

    if (!rangoPeriodo || !rangoPeriodo.inicioIso) {
      return nombresMesesCorto[new Date().getMonth()];
    }

    try {
      // Obtenemos el mes de la fecha en formato corto
      const fechaObj = new Date(rangoPeriodo.inicioIso);
      if (isNaN(fechaObj.getTime())) {
        throw new Error("Fecha inválida");
      }
      return nombresMesesCorto[fechaObj.getMonth()];
    } catch (error) {
      console.error("Error al obtener mes del periodo:", error);
      return nombresMesesCorto[new Date().getMonth()];
    }
  };

  // Función para cargar datos desde la API (desde paste2)
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

  // Función simplificada para obtener datos por mes usando la estructura proporcionada
  const obtenerDatosPorMes = (mes, anio) => {
    // Nombres cortos de meses para buscar el correspondiente label
    const nombresMesesCorto = FechaUtils.nombresMesesCorto;

    const mesLabel = nombresMesesCorto[mes];
    console.log(`Buscando datos para mes: ${mesLabel}`);

    // Filtrar los datos por el label correspondiente y el año
    const datosMes = datosMensualesCompletos.find(
      (item) => item.label === mesLabel && item.anio === anio
    );

    // Si encontramos datos, los retornamos, sino retornamos null
    if (datosMes && datosMes.data) {
      console.log(`Datos encontrados para ${mesLabel} ${anio}`);
      return datosMes.data;
    }

    console.log(`No se encontraron datos para ${mesLabel} ${anio}`);
    return null;
  };

  // Función para seleccionar periodo anterior
  const periodoAnterior = () => {
    if (modo === "semanal") {
      // En modo semanal, incrementamos el offset de semanas
      const nuevaSeleccion = seleccionActual + 1;
      setSeleccionActual(nuevaSeleccion);
    } else {
      // En modo anual, retrocedemos un mes
      let nuevoMes = mesSeleccionado - 1;
      let nuevoAnio = anioSeleccionado;

      if (nuevoMes < 0) {
        nuevoMes = 11; // Diciembre
        nuevoAnio--;
      }

      setMesSeleccionado(nuevoMes);
      setAnioSeleccionado(nuevoAnio);
    }
  };

  // Función para seleccionar periodo siguiente (hasta la actual)
  const periodoSiguiente = () => {
    if (modo === "semanal") {
      if (seleccionActual > 0) {
        const nuevaSeleccion = seleccionActual - 1;
        setSeleccionActual(nuevaSeleccion);

        // Si existe una función de callback para reportar el cambio de semana
        if (route.params?.onSemanaChange) {
          route.params.onSemanaChange(nuevaSeleccion);
        }
      }
    } else {
      // Verificamos si estamos en el mes y año actual
      const fechaActual = new Date();
      const mesActual = fechaActual.getMonth();
      const anioActual = fechaActual.getFullYear();

      // Solo permitimos avanzar si no estamos en el mes actual
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

  // Función para cambiar entre modo semanal y anual
  const cambiarModo = () => {
    const nuevoModo = modo === "semanal" ? "anual" : "semanal";
    setModo(nuevoModo);

    if (nuevoModo === "semanal") {
      setSeleccionActual(0); // Resetear a semana actual
    } else {
      // Al cambiar a modo anual, establecer mes y año actuales
      const fechaActual = new Date();
      setMesSeleccionado(fechaActual.getMonth());
      setAnioSeleccionado(fechaActual.getFullYear());
    }
  };

  // Renderizar mensaje cuando no hay datos
  const renderizarSinDatos = (periodo) => {
    return (
      <View style={styles.sinDatosContainer}>
        <MaterialCommunityIcons name="calendar-blank" size={40} color="#999" />
        <Text style={styles.sinDatosTexto}>
          No hay datos disponibles para{" "}
          {periodo === "semana" ? "esta semana" : "este mes"}.
        </Text>
      </View>
    );
  };

  // Renderizar el visualizador adecuado según el modo
  const renderizarVisualizador = () => {
    if (cargando) {
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
      if (!datosPorMes || datosPorMes.length === 0) {
        return renderizarSinDatos("mes");
      }

      // Nombres cortos de meses para referencias
      const nombresMesesCorto = [
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

      // Obtener el label del mes actual
      const mesLabel = nombresMesesCorto[mesSeleccionado];

      return (
        <View style={styles.visualizadorContainer}>
          <Text style={styles.tituloMes}>
            {mesLabel} {anioSeleccionado}
          </Text>

          {/* Visualizador de datos mensuales (placeholder) */}
          <View style={styles.proximamenteContainer}>
            <Text style={styles.proximamenteTexto}>
              Visualizador mensual en desarrollo
            </Text>
          </View>
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
      {/* Título del contenido */}
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <Text style={styles.headerText}>
          Rendimiento {modo === "semanal" ? "semanal" : "mensual"}
        </Text>
        {/* Botón para cambiar modo */}
        <TouchableOpacity onPress={cambiarModo} style={styles.modeToggle}>
          <MaterialCommunityIcons
            name={modo === "semanal" ? "calendar-month" : "calendar-week"}
            size={24}
            color="white"
          />
        </TouchableOpacity>
      </View>

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

      {/* Visualizador condicional */}
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
