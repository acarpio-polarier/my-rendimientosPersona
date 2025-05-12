import React, { useState, useEffect, useRef } from "react";
import {
  Animated,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import { colors } from "../../../../styles/base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { productosCards } from "../../../../styles/paginaCanjePuntos";
import foto1 from "../fotos/foto1.jpg";
import foto2 from "../fotos/foto2.jpg";
import foto3 from "../fotos/foto3.jpg";
import noimage from "../fotos/noimage.png";
import token from "../fotos/token.png";
import ConfirmPopup from "./confirmPopup";

//Añadir logica de cambio de base 64 a imagen
const imageMap = {
  "foto1.jpg": foto1,
  "foto2.jpg": foto2,
  "foto3.jpg": foto3,
  "noimage.png": noimage,
};
const screen_height = Dimensions.get("window").height;

const EtiquetaAnimada = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();

    return () => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }).start();
    };
  }, []);

  return (
    <Animated.View
      style={[productosCards.etiquetaBackground, { opacity: fadeAnim }]}
    >
      <View style={productosCards.etiquetaSaldoInsuficiente}>
        <MaterialCommunityIcons
          name="alert"
          size={20}
          color={"white"}
          style={productosCards.etiquetaIcono}
        />
        <Text style={productosCards.etiquetaTexto}>Saldo Insuficiente</Text>
      </View>
    </Animated.View>
  );
};

const ProductosCards = ({ data, dataTokens, ID_PERSONA, recargarTokens }) => {
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
      <View style={productosCards.contenedor}>
        {esNuevo && (
          <View style={productosCards.esNuevoContenedor}>
            <Text style={productosCards.esNuevoLabel}>Nuevo</Text>
          </View>
        )}
        {!puedeCanjear && <EtiquetaAnimada />}
        <View style={productosCards.foto}>
          <Image
            source={imageMap[item.foto] || noimage}
            style={productosCards.imagen}
            resizeMode="cover"
          />
        </View>
        <Text style={productosCards.title}>{item.title}</Text>
        <Text style={productosCards.description}>{item.description}</Text>
        <View style={productosCards.contenedorTextoIcono}>
          <Text style={productosCards.tokenLabel}>{item.price}</Text>
          <Image style={productosCards.tokenIcono} source={token} />
        </View>
        <View style={productosCards.buttonContainer}>
          <TouchableOpacity
            style={[
              productosCards.button,
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
            <Text style={productosCards.buttonText}>Canjear</Text>
          </TouchableOpacity>
        </View>
        {idProductoSeleccionado === item.id && (
          <ConfirmPopup
            visible={true}
            cerrarPopup={cerrarPopup}
            product={item}
            ID_PERSONA={ID_PERSONA}
            recargarTokens={recargarTokens}
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
      style={{ height: screen_height * 0.8 }}
      contentContainerStyle={{ paddingBottom: 10 }}
    />
  ) : (
    <View style={productosCards.emptyContainer}>
      <MaterialCommunityIcons name="alert" style={productosCards.emptyIcon} />
      <Text style={productosCards.emptyText}>
        No hay productos disponibles.
      </Text>
    </View>
  );
};

export default ProductosCards;
