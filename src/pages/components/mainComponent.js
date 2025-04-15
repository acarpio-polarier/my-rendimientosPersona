import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import HeaderCanje from "./headerCanje";
import ComponenteFiltro from "./componenteFiltro";
import data from "../data/data.json";

export const ID_PERSONA = 6666;

const MainComponent = () => {
  const [dataTokens, setDataTokens] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResumenTokens = async () => {
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

    fetchResumenTokens();
  }, []);

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Cargando datos...</Text>
      </View>
    );
  }

  return (
    <View>
      <HeaderCanje dataTokens={dataTokens.TokensDisponibles} />
      <ComponenteFiltro dataTokens={dataTokens.TokensDisponibles} data={data} />
    </View>
  );
};

export default MainComponent;
