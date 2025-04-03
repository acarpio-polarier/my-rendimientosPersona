import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styles from "../../styles/rendimiento";
import GraficoSemanal from "./components/GraficoSemanal";
import GraficoAnual from "./components/GraficoAnual";

const Indice = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[localStyles.container, { paddingTop: insets.top }]}>
      <View style={styles.navigationBar}>
        <Text style={styles.headerText}>RENDIMIENTO</Text>
      </View>
      <View>
        <GraficoSemanal />
      </View>
      <View>
        <GraficoAnual />
      </View>
    </View>
  );
};

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default Indice;
