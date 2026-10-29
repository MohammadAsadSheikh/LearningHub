import { StyleSheet } from "react-native";
import colors from "../theme/colors";

const detailsStyles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: colors.background,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 12,
  },

  outcome: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.text,
    marginBottom: 12,
  },
  hero: {
    backgroundColor: colors.primary,
    padding: 22,
    borderRadius: 18,
    marginBottom: 26,
  },
  level: {
    color: colors.surface,
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 10,
  },

  duration: {
    color: colors.surface,
    fontSize: 14,
    marginTop: 12,
  },
  description: {
    fontSize: 15,
    lineHeight: 23,
    color: colors.textSecondary,
    marginBottom: 20,
  },
  outcomeRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 14,
  },
  bullet: {
    color: colors.success,
    fontSize: 18,
    fontWeight: "800",
    marginRight: 10,
  },
  buttonContainer: {
    marginTop: 24,
    marginBottom: 12,
  },
  loading: {
    marginTop: 20,
  },
  enrolledButton: {
    opacity: 0.7,
  },
  errorText: {
    color: "#D32F2F",
    marginTop: 12,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1E293B",
    marginTop: 20,
    marginBottom: 12,
  },
  meta: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
  },

  enrollButton: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
  },

  enrollButtonText: {
    color: colors.surface,
    fontSize: 16,
    fontWeight: "700",
  },
  completionMessage: {
    marginTop: 20,
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#E8F8EE",
    borderWidth: 1,
    borderColor: "#A7E4BC",
  },

  completionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#15803D",
    marginBottom: 8,
  },

  completionDescription: {
    fontSize: 14,
    color: "#166534",
    lineHeight: 21,
  },

  progressLabel: {
    marginTop: 20,
    marginBottom: 12,
    fontSize: 15,
    fontWeight: "600",
    color: "#475569",
  },
});

export default detailsStyles;
