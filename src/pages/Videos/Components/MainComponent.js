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
  const [listaVideos, setListaVideos] = useState([]);
  const [videosFiltrados, setVideosFiltrados] = useState();
  const [videosEtiquetas, setVideosEtiquetas] = useState();
  const [etiquetas, setEtiquetas] = useState();
  const [filtros, setFiltros] = useState([]);
  const [estadoVideo, setEstadoVideo] = useState("Todos");
  const navigation = useNavigation();

  // Solo cargar la primera vez
  useEffect(() => {
    getVideosPorPersona();
  }, []);

  useEffect(() => {
    if (listaVideos && listaVideos.length > 0) {
      console.log("MC useEffect cargarEtiquetas");
      cargarEtiquetas();
    }
  }, [listaVideos, estadoVideo]);

  useEffect(() => {
    if (filtros && filtros.length > 0) {
      console.log("MC useEffect cargarVideosFiltrados", filtros);
      cargarVideosFiltrados();
    } else {
      setVideosFiltrados([]);
    }
  }, [filtros]);

  const cargarEtiquetas = async () => {
    const etiquetasUnicas = new Set();
    const videosConEtiquetas = [];

    // Sacar etiquetas de cada video y guardarlas en el Set
    for (const video of listaVideos) {
      const etiquetas = await RendimientoUtils.getEtiquetasVideos(
        video.idVideo
      );

      // Array con los videos y sus etiquetas
      videosConEtiquetas.push({
        idVideo: video.idVideo,
        etiquetas: etiquetas,
      });

      etiquetas.forEach((etiqueta) => {
        console.log("MC forEach estados", estadoVideo);

        // Mostrar solo las etiquetas las cuales estan en videos segun el estado
        if (
          etiqueta.denominacion &&
          video.idEstado === 5 &&
          estadoVideo === "Visto"
        ) {
          etiquetasUnicas.add(etiqueta.denominacion);
        }
        if (
          etiqueta.denominacion &&
          video.idEstado != 5 &&
          estadoVideo === "Pendiente"
        ) {
          etiquetasUnicas.add(etiqueta.denominacion);
        }
        if (etiqueta.denominacion && estadoVideo === "Todos") {
          etiquetasUnicas.add(etiqueta.denominacion);
        }
      });
    }
    console.log("MC Etiquetas únicas:", etiquetasUnicas);
    const etiquetasFinales = Array.from(etiquetasUnicas);
    setEtiquetas(etiquetasFinales);
    setVideosEtiquetas(videosConEtiquetas);
    setFiltros(etiquetasFinales);
    console.log("MC Etiquetas únicas:", etiquetasFinales);
    console.log("MC videos con etiquetas", videosConEtiquetas);
  };

  const getVideosPorPersona = async () => {
    const data = await RendimientoUtils.getVideosPorPersona(1392);
    console.log("MC videos de una persona", data);

    const videos = data.filter((video) => {
      return video.idEstado != 2; // idEstado = 2 es que el video se le ha quitado desde RRHH
    });

    setVideosFiltrados(videos);
    setListaVideos(videos);
  };

  const cargarVideosFiltrados = () => {
    const idsVideosEstado = [];

    // id de los videos segun el estado
    listaVideos.forEach((video) => {
      if (video.idEstado === 5 && estadoVideo === "Visto") {
        idsVideosEstado.push(video.idVideo);
      }
      if (video.idEstado != 5 && estadoVideo === "Pendiente") {
        idsVideosEstado.push(video.idVideo);
      }
      if (estadoVideo === "Todos") {
        idsVideosEstado.push(video.idVideo);
      }
    });

    const idsFiltrados = new Set();
    console.log("MC filtrando listaVideos", listaVideos);
    console.log("MC filtrando filtros", filtros);
    console.log("MC filtrando videosEtiquetas", videosEtiquetas);

    // id de los videos segun las etiquetas
    videosEtiquetas.forEach((video) => {
      const etiquetasDelVideo = video.etiquetas.map((e) => e.denominacion);

      const coincide = etiquetasDelVideo.some((etiqueta) =>
        filtros.includes(etiqueta)
      );

      if (coincide) {
        idsFiltrados.add(video.idVideo);
      }
    });

    const idsFiltradosArray = Array.from(idsFiltrados);

    // Comprobar que los ids esten enlos aceptados por el estado y las etiquetas
    const nuevosFiltrados = listaVideos.filter(
      (video) =>
        idsFiltradosArray.includes(video.idVideo) &&
        idsVideosEstado.includes(video.idVideo)
    );
    setVideosFiltrados(nuevosFiltrados);

    console.log("MC filtrando nuevosFilstrados", nuevosFiltrados);
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
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {videosFiltrados && videosFiltrados.length > 0 ? (
          <View style={styles.contenedorVideos}>
            {videosFiltrados?.map((video, index) => (
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
        ) : (
          <View style={styles.contenedorVideos}>
            <Text style={styles.textNoVids}>No hay videos disponibles</Text>
          </View>
        )}
      </ScrollView>
      {modalVisibilidad && (
        <ModalFiltros
          isVisible={modalVisibilidad}
          onClose={() => setModalVisibilidad(!modalVisibilidad)}
          filtros={filtros}
          setFiltros={setFiltros}
          etiquetas={etiquetas}
          estados={estadoVideo}
          setEstadoVideo={setEstadoVideo}
        />
      )}
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
  textNoVids: {
    alignSelf: "center",
    marginVertical: "10%",
    fontSize: 35,
    color: colors.gray,
    textAlign: "center",
  },
});

export default MainComponent;
