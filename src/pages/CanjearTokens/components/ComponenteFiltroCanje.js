import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { componenteFiltro } from "../../../../styles/paginaCanjePuntos";
import ModalFiltro from "./ModalFiltroCanje";
import ProductosCards from "./ProductosCardsCanje";
import token from "../fotos/token.png";

const ComponenteFiltro = ({ data, dataTokens, ID_PERSONA, recargarTokens }) => {
  const [visible, setVisible] = useState(false);
  const [tokens, setTokens] = useState(dataTokens);
  console.log("dataTokens", dataTokens);


  // categoria: 1 = experiencias, 2 = servicios, 3 = otros
  // orden: 1 = novedades, 2 = precio Asc, 3 = precio Desc
  const [filtros, setFiltros] = useState({
    categoria: null,
    orden: 1,
    precioRango: [0, 1000],
    canjeable: false,
    destacado: null,
  });

  const aplicarFiltros = (valores) => {
    console.log("Filtros recibidos a ComponenteFiltro:", valores);
    setFiltros(valores);
  };

  const filtrarDatos = () => {
    let filtrado = data;

    const categoria = parseInt(filtros.categoria);
    const [minPrecio, maxPrecio] = filtros.precioRango;
    const canjeable = filtros.canjeable;

    if (filtros.orden === 1) {
      filtrado = filtrado.filter((item) => item.destacado === true);
    } else if (filtros.orden === 2) {
      filtrado = [...filtrado].sort((a, b) => a.price - b.price);
    } else if (filtros.orden == 3) {
      filtrado = [...filtrado].sort((a, b) => b.price - a.price);
    }

    if (!isNaN(categoria) && categoria !== 0) {
      filtrado = filtrado.filter((item) => item.categoria === categoria);
    }

    if (!isNaN(minPrecio) && !isNaN(maxPrecio)) {
      filtrado = filtrado.filter(
        (item) => item.price >= minPrecio && item.price <= maxPrecio
      );
    }

    if (canjeable) {
      const tokensDisponibles = dataTokens;
      filtrado = filtrado.filter((item) => item.price <= tokensDisponibles);
    }

    return filtrado;
  };

  const productosFiltrados = filtrarDatos();

  const abrirPopup = () => {
    setVisible(true);
  };

  const cerrarPopup = () => {
    setVisible(false);
  };

  const reiniciarFiltros = () => {
    setFiltros({
      categoria: 0,
      orden: null,
      precioRango: [0, 1000],
      canjeable: false,
      destacado: null,
    });
  };

  useEffect(() => {
    setTokens(dataTokens);
  }, [dataTokens]);

  return (
    <View style={componenteFiltro.contenedor}>
      <View style={componenteFiltro.cabecera}>
        <View style={componenteFiltro.contenedorToken}>
          <Image style={componenteFiltro.tokenIcono} source={token} />
          <Text style={componenteFiltro.tokenLabel}>Tokens: {tokens}</Text>
        </View>
        <View style={componenteFiltro.contenedorBotones}>
          <TouchableOpacity style={componenteFiltro.boton} onPress={abrirPopup}>
            <Text style={componenteFiltro.labelBoton}>Filtros</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={componenteFiltro.botonFilter}
            onPress={reiniciarFiltros}
          >
            <MaterialCommunityIcons
              name="filter-off"
              size={30}
              color={"white"}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ModalFiltro
        visible={visible}
        cerrarPopup={cerrarPopup}
        onAplicarFiltros={aplicarFiltros}
        filtros={filtros}
      />

      <ProductosCards
        dataTokens={dataTokens}
        data={productosFiltrados}
        ID_PERSONA={ID_PERSONA}
        recargarTokens={recargarTokens}
      />
    </View>
  );
};

export default ComponenteFiltro;
