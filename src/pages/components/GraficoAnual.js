import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { BarChart, Grid, XAxis } from "react-native-svg-charts";
import { rendimientoPersonasService } from "../../services/RendimientoPersonaService";
import moment from "moment";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export class GraficoAnual extends React.PureComponent {
  state = {
    data: [],
    labels: [],
    añoActual: moment().year(),
  };

  componentDidMount() {
    this.cargarDatos();
  }

  cargarDatos = () => {
    const { añoActual } = this.state;
    const idPersona = 1526;
    const fechaIni = `${añoActual}-01-01`;
    const fechaFin = `${añoActual}-12-31`;

    rendimientoPersonasService
      .getRendimientoPersonaMaquina(idPersona, fechaIni, fechaFin)
      .then((response) => {
        console.log(`Datos recibidos para ${añoActual}:`, response);

        const datosProcesados = this.datosProcesados(response);
        this.setState({
          data: datosProcesados.values,
          labels: datosProcesados.labels,
        });
      })
      .catch((error) => {
        console.error("Error obteniendo datos:", error);
      });
  };

  cambiarAño = (incremento) => {
    this.setState(
      (prevState) => ({ añoActual: prevState.añoActual + incremento }),
      this.cargarDatos
    );
  };

  datosProcesados(data) {
    const informacionMensual = {};
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

    data.forEach((item) => {
      const indiceMes = moment(item.fechaIni).month();
      if (!informacionMensual[indiceMes]) {
        informacionMensual[indiceMes] = { total: 0, count: 0 };
      }
      informacionMensual[indiceMes].total += item.RendimientoGlobal;
      informacionMensual[indiceMes].count += 1;
    });

    const labels = Object.keys(informacionMensual).map(
      (indiceMes) => meses[parseInt(indiceMes, 10)]
    );

    const values = Object.keys(informacionMensual).map(
      (indiceMes) =>
        informacionMensual[indiceMes].total /
        informacionMensual[indiceMes].count
    );

    return { labels, values };
  }

  render() {
    const { data, labels, añoActual } = this.state;

    return (
      <View style={styles.contenedor}>
        <View style={styles.selectorAño}>
          <TouchableOpacity onPress={() => this.cambiarAño(-1)}>
            <MaterialCommunityIcons
              style={styles.felchasSelectorAño}
              name="chevron-left"
              size={30}
            />
          </TouchableOpacity>
          <Text style={styles.año}>{añoActual}</Text>
          <TouchableOpacity onPress={() => this.cambiarAño(1)}>
            <MaterialCommunityIcons
              style={styles.felchasSelectorAño}
              name="chevron-right"
              size={30}
            />
          </TouchableOpacity>
        </View>

        <BarChart
          style={styles.tabla}
          data={data}
          gridMin={0}
          contentInset={{ top: 10, bottom: 10 }}
          svg={{ fill: "rgb(237, 182, 55)" }}
        >
          <Grid />
        </BarChart>
        <XAxis
          style={styles.labelMeses}
          data={labels}
          formatLabel={(index) => labels[index]}
          contentInset={{ left: 10, right: 10 }}
          svg={{ fontSize: 10, fill: "black" }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contenedor: {
    height: 300,
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
  selectorAño: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  flecha: {
    fontSize: 20,
    paddingHorizontal: 15,
  },
  año: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 50,
    marginRight: 50,
  },
  tabla: {
    flex: 1,
  },
  labelMeses: {
    padding: 10,
  },
  felchasSelectorAño: {
    color: "#edb637",
  },
});

export default GraficoAnual;
