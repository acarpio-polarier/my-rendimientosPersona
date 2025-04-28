import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../../../styles/base";
import DateUtils from "../../helpers/FechaUtils";
import VisualizadorSemanal from "./Visualizadores/VisualizadorSemanal";
import VisualizadorAnual from "./Visualizadores/VisualizadorAnual";
import { rendimientoPersonasService } from "../../services/RendimientoPersonaService";
import { PERSONA_ID } from "../Index";
import FechaUtils from "../../helpers/FechaUtils";
import DetalleRegistros from "./DetalleRegistros";
import RendimientoUtils from "../../helpers/RendimientoUtils";

const screen_height = Dimensions.get("window").height;

// Recibir props directamente con destructuring
export default function DetalleRendimientoSelector({
  datosPorDia: datosInicialesPorDia = [],
  modoInicial = "semanal",
  semanaInicial = 0,
  anioSeleccionado: anioInicial = new Date().getFullYear(),
  mesSeleccionado: mesInicial = new Date().getMonth(),
  datosAnuales: datosAnualesIniciales = null,
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
  const [detalleRegistrosVisible, setDetalleRegistrosVisible] = useState(false);
  const [registroDia, setRegistroDia] = useState([]);
  const [selectedDia, setSelectedDia] = useState(0);
  const [intervalo, setIntevalo] = useState("mensual");
  const [tokensMensuales, setTokensMensuales] = useState(0);

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

      // Caché para no hacer llamadas a la api cada dos por tres
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
    getTokensPersonaPorFecha(PERSONA_ID, mesSeleccionado, anioSeleccionado);

    setRangoPeriodo(nuevoRango);
  }, [seleccionActual, modo, mesSeleccionado, anioSeleccionado]);

  const getTokensPersonaPorFecha = async (
    idPersona,
    mesSeleccionado, // Este viene de 1 a 12
    anioSeleccionado
  ) => {
    console.log("mesSeleccionado", mesSeleccionado, anioSeleccionado);

    const fechaInicio = new Date(
      Date.UTC(anioSeleccionado, mesSeleccionado, 1)
    );
    const fechaFin = new Date(anioSeleccionado, mesSeleccionado + 1, 1);

    const fechaInicioStr = fechaInicio.toISOString().split("T")[0];
    const fechaFinStr = fechaFin.toISOString().split("T")[0];

    const datos = await RendimientoUtils.getTokensPersonaPorFecha(
      idPersona,
      fechaInicioStr,
      fechaFinStr
    );

    console.log("un mes entero", fechaInicioStr, fechaFinStr);

    setTokensMensuales(datos?.TokensGanados ?? 0);
  };

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
      console.log("rangoPeriodo", rangoPeriodo);
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

      // Cargar datos para la semana seleccionada desde la API
      const datos =
        await rendimientoPersonasService.getRendimientoPersonaMaquina(
          PERSONA_ID,
          fechaInicio,
          fechaFin
        );

      if (datos && datos.length > 0) {
        const datosAgrupados = DateUtils.agruparRegistrosPorDia(datos);
        console.log("Datos agrupados:", datosAgrupados.length, "días");
        setDatosPorDia(datosAgrupados);
      } else {
        console.log("No hay datos para esta semana");
        setDatosPorDia([]);
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
        console.log("seleccion actual", seleccionActual, nuevaSeleccion);
        console.log("nuevaSeleccion", nuevaSeleccion);
        setSeleccionActual(nuevaSeleccion);
        // Notificar al componente padre del cambio
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

  // recibe los parametros del hijo (VisualizadorAnual)
  const handleValueChanged = (dataVisualizadorAnual) => {
    console.log(
      "cambios",
      dataVisualizadorAnual.visibilidad,
      dataVisualizadorAnual.registroDiaFiltrado[0].dayEntries
    );
    setDetalleRegistrosVisible(dataVisualizadorAnual.visibilidad);
    setRegistroDia(dataVisualizadorAnual.registroDiaFiltrado[0].dayEntries);
    setSelectedDia(dataVisualizadorAnual.registroDiaFiltrado[0].dia);
    setIntevalo(dataVisualizadorAnual.intervalo);
    console.log("Datos Por dia", registroDia);
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
      if (detalleRegistrosVisible && selectedDia) {
        return <DetalleRegistros dia={registroDia} />;
      }
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
            onValueChanged={handleValueChanged}
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

  //renderizar la cabecera segun la vista
  const renderizarCabecera = () => {
    console.log("renderizarCabecera", mesSeleccionado);
    if (detalleRegistrosVisible && selectedDia) {
      return (
        <View style={styles.selectorContainerDia}>
          <TouchableOpacity
            onPress={() => {
              setDetalleRegistrosVisible(false);
              setIntevalo("mensual");
            }}
            style={styles.button}
          >
            <MaterialCommunityIcons
              name="chevron-left"
              size={30}
              color={colors.primary}
            />
          </TouchableOpacity>
          <View style={styles.diaText}>
            <Text style={styles.dateTextRegistros}>
              Registros dia {selectedDia}
            </Text>
          </View>
        </View>
      );
    } else {
      return (
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
      );
    }
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

  // calcular el rendimiento por mes
  const rendimientoAcumulado = (intervalo) => {
    if (intervalo === "mensual") {
      const infoPorMes = datosPorMes.infoPorMes;
      const infoMesActual = infoPorMes?.[mesSeleccionado]?.info;
      const rendimientoMensual = (
        infoMesActual?.reduce((acc, obj) => acc + obj.RendimientoGlobal, 0) /
        infoMesActual?.length
      ).toFixed(2);
      console.log("datosPorMes", datosPorMes);
      console.log("infoPorMes", infoPorMes);
      console.log("infoMesActual", infoMesActual);
      console.log("rendimiento Mensual", rendimientoMensual);
      if (rendimientoMensual === "NaN") return 0;
      return rendimientoMensual;
    }
    const rendimientoPorRegistro = (
      registroDia.reduce((acc, obj) => acc + obj.RendimientoGlobal, 0) /
      registroDia.length
    ).toFixed(2);

    console.log("rendimientoPorRegistro", rendimientoPorRegistro);
    if (rendimientoPorRegistro) return rendimientoPorRegistro;
    return 0;
  };

  // calcular el numero de dias trabajados
  const totalDiasTrabajados = (intervalo) => {
    const infoPorMes = datosPorMes.infoPorMes;
    if (intervalo === "mensual") {
      const diasTrabajados = new Set(
        infoPorMes?.[mesSeleccionado]?.info
          ?.filter((item) => !!item.fechaFin)
          ?.map((item) => item.fechaFin.split("T")[0])
      ).size;
      if (diasTrabajados) return `${diasTrabajados}d`;

      return 0;
    }
    const registrosPorDia = registroDia.length;
    if (registrosPorDia) return registrosPorDia;

    return 0;
  };
  const colorProgreso = RendimientoUtils.determinarColorProgreso(
    rendimientoAcumulado()
  );
  const textoEstado = RendimientoUtils.determinarTextoEstado(
    rendimientoAcumulado()
  );
  const getColor = (valor) => {
    console.log("valor", valor);
    if (valor > 70 && valor < 90) return colors.warning;
    if (valor >= 90) return colors.success;
    return colors.danger;
  };
  const rendimientoTargeta = rendimientoAcumulado(intervalo);

  const renderizadoTargetasInfo = () => {
    console.log("intervalo", intervalo);
    if (modo != "semanal") {
      return (
        <View style={styles.tarjetasContainer}>
          {/* Tarjeta de Rendimiento */}
          <TarjetaEstadistica
            icono="chart-line"
            titulo="Rendimiento"
            valor={`${rendimientoTargeta}%`}
            descripcion={textoEstado}
            color={getColor(rendimientoTargeta)}
          />

          {/* Tarjeta de Registros */}
          <TarjetaEstadistica
            icono="clipboard-list"
            titulo="Registros"
            valor={totalDiasTrabajados(intervalo)}
            descripcion="Total de días"
            color={colors.darkGray}
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
              {tokensMensuales}
            </Text>
            <Text style={styles.tarjetaDescripcion}>Disponibles</Text>
          </View>
        </View>
      );
    }
    return <View></View>;
  };

  return (
    <View style={styles.contenedor}>
      {/* Selector de periodo */}
      <View style={styles.contenido}>{renderizarCabecera()}</View>

      {/* Renderizado targetas de informacion */}

      <View>{renderizadoTargetasInfo()}</View>

      {/* Rendirizado condicional */}
      <View style={styles.visualizadorContainer}>
        {renderizarVisualizador()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundColorRed: {
    backgroundColor: "red",
  },
  contenedor: {
    width: "100%",
    alignSelf: "center",
    borderRadius: 10,
    overflow: "hidden",
    marginVertical: 10,
    paddingBottom: 0,
    height: "95%",
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
    height: screen_height * 0.1,
  },
  selectorContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
    width: "100%",
    height: screen_height * 0.2,
  },
  selectorContainerDia: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "start",
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
    display: "flex",
    marginHorizontal: 16,
    justifyContent: "center",
    textAlign: "center",
  },
  dateText: {
    fontWeight: "500",
    fontSize: 16,
    alignSelf: "start",
  },
  dateTextRegistros: {
    fontWeight: "500",
    fontSize: 16,
    alignSelf: "start",
    marginLeft: "20%",
  },
  diaText: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
  },
  weekInfo: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    height: "auto",
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
  // Estilos para tarjetas
  tarjetasContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 10,
  },
  tarjeta: {
    backgroundColor: colors.white,
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
    marginBottom: 2,
  },
  tarjetaTitulo: {
    fontSize: 13,
    fontWeight: "500",
    marginLeft: 4,
    color: "#555",
  },
  tarjetaValor: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 2,
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
  },
  estadoTexto: {
    fontSize: 10,
    color: "#666",
    textAlign: "center",
  },
});
