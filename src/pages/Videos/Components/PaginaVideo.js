import { View, Text, ScrollView, Dimensions, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import YoutubePlayer from "react-native-youtube-iframe";
import { colors } from "../../../../styles/base";
import { Switch } from "react-native-paper";

export const PERSONA_ID = 1392;

const PaginaVideo = ({ route }) => {
  const insets = useSafeAreaInsets();
  const { idVideo } = route.params;
  const [visto, setVisto] = useState(false);

  // Calculo para el tamaño dle video
  const widthV = Dimensions.get("window").width * 0.9;
  const heightV = (widthV * 9) / 16;

  const ToggleVisto = () => {
    if (visto) setVisto(false);
    else setVisto(true);
  };

  //Borrar
  useEffect(() => {
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
            <Text style={styles.titulo}>
              Cómo ENCENDER y REGULAR una LUZ con el MÓVIL, con la VOZ, a
              DISTANCIA (DIMMER INTELIGENTE)
            </Text>
          </View>
          <View style={styles.fechaYVisto}>
            <Text>07/05/2025</Text>
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
          <Text style={{ marginVertical: "1%" }}>Descripción:</Text>
          <View style={styles.contenidoDescripcion}>
            <Text>
              Aquí explico como se cambia el grifo del grifo del fregadero de la
              cocina. El del baño se hace exactamente de la misma manera. Es muy
              sencillo y cualquiera lo puede hacer. No te quedes con las ganas
              de hacer esta reparación o cambiarlo porque no te gusta. Solo te
              hace falta un destornillador y una llave para tuercas apropiada.
              Espero que el vídeo te sea de utilidad. No te olvides comentar,
              valorar el vídeo y suscribirte al canal si no te quieres perder
              mis nuevos vídeos. Pulsa la campanita para que Youtube te avise
              cuando subo nuevos vídeos
            </Text>
          </View>
        </View>
        <View style={styles.contenedorDescripcion}>
          <Text style={{ marginVertical: "1%" }}>Comentario:</Text>
          <View style={styles.contenidoDescripcion}>
            <Text>
              Aquí explico como se cambia el grifo del grifo del fregadero de la
              cocina. El del baño se hace exactamente de la misma manera. Es muy
              sencillo y cualquiera lo puede hacer. No te quedes con las ganas
              de hacer esta reparación o cambiarlo porque no te gusta. Solo te
              hace falta un destornillador y una llave para tuercas apropiada.
              Espero que el vídeo te sea de utilidad. No te olvides comentar,
              valorar el vídeo y suscribirte al canal si no te quieres perder
              mis nuevos vídeos. Pulsa la campanita para que Youtube te avise
              cuando subo nuevos vídeos
            </Text>
          </View>
        </View>
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
    backgroundColor: colors.lightGray,
    width: "90%",
    height: "60%",
    alignSelf: "center",
    marginVertical: "5%",
    borderRadius: 10,
  },
  contenedorInfoPrincipal: {
    backgroundColor: colors.lightGray,
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
    backgroundColor: colors.lightGray,
    padding: "2%",
  },
  contenidoDescripcion: {
    backgroundColor: colors.smokedWhite,
    padding: "2%",
    borderRadius: 2,
  },
});

export default PaginaVideo;
