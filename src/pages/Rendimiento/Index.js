import { View, Text, ScrollView } from "react-native";
import styles from "../../../styles/rendimiento";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import GraficoSemanal from "./components/GraficoSemanal";
import GraficoAnual from "./components/GraficoAnual";

export const PERSONA_ID = 1392;

const Index = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ paddingTop: insets.top + 1 }}>
      <View style={styles.navigationBar}>
        <Text style={styles.headerText}>misTokens</Text>
      </View>
      <ScrollView style={{ height: "92%", paddingBottom: 100 }}>
        <View>
          <GraficoSemanal PERSONA_ID={PERSONA_ID} />
        </View>
        <View>
          <GraficoAnual PERSONA_ID={PERSONA_ID} />
        </View>
      </ScrollView>
    </View>
  );
};

export default Index;
