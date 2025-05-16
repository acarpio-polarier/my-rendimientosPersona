import React, { useState } from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { colors } from "../../../../styles/base";

export const TarjetaVehiculo = ({
  vehiculo,
  onTarjetaPulsada,
  tarjetaClickeada,
}) => {
  /**
   * Props:
   * vehículo: Objeto que representa y mantiene los datos de un vehículo.
   * onTarjetaPulsada: Funciónn callback que devuelve el evento del pulsar la tarjeta.
   * tarjetaClickeada: Si se ha clickeado o no.
   */

  let tipoIcono = null;

  if (vehiculo.enUso) {
    tipoIcono = "truck-delivery-outline";
  } else {
    tipoIcono = "key-chain-variant";
  }

  return (
    <TouchableOpacity
      style={[styles.card, tarjetaClickeada && styles.tarjetaClickeada]}
      onPress={() => {
        onTarjetaPulsada(vehiculo);
      }}
    >
      <Icon name={tipoIcono} size={36} color="#444" />
      <Text>{vehiculo.matricula}</Text>
      <Text>{vehiculo.denominacion}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "45%",
    margin: 10,
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    elevation: 4,
  },

  tarjetaClickeada: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
});
