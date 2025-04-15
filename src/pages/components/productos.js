import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";

import foto1 from "../fotos/foto1.jpg";
import foto2 from "../fotos/foto2.jpg";
import foto3 from "../fotos/foto3.jpg";
import noimage from "../fotos/noimage.png";
import ConfirmPopup from "./confirmPopup";

const imageMap = {
  "foto1.jpg": foto1,
  "foto2.jpg": foto2,
  "foto3.jpg": foto3,
  "noimage.png": noimage,
};

const Productos = ({ data }) => {
  const [idProductoSeleccionado, setIdProductoSeleccionado] = useState(null);

  const abrirPopup = (id) => {
    setIdProductoSeleccionado(id);
  };

  const cerrarPopup = () => {
    setIdProductoSeleccionado(null);
  };

  const renderItem = ({ item }) => (
    <View style={styles.contenedor}>
      <View style={styles.foto}>
        <Image
          source={imageMap[item.foto] || noimage}
          style={styles.imagen}
          resizeMode="cover"
        />
      </View>
      <Text style={styles.title}>
        <Text style={{ fontWeight: "bold" }}>{item.title}</Text>
      </Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.tokenLabel}>Tokens: {item.price}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => abrirPopup(item.id)}
        >
          <Text style={styles.buttonText}>Canjear</Text>
        </TouchableOpacity>
      </View>

      {idProductoSeleccionado === item.id && (
        <ConfirmPopup visible={true} cerrarPopup={cerrarPopup} product={item} />
      )}
    </View>
  );

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      contentContainerStyle={{ paddingBottom: 20 }}
    />
  );
};

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: "white",
    borderRadius: 10,
    width: "90%",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: "hidden",
    marginVertical: 10,
  },
  title: {
    marginTop: 3,
    marginLeft: 5,
    marginBottom: 3,
  },
  description: {
    marginLeft: 5,
    marginBottom: 3,
    fontSize: 10,
  },
  tokenLabel: {
    marginBottom: 3,
    marginLeft: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 10,
  },
  button: {
    backgroundColor: "orange",
    width: 60,
    height: 30,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 13,
  },
  imagen: {
    borderWidth: 2,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderColor: "orange",
    width: "100%",
    height: 120,
  },
});

export default Productos;
