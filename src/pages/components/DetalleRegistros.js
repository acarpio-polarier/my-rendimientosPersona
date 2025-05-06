import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { DataTable } from "react-native-paper";
import RendimientoUtils from "../../helpers/RendimientoUtils";
import { colors } from "../../../styles/base";
import { PERSONA_ID } from "../Index";
import { fetchText } from "react-native-svg";

const HEIGHT_HEADER = 48;
const HEIGHT_ROW = 48;

const DetalleRegistros = ({ dia = [] }) => {
  const [data, setData] = useState([]);
  console.log("dia", dia);
  const formatearHora = (fecha) => {
    console.log("DetalleRegistros fecha", fecha);
    const date = new Date(fecha);
    const horas = date.getUTCHours().toString().padStart(1, "0");
    const minutos = date.getUTCMinutes().toString().padStart(2, "0");
    return `${horas}:${minutos}`;
  };

  useEffect(() => {
    console.log();

    const cargarDatos = async () => {
      const soloFecha = new Date(dia[0]?.fechaIni).toISOString().split("T")[0];
      console.log("DetalleRegistros soloFecha", soloFecha);

      const datos = await RendimientoUtils.getTokensPersona(
        PERSONA_ID,
        soloFecha,
        soloFecha
      );

      if (Array.isArray(datos)) {
        const tokensPersona = datos.map((item) => ({
          fecha: item.fecha ?? null,
          tokens: item.tokens ?? null,
        }));

        console.log("array tokens getTokensPersona", tokensPersona);

        const tokensGanados = tokensPersona?.[0]?.tokens ?? 0;
        console.log("array tokens datos", datos);
        console.log("array tokens tokensganados", tokensGanados);
        console.log("array tokens dia", dia);

        const datosTokens = dia.map((item) => {
          const tokenCoincidente = tokensPersona.find(
            (token) => token.fecha === item.fechaFin
          );
          if (tokenCoincidente) {
            return { ...item, tokens: tokenCoincidente.tokens };
          }
          return { ...item, tokens: 0 };
        });

        console.log("array tokens datosTokens", datosTokens);

        const dataFormateada = datosTokens.map((item) => [
          formatearHora(item.fechaIni),
          formatearHora(item.fechaFin),
          item.RendimientoGlobal + "%",
          item.tokens,
        ]);

        setData(dataFormateada);
      }
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
