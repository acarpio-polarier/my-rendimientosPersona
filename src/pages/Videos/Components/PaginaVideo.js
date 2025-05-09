import {
  View,
  Text,
  ScrollView,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { AppState } from "react-native";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import YoutubePlayer from "react-native-youtube-iframe";
import { colors } from "../../../../styles/base";
import { Switch } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import RendimientoUtils from "../../../helpers/RendimientoUtils";
import { useNavigation } from "@react-navigation/native";

export const PERSONA_ID = 1392;

const PaginaVideo = ({ route }) => {
  const insets = useSafeAreaInsets();
  const video = route.params.video;
  const idVideo = video.youtubeId;
  const descripcionVideo = video.descripcion;
  const [visto, setVisto] = useState(false);
  const [descCom, setDescCom] = useState("desc");
  const [nuevoComentario, setNuevoComentario] = useState(true);
  const [tiempoReproducido, setTiempoReproducido] = useState(0);
  const [duracionVideo, setDuracionVideo] = useState(0);
  const [youtubeVisto, setYoutubeVisto] = useState(false);
  const playerRef = useRef(null);
  const intervalRef = useRef(null);
  const appState = useRef(AppState.currentState);
  const navigation = useNavigation();

  const fechaEnvio = new Date(video.fechaEnvio).toISOString().split("T")[0];

  const widthV = Dimensions.get("window").width * 0.9;
  const heightV = (widthV * 9) / 16;

  // Logica para detectar si sales de la app
  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      if (appState.current.match(/active/) && nextAppState === "background") {
        console.log("La app pasó a segundo plano");
      }
      appState.current = nextAppState;
    };

    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    return () => {
      subscription.remove();
    };
  }, []);

  // Logica para detectar si sales de la pagina
  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", () => {
      console.log("Antes de salir de la pantalla");
    });

    return unsubscribe;
  }, [navigation]);

  //Borrar
  useEffect(() => {
    console.log(tiempoReproducido);
  }, [tiempoReproducido]);

  // Actualizar idEstado
  useEffect(() => {
    const setEstado = async (idEstado) => {
      await RendimientoUtils.setIdEstado(video.idPersonaVideo, idEstado);
    };
    if (visto) {
      setEstado(5); // 5 = visto
    } else {
      setEstado(3); // 3 = abierto
    }
  }, [visto]);

  useEffect(() => {
    if (video.idEstado === 5) setVisto(true);

    // Limpiar el intervalo
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const ToggleDescCom = (value) => {
    setDescCom(value);
    if (value === "com") setNuevoComentario(false);
  };

  const ToggleVisto = () => {
    setVisto(!visto);
  };

  const handleEvent = async (event) => {
    console.log("Evento:", event);

    // Sumador de segundos
    if (event === "playing") {
      if (!intervalRef.current) {
        intervalRef.current = setInterval(() => {
          setTiempoReproducido((prev) => prev + 1);
        }, 1000);
      }
    }

    // Parar el sumados
    if (event === "paused" || event === "buffering" || event === "ended") {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    if (
      event === "ended" ||
      (tiempoReproducido / duracionVideo >= 0.95 && duracionVideo > 0)
    ) {
      setYoutubeVisto(true);
      setVisto(true);
      console.log(tiempoReproducido);
    }
  };

  return (
    <View style={{ paddingTop: insets.top + 1 }}>
      <View style={styles.navigationBar}>
        <Text style={styles.headerText}>MyVideos</Text>
      </View>
      <View style={styles.contenedorVideos}>
        <YoutubePlayer
          ref={playerRef}
          height={heightV}
          width={widthV}
          videoId={idVideo}
          play={false}
          onChangeState={handleEvent}
          onReady={async () => {
            const duracion = await playerRef.current.getDuration();
            setDuracionVideo(duracion);
            console.log("duración del video", duracion, "segundos");
          }}
        />
      </View>
      <ScrollView style={styles.descripcionVideo}>
        <View style={styles.contenedorInfoPrincipal}>
          <View>
            <Text style={styles.titulo}>{video.titulo}</Text>
          </View>
          <View style={styles.fechaYVisto}>
            <Text>{fechaEnvio}</Text>
            <View style={styles.contenedorSwitch}>
              <Text>Visto:</Text>
              <Switch
                value={visto}
                onValueChange={ToggleVisto}
                color={colors.primary}
              />
            </View>
          </View>
        </View>
        <View style={styles.lineaHorizontal}></View>
        <View style={styles.contenedorDescripcion}>
          <TouchableOpacity
            onPress={() => ToggleDescCom("desc")}
            style={[
              styles.descComBoton,
              {
                borderBottomColor:
                  descCom === "desc" ? colors.primary : colors.gray,
                borderBottomWidth: 2,
              },
            ]}
          >
            <Text style={styles.descComText}>Descripción</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => ToggleDescCom("com")}
            style={[
              styles.descComBoton,
              {
                borderBottomColor:
                  descCom === "com" ? colors.primary : colors.gray,
                borderBottomWidth: 2,
              },
            ]}
          >
            <View
              style={[
                styles.contenedorExlamacion,
                {
                  backgroundColor:
                    nuevoComentario && video.comentario
                      ? colors.red
                      : "transparent",
                },
              ]}
            >
              {nuevoComentario && video.comentario && (
                <MaterialCommunityIcons
                  name="exclamation"
                  size={10}
                  color={colors.smokedWhite}
                />
              )}
            </View>
            <Text style={styles.descComText}>Comentarios</Text>
          </TouchableOpacity>
        </View>
        {descCom === "desc" ? (
          <View style={styles.contenidoDescripcion}>
            <Text style={{ textAlign: "justify" }}>{descripcionVideo}</Text>
          </View>
        ) : (
          <View style={styles.contenidoDescripcion}>
            <Text>{video.comentario}</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  navigationBar: {
    width: "100%",
    height: 60,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  lineaHorizontal: {
    backgroundColor: colors.smokedWhite,
    height: 3,
  },
  headerText: {
    color: colors.white,
    fontSize: 18,
  },
  titulo: {
    width: "100%",
    alignSelf: "center",
    marginVertical: "2%",
    paddingHorizontal: "2%",
  },
  contenedorVideos: {
    display: "flex",
    alignItems: "center",
    height: "auto",
    marginTop: "2%",
    width: "90%",
    alignSelf: "center",
  },
  descripcionVideo: {
    backgroundColor: colors.white,
    width: "90%",
    height: "auto",
    maxHeight: "60%",
    alignSelf: "center",
    marginVertical: "5%",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  contenedorInfoPrincipal: {
    backgroundColor: colors.white,
    paddingHorizontal: "3%",
    borderRadius: 10,
    paddingVertical: "2%",
  },
  fechaYVisto: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: "2%",
  },
  contenedorSwitch: {
    flexDirection: "row",
    alignItems: "center",
    width: "40%",
    justifyContent: "space-around",
  },
  contenedorDescripcion: {
    backgroundColor: colors.white,
    flexDirection: "row",
    justifyContent: "space-between",
    margin: "2%",
  },
  descComBoton: {
    height: "100%",
    width: "49.5%",
    padding: "2%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  descComText: {
    width: "100%",
    textAlign: "center",
  },
  contenidoDescripcion: {
    backgroundColor: colors.smokedWhite,
    padding: "5%",
    borderRadius: 5,
    margin: "2%",
  },
  contenedorExlamacion: {
    height: 15,
    width: 15,
    top: "50%",
    left: "50%",
    transform: [{ translateX: 62 }, { translateY: -20 }],
    borderRadius: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default PaginaVideo;
