import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import styles from "../../styles/rendimiento";
import TarjetaRendimiento from "./components/TarjetaRendimiento";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Index = () => {
  const insets = useSafeAreaInsets();

  // Estado
  const [datosRendimiento, setDatosRendimiento] = useState([]);
  const [cargandoRendimiento, setCargandoRendimiento] = useState(false);
  const [errorRendimiento, setErrorRendimiento] = useState(null);

  // Cargar datos de rendimiento
  useEffect(() => {
    const cargarDatosRendimiento = async () => {
      try {
        setCargandoRendimiento(true);
        setErrorRendimiento(null);

        const hoy = new Date();
        const fechaStr = hoy.toISOString().split("T")[0];

        const resultado =
          await rendimientoPersonasService.getRendimientoPersonaMaquina(
            fechaStr,
            fechaStr
          );
        setDatosRendimiento(resultado);
      } catch (error) {
        setErrorRendimiento(error.message);
      } finally {
        setCargandoRendimiento(false);
      }
    };

    cargarDatosRendimiento();
  }, []);

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

      <TarjetaRendimiento titulo="A" />
    </View>
  );
};

export default Index;
