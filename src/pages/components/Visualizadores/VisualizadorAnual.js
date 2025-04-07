import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../../../../styles/base";
import DateUtils from "../../../helpers/FechaUtils";
import RendimientoUtils from "../../../helpers/RendimientoUtils";

const VisualizadorAnual = ({ data, mesActual, rangoMes }) => {
  const [mesSeleccionado, setMesSeleccionado] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    console.log("Datos recibidos:", data);
    console.log("Rango de periodo:", rangoMes);
  }, [data, rangoPeriodo]);
};

export default VisualizadorAnual;
