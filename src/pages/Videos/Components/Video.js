import React from "react";
import { Text, View, StyleSheet, ImageBackground } from "react-native";
import { colors } from "../../../../styles/base";

const Video = ({ idVideo }) => {
  const id = idVideo;
  console.log("Video id", id);

  const miniatura = `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: miniatura }}
        style={styles.backgroundImage}
        imageStyle={{ borderRadius: 10 }}
        resizeMode="cover"
      >
        <View style={styles.espacioTranparente}></View>
        <View style={styles.contenedorInfo}>
          <Text style={styles.textoBlanco}>
            Cómo ENCENDER y REGULAR una LUZ con el MÓVIL, con la VOZ, a
            DISTANCIA (DIMMER INTELIGENTE)
          </Text>
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
  },
  contenedorInfo: {
    backgroundColor: colors.primary,
    height: "40%",
    width: "100%",
    opacity: 0.8,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: "center",
  },
  textoBlanco: {
    color: colors.white,
    width: "90%",
    textAlign: "center",
    alignSelf: "center",
    fontWeight: "bold",
  },
});

export default Video;
