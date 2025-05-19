import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { confirmPopup } from "../../../../styles/paginaCanjePuntos";
import RendimientoUtils from "../../../helpers/RendimientoUtils";

const ConfirmPopup = ({
  visible,
  cerrarPopup,
  product,
  ID_PERSONA,
  recargarTokens,
}) => {
  if (!visible) return null;
  console.log("popup", product.id, ID_PERSONA);

  const solicitarCanje = async () => {
    await RendimientoUtils.solicitarCanje(ID_PERSONA, product.id);
    await recargarTokens();
    cerrarPopup();
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
              onPress={solicitarCanje}
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
