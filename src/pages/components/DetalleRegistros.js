import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Table, Row, Rows, TableWrapper } from "react-native-table-component";
import { ScrollView } from "react-native-web";
import DateUtils from "../../helpers/FechaUtils";
import RendimientoUtils from "../../helpers/RendimientoUtils";

const width = "100%";

const DetalleRegistros = ({ dia = [], origen }) => {
  console.log("Datos recibidos:", dia);
  let data = [];

  const datosConTokens = dia.map((item) => ({
    ...item,
    tokens: RendimientoUtils.generarTokensRandom(),
  }));

  data = datosConTokens.map((item) => [
    DateUtils.obtenerRangoHora(item.fechaIni),
    DateUtils.obtenerRangoHora(item.fechaFin),
    item.RendimientoGlobal + "%",
    item.tokens,
  ]);

  console.log("data", data);

  return (
    <View>
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
    </View>
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
