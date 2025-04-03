import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import styles from "../../styles/rendimiento";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { GraficoSemanal } from "./components/GraficoSemanal";
import GraficoAnual from "./components/GraficoAnual";

const PERSONA_ID = 4096;

const Index = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ paddingTop: insets.top + 1 }}>
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

export default Index;
