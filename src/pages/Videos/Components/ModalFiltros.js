import React, { useEffect, useState, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
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
  const pan = useRef(new Animated.ValueXY()).current;
  const opacity = useRef(new Animated.Value(1)).current;
  const [etiquetasSeleccionadas, setEtiquetasSeleccionadas] = useState(
    new Set(filtros)
  );
  const [estadosModal, setEstadosModal] = useState(estados);
  const etiquetasModal = etiquetas;

  const switchEstado = (estado) => {
    console.log("MF estados", estadosModal, estado);
    if (estadosModal.includes(estado)) {
      const nuevoEstados = estadosModal.filter((item) => item !== estado);
      console.log("MF nuevoEstados", nuevoEstados);
      setEstadosModal(nuevoEstados); //provisional
      setEstadoVideo(nuevoEstados);
    } else {
      const nuevoEstados = [...estadosModal, estado];
      console.log("MF nuevoEstados", nuevoEstados);
      setEstadosModal(nuevoEstados); // provisional
      setEstadoVideo(nuevoEstados);
    }
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
    setFiltros(Array.from(etiquetasSeleccionadas));
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
        <View style={[styles.modalContent, { height: deviceHeight / 1.7 }]}>
          <View style={styles.cabecera}>
            <Text style={styles.title}>Filtros</Text>
          </View>
          <View style={styles.contenedorEstados}>
            <TouchableOpacity
              onPress={() => {
                switchEstado("Visto");
              }}
              style={[
                styles.bottonEstado,
                { opacity: estados.includes("Visto") ? 1 : 0.5 },
              ]}
            >
              <Text style={styles.chip}>Visto</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                switchEstado("Pendiente");
              }}
              style={[
                styles.bottonEstado,
                { opacity: estados.includes("Pendiente") ? 1 : 0.5 },
              ]}
            >
              <Text style={styles.chip}>Pendiente</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.contenedorEtiquetas}>
            {etiquetasModal.map((chip, index) => (
              <TouchableOpacity key={index} onPress={() => handleDelete(chip)}>
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
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  cabecera: {
    height: "12%",
    backgroundColor: colors.primary,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.white,
    width: "100%",
    textAlign: "center",
  },
  contenedorEtiquetas: {
    display: "flex",
    width: "95%",
    maxHeight: "80%",
    alignSelf: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent: "flex-start",
    marginBottom: "3%",
    overflow: "hidden",
  },

  chipContainer: {
    backgroundColor: colors.primary,
    alignItems: "center",
    margin: 5,
    justifyContent: "center",
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 7,
  },
  chip: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "bold",
  },
  contenedorEstados: {
    backgroundColor: "red",
    height: "10%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginVertical: "2%",
  },
  bottonEstado: {
    backgroundColor: colors.primary,
    width: "40%",
    alignItems: "center",
    margin: 5,
    justifyContent: "center",
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 7,
  },
});

export default ModalFiltros;
