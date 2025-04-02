import { StatusBar } from "expo-status-bar";
import Index from "./src/pages/Index";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider>
      <Index />
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}
