import React from "react";
import { View, Text } from "react-native";
import styles from "../../styles/rendimiento";
import TarjetaRendimiento from "./components/TarjetaRendimiento";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const RendimientoScreen = () => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.page,
        {
          paddingTop: insets.top,
        },
      ]}
    >
      <View style={styles.navigationBar}>
        <Text style={styles.headerText}>RENDIMIENTO</Text>
      </View>

      <TarjetaRendimiento
        titulo="A"
        mostrarSelectoresFecha={true}
        mostrarSelectorHistorico={true}
      />
    </View>
  );
};

export default RendimientoScreen;
