import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import index from "./src/pages/index";
import Rendimiento from "./src/pages/Rendimiento/Index";
import Videos from "./src/pages/Videos/Index";
import PaginaVideo from "./src/pages/Videos/Components/PaginaVideo";
import PaginaVideo2 from "./src/pages/Videos/Components/PaginaVideo2";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="index"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="index" component={index} />
          <Stack.Screen name="Rendimiento" component={Rendimiento} />
          <Stack.Screen name="Videos" component={Videos} />
          <Stack.Screen name="PaginaVideo" component={PaginaVideo} />
          <Stack.Screen name="PaginaVideo2" component={PaginaVideo2} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}
