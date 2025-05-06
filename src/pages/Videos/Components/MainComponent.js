import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Searchbar, Chip } from "react-native-paper";
import { colors } from "../../../../styles/base";

const MainComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [etiquetas, setEtiquetas] = useState([
    "Plegadora",
    "Visto",
    "Pendiente",
    "Calandra",
  ]);

  // Borrar una etiqueta
  const handleDelete = (chipToDelete) => {
    setEtiquetas((prevChips) =>
      prevChips.filter((chip) => chip !== chipToDelete)
    );
  };

  return (
    <View>
      <View style={styles.contenedorBusqueda}>
        <Searchbar
          placeholder="Buscar"
          onChangeText={setSearchQuery}
          value={searchQuery}
          cursorColor={colors.primary}
          selectionColor={colors.primary}
          inputStyle={{ textAlignVertical: "center" }}
          style={styles.barraBusqueda}
        />
        <TouchableOpacity style={styles.iconoFiltro}>
          <MaterialCommunityIcons
            name="filter"
            size={40}
            color={colors.smokedWhite}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.contenedorEtiquetas}>
        {etiquetas.map((chip, index) => (
          <TouchableOpacity key={index} onPress={() => handleDelete(chip)}>
            <Chip
              mode="outlined"
              onClose={() => {
                console.log("etiquetaTocada");
              }}
              style={styles.etiqueta}
              textStyle={{ color: colors.white }}
            >
              {chip}
            </Chip>
          </TouchableOpacity>
        ))}
      </View>
      <ScrollView style={{ height: "92%", paddingBottom: 100 }}></ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedorBusqueda: {
    height: 55,
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: "2%",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: "2%",
  },
  barraBusqueda: {
    width: "83%",
    height: "100%",
    borderRadius: 10,
    backgroundColor: colors.smokedWhite,
    borderWidth: 2,
    borderColor: colors.primary,
    borderStyle: "solid",
  },
  iconoFiltro: {
    display: "flex",
    height: "100%",
    width: "15%",
    backgroundColor: colors.primary,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  contenedorEtiquetas: {
    display: "flex",
    width: "95%",
    alignSelf: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent: "center",
  },
  etiqueta: {
    margin: 5,
    width: "auto",
    flexShrink: 1,
    borderRadius: 10,
    backgroundColor: colors.primary,
    borderWidth: 0,
  },
});

export default MainComponent;
