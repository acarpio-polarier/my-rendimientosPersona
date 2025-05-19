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
  const [datosFiltrados, setDatosFiltrados] = useState();
  console.log("dataTokens", dataTokens);

  // categoria: 0 = no filtro, 1 = experiencias, 2 = servicios, 3 = otros
  // orden: 1 = novedades, 2 = precio Asc, 3 = precio Desc
  const [filtros, setFiltros] = useState({
    categoria: [1, 2, 3, 4],
    orden: 1,
    precioRango: [0, 1000],
    canjeable: false,
  });

  useEffect(() => {
    filtrarDatos();
  }, [filtros]);

  const aplicarFiltros = (valores) => {
    console.log("Filtros recibidos a ComponenteFiltro:", valores);
    setFiltros(valores);
  };

  const filtrarDatos = () => {
    const datosSinFiltrar = data;
    const categorias = filtros.categoria;
    const oreden = filtros.orden;
    const precioRango = filtros.precioRango;
    const canjeable = filtros.canjeable;
    console.log("datosSinFiltrar", datosSinFiltrar);

    // filtrar por categoria
    const datosConCategoria = datosSinFiltrar.filter((producto) =>
      categorias.includes(producto.categoria)
    );
    console.log(datosConCategoria);
    var datosConFiltros = datosConCategoria;
    console.log("datosConFiltros", datosConFiltros);

    // filtrar por canjeable
    if (canjeable === true) {
      var datosConCanjeable = datosConFiltros.filter(
        (producto) => producto.price <= dataTokens
      );
    } else {
      var datosConCanjeable = datosConFiltros;
    }
    var datosConFiltros = datosConCanjeable;

    // filtrar por precio
    const datosConPrecio = datosConFiltros.filter(
      (producto) =>
        producto.price >= precioRango[0] && producto.price <= precioRango[1]
    );
    var datosConFiltros = datosConPrecio;
    setDatosFiltrados(datosConFiltros);
  };

  const abrirPopup = () => {
    setVisible(true);
  };

  const cerrarPopup = () => {
    setVisible(false);
  };

  const reiniciarFiltros = () => {
    setFiltros({
      categoria: [1, 2, 3, 4],
      orden: 1,
      precioRango: [0, 1000],
      canjeable: false,
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
        data={datosFiltrados}
        ID_PERSONA={ID_PERSONA}
        recargarTokens={recargarTokens}
      />
    </View>
  );
};

export default ComponenteFiltro;
