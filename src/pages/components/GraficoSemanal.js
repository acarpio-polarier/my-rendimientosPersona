import React, { useState, useEffect, useRef } from "react";
import { ProgressCircle } from "react-native-svg-charts";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { rendimientoPersonasService } from "../../services/RendimientoPersonaService";
import BarraExpandible from "./BarraExpandible";
import DetalleRendimientoDesplegable from "./DetalleRendimientoDesplegable";
import { colors } from "../../../styles/base";
import { PERSONA_ID } from "../Index";
import RendimientoUtils from "../../helpers//RendimientoUtils";
import FechaUtils from "../../helpers//FechaUtils";
import DetalleRendimientoSelector from "./DetalleRendimientoSelector";
import ModalRendimiento from "./ModalRendimiento";

const GraficoSemanal = () => {
  // Estado para el modal
  const [modalVisible, setModalVisible] = useState(false);
  const { height: SCREEN_HEIGHT } = Dimensions.get("window").height;

  const mostrarDetalles = () => {
    if (!cargando && hayDatos) {
      setModalVisible(true);
    }
  };

  // Estado
  const [semanaSeleccionada, setSemanaSeleccionada] = useState(0);
  const [progreso, setProgreso] = useState(0);
  const [rangoSemana, setRangoSemana] = useState({
    inicio: "",
    fin: "",
  });
  const [cargando, setCargando] = useState(true);
  const [hayDatos, setHayDatos] = useState(true);
  const [datosRendimiento, setDatosRendimiento] = useState([]);
  const [tokensSemanales, setTokensSemanales] = useState(0);
  const [datosPorDia, setDatosPorDia] = useState([]);
  const fetchIdRef = useRef(0); // Token de control para que no se carguen datos anteriores

  // Efecto
  useEffect(() => {
    const fetchId = ++fetchIdRef.current;
    const nuevoRango = FechaUtils.obtenerRangoSemana(semanaSeleccionada);
    setRangoSemana(nuevoRango);
    setCargando(true);

    console.log(
      "Rango de semana actualizado",
      nuevoRango,
      "rangoSemana",
      rangoSemana
    );
    console.log("Fecha inicio ISO", nuevoRango.inicioIso);
    console.log("Fecha fin ISO", nuevoRango.finIso);
    getRendimientoMedio(
      PERSONA_ID,
      nuevoRango.inicioIso,
      nuevoRango.finIso,
      fetchId
    );
    getTokensPersonaPorFecha(
      PERSONA_ID,
      nuevoRango.inicioIso,
      nuevoRango.finIso,
      fetchId
    );

    // Si hay un cambio de semana, actualizar el estado del botón
    if (datosRendimiento.length > 0) {
      setHayDatos(true);
    }
  }, [semanaSeleccionada]);
  const getTokensPersonaPorFecha = async (
    idPersona,
    fechaInicio,
    fechaFin,
    fetchId
  ) => {
    const datos = await RendimientoUtils.getTokensPersonaPorFecha(
      idPersona,
      fechaInicio,
      fechaFin
    );
    console.log("tokens fechas semanales", fechaInicio, fechaFin);
    if (fetchIdRef.current == fetchId) {
      setTokensSemanales(datos?.TokensGanados ?? 0);
    }
  };

  const getRendimientoMedio = async (
    idPersona,
    fechaInicio,
    fechaFin,
    fetchId
  ) => {
    try {
      const datos =
        await rendimientoPersonasService.getRendimientoPersonaMaquina(
          idPersona,
          fechaInicio,
          fechaFin
        );
      console.log("Datos de la llamada", datos);

      // Verificar si hay datos
      if (datos && datos.length > 0) {
        const media = (
          datos.reduce((acc, obj) => acc + obj.RendimientoGlobal, 0) /
          datos.length
        ).toFixed(2);
        setProgreso(media / 100);
        setDatosRendimiento(datos);

        const datosAgrupados = FechaUtils.agruparRegistrosPorDia(datos);

        // Asegurarse de que hay datos por día antes de actualizar el estado
        if (datosAgrupados && datosAgrupados.length > 0) {
          console.log("Datos por día disponibles", datosAgrupados.length);
          if (fetchIdRef.current == fetchId) {
            console.log(
              "graficoSemanal getRendimientoMedio useRef",
              fetchIdRef.current,
              fetchId
            );
            setDatosPorDia(datosAgrupados);
            setHayDatos(true);
          }
        } else {
          console.log("No hay datos agrupados por día");
          setDatosPorDia([]);
          setHayDatos(false);
        }
      } else {
        console.log("No hay datos para esta semana");
        setProgreso(0);
        setDatosRendimiento([]);
        setDatosPorDia([]);
        setHayDatos(false);
      }
    } catch (error) {
      console.error("Error al obtener rendimiento", error);
      setProgreso(0);
      setDatosRendimiento([]);
      setHayDatos(false);
    } finally {
      setCargando(false);
    }
  };

  // Función para seleccionar semana anterior
  const semanaAnterior = () => {
    setSemanaSeleccionada(semanaSeleccionada + 1);
  };

  // Función para seleccionar semana siguiente (hasta la actual)
  const semanaSiguiente = () => {
    if (semanaSeleccionada > 0) {
      setSemanaSeleccionada(semanaSeleccionada - 1);
    }
  };

  // Callback para cuando cambia la semana desde el modal
  const handleSemanaChange = (nuevaSemana) => {
    console.log("Semana cambiada desde el modal", nuevaSemana);
    setSemanaSeleccionada(nuevaSemana);
  };

  const renderizarContenidoGrafico = () => {
    const porcentajeProgreso = progreso * 100;
    const colorProgreso =
      RendimientoUtils.determinarColorProgreso(porcentajeProgreso);
    const textoEstado =
      RendimientoUtils.determinarTextoEstado(porcentajeProgreso);

    if (cargando) {
      return (
        <View style={styles.noDataContainer}>
          <ActivityIndicator size="large" color={colors.info} />
          <Text style={styles.noDataText}>Cargando datos...</Text>
        </View>
      );
    } else if (!hayDatos) {
      return (
        <View style={styles.noDataContainer}>
          <MaterialCommunityIcons
            name="chart-line-variant"
            size={50}
            color="#999"
          />
          <Text style={styles.noDataText}>
            No hay datos disponibles para esta semana.
          </Text>
        </View>
      );
    } else {
      return (
        <View style={styles.progressCircleContainer}>
          <ProgressCircle
            style={styles.progressCircle}
            progress={progreso}
            progressColor={colorProgreso}
            backgroundColor={"#F0F0F0"}
            strokeWidth={15}
            cornerRadius={0}
            startAngle={-Math.PI / 2}
            endAngle={Math.PI / 2}
            animate={false}
          />
          <View style={styles.percentageTextContainer}>
            <Text style={[styles.percentageText, { color: colorProgreso }]}>
              {`${porcentajeProgreso.toFixed(2)}%`}
            </Text>
            <Text style={[styles.estadoText, { color: colorProgreso }]}>
              {textoEstado}
            </Text>
          </View>
        </View>
      );
    }
  };

  return (
    <View style={styles.contenedorPrincipal}>
      {/* Cabecera */}
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <Text style={styles.headerText}>Rendimiento semanal</Text>
      </View>

      {/* Información justo debajo del header */}
      <View style={styles.infoSuperior}>
        <View style={styles.datosContainer}>
          <View style={styles.datoItem}>
            <Text style={styles.datoLabel}>Tokens</Text>
            <Text style={styles.datoValor}>{tokensSemanales}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.infoButton}
          onPress={mostrarDetalles}
          disabled={cargando || !hayDatos}
        >
          <MaterialCommunityIcons
            name="information-outline"
            size={22}
            color={cargando || !hayDatos ? "#ccc" : colors.primary}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.contenido}>
        {/* Selector de semana */}
        <View style={styles.selectorContainer}>
          <TouchableOpacity onPress={semanaAnterior} style={styles.button}>
            <MaterialCommunityIcons
              name="chevron-left"
              size={30}
              color={colors.primary}
            />
          </TouchableOpacity>

          <View style={styles.dateRange}>
            <Text style={styles.dateText}>
              {rangoSemana.inicio} - {rangoSemana.fin}
            </Text>
            <Text style={styles.weekInfo}>
              {semanaSeleccionada === 0
                ? "Semana actual"
                : `Hace ${semanaSeleccionada} ${FechaUtils.obtenerTextoSemana(
                    semanaSeleccionada
                  )}`}
            </Text>
          </View>

          <TouchableOpacity
            onPress={semanaSiguiente}
            disabled={semanaSeleccionada === 0}
            style={[
              styles.button,
              semanaSeleccionada === 0 && styles.disabledButton,
            ]}
          >
            <MaterialCommunityIcons
              name="chevron-right"
              size={30}
              color={
                semanaSeleccionada === 0 ? colors.lightGray : colors.primary
              }
            />
          </TouchableOpacity>
        </View>

        {/* Contenedor del gráfico centrado */}
        <View style={styles.graficoContainer}>
          <TouchableOpacity
            style={styles.graficoContainer}
            onPress={mostrarDetalles}
            disabled={cargando || !hayDatos}
          >
            {renderizarContenidoGrafico()}
          </TouchableOpacity>
        </View>
      </View>

      {/* Barra expandible */}
      <BarraExpandible hayDatos={!cargando && hayDatos}>
        <DetalleRendimientoDesplegable
          datos={{
            inicioIso: rangoSemana?.inicioIso,
            finIso: rangoSemana?.finIso,
          }}
        />
      </BarraExpandible>

      {/* Modal para DetalleRendimientoSelector */}
      <ModalRendimiento
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        title={"Detalle de rendimiento semanal"}
        heightPercentage={SCREEN_HEIGHT * 0.85}
      >
        <DetalleRendimientoSelector
          datosPorDia={datosPorDia}
          modoInicial="semanal"
          semanaInicial={semanaSeleccionada}
          onSemanaChange={handleSemanaChange}
        />
      </ModalRendimiento>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedorPrincipal: {
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
  },
  headerText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  infoSuperior: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  datosContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  datoItem: {
    alignItems: "center",
  },
  datoLabel: {
    color: "#666",
    fontSize: 20,
    textAlign: "center",
  },
  datoValor: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  infoButton: {
    position: "absolute",
    right: 15,
    padding: 5,
  },
  contenido: {
    paddingTop: 10,
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
    opacity: 1,
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
  graficoContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginVertical: 0,
    paddingTop: 10,
  },
  progressCircleContainer: {
    height: 120,
    width: 200,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  progressCircle: {
    height: 200,
    width: 200,
    marginBottom: -80,
  },
  percentageTextContainer: {
    position: "absolute",
    alignItems: "center",
  },
  percentageText: {
    paddingTop: "15%",
    fontSize: 30,
    fontWeight: "bold",
  },
  estadoText: {
    fontSize: 15,
    marginTop: 5,
  },
  noDataContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 120,
    width: "100%",
  },
  noDataText: {
    marginTop: 12,
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    maxWidth: 200,
  },
});

export default GraficoSemanal;
