import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Rendimiento from "./src/pages/Index";
import DetalleRendimiento from "./src/pages/DetalleRendimiento";
import DetalleRendimientoSelector from "./src/pages/components/DetalleRendimientoSelector";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Rendimiento"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Rendimiento" component={Rendimiento} />
          <Stack.Screen
            name="DetalleRendimientoSelector"
            component={DetalleRendimientoSelector}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}
