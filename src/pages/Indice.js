import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styles from "../../styles/rendimiento";
import GraficoSemanal from "./components/GraficoSemanal";
import GraficoAnual from "./components/GraficoAnual";
import { ScrollView } from "react-native-gesture-handler";
export const PERSONA_ID = 4901;

const Indice = () => {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView style={{ paddingTop: insets.top + 1, padding: 1 }}>
      <View style={styles.navigationBar}>
        <Text style={styles.headerText}>RENDIMIENTO</Text>
      </View>
      <View>
        <GraficoSemanal />
      </View>
      <View>
        <GraficoAnual />
      </View>
    </ScrollView>
  );
};

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default Indice;
