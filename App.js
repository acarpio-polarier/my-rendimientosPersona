import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

// Importa tus páginas
import Indice from "./src/pages/Indice";
import DetalleHistoricoRendimientos from "./src/pages/views/DetalleHistoricoRendimientos";

// Crear el Stack Navigator
const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="Indice"
        >
          <Stack.Screen name="Indice" component={Indice} />
          <Stack.Screen
            name="DetalleHistoricoRendimientos"
            component={DetalleHistoricoRendimientos}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}
