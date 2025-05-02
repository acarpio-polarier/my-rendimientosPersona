import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { colors } from "../../../styles/base";
import ComponenteFiltro from "./componenteFiltro";
import data from "../data/data.json";

export const ID_PERSONA = 6469;

const MainComponent = () => {
  const [dataTokens, setDataTokens] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchTokens = async () => {
    try {
      const response = await fetch(
        `https://localhost:7136/odata/getResumenTokensPersona?idPersona=${ID_PERSONA}`
      );
      const result = await response.json();
      setDataTokens(result);
      console.log("Datos desde API:", result);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTokens();
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
        recargarTokens={fetchTokens}
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
