import { StyleSheet } from "react-native";
import colors from "../theme/colors";

const profileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    padding: 24,
    paddingBottom: 36,
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.5,
    color: colors.primary,
    marginBottom: 8,
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 24,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: colors.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 30,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    marginRight: 16,
  },
  avatarText: {
    fontSize: 25,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: 19,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.textSecondary,
  },
  memberBadge: {
    alignSelf: "flex-start",
    backgroundColor: colors.background,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 10,
  },
  memberBadgeText: {
    fontSize: 11,
    fontWeight: "600",
    color: colors.primary,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 14,
  },
  infoCard: {
    paddingHorizontal: 16,
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 28,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 18,
  },
  infoIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
    marginRight: 14,
  },
  infoIconText: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.primary,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 5,
  },
  infoValue: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.text,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
  },
  settingsCard: {
    padding: 18,
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 28,
  },
  settingsTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 7,
  },
  settingsDescription: {
    fontSize: 14,
    lineHeight: 21,
    color: colors.textSecondary,
  },
  logoutSection: {
    padding: 18,
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  logoutTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 7,
  },
  logoutDescription: {
    fontSize: 14,
    lineHeight: 21,
    color: colors.textSecondary,
  },
  logoutButton: {
    marginTop: 20,
  },
  footer: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: "center",
    marginTop: 28,
  },
});

export default profileStyles;
