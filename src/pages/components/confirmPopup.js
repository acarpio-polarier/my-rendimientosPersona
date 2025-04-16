import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

const ConfirmPopup = ({ visible, cerrarPopup, product, ID_PERSONA }) => {
  if (!visible) return null;

  const confirmarPopup = async () => {
    try {
      const response = await fetch(
        `https://localhost:7136/odata/solicitarCanje?idPersona=${ID_PERSONA}&tokensASolicitar=${product.price}`,

        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ID_PERSONA,
            productId: product.id,
            token: product.price,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Error al canjear el producto");
      }

      const data = await response.json();
      console.log("Canje exitoso:", data);

      cerrarPopup();
    } catch (error) {
      console.error("Error en el canje:", error);
    }
  };

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.contenedorMain}>
        <View style={styles.popup}>
          <Text style={styles.titulo}>Confirmar Canje</Text>
          <Text style={styles.mensaje}>
            Estás apunto de canjear {product.title} por {product.price} tokens
          </Text>
          <View style={styles.contenedorBotones}>
            <TouchableOpacity
              onPress={cerrarPopup}
              style={[styles.botonBase, styles.cancelar]}
            >
              <Text style={styles.textoBotones}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={confirmarPopup}
              style={[styles.botonBase, styles.confirmar]}
            >
              <Text style={styles.textoBotones}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  contenedorMain: {
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
  titulo: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },
  mensaje: {
    marginBottom: 20,
    fontSize: 14,
    textAlign: "center",
  },
  contenedorBotones: {
    flexDirection: "row",
    justifyContent: "center",
  },
  botonBase: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginLeft: 10,
  },
  cancelar: {
    backgroundColor: "#ccc",
  },
  confirmar: {
    backgroundColor: "#EDB637",
  },
  textoBotones: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ConfirmPopup;
