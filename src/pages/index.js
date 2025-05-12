import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import styles from "../../styles/rendimiento";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Rendimiento from "./Rendimiento/Index";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../styles/base";

const index = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const openRendimiento = () => {
    navigation.navigate("Rendimiento");
  };

  const openVideos = () => {
    navigation.navigate("Videos");
  };
  const openCanjes = () => {
    navigation.navigate("Canjes");
  };

  return (
    <View style={{ paddingTop: insets.top + 1 }}>
      <View style={styles.navigationBar}>
        <Text style={styles.headerText}>MyApp</Text>
      </View>
      <View style={estilos.contenido}>
        <TouchableOpacity onPress={openRendimiento} style={estilos.carta}>
          <Text>myRendimiento</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={openVideos} style={estilos.carta}>
          <Text>myVideos</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={openCanjes} style={estilos.carta}>
          <Text>myPuntos</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const estilos = StyleSheet.create({
  contenido: {
    padding: "2%",
    backgroundColor: colors.smokedWhite,
    height: "100%",
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: "5%",
  },
  carta: {
    height: 150,
    width: "45%",
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    borderRadius: 10,
    borderWidth: 10,
    borderColor: colors.primary,
  },
});

export default index;
