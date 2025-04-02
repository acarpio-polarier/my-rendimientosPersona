import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../../../../styles/base";
import DatePicker from "../elements/DatePicker";

const SelectorDeFecha = ({ label = "Fecha", onDateChange }) => {
  const [fecha, setFecha] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(false);

  // Formatear la fecha para mostrarla (dd/mm/yyyy)
  const formatearFecha = (date) => {
    const dia = date.getDate().toString().padStart(2, "0");
    const mes = (date.getMonth() + 1).toString().padStart(2, "0");
    const año = date.getFullYear();
    return `${dia}/${mes}/${año}`;
  };

  // Función para guardar la fecha seleccionada
  const handleSave = (nuevaFecha) => {
    setFecha(nuevaFecha);
    setModalVisible(false);
    if (onDateChange) {
      onDateChange(nuevaFecha);
    }
  };

  // Función para cancelar la selección
  const handleCancel = () => {
    setModalVisible(false);
  };

  return (
    <>
      <TouchableOpacity
        style={styles.selectorContainer}
        onPress={() => setModalVisible(true)}
      >
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name="calendar"
            size={20}
            color={colors.primary}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.labelText}>{label}</Text>
          <Text style={styles.dateText}>{formatearFecha(fecha)}</Text>
        </View>
        <MaterialCommunityIcons
          name="chevron-right"
          size={20}
          color={colors.secondary}
        />
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{label}</Text>
            </View>
            <DatePicker
              fecha={fecha}
              onSave={handleSave}
              onCancel={handleCancel}
              startYear={1950}
              endYear={2050}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = {
  selectorContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 12,
    borderRadius: 8,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#eeeeee",
  },
  iconContainer: {
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  labelText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  dateText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
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
};

export default SelectorDeFecha;
