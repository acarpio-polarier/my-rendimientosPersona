import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

const ConfirmPopup = ({ visible, onClose, product }) => {
  if (!visible) return null;

  const handleConfirm = () => {
    console.log("Producto canjeado:", product.title);
    onClose();
  };

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.popup}>
          <Text style={styles.title}>Confirmar Canje</Text>
          <Text style={styles.message}>
            Estás apunto de canjear {product.title} por {product.price} tokens
          </Text>
          <View style={styles.buttons}>
            <TouchableOpacity
              onPress={onClose}
              style={[styles.button, styles.cancel]}
            >
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleConfirm}
              style={[styles.button, styles.confirm]}
            >
              <Text style={styles.buttonText}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  popup: {
    width: 300,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },
  message: {
    marginBottom: 20,
    fontSize: 14,
    textAlign: "center",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginLeft: 10,
  },
  cancel: {
    backgroundColor: "#ccc",
  },
  confirm: {
    backgroundColor: "orange",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ConfirmPopup;
