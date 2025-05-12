import React, { useEffect, useState, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
  ScrollView,
} from "react-native";
import Modal from "react-native-modal";
import { colors } from "../../../../styles/base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const ModalFiltros = ({
  isVisible,
  onClose,
  filtros,
  setFiltros,
  etiquetas,
  estados,
  setEstadoVideo,
}) => {
  const deviceHeight = Dimensions.get("window").height;
  const MODAL_HEIGHT = deviceHeight * 0.7;
  const SCROLL_HEIGHT = deviceHeight * 0.4;
  const pan = useRef(new Animated.ValueXY()).current;
  const opacity = useRef(new Animated.Value(1)).current;
  const [etiquetasSeleccionadas, setEtiquetasSeleccionadas] = useState(
    new Set(filtros)
  );
  const [estadosModal, setEstadosModal] = useState(estados);
  const etiquetasModal = etiquetas;
  console.log("etiquetasModal", etiquetasModal);

  useEffect(() => {
    setFiltros(Array.from(etiquetasSeleccionadas));
  }, [etiquetasSeleccionadas]);

  const switchEstado = (estado) => {
    setEstadosModal(estado);
    setEstadoVideo(estado);
  };

  const handleDelete = (chip) => {
    setEtiquetasSeleccionadas((prevSet) => {
      const nuevoSet = new Set(prevSet);
      if (nuevoSet.has(chip)) {
        nuevoSet.delete(chip);
      } else {
        nuevoSet.add(chip);
      }

      return nuevoSet;
    });
  };

  const cerraModal = () => {
    // setFiltros(Array.from(etiquetasSeleccionadas));
    onClose();
  };

  // borrar
  useEffect(() => {
    console.log("MF etiquetas Seleccionadas", etiquetasSeleccionadas);
  }, [etiquetasSeleccionadas]);

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={cerraModal}
      onBackButtonPress={cerraModal}
      backdropOpacity={0.3}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      style={styles.modal}
      statusBarTranslucent
      propagateSwipe
      useNativeDriver
    >
      <Animated.View
        style={[
          {
            transform: pan.getTranslateTransform(),
            opacity: opacity,
          },
        ]}
      >
        <View style={[styles.modalContent, { maxHeight: MODAL_HEIGHT }]}>
          <View style={styles.cabecera}>
            <Text style={styles.title}>Filtros</Text>
          </View>

          <View style={styles.tituloEstado}>
            <Text style={styles.textoEstado}>Estado del video: </Text>
          </View>

          <View style={styles.contenedorEstados}>
            {["Todos", "Visto", "Pendiente"].map((estado) => (
              <TouchableOpacity
                key={estado}
                onPress={() => switchEstado(estado)}
                style={[
                  styles.bottonEstado,
                  { opacity: estados === estado ? 1 : 0.5 },
                ]}
              >
                <Text style={styles.chip}>{estado}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.tituloEstado}>
            <Text style={styles.textoEstado}>Etiquetas: </Text>
          </View>

          <ScrollView
            style={[styles.ScrollView, { height: SCROLL_HEIGHT }]}
            contentContainerStyle={styles.scrollContainer}
          >
            <View style={styles.contenedorEtiquetas}>
              {etiquetasModal.map((chip, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleDelete(chip)}
                  style={{ width: "95%" }}
                >
                  <View
                    style={[
                      styles.chipContainer,
                      { opacity: etiquetasSeleccionadas.has(chip) ? 1 : 0.5 },
                    ]}
                  >
                    <Text style={styles.chip}>{chip}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0,
    width: "98%",
    alignSelf: "center",
  },
  modalContent: {
    maxHeight: "70%",
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 10,
  },
  cabecera: {
    height: 60,
    backgroundColor: colors.primary,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.white,
  },
  tituloEstado: {
    marginHorizontal: "2%",
    paddingTop: "2%",
    paddingLeft: "2%",
    paddingBottom: "2%",
  },
  textoEstado: {
    fontSize: 15,
  },
  contenedorEstados: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginVertical: "2%",
    width: "95%",
    alignSelf: "center",
    backgroundColor: colors.smokedWhite,
    borderRadius: 7,
    padding: 5,
  },
  bottonEstado: {
    backgroundColor: colors.primary,
    width: "31%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 7,
  },
  ScrollView: {
    flexGrow: 0,
    width: "95%",
    alignSelf: "center",
    borderRadius: 10,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  contenedorEtiquetas: {
    backgroundColor: colors.smokedWhite,
    padding: "2%",
    borderRadius: 10,
    alignItems: "center",
    alignSelf: "center",
    width: "99%",
  },
  chipContainer: {
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 7,
    width: "100%",
  },
  chip: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default ModalFiltros;
