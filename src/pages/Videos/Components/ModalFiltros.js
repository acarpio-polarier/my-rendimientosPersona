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

const ModalFiltros = ({ isVisible, onClose, filtros }) => {
  const deviceHeight = Dimensions.get("window").height;
  const pan = useRef(new Animated.ValueXY()).current;
  const opacity = useRef(new Animated.Value(1)).current;

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
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
            {/* <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <MaterialCommunityIcons
                name="close"
                size={30}
                color={colors.smokedWhite}
              />
            </TouchableOpacity> */}
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
  //   closeButton: {
  //     position: "absolute",
  //     top: "100%",
  //     left: "100%",
  //     transform: [{ translateX: -60 }, { translateY: -43 }],
  //   },
});

export default ModalFiltros;
