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
import TarjetaVideo from "./TarjetaVideo";
import { useNavigation } from "@react-navigation/native";
import RendimientoUtils from "../../../helpers/RendimientoUtils";

const MainComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [etiquetas, setEtiquetas] = useState([
    "Plegadora",
    "Visto",
    "Pendiente",
    "Calandra",
  ]);
  const navigation = useNavigation();
  // Borrar
  useEffect(() => {
    getVideosPorPersona();
  }, []);

  const getVideosPorPersona = async () => {
    const data = await RendimientoUtils.getVideosPorPersona(1392);
    console.log("videos de una persona", data);
  };

  const abrirVideo = () => {
    navigation.navigate("PaginaVideo", { idVideo: "wVv5WR64CKg" });
  };
  const abrirVideo2 = () => {
    navigation.navigate("PaginaVideo2", { idVideo: "wVv5WR64CKg" });
  };

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
            // name="eye-check-outline"
            name="filter-outline"
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
      <ScrollView style={{ height: "100%", paddingBottom: 100 }}>
        <View style={styles.contenedorVideos}>
          <TouchableOpacity style={styles.tarjetaVideo} onPress={abrirVideo}>
            <TarjetaVideo idVideo="wVv5WR64CKg" visto={true} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.tarjetaVideo} onPress={abrirVideo2}>
            <TarjetaVideo idVideo="b6hoBp7Hk-A" visto={false} />
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    marginBottom: "3%",
  },
  etiqueta: {
    margin: 5,
    width: "auto",
    flexShrink: 1,
    borderRadius: 10,
    backgroundColor: colors.primary,
    borderWidth: 0,
  },
  contenedorVideos: {},
  tarjetaVideo: {
    marginVertical: "2%",
  },
});

export default MainComponent;
