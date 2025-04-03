import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function DetalleRendimiento({ route, navigation }) {
  const insets = useSafeAreaInsets();
  const { data } = route.params || { data: {} };

  const renderDataItem = (key, value) => {
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      return (
        <View key={key} style={styles.section}>
          <Text style={styles.sectionTitle}>{key}</Text>
          {Object.entries(value).map(([subKey, subValue]) =>
            renderDataItem(`${subKey}`, subValue)
          )}
        </View>
      );
    } else if (Array.isArray(value)) {
      return (
        <View key={key} style={styles.section}>
          <Text style={styles.sectionTitle}>{key}</Text>
          {value.map((item, index) => (
            <View key={index} style={styles.listItem}>
              <Text style={styles.listItemText}>
                {typeof item === "object" ? JSON.stringify(item) : String(item)}
              </Text>
            </View>
          ))}
        </View>
      );
    }
    // Para valores simples
    else {
      return (
        <View key={key} style={styles.item}>
          <Text style={styles.label}>{key}:</Text>
          <Text style={styles.value}>{String(value)}</Text>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={{ paddingTop: insets.top }}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.header}>
          <Text style={styles.headerText}>Detalle de Rendimiento</Text>
        </View>

        {Object.keys(data).length > 0 ? (
          <View style={styles.dataContainer}>
            {Object.entries(data).map(([key, value]) =>
              renderDataItem(key, value)
            )}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No hay datos disponibles</Text>
          </View>
        )}

        <View style={styles.buttonContainer}>
          <Text style={styles.backButton} onPress={() => navigation.goBack()}>
            Volver
          </Text>
        </View>
      </ScrollView>

      {/* Floating Action Button (FAB) para volver */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.goBack()}
        activeOpacity={0.7}
      >
        <Text style={styles.fabIcon}>←</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  contentContainer: {
    paddingBottom: 20,
  },
  header: {
    padding: 15,
    backgroundColor: "#3498db",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#2980b9",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  dataContainer: {
    padding: 15,
  },
  section: {
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#2c3e50",
  },
  item: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eaeaea",
  },
  label: {
    flex: 1,
    fontWeight: "500",
    color: "#34495e",
  },
  value: {
    flex: 2,
    color: "#7f8c8d",
  },
  listItem: {
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#eaeaea",
  },
  listItemText: {
    color: "#7f8c8d",
  },
  emptyState: {
    padding: 30,
    alignItems: "center",
  },
  emptyStateText: {
    fontSize: 16,
    color: "#95a5a6",
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  backButton: {
    fontSize: 16,
    color: "white",
    backgroundColor: "#3498db",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
    overflow: "hidden",
  },
  // Estilos para el FAB
  fab: {
    position: "absolute",
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    right: 20,
    bottom: 20,
    backgroundColor: "#3498db",
    borderRadius: 28,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  fabIcon: {
    fontSize: 24,
    color: "white",
  },
});
