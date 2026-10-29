import { StyleSheet } from "react-native";
import colors from "../theme/colors";

const styles = StyleSheet.create({
  listContent: {
    padding: 16,
    paddingBottom: 28,
    backgroundColor: colors.background,
    flexGrow: 1,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 12,
  },
  meta: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 7,
  },
  enrolledLabel: {
    alignSelf: "flex-start",
    marginTop: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: colors.background,
    color: colors.success,
    fontWeight: "700",
    fontSize: 12,
  },
  openLabel: {
    marginTop: 14,
    color: colors.primary,
    fontWeight: "700",
    fontSize: 14,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: colors.background,
  },
  message: {
    fontSize: 14,
    lineHeight: 21,
    color: colors.textSecondary,
    textAlign: "center",
    marginTop: 10,
  },
  emptyTitle: {
    fontSize: 21,
    fontWeight: "700",
    color: colors.text,
    textAlign: "center",
  },
  error: {
    fontSize: 15,
    color: "#D32F2F",
    textAlign: "center",
  },
  retryButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 10,
    marginTop: 18,
  },
  retryText: {
    color: colors.surface,
    fontWeight: "700",
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
    marginBottom: 8,
  },

  progressText: {
    fontSize: 13,
    color: colors.textSecondary,
  },

  progressPercent: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.primary,
  },

  progressTrack: {
    height: 8,
    borderRadius: 4,
    overflow: "hidden",
    backgroundColor: colors.border,
    marginBottom: 8,
  },

  progressFill: {
    height: "100%",
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
});

export default styles;
