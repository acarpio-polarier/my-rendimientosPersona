import DropDownPicker from "react-native-dropdown-picker";
import { LockerService } from "../../../services/LockerService";
import React, { useState, useEffect } from "react";
import { View } from "react-native";

//https://hossein-zare.github.io/react-native-dropdown-picker-website/docs/advanced/search#searchwithregionalaccents docks dropdown

/**
 * Selector de info personal, permite elegir una lavandería y un chofer a partir de dos dropdowns.
 */

export default function SelectorLavanderia({
  onLavanderiaSeleccionada,
  onChoferSeleccionado,
}) {
  // Hooks dropdown y lavanderia
  const [lavanderiaSeleccionada, setLavanderiaSeleccionada] = useState(14);
  const [openLav, setOpenLav] = useState(false);
  const [itemsLvanderia, setitemsLvanderia] = useState([]);

  // Hooks dropdown y chofer
  const [choferSeleccionado, setChoferSeleccionado] = useState(1468);
  const [openChofer, setOpenChofer] = useState(false);
  const [itemsChofer, setItemsChofer] = useState([]);

  useEffect(() => {
    LockerService.getLavanderias()
      .then((response) => {
        const listaFormateada = response.map((lav) => ({
          label: lav.denominacion,
          value: lav.idLavanderia,
        }));
        setitemsLvanderia(listaFormateada);
      })
      .catch((error) => {
        console.error("Error fetching lavanderias:", error);
      });
  }, []);

  useEffect(() => {
    LockerService.getChofersPorLavanderia(lavanderiaSeleccionada).then(
      (response) => {
        const listaFormateadaChofers = response.map((chofer) => ({
          label: chofer.nombre,
          value: chofer.idPersona,
        }));
        console.log(listaFormateadaChofers);
        setItemsChofer(listaFormateadaChofers);
      }
    );
  }, [lavanderiaSeleccionada]);

  return (
    <>
      <View style={{ padding: 10, zIndex: 2311 + 1 }}>
        <DropDownPicker
          open={openLav}
          searchable={true}
          searchPlaceholder="Buscar lavanderia"
          value={lavanderiaSeleccionada}
          items={itemsLvanderia}
          setOpen={setOpenLav}
          setValue={setLavanderiaSeleccionada}
          setItems={setitemsLvanderia}
          containerStyle={{ height: 50 }}
          style={{ backgroundColor: "#f0f0f0", borderRadius: 8 }}
          dropDownContainerStyle={{ backgroundColor: "#fff" }}
          onChangeValue={(value) => {
            onLavanderiaSeleccionada(value);
          }}
        />
      </View>
      <View style={{ padding: 10, zIndex: 2311 }}>
        <DropDownPicker
          open={openChofer}
          searchable={true}
          searchPlaceholder="Buscar persona"
          value={choferSeleccionado}
          items={itemsChofer}
          setOpen={setOpenChofer}
          setValue={setChoferSeleccionado}
          setItems={setItemsChofer}
          containerStyle={{ height: 50 }}
          style={{ backgroundColor: "#f0f0f0", borderRadius: 8 }}
          dropDownContainerStyle={{ backgroundColor: "#fff" }}
          onChangeValue={(value) => {
            console.log("quien soy", value);
            onChoferSeleccionado(value);
          }}
        />
      </View>
    </>
  );
}
