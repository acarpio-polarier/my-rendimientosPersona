import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { colors } from "../../../styles/base";
import ComponenteFiltro from "./componenteFiltro";
import data from "../data/data.json";
import { tokensDatasource } from "../../services/canjeTokens";

export const ID_PERSONA = 1392;

const MainComponent = () => {
  const [dataTokens, setDataTokens] = useState(null);
  const [loading, setLoading] = useState(true);

  const cargarTokens = async () => {
    setLoading(true);
    const result = await tokensDatasource(ID_PERSONA);
    if (result) {
      setDataTokens(result);
    }
    setLoading(false);
  };

  useEffect(() => {
    cargarTokens();
  }, []);

  if (loading) {
    return (
      <View>
        <Text style={styles.loadingLabel}>Cargando datos...</Text>
        <ActivityIndicator
          style={styles.loadingCircle}
          size="large"
          color={colors.primary}
        />
      </View>
    );
  }

  return (
    <View>
      <ComponenteFiltro
        dataTokens={dataTokens?.TokensDisponibles}
        data={data}
        ID_PERSONA={ID_PERSONA}
        recargarTokens={cargarTokens}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingLabel: {
    textAlign: "center",
    marginTop: "50%",
    color: colors.lightBlack,
  },
  loadingCircle: {
    marginTop: "10%",
  },
});

export default MainComponent;
