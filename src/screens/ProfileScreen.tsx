import React, { useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";

import { useAuth } from "../context/AuthContext";
import AppButton from "../components/AppButton";
import profileStyles from "../styles/profileStyles";

const ProfileScreen = () => {
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(false);

  const initials =
    user?.name
      ?.trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0].toUpperCase())
      .join("") || "U";

  const handleLogout = async () => {
    try {
      setLoading(true);
      await logout();
      // RootNavigator automatically returns to Login.
    } catch {
      Alert.alert("Error", "Unable to log out. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      style={profileStyles.container}
      contentContainerStyle={profileStyles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <Text style={profileStyles.eyebrow}>YOUR ACCOUNT</Text>
      <Text style={profileStyles.title}>My Profile</Text>

      <View style={profileStyles.profileHeader}>
        <View style={profileStyles.avatar}>
          <Text style={profileStyles.avatarText}>{initials}</Text>
        </View>

        <View style={profileStyles.profileInfo}>
          <Text style={profileStyles.name}>
            {user?.name?.trim() || "Learner"}
          </Text>
          <Text style={profileStyles.description}>
            {user?.email || "No email available"}
          </Text>
          <View style={profileStyles.memberBadge}>
            <Text style={profileStyles.memberBadgeText}>
              LearningHub Member
            </Text>
          </View>
        </View>
      </View>

      <Text style={profileStyles.sectionTitle}>Account Information</Text>

      <View style={profileStyles.infoCard}>
        <View style={profileStyles.infoRow}>
          <View style={profileStyles.infoIcon}>
            <Text style={profileStyles.infoIconText}>U</Text>
          </View>
          <View style={profileStyles.infoContent}>
            <Text style={profileStyles.infoLabel}>Full Name</Text>
            <Text style={profileStyles.infoValue}>
              {user?.name || "Not available"}
            </Text>
          </View>
        </View>

        <View style={profileStyles.separator} />

        <View style={profileStyles.infoRow}>
          <View style={profileStyles.infoIcon}>
            <Text style={profileStyles.infoIconText}>@</Text>
          </View>
          <View style={profileStyles.infoContent}>
            <Text style={profileStyles.infoLabel}>Email Address</Text>
            <Text style={profileStyles.infoValue}>
              {user?.email || "Not available"}
            </Text>
          </View>
        </View>
      </View>

      <Text style={profileStyles.sectionTitle}>Account Settings</Text>

      <View style={profileStyles.settingsCard}>
        <Text style={profileStyles.settingsTitle}>Your account is secure</Text>
        <Text style={profileStyles.settingsDescription}>
          Your account session is managed securely by LearningHub.
        </Text>
      </View>

      <View style={profileStyles.logoutSection}>
        <Text style={profileStyles.logoutTitle}>Sign out</Text>
        <Text style={profileStyles.logoutDescription}>
          You can sign back in anytime to continue learning.
        </Text>

        <View style={profileStyles.logoutButton}>
          <AppButton
            title="Log Out"
            variant="secondary"
            onPress={handleLogout}
            loading={loading}
            disabled={loading}
          />
        </View>
      </View>

      <Text style={profileStyles.footer}>LearningHub</Text>
    </ScrollView>
  );
};

export default ProfileScreen;
