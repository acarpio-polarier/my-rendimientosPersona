import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../../../../styles/base";

const SelectorHistorico = ({ onPeriodoCambiado }) => {
  const [selected, setSelected] = useState(0);

  // Opciones de historico a elegir
  const dateOptions = ["DIA", "SEMANA", "MES", "AÑO"];

  const handleSelection = (index) => {
    setSelected(index);

    const today = new Date();
    let startDate = new Date();

    switch (dateOptions[index]) {
      case "DIA":
        // Fecha de hoy
        break;
      case "SEMANA":
        // Una semana atrás
        startDate.setDate(today.getDate() - 7);
        break;
      case "MES":
        // Un mes atrás
        startDate.setMonth(today.getMonth() - 1);
        break;
      case "AÑO":
        // Un año atrás
        startDate.setFullYear(today.getFullYear() - 1);
        break;
      default:
        break;
    }

    const startDateStr = startDate.toISOString().split("T")[0];
    const endDateStr = today.toISOString().split("T")[0];

    // callback al papa
    if (onPeriodoCambiado) {
      onPeriodoCambiado(startDateStr, endDateStr, dateOptions[index]);
    }
  };

  useEffect(() => {
    handleSelection(selected);
  }, []);

  return (
    <View style={styles.contenedor}>
      <View style={styles.cabecera}>
        {dateOptions.map((option, index) => (
          <TouchableOpacity
            key={option}
            style={styles.columnaFecha}
            activeOpacity={0.7}
            onPress={() => handleSelection(index)}
          >
            <Text
              style={[
                styles.textoFecha,
                selected === index && styles.textoSeleccionado,
              ]}
            >
              {option}
            </Text>
            {selected === index && <View style={styles.subrayado} />}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: colors.white,
  },
  cabecera: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#f9f9f9",
    borderBottomWidth: 1,
    borderBottomColor: "#ebebeb",
  },
  columnaFecha: {
    alignItems: "center",
    paddingVertical: 15,
    width: "25%",
    position: "relative",
  },
  textoFecha: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  textoSeleccionado: {
    color: "#000",
  },
  subrayado: {
    position: "absolute",
    bottom: 0,
    height: 3,
    width: "100%",
    backgroundColor: colors.primary,
  },
  pickerContainer: {
    padding: 20,
  },
});

export default SelectorHistorico;
