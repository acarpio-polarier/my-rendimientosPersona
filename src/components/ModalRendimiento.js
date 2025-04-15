import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  StatusBar,
  Platform,
  PanResponder,
  Animated,
} from "react-native";
import Modal from "react-native-modal";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../../styles/base";
import { BlurView } from "expo-blur"; // Importación correcta de BlurView

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");
const deviceWidth = Dimensions.get("window").width;
/**
 * Modal personalizado reutilizable con blur, tamaño automático y gesto de swipe para cerrar
 * @param {boolean} isVisible - Controla la visibilidad del modal
 * @param {function} onClose - Función para cerrar el modal
 * @param {string} title - Título del modal (opcional)
 * @param {Object} children - Contenido del modal
 * @param {Object} containerStyle - Estilos adicionales para el contenedor del modal
 * @param {string} headerBackgroundColor - Color de fondo del encabezado
 * @param {string} headerTextColor - Color del texto del encabezado
 * @param {string} blurIntensity - Intensidad del efecto blur ('light', 'dark', o 'tint')
 */
const ModalRendimiento = ({
  isVisible,
  onClose,
  title,
  children,
  containerStyle,
  headerBackgroundColor = colors.primary,
  headerTextColor = "white",
  blurIntensity = "light",
}) => {
  // Creamos un valor animado para el deslizamiento
  const pan = useRef(new Animated.ValueXY()).current;
  const opacity = useRef(new Animated.Value(1)).current;

  // Umbral para considerar un swipe como suficiente para cerrar
  const SWIPE_THRESHOLD = 50;

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      backdropColor="white"
      animationIn="slideInUp"
      animationOut="slideOutDown"
      style={styles.modal}
      statusBarTranslucent={true}
      propagateSwipe={true}
      avoidKeyboard={true}
      useNativeDriver={true}
      deviceWidth={deviceWidth}
    >
      <Animated.View
        style={[
          styles.modalContent,
          containerStyle,
          {
            transform: pan.getTranslateTransform(),
            opacity: opacity,
          },
        ]}
      >
        {/* Encabezado del modal con área para swipe */}
        <View
          style={[
            styles.modalHeader,
            { backgroundColor: headerBackgroundColor },
          ]}
        >
          {/* Título (si existe) */}
          {title ? (
            <Text style={[styles.modalHeaderText, { color: headerTextColor }]}>
              {title}
            </Text>
          ) : null}

          {/* Botón de cierre - Siempre visible independiente del título */}
          <TouchableOpacity
            onPress={onClose}
            style={[styles.closeButton, !title && styles.closeButtonNoTitle]}
          >
            <MaterialCommunityIcons
              name="close"
              size={24}
              color={headerTextColor}
            />
          </TouchableOpacity>
        </View>

        {/* Contenido del modal */}
        <View
          style={styles.modalBody}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.modalBodyContent}
        >
          <ScrollView>{children}</ScrollView>
        </View>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    margin: 0,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  blurContainer: {
    width: SCREEN_WIDTH,
    borderRadius: 20,
    overflow: "hidden",
  },
  modalContent: {
    backgroundColor: colors.smokedWhite,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 0,
    width: SCREEN_WIDTH * 0.98,
    overflow: "hidden",
    height: SCREEN_HEIGHT * 0.85,
  },
  modalHeader: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.1)",
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  dragIndicator: {
    width: 40,
    height: 5,
    backgroundColor: "rgba(255,255,255,0.5)",
    borderRadius: 3,
    marginBottom: 10,
  },
  modalHeaderText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: 5,
    marginBottom: 5,
  },
  closeButton: {
    position: "absolute",
    right: 15,
    top: 10,
    padding: 5,
  },
  closeButtonNoTitle: {
    top: 3, //
  },
  modalBody: {
    flex: 1,
    alignSelf: "center",
    width: SCREEN_WIDTH * 0.95,
  },
  modalBodyContent: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
});

export default ModalRendimiento;
