import { View, Text, ScrollView, Dimensions, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import YoutubePlayer from "react-native-youtube-iframe";
import { colors } from "../../../../styles/base";

export const PERSONA_ID = 1392;

const PaginaVideo = ({ route }) => {
  const insets = useSafeAreaInsets();
  const { idVideo } = route.params;

  return (
    <View>
      <View style={styles.navigationBar}>
        <Text style={styles.headerText}>MyVideos</Text>
      </View>
      <View>
        <Text style={styles.titulo}>
          Cómo ENCENDER y REGULAR una LUZ con el MÓVIL, con la VOZ, a DISTANCIA
          (DIMMER INTELIGENTE)
        </Text>
      </View>
      <View style={styles.contenedorVideos}>
        <YoutubePlayer
          height={220}
          width={Dimensions.get("window").width * 0.9}
          videoId={idVideo}
          play={false}
        />
      </View>
      <ScrollView style={styles.descripcionVideo}>
        <Text>Desripcion de los videos</Text>
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
  headerText: {
    color: colors.white,
    fontSize: 18,
  },
  titulo: {
    width: "90%",
    alignSelf: "center",
    textAlign: "center",
    marginTop: "2%",
  },
  contenedorVideos: {
    display: "flex",
    alignItems: "center",
    height: 220,
    marginTop: "2%",
  },
  descripcionVideo: {
    backgroundColor: colors.lightGray,
    width: "90%",
    height: "55%",
    alignSelf: "center",
  },
});

export default PaginaVideo;
