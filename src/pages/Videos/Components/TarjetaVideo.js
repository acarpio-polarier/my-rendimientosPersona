import React, { useEffect } from "react";
import { Text, View, StyleSheet, ImageBackground } from "react-native";
import { colors } from "../../../../styles/base";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const TarjetaVideo = ({ video }) => {
  const id = video.youtubeId;
  const vistoCheck = video.idEstado == 5 ? true : false;
  const titulo = video.titulo;
  console.log("Video id", id);

  const miniatura = `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;

  //Borrar
  useEffect(() => {
    console.log("video", video);
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: miniatura }}
        style={styles.backgroundImage}
        imageStyle={{ borderRadius: 10 }}
        resizeMode="cover"
      >
        <View style={styles.espacioTranparente}>
          {vistoCheck && (
            <View style={styles.encabezado}>
              <View style={styles.triangulo}>
                <MaterialCommunityIcons
                  name="eye-check-outline"
                  size={30}
                  color={colors.white}
                  style={styles.icono}
                />
              </View>
            </View>
          )}
        </View>
        <View style={styles.contenedorInfo}>
          <Text style={styles.textoBlanco}>{video.titulo}</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    height: 180,
    alignSelf: "center",
    width: "90%",
    borderRadius: 10,
  },
  backgroundImage: {
    flex: 1,
    borderRadius: 10,
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  espacioTranparente: {
    display: "flex",
    height: "60%",
    width: "100%",
    borderRadius: 10,
  },
  encabezado: {
    flexDirection: "row",
    backgroundColor: "trnasparent",
    justifyContent: "flex-end",
    overflow: "hidden",
  },
  triangulo: {
    width: 0,
    height: 0,
    borderTopWidth: 65,
    borderLeftWidth: 65,
    borderTopColor: colors.blue,
    opacity: 0.99,
    borderLeftColor: "transparent",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  icono: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -34 }, { translateY: -58 }],
  },
  contenedorInfo: {
    backgroundColor: colors.primary,
    height: "40%",
    width: "100%",
    opacity: 0.99,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: "center",
  },
  textoBlanco: {
    color: colors.white,
    width: "90%",
    alignSelf: "center",
    fontWeight: "bold",
  },
});

export default TarjetaVideo;
