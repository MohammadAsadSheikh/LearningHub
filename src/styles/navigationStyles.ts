import { StyleSheet } from "react-native";
import colors from "../theme/colors";

const navigationStyles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
  },
});

export default navigationStyles;
