import React, { PureComponent } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  Platform,
} from "react-native";
import { colors, DEVICE_HEIGHT } from "../../styles/base";
import { TextElement as Text } from "./Text";
import { BlurView } from "expo-blur";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default class CustomModal extends PureComponent {
  constructor(props) {
    super(props);
  }

  render = () => {
    const {
      visible,
      title,
      hideModal,
      children,
      showCloseButton = true,
      position = "bottom",
      modalStyle = {},
      height = null,
      maxHeight = 0.7,
      contentContainerStyle,
      saveMode,
      onAceptar,
    } = this.props;

    const showHeader = showCloseButton || (title && title.length > 0);

    let _height = height === null ? undefined : height * DEVICE_HEIGHT;
    let _maxHeight = height === null ? maxHeight * DEVICE_HEIGHT : _height;

    return (
      <Modal
        visible={visible}
        animationType="fade"
        transparent={true}
        onRequestClose={hideModal}
        useNativeDriver={true}
        statusBarTranslucent={true}
      >
        <BlurView intensity={80} tint="dark" style={styles.centeredView}>
          <TouchableOpacity
            style={styles.touchable_dismiss}
            onPress={hideModal}
          />
          <View
            style={[
              styles.container,
              position == "bottom"
                ? styles.positionBottom
                : styles.positionCenter,
              modalStyle,
            ]}
          >
            {showHeader && (
              <View style={styles.modalHeader}>
                <Text
                  itemHeader
                  semibold
                  lightBlack
                  style={{ flex: 1, padding: 10, paddingLeft: 10 }}
                >
                  {title}
                </Text>
                {showCloseButton && (
                  <View style={styles.container_close}>
                    <TouchableOpacity
                      onPress={hideModal}
                      style={styles.touchable_close}
                    >
                      <MaterialCommunityIcons
                        name="close"
                        size={24}
                        color={colors.lightBlack}
                      />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            )}
            <ScrollView
              bounces={Platform.OS === "android"}
              keyboardShouldPersistTaps="always"
              style={[styles.modalBody, { maxHeight: _maxHeight }]}
              contentContainerStyle={[
                contentContainerStyle,
                { height: _height },
              ]}
            >
              {children}
            </ScrollView>
            {saveMode && (
              <View style={styles.saveMode}>
                <TouchableOpacity
                  style={styles.botonCancelar}
                  onPress={hideModal}
                >
                  <Text semibold white>
                    Cancelar
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.botonAceptar}
                  onPress={onAceptar}
                >
                  <Text semibold white>
                    Aceptar
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </BlurView>
      </Modal>
    );
  };
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  touchable_dismiss: {
    height: "100%",
    width: "100%",
    position: "absolute",
  },
  container_close: {
    borderRadius: 25,
    overflow: "hidden",
  },
  touchable_close: {
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: colors.white,
    overflow: "hidden",
  },
  positionCenter: {
    borderRadius: 10,
    marginHorizontal: 15,
  },
  positionBottom: {
    position: "absolute",
    bottom: 0,
    borderRadius: 0,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: colors.lightGray,
    paddingHorizontal: 5,
  },
  modalBody: {
    flexGrow: 0,
  },
  saveMode: {
    width: "100%",
    height: 55,
    backgroundColor: colors.smokedWhite,
    borderTopColor: colors.lightGray,
    borderTopWidth: 1,
    borderBottomColor: colors.lightGray,
    borderBottomWidth: 1,
    flexDirection: "row",
  },
  botonCancelar: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.danger,
  },
  botonAceptar: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.success,
  },
});
