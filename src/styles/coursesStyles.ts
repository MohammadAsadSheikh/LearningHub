import { StyleSheet } from "react-native";
import colors from "../theme/colors";

const coursesStyles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: colors.background,
  },
  heading: {
    fontSize: 26,
    fontWeight: "800",
    color: colors.text,
  },
  subtitle: {
    fontSize: 15,
    color: colors.textSecondary,
    marginTop: 8,
    marginBottom: 24,
  },
  courseCard: {
    padding: 18,
    marginBottom: 16,
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  level: {
    alignSelf: "flex-start",
    overflow: "hidden",
    color: colors.primaryDark,
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 12,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
  },
  description: {
    fontSize: 14,
    lineHeight: 21,
    color: colors.textSecondary,
    marginTop: 8,
  },
  viewDetails: {
    marginTop: 14,
    color: colors.primary,
    fontSize: 14,
    fontWeight: "700",
  },
});

export default coursesStyles;
