import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Switch } from "react-native-paper";
import { modalFiltro } from "../../../../styles/paginaCanjePuntos";
import { colors } from "../../../../styles/base";
import token from "../fotos/token.png";
import ModalRendimiento from "../../Rendimiento/components/ModalRendimiento";
import MultiSlider from "@ptomasroos/react-native-multi-slider";

const ModalFiltro = ({ visible, cerrarPopup, onAplicarFiltros, filtros }) => {
  const filtrosActuales = filtros;
  console.log("filtrosActuales", filtrosActuales);
  const [orden, setOrden] = useState(filtrosActuales.orden);
  const [categorias, setCategorias] = useState(filtrosActuales.categoria || []);
  const [precioRango, setPrecioRango] = useState(filtrosActuales.precioRango);
  const [modalVisible, setModalVisible] = useState(visible);
  const [canjeable, setCanjeable] = useState(filtrosActuales.canjeable);
  const rangoPrecioProvisional = [0, 100];

  const opcionesOrden = [
    { id: 1, label: "Novedades" },
    { id: 2, label: "Precio As." },
    { id: 3, label: "Precio Des." },
  ];

  const opcionesCategoria = [
    { id: 1, label: "Servicios" },
    { id: 2, label: "Productos" },
    { id: 3, label: "Experiencias" },
    { id: 4, label: "Otros" },
  ];

  useEffect(() => {
    setOrden(filtrosActuales.orden);
    setCategorias(filtrosActuales.categoria || []);
    setPrecioRango(filtrosActuales.precioRango);
    setCanjeable(filtrosActuales.canjeable);
  }, [filtrosActuales]);

  const handleSeleccionOrden = (id) => {
    setOrden((prev) => (prev === id ? 0 : id));
  };

  const handleSeleccionCategoria = (id) => {
    setCategorias((prev) => {
      if (prev.includes(id)) {
        return prev.filter((catId) => catId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const onSwitchPulsado = () => {
    setCanjeable(!canjeable);
  };

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

  const confirmarFiltro = () => {
    const filtrosAplicados = {
      categoria: categorias,
      orden,
      precioRango,
      canjeable,
    };
    console.log("Filtro aplicado en popup:", filtrosAplicados);
    onAplicarFiltros(filtrosAplicados);
    handleClose();
  };

  return (
    <ModalRendimiento
      isVisible={modalVisible}
      onClose={handleClose}
      title={"Filtros"}
      blurIntensity="light"
    >
      {/* ORDEN */}
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

      {/* CATEGORÍA */}
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
                categorias.includes(opcion.id) && modalFiltro.botonActivo,
              ]}
              onPress={() => handleSeleccionCategoria(opcion.id)}
            >
              <Text style={modalFiltro.labelBoton}>{opcion.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* PRECIO */}
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
            // min={filtrosActuales.precioRango[0]}
            // max={filtrosActuales.precioRango[1]}
            min={rangoPrecioProvisional[0]}
            max={rangoPrecioProvisional[1]}
            step={10}
            allowOverlap={false}
            snapped
            selectedStyle={{ backgroundColor: colors.primary }}
            markerStyle={{ backgroundColor: colors.primary }}
          />
        </View>
      </View>

      {/* SWITCH CANJEABLE */}
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

      {/* BOTÓN APLICAR */}
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
