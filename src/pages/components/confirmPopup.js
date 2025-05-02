import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { confirmPopup } from "../../../styles/paginaCanjePuntos";

const ConfirmPopup = ({
  visible,
  cerrarPopup,
  product,
  ID_PERSONA,
  recargarTokens,
}) => {
  if (!visible) return null;

  const confirmarPopup = async () => {
    //Llamada a la API para el canjeo de Tokens
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
      await recargarTokens();
      cerrarPopup();
    } catch (error) {
      console.error("Error en el canje:", error);
    }
  };

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={confirmPopup.contenedorMain}>
        <View style={confirmPopup.popup}>
          <Text style={confirmPopup.titulo}>Confirmar Canje</Text>
          <Text style={confirmPopup.mensaje}>
            Estás a punto de canjear {product.title} por {product.price} tokens
          </Text>
          <View style={confirmPopup.contenedorBotones}>
            <TouchableOpacity
              onPress={cerrarPopup}
              style={[confirmPopup.botonBase, confirmPopup.cancelar]}
            >
              <Text style={confirmPopup.textoBotones}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={confirmarPopup}
              style={[confirmPopup.botonBase, confirmPopup.confirmar]}
            >
              <Text style={confirmPopup.textoBotones}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmPopup;
