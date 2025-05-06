import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import RNSpeedometer from "react-native-speedometer";
import { colors } from "../../../../styles/base";

export const GraficoDonut = ({
  periodoSeleccionado = "DIA",
  datos = [],
  cargando = false,
  error = null,
  colorPrimary = colors.primary,
  colorDanger = colors.danger,
  colorSuccess = colors.success,
}) => {
  const [config, setConfig] = useState({
    valor: 0,
    color: colorDanger,
  });

  useEffect(() => {
    if (!cargando && !error && datos && datos.length > 0) {
      const ultimoRegistro = datos[datos.length - 1];
      const valor = ultimoRegistro.RendimientoAcumulado || 0;

      let color = colorDanger;
      if (valor >= 90) {
        color = colorSuccess;
      } else if (valor >= 70) {
        color = colorPrimary;
      }

      setConfig({ valor, color });
    }
  }, [datos, cargando, error, colorDanger, colorPrimary, colorSuccess]);

  const labels = [
    {
      name: "Rendimiento",
      labelColor: config.color,
      activeBarColor: config.color,
    },
  ];

  if (cargando) {
    return (
      <View style={styles.estadoContainer}>
        <Text style={styles.estadoText}>Cargando datos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.estadoContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!datos || datos.length === 0) {
    return (
      <View style={styles.estadoContainer}>
        <Text style={styles.estadoText}>No hay datos disponibles</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          Rendimiento Acumulado: {config.valor.toFixed(2)}
        </Text>
        {periodoSeleccionado === "DIA" && (
          <Text style={styles.infoTextSecondary}>
            Progreso: {config.valor.toFixed(0)}%
          </Text>
        )}
      </View>

      <View style={styles.velocimetroContainer}>
        <RNSpeedometer
          value={config.valor}
          size={250}
          labels={labels}
          segments={1}
          segmentColors={[config.color]}
          segmentValues={[100]}
          labelStyle={{ fontSize: 0, height: 0 }}
          labelNoteStyle={{ fontSize: 0, height: 0 }}
          halfCircle
          labelWrapperStyle={{ display: "none" }}
          minValue={0}
          maxValue={100}
          currentValueText=""
          wrapperStyle={{ backgroundColor: "transparent" }}
        />

        <View style={styles.valorCentral}>
          <Text style={[styles.valorTexto, { color: config.color }]}>
            {config.valor.toFixed(0)}%
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#fff",
  },
  infoContainer: {
    marginBottom: 15,
    alignItems: "center",
  },
  infoText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  infoTextSecondary: {
    fontSize: 16,
    color: "#555",
    marginBottom: 3,
  },
  velocimetroContainer: {
    alignItems: "center",
    marginTop: 10,
    position: "relative",
  },
  valorCentral: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -25 }, { translateY: -15 }],
    zIndex: 10,
  },
  valorTexto: {
    fontSize: 24,
    fontWeight: "bold",
  },
  estadoContainer: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    marginVertical: 10,
  },
  estadoText: {
    fontSize: 16,
    color: "#555",
  },
  errorText: {
    fontSize: 16,
    color: "#dc3545",
  },
});
