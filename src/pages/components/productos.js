import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";

import foto1 from "./foto1.jpg";
import foto2 from "./foto2.jpg";
import noimage from "./noimage.png";
import ConfirmPopup from "./confirmPopup";

const imageMap = {
  "foto1.jpg": foto1,
  "foto2.jpg": foto2,
  "noimage.png": noimage,
};

const Productos = ({ data }) => {
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleOpenModal = (id) => {
    setSelectedProductId(id);
  };

  const handleCloseModal = () => {
    setSelectedProductId(null);
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
          onPress={() => handleOpenModal(item.id)}
        >
          <Text style={styles.buttonText}>Canjear</Text>
        </TouchableOpacity>
      </View>

      {/* Solo se muestra si el producto coincide con el modal activo */}
      {selectedProductId === item.id && (
        <ConfirmPopup
          visible={true}
          onClose={handleCloseModal}
          product={item}
        />
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
    borderRadius: 3,
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
    padding: 5,
  },
  description: {
    padding: 5,
    fontSize: 10,
  },
  tokenLabel: {
    padding: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 5,
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
    color: "grey",
    fontSize: 11,
    fontWeight: "bold",
  },
  imagen: {
    borderWidth: 2,
    borderColor: "orange",
    width: "100%",
    height: 120,
  },
});

export default Productos;
