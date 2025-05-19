import { View, Text, ScrollView } from "react-native";
import styles from "../../../styles/rendimiento";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MainComponent from "./components/MainComponentCanje";

export const PERSONA_ID = 1392;

const Index = () => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        paddingTop: insets.top + 1,
        backgroundColor: "white",
        height: "100%",
      }}
    >
      <View style={[styles.navigationBar]}>
        <Text style={styles.headerText}>Canje de puntos</Text>
      </View>
      <View>
        <MainComponent />
      </View>
    </View>
  );
};

export default Index;
