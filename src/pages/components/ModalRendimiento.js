import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Modal from "react-native-modal";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../../../styles/base";
import Wizard from "../../components/Wizard";
import DetalleRendimientoDesplegable from "./DetalleRendimientoDesplegable";

const { width, height } = Dimensions.get("window");

const ModalRendimiento = ({
  isVisible,
  onClose,
  title,
  children,
  datos = [], // Recibir los datos para los componentes dentro del wizard
  containerStyle,
  headerBackgroundColor = colors.primary,
  headerTextColor = "white",
  blurIntensity = "light",
}) => {
  // Referencia al componente Wizard
  const wizardRef = useRef(null);
  // Controlar en qué paso nos encontramos
  const [currentStep, setCurrentStep] = useState(0);

  // Definir los pasos del wizard
  const pasos = [
    {
      // Vista principal (el componente que se pasa como children)
      content: <View style={styles.wizardStep}>{children}</View>,
    },
    {
      // Vista de detalles (usando DetalleRendimientoDesplegable)
      content: (
        <View style={styles.wizardStep}>
          <Text style={styles.stepTitle}>Detalles</Text>
          <DetalleRendimientoDesplegable datos={datos} cargando={false} />
        </View>
      ),
    },
  ];

  // Actualizar el paso actual cuando cambia
  const handleStepChange = (step) => {
    setCurrentStep(step);
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      backdropOpacity={0.1}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      style={styles.modal}
      statusBarTranslucent={true}
      propagateSwipe={true}
      avoidKeyboard={true}
      useNativeDriver={true}
    >
      <View style={[styles.modalContent, containerStyle]}>
        {/* Encabezado del modal */}
        <View
          style={[
            styles.modalHeader,
            { backgroundColor: headerBackgroundColor },
          ]}
        >
          {/* Línea de arrastre */}
          <View style={styles.dragIndicator} />

          {/* Título */}
          {title ? (
            <Text style={[styles.modalHeaderText, { color: headerTextColor }]}>
              {title}
            </Text>
          ) : null}

          {/* Botón de cierre */}
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

        {/* Contenido con Wizard */}
        <View style={styles.wizardContainer}>
          <Wizard
            ref={wizardRef}
            steps={pasos}
            width={width * 0.95} // Ancho del wizard
            currentStep={handleStepChange}
            initialStep={0}
            allowChangeHeight={true}
          />
        </View>

        {/* Navegación del Wizard */}
        <View style={styles.wizardNavigation}>
          <TouchableOpacity
            style={[
              styles.navButton,
              currentStep === 0 && styles.navButtonDisabled,
            ]}
            onPress={() => wizardRef.current?.prev()}
            disabled={currentStep === 0}
          >
            <MaterialCommunityIcons
              name="chevron-left"
              size={24}
              color={currentStep === 0 ? "#ccc" : colors.primary}
            />
            <Text
              style={[
                styles.navButtonText,
                currentStep === 0 && styles.navButtonTextDisabled,
              ]}
            >
              Anterior
            </Text>
          </TouchableOpacity>

          {/* Indicadores de paso */}
          <View style={styles.indicators}>
            {pasos.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicator,
                  currentStep === index && styles.indicatorActive,
                ]}
              />
            ))}
          </View>

          <TouchableOpacity
            style={[
              styles.navButton,
              currentStep === pasos.length - 1 && styles.navButtonDisabled,
            ]}
            onPress={() => wizardRef.current?.next()}
            disabled={currentStep === pasos.length - 1}
          >
            <Text
              style={[
                styles.navButtonText,
                currentStep === pasos.length - 1 &&
                  styles.navButtonTextDisabled,
              ]}
            >
              Siguiente
            </Text>
            <MaterialCommunityIcons
              name="chevron-right"
              size={24}
              color={currentStep === pasos.length - 1 ? "#ccc" : colors.primary}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "rgba(245, 245, 245, 0.9)",
    borderRadius: 20,
    paddingTop: 0,
    width: width * 0.95,
    overflow: "hidden",
    maxHeight: height * 0.85,
  },
  modalHeader: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.1)",
    position: "relative",
    alignItems: "center",
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
    marginBottom: 5,
  },
  closeButton: {
    position: "absolute",
    right: 15,
    top: 10,
    padding: 5,
  },
  closeButtonNoTitle: {
    top: 3,
  },
  // Estilos para el wizard
  wizardContainer: {
    flex: 1,
    minHeight: 300,
  },
  wizardStep: {
    padding: 15,
    flex: 1,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 15,
    textAlign: "center",
  },
  wizardNavigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  navButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  navButtonDisabled: {
    opacity: 0.5,
  },
  navButtonText: {
    color: colors.primary,
    fontWeight: "500",
  },
  navButtonTextDisabled: {
    color: "#ccc",
  },
  indicators: {
    flexDirection: "row",
    justifyContent: "center",
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 4,
  },
  indicatorActive: {
    backgroundColor: colors.primary,
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});

export default ModalRendimiento;
