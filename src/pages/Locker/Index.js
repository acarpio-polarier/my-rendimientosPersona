import { View, Text, ScrollView, StyleSheet } from "react-native";
import styles from "../../../styles/rendimiento";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import SelectorLavanderia from "./components/SelectorLavanderia";
import SelectorVehiculo from "./components/SelectorVehiculo";
import { useState } from "react";
import { LockerService } from "../../services/LockerService";

/**
 *
 * Componente padre. Funciona como única fuente de verdad, orquesta los cambios de estado y el reparto de datos.
 */

const Index = () => {
  // Hooks
  const [lavanderiaId, setLavanderiaId] = useState(null);
  const [choferId, setChoferId] = useState(null);
  const [vehiculo, setVehiculo] = useState(null);
  const [refrescarVehiculos, setRefrescarVehiculos] = useState(false);
  const [eventoAbrirTaquilla, setEventoAbrirTaquilla] = useState(0);
  // Funciones

  const recargarVehiculos = () => setRefrescarVehiculos((antes) => !antes);

  const onLavanderiaSeleccionada = (lavanderia) => {
    console.log("Funcion desde el padre: Lavanderia seleccionada:", lavanderia);
    setLavanderiaId(lavanderia);
  };

  const onChoferSeleccionado = (chofer) => {
    console.log("Funcion desde el padre chofer seleccionado:", chofer);
    setChoferId(chofer);
  };

  const onVehiculoSeleccionado = (vehiculo) => {
    console.log("Funcion desde el padre vehiculo seleccionado:", vehiculo);

    setVehiculo(vehiculo);
  };

  const onAbrirTaquilla = async () => {
    if (!lavanderiaId || !choferId || !vehiculo.idVehiculo) {
      console.log("Por favor, selecciona todos los campos.");
      return;
    }
    console.log("Abrir taquilla con los siguientes datos:");
    console.log("Lavanderia ID:", lavanderiaId);
    console.log("Chofer ID:", choferId);
    console.log("Vehiculo ID:", vehiculo.idVehiculo);
    console.log(
      "Vehiculo ID Taquilla:",
      vehiculo.idTaquilla ? vehiculo.idTaquilla : 1
    );
    let respuestaAbrirTaquilla = await LockerService.abrirTaquilla({
      idPersona: choferId,
      idVehiculo: vehiculo.idVehiculo,
      idLavanderia: lavanderiaId,
      idTaquilla: vehiculo.idTaquilla ? vehiculo.idTaquilla : 1,
    });

    setVehiculo(null);
    recargarVehiculos();
    setEventoAbrirTaquilla(respuestaAbrirTaquilla);
    console.log(
      "Respuesta abrir taquilla desde el padre original:",
      respuestaAbrirTaquilla
    );
  };

  const onAccionEquivocada = async () => {
    const datos = eventoAbrirTaquilla.insercion;
    await LockerService.revertirAccion({
      idPersona: datos.idPersona,
      idVehiculo: datos.idVehiculo,
      idLavanderia: datos.idLavanderia,
      idTaquilla: datos.idTaquilla,
      idCompartimento: datos.idCompartimento,
      idTipoEvento: datos.idTipoEvento,
    });
    recargarVehiculos();
    console.log("Equivocado llamada");
  };

  const onReportarIncidencia = async () => {
    const datos = eventoAbrirTaquilla.insercion;
    await LockerService.reportarIncidencia({
      idPersona: datos.idPersona,
      idVehiculo: datos.idVehiculo,
      idLavanderia: datos.idLavanderia,
      idTaquilla: datos.idTaquilla,
      idCompartimento: datos.idCompartimento,
      idTipoEvento: 3,
      fecha: new Date(),
    });
    recargarVehiculos();
    console.log("Incidencia");
  };

  const insets = useSafeAreaInsets();

  return (
    <View style={{ paddingTop: insets.top + 1 }}>
      <View style={styles.navigationBar}>
        <Text style={styles.headerText}>Locker</Text>
      </View>

      <View style={styles.container}></View>

      <SelectorLavanderia
        onLavanderiaSeleccionada={onLavanderiaSeleccionada}
        onChoferSeleccionado={onChoferSeleccionado}
      />

      <SelectorVehiculo
        lavanderiaId={lavanderiaId}
        onVehiculoSeleccionado={onVehiculoSeleccionado}
        onAbrirTaquilla={onAbrirTaquilla}
        refrescarVehiculos={refrescarVehiculos}
        onResetSeleccion={() => setVehiculo(null)}
        onAccionEquivocada={onAccionEquivocada}
        onReportarIncidencia={onReportarIncidencia}
      />
    </View>
  );
};

export default Index;
