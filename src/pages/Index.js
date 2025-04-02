import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import styles from "../../styles/rendimiento";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import GraficaDonut from "./components/GraficaDonut";
import GraficoAnual from "./components/GraficoAnual";

const PERSONA_ID = 4096;

const Index = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.navigationBar}>
      <Text style={styles.headerText}>RENDIMIENTO</Text>
      <GraficaDonut />
      <GraficoAnual />
    </View>
  );
};

export default Index;
