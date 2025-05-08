import {
  View,
  Text,
  ScrollView,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import YoutubePlayer from "react-native-youtube-iframe";
import { colors } from "../../../../styles/base";
import { Switch, SegmentedButtons } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export const PERSONA_ID = 1392;

const PaginaVideo = ({ route }) => {
  const insets = useSafeAreaInsets();
  const video = route.params.video;
  const idVideo = video.youtubeId;
  const descripcionVideo = video.descripcion;
  const [visto, setVisto] = useState(false);
  const [descCom, setDescCom] = useState("desc");
  const [nuevoComentario, setNuevoComentario] = useState(true);

  // Calculo para el tamaño dle video
  const widthV = Dimensions.get("window").width * 0.9;
  const heightV = (widthV * 9) / 16;
  const colorNaranja = "'rgba(237, 182, 55, 0.9)'";

  useEffect(() => {
    if (video.idEstado == 5) setVisto(true);
  }, []);

  const ToggleDescCom = (value) => {
    setDescCom(value);
    if (value === "com") setNuevoComentario(false);
  };

  const ToggleVisto = () => {
    if (visto) setVisto(false);
    else setVisto(true);
  };

  //Borrar
  useEffect(() => {
    console.log("videoPagina", video);
    console.log("visibilidad", visto);
  }, [visto]);

  return (
    <View>
      <View style={styles.navigationBar}>
        <Text style={styles.headerText}>MyVideos</Text>
      </View>
      <View style={styles.contenedorVideos}>
        <YoutubePlayer
          height={heightV}
          width={widthV}
          videoId={idVideo}
          play={false}
        />
      </View>
      <ScrollView style={styles.descripcionVideo}>
        <View style={styles.contenedorInfoPrincipal}>
          <View>
            <Text style={styles.titulo}>{video.titulo}</Text>
          </View>
          <View style={styles.fechaYVisto}>
            <Text>fechaSubida</Text>
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
                  backgroundColor: nuevoComentario ? colors.red : "transparent",
                },
              ]}
            >
              {nuevoComentario && (
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
            <Text>Esto es un comentario</Text>
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
    // textAlign: "justify",
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
