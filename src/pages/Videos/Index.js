import { View, Text, ScrollView } from "react-native";
import styles from "../../../styles/rendimiento";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const PERSONA_ID = 1392;

const Index = () => {
  const insets = useSafeAreaInsets();

  return (
    <View>
      <View style={styles.navigationBar}>
        <Text style={styles.headerText}>MyVideos</Text>
      </View>
      <ScrollView style={{ height: "92%", paddingBottom: 100 }}></ScrollView>
    </View>
  );
};

export default Index;
