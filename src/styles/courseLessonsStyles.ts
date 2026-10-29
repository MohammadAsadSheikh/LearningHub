import { StyleSheet } from "react-native";
import colors from "../theme/colors";

const courseLessonsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 20,
    paddingBottom: 32,
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: colors.background,
  },
  courseTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 20,
  },
  progressCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
  },
  progressLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  progressHeading: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text,
  },
  progressPercent: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.primary,
  },
  progressTrack: {
    height: 9,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: colors.border,
    marginBottom: 10,
  },
  progressFill: {
    height: "100%",
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  secondaryText: {
    fontSize: 13,
    lineHeight: 19,
    color: colors.textSecondary,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.text,
    marginTop: 26,
    marginBottom: 14,
  },
  lessonCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    marginBottom: 12,
    gap: 12,
  },
  lessonNumber: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
  },
  lessonNumberText: {
    fontWeight: "700",
    color: colors.text,
  },
  lessonInfo: {
    flex: 1,
    gap: 4,
  },
  lessonTitle: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600",
    color: colors.text,
  },

  errorText: {
    color: "#D32F2F",
    textAlign: "center",
  },
  retryButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 16,
  },
  retryText: {
    color: colors.surface,
    fontWeight: "700",
  },
  completionMessage: {
    marginTop: 12,
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "600",
    color: colors.success,
  },
  selectedLessonCard: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  completedLessonNumber: {
    backgroundColor: colors.success,
  },
  readerCard: {
    marginTop: 24,
    padding: 20,
    borderRadius: 16,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  readerEyebrow: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.2,
    color: colors.primary,
    marginBottom: 10,
  },
  readerTitle: {
    fontSize: 23,
    lineHeight: 30,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 12,
  },
  readerSummary: {
    fontSize: 15,
    lineHeight: 23,
    color: colors.textSecondary,
    marginBottom: 22,
  },
  contentSection: {
    marginBottom: 22,
  },
  contentHeading: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 8,
  },
  contentBody: {
    fontSize: 15,
    lineHeight: 24,
    color: colors.textSecondary,
  },

  lessonNavigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginTop: 16,
  },
  navigationButton: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 13,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  disabledNavigationButton: {
    opacity: 0.4,
  },
  navigationButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
  },
  completeButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 9,
    borderRadius: 9,
  },
  completedButton: {
    backgroundColor: colors.background,
  },
  completeButtonText: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.surface,
  },
  completedButtonText: {
    color: colors.success,
  },
});

export default courseLessonsStyles;
