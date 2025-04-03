import Grid from "../../elements/Grid";
import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

export default function DetalleHistoricoRendimientos() {
  const navigation = useNavigation();
  const route = useRoute();
  const { data } = route.params || {};

  const goBack = () => {
    navigation.goBack();
  };

  // Preparar los datos para el Grid, extrayendo solo los campos que necesitas
  const datosParaGrid = Array.isArray(data)
    ? data.map((item, index) => ({
        key: `${index}`,
        idPersona: item.idPersona,
        idMaquina: item.idMaquina,
        totalPrendas: item.TotalPrendas,
      }))
    : [];

  // Función para renderizar cada elemento en el Grid
  const renderItem = (item) => (
    <View style={styles.itemContainer}>
      <View style={{}}>
        <Text style={styles.labelText}>ID Persona:</Text>
        <Text style={styles.valueText}>{item.idPersona}</Text>

        <Text style={styles.labelText}>ID Máquina:</Text>
        <Text style={styles.valueText}>{item.idMaquina}</Text>
      </View>
      <View>
        <Text style={styles.labelText}>Total Prendas:</Text>
        <Text style={styles.valueText}>{item.totalPrendas}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goBack} style={styles.backButton}>
        <Text style={styles.backButtonText}>← Volver</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Detalle de Rendimientos</Text>

      {datosParaGrid.length > 0 ? (
        <Grid data={datosParaGrid} numColumns={1} renderItem={renderItem} />
      ) : (
        <Text style={styles.emptyText}>No hay datos disponibles</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  backButton: {
    marginBottom: 16,
  },
  backButtonText: {
    fontSize: 16,
    color: "#0066cc",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  itemContainer: {
    width: "100%",
    height: "100%",
    padding: 12,
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  labelText: {
    fontSize: 12,
    color: "#666",
    marginBottom: 2,
  },
  valueText: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
    color: "#666",
  },
});
