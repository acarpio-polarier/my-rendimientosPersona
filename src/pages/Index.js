import { View, Text, ScrollView } from "react-native";
import styles from "../../styles/rendimiento";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import HeaderCanje from "./components/headerCanje";
import ComponenteFiltro from "./components/componenteFiltro";
import data from "./data/data.json";
import dataTokens from "./data/dataTokens.json";

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
        <HeaderCanje dataTokens={dataTokens} />
        <ComponenteFiltro dataTokens={dataTokens} data={data} />
      </View>
    </ScrollView>
  );
};

export default Index;
