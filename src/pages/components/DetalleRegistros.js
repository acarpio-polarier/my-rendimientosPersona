import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Table, Row, Rows, TableWrapper } from "react-native-table-component";
import { ScrollView } from "react-native-web";
import DateUtils from "../../helpers/FechaUtils";

const width = "100%";

const getRandomTokens = () => {
  return Math.floor(Math.random() * (150 - 50 + 1)) + 50;
};

const DetalleRegistros = ({ dia = [] }) => {
  console.log("Datos recibidos:", dia);
  // Añadir tokens aleatorios a cada registro
  const datosConTokens = dia.map((item) => ({
    ...item,
    tokens: getRandomTokens(),
  }));
  // Transforma el array de objetos a un formato adecuado para la tabla
  const data = datosConTokens.map((item) => [
    (fechaIni = DateUtils.obtenerRangoHora(item.fechaIni)),
    (fechaFin = DateUtils.obtenerRangoHora(item.fechaFin)),
    (rendimiento = item.RendimientoGlobal + "%"),
    (tokens = item.tokens),
  ]);
  console.log("dia", dia);

  return (
    <ScrollView>
      <Table borderStyle={styles.tableBorder}>
        <Row
          data={["Hora Inicio", "Hora Final", "Rendimiento", "Tokens"]}
          style={styles.head}
          textStyle={styles.headText}
          widthArr={[width * 0.2, width * 0.2, width * 0.26, width * 0.17]}
        />
        <TableWrapper style={styles.wrapper}>
          <Rows
            data={data}
            style={styles.row}
            textStyle={styles.text}
            widthArr={[width * 0.2, width * 0.2, width * 0.26, width * 0.17]}
          />
        </TableWrapper>
      </Table>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  tableBorder: {
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  head: {
    height: 44,
    backgroundColor: "#FFF9E6",
  },
  headText: {
    margin: 6,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
  },
  row: {
    height: 44,
  },
  text: {
    margin: 6,
    textAlign: "center",
    color: "#666",
  },
});

export default DetalleRegistros;
