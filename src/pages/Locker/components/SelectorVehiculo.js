import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Modal,
  Text,
  StyleSheet,
  TextInput,
} from "react-native";
import { LockerService } from "../../../services/LockerService";
import { TarjetaVehiculo } from "./TarjetaVehiculo";
import { ButtonGroup } from "@rneui/themed";
import { Button } from "react-native-paper";
import LottieView from "lottie-react-native";

// https://reactnativeelements.com/docs/components/buttongroup
import {
  BUTTON_HEIGHT,
  fontFamily,
  fontSize,
} from "../../../../styles/mainStyles";
import { colors } from "../../../../styles/base";

/**
 * Componente que renderiza y dispara el grueso de las funcionalidades de taquilla.
 * Para mi gusto tiene demasiada responsabilidad en un solo componente pero no me ha dado tiempo a sepoararlo mejor.
 *
 * Props:
 * lavanderiaID
 * onVehiculoSeleccionado: Callback del padre que setea el estado local.
 * onAbrirTaquilla: Acciones del padre que se ejecutarán al pulsar el boton de abrir la taquilla. (Registrar el evento, resetear el estado...)
 * refrescarVehiculos: Booleano que cambia para refrescar el useEffect y que se re-renderize la flatlist.
 * onAccionEquivocada, onReportarIncidencia: Callbacks que disparan las acciones de su propio nombre.
 */

export default function SelectorVehiculo({
  lavanderiaId,
  onVehiculoSeleccionado,
  onAbrirTaquilla,
  refrescarVehiculos,
  onResetSeleccion,
  onAccionEquivocada,
  onReportarIncidencia,
}) {
  // Hooks
  const [idVehiculoSeleccionado, setIdVehiculoSeleccionado] = useState(null);
  const [vehiculos, setVehiculos] = useState([]);
  const [vehiculosFiltrados, setVehiculosFiltrados] = useState([]);
  const [busquedaMatricula, setBusquedaMatricula] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [filtro, setFiltro] = useState(null);

  // Hooks modales
  const [modalVisible, setModalVisible] = useState(false);
  const [modalLottie, setmodalLottie] = useState(false);

  // Constantes
  const filtros = ["Todos", "Recogida", "Entrega"];

  // Funciones

  const aplicarFiltro = (vehiculos, filtro) => {
    if (filtro === "Recogida") return vehiculos.filter((v) => v.enUso);
    if (filtro === "Entrega") return vehiculos.filter((v) => !v.enUso);
    return vehiculos;
  };

  const onTarjetaPulsada = (vehiculo) => {
    // Solo visuañ
    setIdVehiculoSeleccionado(vehiculo.idVehiculo);

    // Para logica de negocio
    onVehiculoSeleccionado(vehiculo);
    console.log("Vehiculo seleccionado:", vehiculo.idVehiculo);
  };

  const onAnimacionFinalizada = () => {
    setTimeout(() => {
      setmodalLottie(false);
      setModalVisible(true);
    }, 600);
  };

  const onBotonRevetir = () => {
    onAccionEquivocada();
    setModalVisible(false);
  };

  const onBotonReportar = () => {
    onReportarIncidencia();
    setModalVisible(false);
  };

  // Efectos secundarios generales

  useEffect(() => {
    const fetchVehiculos = async () => {
      try {
        const [recoger, entregar] = await Promise.all([
          LockerService.getVehiculosDisponiblesParaRecoger(lavanderiaId),
          LockerService.getVehiculosDisponiblesParaEntregar(lavanderiaId),
        ]);

        // Añadir propiedad enUso dependiendo de si está o no ent aquilla.
        const recogerMarcados = recoger.map((v) => ({ ...v, enUso: true }));
        const entregarMarcados = entregar.map((v) => ({ ...v, enUso: false }));

        // Spread para verlos todos.
        const todos = [...recogerMarcados, ...entregarMarcados];

        setVehiculos(todos);
        setVehiculosFiltrados(todos);
      } catch (error) {
        console.error("Error cargando vehículos:", error);
      }
    };

    fetchVehiculos();
  }, [lavanderiaId, refrescarVehiculos]);

  useEffect(() => {
    const filtrados = aplicarFiltro(vehiculos, filtro).filter((v) =>
      v.matricula.toLowerCase().includes(busquedaMatricula.toLowerCase())
    );
    setVehiculosFiltrados(filtrados);
  }, [filtro, vehiculos, busquedaMatricula]);

  return (
    <View style={styles.container}>
      <ButtonGroup
        buttons={filtros}
        selectedIndex={selectedIndex}
        selectedButtonStyle={{ backgroundColor: colors.primary }}
        onPress={(index) => {
          setSelectedIndex(index);
          setFiltro(filtros[index]);
          console.log("Filtro seleccionado:", filtro);
        }}
      ></ButtonGroup>

      <TextInput
        placeholder="Buscar por matrícula"
        value={busquedaMatricula}
        onChangeText={setBusquedaMatricula}
        style={styles.buscador}
      />

      <View style={{ height: LockerService.RPH(50), paddingHorizontal: 10 }}>
        <FlatList
          data={vehiculosFiltrados}
          renderItem={({ item }) => (
            <TarjetaVehiculo
              vehiculo={item}
              onTarjetaPulsada={onTarjetaPulsada}
              tarjetaClickeada={item.idVehiculo === idVehiculoSeleccionado}
            />
          )}
          keyExtractor={(item) => item.idVehiculo.toString()}
          numColumns={2}
        />
      </View>

      <View style={styles.botonContenedor}>
        <Button
          style={styles.boton}
          className="abrirTaquillaBtn"
          icon="locker"
          mode="tonal"
          labelStyle={{ fontSize: 25 }}
          buttonColor={colors.primary}
          rippleColor={colors.primary_light}
          textColor="#fff"
          onPress={async () => {
            await onAbrirTaquilla();
            setIdVehiculoSeleccionado(null);
            onResetSeleccion();
            setmodalLottie(true);
          }}
        >
          <Text style={{ fontSize: 25, fontWeight: "semibold" }}>
            Abrir taquilla
          </Text>
        </Button>
      </View>

      {/* Modal de ok/revertir */}
      <Modal transparent visible={modalLottie} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <Text
              style={{ fontSize: 20, alignSelf: "center", paddingBottom: 10 }}
            >
              ¡Buen viaje!
            </Text>
            <LottieView
              source={require("../../../../assets/animations/check_input.json")}
              onAnimationFinish={onAnimacionFinalizada}
              autoPlay
              loop={false}
              style={{ width: 100, height: 100 }}
            ></LottieView>
          </View>
        </View>
      </Modal>

      <Modal transparent visible={modalVisible}>
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <LottieView
              source={require("../../../../assets/animations/cuenta_atras.json")}
              onAnimationFinish={() => {
                setModalVisible(false);
              }}
              autoPlay
              loop={false}
              webStyle={{ width: 35, height: 35, alignSelf: "center" }}
            ></LottieView>
            <Text style={styles.texto}>¿Te has equivocado?</Text>
            <Button onPress={() => onBotonRevetir()}>Revertir apertura</Button>
            <Text style={styles.texto}>
              {" "}
              ¿El contenido no está donde debería estar?
            </Text>
            <Button onPress={() => onBotonReportar()}>
              Reportar incidencia
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  botonContenedor: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  boton: {
    justifyContent: "center",
    height: BUTTON_HEIGHT,
    width: "70%",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "#00000066",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },

  buscador: {
    margin: 10,
    padding: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  texto: {
    alignSelf: "center",
  },
});
