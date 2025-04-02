import { colors } from "./base";
import { StyleSheet, Text } from "react-native";
const styles = StyleSheet.create({
  page: {
    flex: 1,
    flexDirection: "column",
    alignItems: "stretch",
  },
  navigationBar: {
    width: "100%",
    height: 60,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  cardContainer: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    paddingHorizontal: 15,
    marginTop: 15,
  },
  card: {
    width: "100%",
    backgroundColor: colors.white,
    borderRadius: 8,
    marginBottom: 15,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    color: colors.white,
    fontFamily: "Roboto_SemiBold",
    fontSize: 18,
  },
  circleIcon: {
    width: 50,
    height: 50,
    backgroundColor: colors.blue,
    borderRadius: 25,
    marginRight: 15,
  },
  textPlaceholder: {
    flex: 1,
    height: 30,
    backgroundColor: colors.secondary,
  },
  wideCard: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default styles;
