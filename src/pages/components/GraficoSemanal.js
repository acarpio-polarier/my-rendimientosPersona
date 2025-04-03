import React, { useState, useEffect } from "react";
import { ProgressCircle } from "react-native-svg-charts";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { rendimientoPersonasService } from "../../services/RendimientoPersonaService";
import BarraExpandible from "./BarraExpandible";
import DetalleRendimiento from "./DetalleRendimiento";
import { colors } from "../../../styles/base";
import { useNavigation } from "@react-navigation/native";
const PERSONA_ID = 4901;
const GraficoSemanal = () => {
  // Navegación
  const navigation = useNavigation();

  const navegarADetalle = () => {
    console.log("aaaaaaaaaaaaaaaaapulsado");
    navigation.navigate("DetalleHistoricoRendimientos", {
      data: datosRendimiento,
    });
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

  // Determinar color del progreso
  const determinarColorProgreso = (porcentaje) => {
    if (porcentaje < 70) return colors.danger;
    if (porcentaje >= 70 && porcentaje <= 90) return colors.primary;
    return colors.success;
  };

  // Determinar texto de estado
  const determinarTextoEstado = (porcentaje) => {
    if (porcentaje < 70) return "Bajo rendimiento";
    if (porcentaje >= 70 && porcentaje <= 90) return "Rendimiento medio";
    return "Alto rendimiento";
  };

  // Efecto
  useEffect(() => {
    const nuevoRango = obtenerRangoSemana(semanaSeleccionada);
    setRangoSemana(nuevoRango);
    setCargando(true);

    console.log("Rango de semana actualizado:", nuevoRango);
    console.log("Fecha inicio ISO:", nuevoRango.inicioIso);
    console.log("Fecha fin ISO:", nuevoRango.finIso);
    getRendimientoMedio(PERSONA_ID, nuevoRango.inicioIso, nuevoRango.finIso);
  }, [semanaSeleccionada]);

  // Llamada
  const getRendimientoMedio = async (idPersona, fechaInicio, fechaFin) => {
    try {
      const datos =
        await rendimientoPersonasService.getRendimientoPersonaMaquina(
          idPersona,
          fechaInicio,
          fechaFin
        );

      // Verificar si hay datos
      if (datos && datos.length > 0) {
        const media = datos[datos.length - 1].RendimientoAcumulado;
        console.log(media);
        setProgreso(media / 100);
        setDatosRendimiento(datos);
        setHayDatos(true);
      } else {
        setProgreso(0);
        setDatosRendimiento([]);
        setHayDatos(false);
      }

      console.log("datoooooooooooos llamada: ", datos);
    } catch (error) {
      console.error("Error al obtener rendimiento:", error);
      setProgreso(0);
      setDatosRendimiento([]);
      setHayDatos(false);
    } finally {
      setCargando(false);
    }
  };

  // Auxiliar
  const obtenerTextoSemana = (semana) => (semana === 1 ? "semana" : "semanas");

  // Obtener el rango de fechas de la semana seleccionada
  const obtenerRangoSemana = (offsetSemanas) => {
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
    };
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

  const renderizarContenidoGrafico = () => {
    const porcentajeProgreso = progreso * 100;
    const colorProgreso = determinarColorProgreso(porcentajeProgreso);
    const textoEstado = determinarTextoEstado(porcentajeProgreso);

    if (cargando) {
      return (
        <View style={styles.noDataContainer}>
          <ActivityIndicator size="large" color="#00C3A0" />
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
        <>
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
              animate={true}
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
        </>
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
            <Text style={styles.datoValor}>666</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.infoButton} onPress={navegarADetalle}>
          <MaterialCommunityIcons
            name="information-outline"
            size={22}
            color={colors.primary}
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
                : `Hace ${semanaSeleccionada} ${obtenerTextoSemana(
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
              color={semanaSeleccionada === 0 ? "#ccc" : colors.primary}
            />
          </TouchableOpacity>
        </View>

        {/* Contenedor del gráfico centrado */}
        <View style={styles.graficoContainer}>
          {renderizarContenidoGrafico()}
        </View>
      </View>

      {/* Barra expandible */}
      <BarraExpandible hayDatos={!cargando && hayDatos}>
        <DetalleRendimiento datos={datosRendimiento} />
      </BarraExpandible>
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
    fontSize: 12,
    textAlign: "center",
  },
  datoValor: {
    color: "#333",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  infoButton: {
    position: "absolute",
    right: 12,
    padding: 5,
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
  graficoContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginVertical: 5,
    paddingVertical: 10,
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
    fontSize: 36,
    fontWeight: "bold",
  },
  estadoText: {
    fontSize: 14,
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
