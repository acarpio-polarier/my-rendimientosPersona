import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { BarChart, Grid, XAxis, YAxis } from "react-native-svg-charts";
import { Line } from "react-native-svg";
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

  // Aqui se actualiza de forma dinamica en funcion de si tiene o no registros

  // datosProcesados(data) {
  //   const informacionMensual = {};
  //   const meses = [
  //     "Ene",
  //     "Feb",
  //     "Mar",
  //     "Abr",
  //     "May",
  //     "Jun",
  //     "Jul",
  //     "Ago",
  //     "Sep",
  //     "Oct",
  //     "Nov",
  //     "Dic",
  //   ];

  //   data.forEach((item) => {
  //     const indiceMes = moment(item.fechaIni).month();
  //     if (!informacionMensual[indiceMes]) {
  //       informacionMensual[indiceMes] = { total: 0, count: 0 };
  //     }
  //     informacionMensual[indiceMes].total += item.RendimientoGlobal;
  //     informacionMensual[indiceMes].count += 1;
  //   });

  //   const labels = Object.keys(informacionMensual).map(
  //     (indiceMes) => meses[parseInt(indiceMes, 10)]
  //   );

  //   const values = Object.keys(informacionMensual).map(
  //     (indiceMes) =>
  //       (informacionMensual[indiceMes].total /
  //         informacionMensual[indiceMes].count * 100)
  //   );

  //   return { labels, values };
  // }

  // Aqui renderiza los 12 meses y sus registros

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

    const labels = meses;
    const values = Array(12)
      .fill(0)
      .map((_, i) => {
        if (informacionMensual[i]) {
          return (
            (informacionMensual[i].total / informacionMensual[i].count) * 100
          );
        }
        return 0;
      });

    return { labels, values };
  }

  render() {
    const { data, labels, añoActual } = this.state;

    return (
      <View style={styles.contenedor}>
        <View style={styles.selectorAño}>
          <TouchableOpacity onPress={() => this.cambiarAño(-1)}>
            <MaterialCommunityIcons
              style={styles.flechasSelectorAño}
              name="chevron-left"
              size={30}
            />
          </TouchableOpacity>
          <Text style={styles.año}>{añoActual}</Text>
          <TouchableOpacity onPress={() => this.cambiarAño(1)}>
            <MaterialCommunityIcons
              style={styles.flechasSelectorAño}
              name="chevron-right"
              size={30}
            />
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row", height: 220, padding: 20 }}>
          <YAxis
            data={data}
            contentInset={{ top: 10, bottom: 10 }}
            svg={{ fontSize: 10, fill: "black" }}
            formatLabel={(value) => `${value.toFixed(1)}%`}
          />

          <View style={{ flex: 1, marginLeft: 10 }}>
            <BarChart
              style={styles.tabla}
              data={data}
              gridMin={0}
              contentInset={{ top: 10, bottom: 10 }}
              svg={{ fill: "rgb(237, 182, 55)" }}
            >
              <Grid />
              <Line
                x1="2%"
                x2="98%"
                y1={`${50}%`}
                y2={`${50}%`}
                stroke="grey"
                strokeDasharray={[4, 7]}
                strokeWidth={2}
              />
            </BarChart>

            <XAxis
              data={labels}
              formatLabel={(index) => labels[index]}
              contentInset={{ left: 10, right: 10 }}
              svg={{ fontSize: 10, fill: "black" }}
            />
          </View>
        </View>
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
    fontFamily: "Arial",
  },
  selectorAño: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  año: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 20,
  },
  tabla: {
    flex: 1,
  },
  flechasSelectorAño: {
    color: "#edb637",
  },
});

export default GraficoAnual;
