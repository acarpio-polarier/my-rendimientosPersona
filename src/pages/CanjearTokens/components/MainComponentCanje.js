import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { colors } from "../../../../styles/base";
import ComponenteFiltro from "./ComponenteFiltro";
import data from "../datos/data.json";
import RendimientoUtils from "../../../helpers/RendimientoUtils";

export const ID_PERSONA = 1392;

const MainComponent = () => {
  const [dataTokens, setDataTokens] = useState();
  const [loading, setLoading] = useState(true);

  const getResumenTokensPersona = async () => {
    const resumenTokens = await RendimientoUtils.getResumenTokensPersona(
      ID_PERSONA
    );
    setDataTokens(resumenTokens);
  };

  useEffect(() => {
    getResumenTokensPersona();
  }, []);

  useEffect(() => {
    setLoading(false);
    console.log(dataTokens);
  }, [dataTokens]);

  if (loading) {
    return (
      <View style={{ paddingBottom: 900, backgroundColor: colors.smokedWhite }}>
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
        recargarTokens={getResumenTokensPersona}
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
