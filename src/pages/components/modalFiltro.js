import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Switch } from "react-native-paper";
import { modalFiltro } from "../../../styles/paginaCanjePuntos";
import { colors } from "../../../styles/base";
import token from "../fotos/token.png";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import ModalRendimiento from "./../../components/ModalRendimiento";

const ModalFiltro = ({ visible, cerrarPopup, onAplicarFiltros }) => {
  const [orden, setOrden] = useState(0);
  const [categoria, setCategoria] = useState(0);
  const [precioRango, setPrecioRango] = useState([10, 500]);
  const [modalVisible, setModalVisible] = useState(visible);
  const [canjeable, setCanjeable] = useState(false);
  const [destacado, setDestacado] = useState(null);

  //Opciones de ordenes ( ampliable )
  const opcionesOrden = [
    { id: 1, label: "Novedades" },
    { id: 2, label: "Precio As." },
    { id: 3, label: "Precio Des." },
  ];

  //Opciones de categorias ( se podria hacer mas optimo, recogiendo solo los datos de cat que llegan de la db )
  const opcionesCategoria = [
    { id: 1, label: "Experiencias" },
    { id: 2, label: "Servicios" },
    { id: 3, label: "Otros" },
  ];

  //Handlers para desmarcar con doble pulsacion
  const handleSeleccionOrden = (id) => {
    setOrden((prev) => (prev === id ? 0 : id));
  };

  const handleSeleccionCategoria = (id) => {
    setCategoria((prev) => (prev === id ? 0 : id));
  };

  const onSwitchPulsado = () => {
    setCanjeable(!canjeable);
  };

  //Visibilidad del modal ( el popup de filtros )
  useEffect(() => {
    if (visible) {
      setModalVisible(true);
    }
  }, [visible]);

  const handleClose = () => {
    setModalVisible(false);
    setTimeout(() => {
      cerrarPopup();
    }, 300);
  };

  //Funcion para el boton de confirmar ( aplica filtros )
  const confirmarFiltro = () => {
    const filtros = { orden, categoria, precioRango, canjeable, destacado };
    console.log("Filtro aplicado en popup:", filtros);

    onAplicarFiltros(filtros);
    handleClose();
  };

  return (
    <ModalRendimiento
      isVisible={modalVisible}
      onClose={handleClose}
      title={"Filtros"}
      blurIntensity="light"
    >
      {/* FILTRO ORDEN */}
      <View style={modalFiltro.contenedorFiltro}>
        <View style={modalFiltro.label}>
          <Text style={{ fontWeight: "bold" }}>Ordenar por:</Text>
        </View>

        <View style={modalFiltro.contenedorBotones}>
          {opcionesOrden.map((opcion) => (
            <TouchableOpacity
              key={opcion.id}
              style={[
                modalFiltro.botonFiltro,
                orden === opcion.id && modalFiltro.botonActivo,
              ]}
              onPress={() => handleSeleccionOrden(opcion.id)}
            >
              <Text style={modalFiltro.labelBoton}>{opcion.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* FILTRO CATEGORIA */}
      <View style={modalFiltro.contenedorFiltro}>
        <View style={modalFiltro.label}>
          <Text style={{ fontWeight: "bold" }}>Filtrar por:</Text>
        </View>

        <View style={modalFiltro.contenedorBotones}>
          {opcionesCategoria.map((opcion) => (
            <TouchableOpacity
              key={opcion.id}
              style={[
                modalFiltro.botonFiltro,
                categoria === opcion.id && modalFiltro.botonActivo,
              ]}
              onPress={() => handleSeleccionCategoria(opcion.id)}
            >
              <Text style={modalFiltro.labelBoton}>{opcion.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* FILTRO PRECIO */}
      <View style={modalFiltro.contenedorFiltroPrecio}>
        <View style={modalFiltro.label}>
          <Text style={modalFiltro.labelText}>Precio:</Text>
        </View>

        <View style={modalFiltro.contenedorTexto}>
          <View style={modalFiltro.contenedorPrecio}>
            <Text>Precio más bajo</Text>
            <View style={modalFiltro.contenedorTextoIcono}>
              <Image style={modalFiltro.tokenIcono} source={token} />
              <Text style={modalFiltro.valor}>{precioRango[0]}</Text>
            </View>
          </View>

          <View style={modalFiltro.contenedorPrecio}>
            <Text>Precio más alto</Text>
            <View style={modalFiltro.contenedorTextoIcono}>
              <Image style={modalFiltro.tokenIcono} source={token} />
              <Text style={modalFiltro.valor}>{precioRango[1]}</Text>
            </View>
          </View>
        </View>

        <View style={modalFiltro.sliderContainer}>
          <MultiSlider
            values={precioRango}
            onValuesChange={setPrecioRango}
            min={0}
            max={1000}
            step={10}
            allowOverlap={false}
            snapped
            selectedStyle={{ backgroundColor: colors.primary }}
            markerStyle={{ backgroundColor: colors.primary }}
          />
        </View>
      </View>

      {/* FILTRO SWITCH */}
      <View style={modalFiltro.contenedorCanjeableFiltro}>
        <View style={modalFiltro.contenedorItems}>
          <Text style={modalFiltro.label}>Canjeable: </Text>
          <Switch
            style={modalFiltro.switch}
            value={canjeable}
            onValueChange={onSwitchPulsado}
            color={colors.primary}
          />
        </View>
      </View>

      {/* CONTENEDOR PRINCIPAL */}
      <View style={modalFiltro.fondo}>
        <View style={modalFiltro.contenedor}>
          <View style={modalFiltro.linea} />

          <View style={modalFiltro.barraInferior}>
            <TouchableOpacity
              style={modalFiltro.botonAplicar}
              onPress={confirmarFiltro}
            >
              <Text style={modalFiltro.iconoBoton}>Aplicar Filtros</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ModalRendimiento>
  );
};

export default ModalFiltro;
