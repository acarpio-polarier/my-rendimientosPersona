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
import token from "../fotos/token.png";

//Añadir logica de cambio de base 64 a imagen
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
    const esNuevo = item.destacado == 1;

    return (
      <View style={styles.contenedor}>
        {esNuevo && (
          <View style={styles.esNuevoContenedor}>
            <Text style={styles.esNuevoLabel}>Nuevo</Text>
          </View>
        )}
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
        <View style={styles.contenedorTextoIcono}>
          <Text style={styles.tokenLabel}>{item.price}</Text>
          <Image style={styles.tokenIcono} source={token} />
        </View>
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

  return data && data.length > 0 ? (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      contentContainerStyle={{ paddingBottom: 20 }}
    />
  ) : (
    <View style={styles.emptyContainer}>
      <MaterialCommunityIcons name="alert" style={styles.emptyIcon} />
      <Text style={styles.emptyText}>No hay productos disponibles.</Text>
    </View>
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
    padding: 10,
    color: colors.lightBlack,
    fontWeight: "bold",
  },
  description: {
    paddingLeft: 10,
    fontSize: 14,
    color: colors.darkGray,
  },
  tokenLabel: {
    paddingLeft: 10,
    fontSize: 20,
    color: colors.lightBlack,
    marginRight: 5,
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
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "30%",
  },
  emptyText: {
    fontSize: 18,
    color: colors.darkGray,
    textAlign: "center",
  },
  emptyIcon: {
    fontSize: 40,
    color: colors.darkGray,
    textAlign: "center",
  },
  contenedorTextoIcono: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 5,
  },
  tokenIcono: {
    width: 20,
    height: 20,
  },
  esNuevoContenedor: {
    zIndex: 1,
    position: "absolute",
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    width: "20%",
    height: "10%",
    borderBottomRightRadius: 10,
    fontFamily: "Arial",
  },
  esNuevoLabel: {
    color: "white",
    fontSize: 15,
  },
});

export default ProductosCards;
