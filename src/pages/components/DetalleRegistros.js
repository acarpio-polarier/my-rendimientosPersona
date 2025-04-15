import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { DataTable } from "react-native-paper";
import RendimientoUtils from "../../helpers/RendimientoUtils";
import { colors } from "../../../styles/base";
import { PERSONA_ID } from "../Index";

const HEIGHT_HEADER = 48;
const HEIGHT_ROW = 48;

const DetalleRegistros = ({ dia = [] }) => {
  const [data, setData] = useState([]);
  console.log("dia", dia);
  const formatearHora = (fecha) => {
    const date = new Date(fecha);
    const horas = date.getHours().toString().padStart(2, "0");
    const minutos = date.getMinutes().toString().padStart(2, "0");
    return `${horas}:${minutos}`;
  };

  useEffect(() => {
    const cargarDatos = async () => {
      const datosConTokens = await Promise.all(
        dia.map(async (item) => {
          try {
            const fechaIni = new Date(item?.fechaIni).toISOString();
            const fechaFin = new Date(item?.fechaFin).toISOString();

            const datos = await RendimientoUtils.getTokensPersonaPorFecha(
              PERSONA_ID,
              fechaIni,
              fechaFin
            );
            console.log("fechas registros", fechaIni, fechaFin, dia);
            const tokens = datos?.TokensGanados ?? 0;

            return {
              ...item,
              tokens,
            };
          } catch (error) {
            console.error("Error al obtener tokens:", error);
            return {
              ...item,
              tokens: 0,
            };
          }
        })
      );

      const dataFormateada = datosConTokens.map((item) => [
        formatearHora(item.fechaIni),
        formatearHora(item.fechaFin),
        item.RendimientoGlobal + "%",
        item.tokens,
      ]);
      setData(dataFormateada);
    };

    cargarDatos();
  }, [dia]);

  const getColor = (valor) => {
    const rend = parseFloat(valor.split("%")[0]);
    if (rend > 70 && rend < 90) return colors.warning;
    if (rend >= 90) return colors.success;
    return colors.danger;
  };

  const getBackgroundColor = (index) => {
    return index % 2 !== 0 ? colors.smokedWhite : colors.white;
  };

  const tablaHeight = HEIGHT_HEADER + data.length * HEIGHT_ROW;

  return (
    <View style={[styles.contenedorPrincipal, { height: tablaHeight }]}>
      <DataTable>
        <DataTable.Header style={styles.cabeceraTabla}>
          <DataTable.Title style={styles.headerTitle}>
            <Text style={styles.headerText}>Hora Inicio</Text>
          </DataTable.Title>
          <DataTable.Title style={styles.headerTitle}>
            <Text style={styles.headerText}>Hora Final</Text>
          </DataTable.Title>
          <DataTable.Title style={styles.headerTitle}>
            <Text style={styles.headerText}>Rendimiento</Text>
          </DataTable.Title>
          <DataTable.Title style={styles.headerTitle}>
            <Text style={styles.headerText}>Tokens</Text>
          </DataTable.Title>
        </DataTable.Header>

        {data.map((row, rowIndex) => (
          <DataTable.Row
            key={rowIndex}
            style={{
              backgroundColor: getBackgroundColor(rowIndex),
              height: HEIGHT_ROW,
            }}
          >
            {row.map((cell, colIndex) => {
              const colorTexto = colIndex === 2 ? getColor(cell) : colors.text;
              return (
                <DataTable.Cell
                  key={colIndex}
                  style={{ justifyContent: "center" }}
                >
                  <Text style={{ fontSize: 17, color: colorTexto }}>
                    {cell}
                  </Text>
                </DataTable.Cell>
              );
            })}
          </DataTable.Row>
        ))}
      </DataTable>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedorPrincipal: {
    width: "100%",
    alignSelf: "center",
    backgroundColor: colors.smokedWhite,
    borderRadius: 10,
    overflow: "hidden",
    marginVertical: 10,
  },
  headerTitle: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  headerText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: "bold",
    textAlign: "center",
  },
  cabeceraTabla: {
    backgroundColor: colors.primary,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 44,
  },
});

export default DetalleRegistros;
