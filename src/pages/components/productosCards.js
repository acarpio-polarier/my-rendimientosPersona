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
import { colors } from "../../../styles/base";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const imageMap = {
  "foto1.jpg": foto1,
  "foto2.jpg": foto2,
  "foto3.jpg": foto3,
  "noimage.png": noimage,
};

const ProductosCards = ({ data, dataTokens, ID_PERSONA }) => {
  const [idProductoSeleccionado, setIdProductoSeleccionado] = useState(null);

  const abrirPopup = (id) => {
    setIdProductoSeleccionado(id);
  };

  const cerrarPopup = () => {
    setIdProductoSeleccionado(null);
  };

  const renderItem = ({ item }) => {
    const puedeCanjear = dataTokens >= item.price;

    return (
      <View style={styles.contenedor}>
        {!puedeCanjear && (
          <View style={styles.etiquetaBackground}>
            <View style={styles.etiquetaSaldoInsuficiente}>
              <MaterialCommunityIcons
                name="alert"
                size={20}
                color={"white"}
                style={styles.etiquetaIcono}
              />
              <Text style={styles.etiquetaTexto}>Saldo Insuficiente</Text>
            </View>
          </View>
        )}

        <View style={styles.foto}>
          <Image
            source={imageMap[item.foto] || noimage}
            style={styles.imagen}
            resizeMode="cover"
          />
        </View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.tokenLabel}>Tokens: {item.price}</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor: puedeCanjear
                  ? colors.primary
                  : colors.darkGray,
              },
            ]}
            onPress={() => {
              if (puedeCanjear) {
                console.log(`Boton pulsado: ${item.id}`);
                abrirPopup(item.id);
              }
            }}
            disabled={!puedeCanjear}
          >
            <Text style={styles.buttonText}>Canjear</Text>
          </TouchableOpacity>
        </View>

        {idProductoSeleccionado === item.id && (
          <ConfirmPopup
            visible={true}
            cerrarPopup={cerrarPopup}
            product={item}
            ID_PERSONA={ID_PERSONA}
          />
        )}
      </View>
    );
  };

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
    shadowColor: "black",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: "hidden",
    marginVertical: 10,
  },
  title: {
    fontSize: 23,
    marginTop: 3,
    marginLeft: 5,
    marginBottom: 3,
    color: colors.lightBlack,
    fontWeight: "bold",
  },
  description: {
    marginLeft: 5,
    marginBottom: 3,
    fontSize: 14,
    color: colors.darkGray,
  },
  tokenLabel: {
    marginBottom: 3,
    marginLeft: 5,
    marginTop: 10,
    fontSize: 20,
    color: colors.lightBlack,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 10,
  },
  button: {
    backgroundColor: colors.primary,
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
    borderColor: colors.primary,
    width: "100%",
    height: 120,
  },
  etiquetaBackground: {
    backgroundColor: " rgba(0, 0, 0, 0.5)",
    borderRadius: 10,
    position: "absolute",
    zIndex: 1,
    width: "100%",
    height: "100%",
    shadowColor: "black",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  etiquetaSaldoInsuficiente: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
    padding: 30,
    left: "25%",
    top: "30%",
    shadowColor: "black",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  etiquetaTexto: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  etiquetaIcono: {
    fontSize: 30,
  },
});

export default ProductosCards;
