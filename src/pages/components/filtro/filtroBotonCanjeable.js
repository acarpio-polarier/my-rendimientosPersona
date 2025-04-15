import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Switch } from "react-native";

const FiltroBotonCanjeable = () => {
  const [switchPulsado, setSwitchPulsado] = useState(false);
  const onSwitchPulsado = () => setSwitchPulsado(!switchPulsado);

  return (
    <View style={styles.contenedor}>
      <View style={styles.contenedorItems}>
        <Text style={styles.label}>Canjeable: </Text>
        <Switch
          style={styles.switch}
          value={switchPulsado}
          onValueChange={onSwitchPulsado}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    width: "100%",
    alignSelf: "center",
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgb(210,210,210)",
  },
  label: {
    marginLeft: 10,
    marginBottom: 10,
  },
  contenedorItems: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  switch: {
    height: 20,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
});

export default FiltroBotonCanjeable;
