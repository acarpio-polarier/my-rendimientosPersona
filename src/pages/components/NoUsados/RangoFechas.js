import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import { colors } from "../../../../styles/base";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const RangoFechas = ({ visible, onClose, onSelect }) => {
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);

  const handleDayPress = (day) => {
    if (!fechaInicio || (fechaInicio && fechaFin)) {
      setFechaInicio(day.dateString);
      setFechaFin(null);
    } else if (fechaInicio && !fechaFin) {
      const startDate = new Date(fechaInicio);
      const selectedDate = new Date(day.dateString);

      if (selectedDate >= startDate) {
        setFechaFin(day.dateString);
      } else {
        setFechaInicio(day.dateString);
        setFechaFin(fechaInicio);
      }
    }
  };

  const confirmarSeleccion = () => {
    if (fechaInicio && fechaFin) {
      onSelect(fechaInicio, fechaFin);
      setFechaInicio(null);
      setFechaFin(null);
      onClose();
    }
  };

  const getMarkedDates = () => {
    if (!fechaInicio) return {};

    let markedDates = {
      [fechaInicio]: {
        startingDay: true,
        color: "#3498db",
        textColor: "white",
      },
    };

    if (fechaFin) {
      markedDates[fechaFin] = {
        endingDay: true,
        color: "#3498db",
        textColor: "white",
      };

      let currentDate = new Date(fechaInicio);
      const endDate = new Date(fechaFin);

      while (currentDate < endDate) {
        currentDate.setDate(currentDate.getDate() + 1);
        const dateString = currentDate.toISOString().split("T")[0];

        if (dateString !== fechaFin) {
          markedDates[dateString] = {
            color: "#87CEFA",
            textColor: "white",
          };
        }
      }
    }

    return markedDates;
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Selecciona un rango de fechas</Text>
          </View>
          <Calendar
            current="2024-01-01"
            onDayPress={handleDayPress}
            markedDates={getMarkedDates()}
            markingType="period"
            enableSwipeMonths={true}
          />
          <TouchableOpacity
            onPress={confirmarSeleccion}
            style={styles.botonConfirmar}
            disabled={!fechaInicio || !fechaFin}
          >
            <Text style={styles.textoConfirmar}>Confirmar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose} style={styles.botonCerrar}>
            <Text style={styles.textoCerrar}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
  },
  modalHeader: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eeeeee",
    backgroundColor: colors.primary,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  botonConfirmar: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#3498db",
    alignItems: "center",
  },
  textoConfirmar: {
    color: "white",
    fontSize: 16,
  },
  botonCerrar: {
    padding: 10,
    alignItems: "center",
  },
  textoCerrar: {
    color: "blue",
    fontSize: 16,
  },
});

export default RangoFechas;
