import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import index from "./src/pages/index";
import Rendimiento from "./src/pages/Rendimiento/Index";
import Videos from "./src/pages/Videos/Index";
import PaginaVideo from "./src/pages/Videos/Components/PaginaVideo";
import Canjes from "./src/pages/CanjearTokens/Index";
const Stack = createNativeStackNavigator();
import { LogBox } from "react-native";

// Ignora un  warning especifico
LogBox.ignoreLogs(["Support for defaultProps will be removed"]);

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
          <Stack.Screen name="Canjes" component={Canjes} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}
