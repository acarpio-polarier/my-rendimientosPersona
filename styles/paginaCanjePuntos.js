import { colors, fontSize } from "./base";

//#region componenteFiltro
export const componenteFiltro = {
  contenedor: {
    width: "100%",
    alignSelf: "center",
    marginTop: -5,
  },
  cabecera: {
    flexDirection: "row",
    paddingHorizontal: "5%",
    paddingVertical: "4%",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: colors.smokedWhite,
    borderBottomWidth: 2,
  },

  contenedorBotones: {
    flexDirection: "row",
    width: "40%",
    justifyContent: "space-between",
  },

  boton: {
    backgroundColor: colors.primary,
    width: "55%",
    height: 40,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },

  botonFilter: {
    backgroundColor: colors.primary,
    width: "35%",
    height: 40,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },

  labelBoton: {
    color: "white",
    fontSize: 17,
  },

  contenedorToken: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "end",
    marginTop: 5,
    marginBottom: 5,
  },
  tokenIcono: {
    width: 30,
    height: 30,
    marginRight: 15,
  },
  tokenLabel: {
    display: "flex",
    justifyContent: "end",
    alignItems: "center",
    right: 10,
    color: colors.lightBlack,
    fontSize: 20,
  },
};

//#region confirmPopup
export const confirmPopup = {
  contenedorMain: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  popup: {
    width: 300,
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 20,
  },
  titulo: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },
  mensaje: {
    marginBottom: 20,
    fontSize: 14,
    textAlign: "center",
  },
  contenedorBotones: {
    flexDirection: "row",
    justifyContent: "center",
  },
  botonBase: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginLeft: 10,
  },
  cancelar: {
    backgroundColor: colors.gray,
  },
  confirmar: {
    backgroundColor: colors.primary,
  },
  textoBotones: {
    color: colors.white,
    fontWeight: "bold",
  },
};

//#region modalFiltro
export const modalFiltro = {
  barraSuperior: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  barraInferior: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
  },
  botonAtras: {
    backgroundColor: colors.primary,
    width: 30,
    height: 30,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  botonReiniciar: {
    backgroundColor: "brown",
    width: 70,
    height: 30,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  botonAplicar: {
    backgroundColor: colors.primary,
    width: 200,
    height: 50,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  iconoBoton: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 20,
  },
  linea: {
    borderBottomWidth: 1,
    borderBottomColor: "rgb(210,210,210)",
  },

  // FiltroOrdenar y FiltroCategoria
  contenedorFiltro: {
    width: "100%",
    alignSelf: "center",
    marginVertical: 10,
  },
  label: {
    marginLeft: 10,
    marginBottom: 5,
  },
  contenedorBotones: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    flexWrap: "wrap",
  },
  botonFiltro: {
    backgroundColor: colors.primary_light,
    width: "30%",
    height: 30,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.6,
    margin: 2,
  },
  botonActivo: {
    backgroundColor: colors.primary,
    opacity: 1,
  },
  labelBoton: {
    color: "white",
  },

  // FiltroPrecio
  contenedorFiltroPrecio: {
    width: "100%",
    alignSelf: "center",
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgb(210,210,210)",
    paddingHorizontal: 10,
  },
  labelText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  contenedorTexto: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  contenedorPrecio: {
    alignItems: "center",
  },
  contenedorTextoIcono: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "end",
    marginTop: 5,
  },
  valor: {
    fontSize: 16,
    fontWeight: "bold",
  },
  sliderContainer: {
    alignSelf: "center",
    marginBottom: 5,
  },
  tokenIcono: {
    width: 20,
    height: 20,
    marginRight: 5,
  },

  // Switch canjeable
  contenedorCanjeableFiltro: {
    width: "100%",
    alignSelf: "center",
    marginVertical: 10,
  },
  contenedorItems: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  switch: {
    height: 20,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
};

//#region productosCards

export const productosCards = {
  contenedor: {
    borderWidth: 2,
    borderColor: colors.primary,
    backgroundColor: colors.smokedWhite,
    borderRadius: 10,
    width: "90%",
    alignSelf: "center",
    shadowColor: "black",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: "hidden",
    marginVertical: 10,
    elevation: 2,
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
    paddingRight: "2%",
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
    height: "100%",
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
    height: "100%",
  },
  tokenIcono: {
    width: 25,
    height: 25,
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
  pieTarjeta: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: "5%",
    paddingVertical: "1%",
  },
};
