import { View, Text, ScrollView } from "react-native";
import styles from "../../styles/rendimiento";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import HeaderCanje from "./components/headerCanje";
import BarraFiltro from "./components/barraFiltro";
import Productos from "./components/productos";
import data from "./data.json";

const Index = () => {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={{ paddingTop: insets.top + 1, backgroundColor: "white" }}
    >
      <View style={styles.navigationBar}>
        <Text style={styles.headerText}>Canje de puntos</Text>
      </View>
      <View>
        <HeaderCanje />
        <BarraFiltro />
        <Productos data={data} />
      </View>
    </ScrollView>
  );
};

export default Index;
