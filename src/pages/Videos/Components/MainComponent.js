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
import ModalFiltros from "./ModalFiltros";

const MainComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [modalVisibilidad, setModalVisibilidad] = useState(false);
  const [listaVideos, setListaVideos] = useState();
  const [etiquetas, setEtiquetas] = useState();
  const [filtros, setFiltros] = useState();
  const navigation = useNavigation();

  // Solo cargar la primera vez
  useEffect(() => {
    getVideosPorPersona();
    cargarEtiquetas();
  }, []);

  const cargarEtiquetas = async () => {
    const etiquetasUnicas = new Set();

    for (const video of listaVideos) {
      const etiquetas = await RendimientoUtils.getEtiquetasVideos(
        video.idVideo
      );

      etiquetas.forEach((etiqueta) => {
        if (etiqueta.denominacion) {
          etiquetasUnicas.add(etiqueta.denominacion);
        }
      });
    }

    const etiquetasFinales = Array.from(etiquetasUnicas);
    setEtiquetas(etiquetasFinales);
    setFiltros(etiquetasFinales);
    console.log("Etiquetas únicas:", etiquetasFinales);
  };

  const getVideosPorPersona = async () => {
    const data = await RendimientoUtils.getVideosPorPersona(1392);
    console.log("videos de una persona", data);
    setListaVideos(data);
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
        <TouchableOpacity
          style={styles.iconoFiltro}
          onPress={() => {
            setModalVisibilidad(!modalVisibilidad);
          }}
        >
          <MaterialCommunityIcons
            name="filter-outline"
            size={40}
            color={colors.smokedWhite}
          />
        </TouchableOpacity>
      </View>

      {modalVisibilidad && (
        <ModalFiltros
          isVisible={modalVisibilidad}
          onClose={() => setModalVisibilidad(!modalVisibilidad)}
          filtros={filtros}
          etiquetas={etiquetas}
        />
      )}

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contenedorVideos}>
          {listaVideos?.map((video, index) => (
            <TouchableOpacity
              key={index}
              style={styles.tarjetaVideo}
              onPress={() =>
                navigation.navigate("PaginaVideo", { video: video })
              }
            >
              <TarjetaVideo video={video} />
            </TouchableOpacity>
          ))}
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

  scrollView: {
    height: "83%",
  },
  contenedorVideos: {},
  tarjetaVideo: {
    marginVertical: "2%",
  },
});

export default MainComponent;
