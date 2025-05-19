import React, { useState, useEffect } from "react";
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
  const [pulsado, setPulsado] = useState(false);

  if (!visible) return null;
  console.log("popup", product.id, ID_PERSONA);

  const solicitarCanje = async () => {
    if (pulsado) return;
    setPulsado(true);

    try {
      await RendimientoUtils.solicitarCanje(ID_PERSONA, product.id);
      await recargarTokens();
      cerrarPopup();
    } catch (error) {
      console.error("Error en canje:", error);
      setPulsado(false);
    }
  };

  useEffect(() => {
    if (!visible) {
      setPulsado(false);
    }
  }, [visible]);

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
              disabled={pulsado}
            >
              <Text style={confirmPopup.textoBotones}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={solicitarCanje}
              style={[
                confirmPopup.botonBase,
                confirmPopup.confirmar,
                pulsado && { opacity: 0.5 },
              ]}
              disabled={pulsado}
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
