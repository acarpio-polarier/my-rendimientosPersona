import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Table, Row, Rows, TableWrapper } from "react-native-table-component";
import { ScrollView } from "react-native";
import DateUtils from "../../helpers/FechaUtils";
import RendimientoUtils from "../../helpers/RendimientoUtils";
import { colors } from "../../../styles/base";

const width = "100%";
const screen_height = Dimensions.get("window").height;
const baseFontSize = 16;

const DetalleRegistros = ({ dia = [] }) => {
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

  const getColor = (valor) => {
    console.log("valor", valor);
    const rend = parseFloat(valor.split("%")[0]);
    if (rend > 70 && rend < 90) return colors.warning;
    if (rend >= 90) return colors.success;
    return colors.danger;
  };

  const getBackgroundColor = (index) => {
    if (index % 2 != 0) return colors.smokedWhite;
    return colors.white;
  };

  console.log("data", data);

  return (
    <View style={styles.roundedWrapper}>
      <Table borderStyle={styles.tableBorder}>
        <Row
          data={["Hora Inicio", "Hora Final", "Rendimiento", "Tokens"]}
          style={[styles.head, { backgroundColor: colors.primary }]}
          textStyle={styles.headText}
          widthArr={[width * 0.2, width * 0.19, width * 0.3, width * 0.16]}
        />
        <ScrollView
          style={[
            { maxHeight: screen_height * 0.2 },
            { backgroundColor: "red" },
          ]}
          contentContainerStyle={{ paddingVertical: 10 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.contenedorFlexible}>
            <TableWrapper style={styles.wrapper}>
              {data.map((row, rowIndex) => (
                <Row
                  key={rowIndex}
                  data={row.map((cell, colIndex) => {
                    if (colIndex === 2) {
                      return (
                        <Text
                          style={[
                            styles.text,
                            { color: getColor(cell) },
                            { backgroundColor: getBackgroundColor(rowIndex) },
                          ]}
                          key={colIndex}
                        >
                          {cell}
                        </Text>
                      );
                    }
                    return (
                      <Text
                        style={[
                          styles.text,
                          { backgroundColor: getBackgroundColor(rowIndex) },
                        ]}
                        key={colIndex}
                      >
                        {cell}
                      </Text>
                    );
                  })}
                  widthArr={[
                    width * 0.2,
                    width * 0.19,
                    width * 0.3,
                    width * 0.16,
                  ]}
                  style={styles.row}
                />
              ))}
            </TableWrapper>
          </View>
        </ScrollView>
      </Table>
    </View>
  );
};

const styles = StyleSheet.create({
  tableBorder: {
    borderWidth: 1,
    borderColor: "#E5E5E5",
    maxHeight: "100%",
  },
  head: {
    height: 44,
    backgroundColor: "#FFF9E6",
  },
  headText: {
    margin: 6,
    fontWeight: "bold",
    textAlign: "center",
    color: colors.white,
    fontSize: baseFontSize * 0.8,
  },
  row: {
    height: 44,
  },
  text: {
    fontSize: baseFontSize * 1,
    height: "100%",
    width: "100%",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  roundedWrapper: {
    padding: 12,
    flex: 1,
  },

  contenedorFlexible: {
    maxHeight: screen_height * 0.17,
    backgroundColor: "red",
  },
});

export default DetalleRegistros;
