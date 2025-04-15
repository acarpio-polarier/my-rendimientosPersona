import { View, Text, ScrollView } from "react-native";
import styles from "../../styles/rendimiento";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MainComponent from "./components/mainComponent";

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
        <MainComponent />
      </View>
    </ScrollView>
  );
};

export default Index;
