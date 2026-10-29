import { StyleSheet } from "react-native";
import colors from "../theme/colors";

const homeStyles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: colors.background,
  },
  header: {
    marginBottom: 24,
  },
  greeting: {
    fontSize: 26,
    fontWeight: "800",
    color: colors.text,
  },
  subtitle: {
    fontSize: 15,
    color: colors.textSecondary,
    marginTop: 8,
    lineHeight: 22,
  },
  heroCard: {
    backgroundColor: colors.primary,
    padding: 22,
    borderRadius: 18,
    marginBottom: 28,
  },
  heroTitle: {
    fontSize: 21,
    fontWeight: "800",
    color: colors.surface,
  },
  heroDescription: {
    fontSize: 14,
    lineHeight: 21,
    color: colors.surface,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 14,
  },
  statCard: {
    backgroundColor: colors.surface,
    padding: 20,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 12,
  },
  statValue: {
    fontSize: 28,
    fontWeight: "800",
    color: colors.primary,
  },
  statLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 5,
  },
});

export default homeStyles;
