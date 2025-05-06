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

  return (
    <View>
      <View style={styles.navigationBar}>
        <Text style={styles.headerText}>MyApp</Text>
      </View>
      <ScrollView style={estilos.contenido}>
        <View>
          <TouchableOpacity onPress={openRendimiento} style={estilos.carta}>
            <Text>myRendimiento</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={openVideos} style={estilos.carta}>
            <Text>myVideos</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const estilos = StyleSheet.create({
  contenido: {
    display: "flex",
    padding: "2%",
    backgroundColor: colors.secondary,
    height: "100%",
    width: "100%",
    flexDirection: "row",
  },
  carta: {
    display: "flex",
    height: 150,
    width: 150,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
});
export default index;
