import React from "react";
import { ScrollView, Text, View } from "react-native";

import { useAuth } from "../context/AuthContext";
import homeStyles from "../styles/homeStyles";

const HomeScreen = () => {
  const { user } = useAuth();

  return (
    <ScrollView contentContainerStyle={homeStyles.container}>
      <View style={homeStyles.header}>
        <Text style={homeStyles.greeting}>
          Hello, {user?.name || "Learner"}!
        </Text>
        <Text style={homeStyles.subtitle}>
          Ready to learn something new today?
        </Text>
      </View>

      <View style={homeStyles.heroCard}>
        <Text style={homeStyles.heroTitle}>Your learning journey</Text>
        <Text style={homeStyles.heroDescription}>
          Explore courses, build skills, and keep making progress.
        </Text>
      </View>

      <Text style={homeStyles.sectionTitle}>Your overview</Text>

      <View style={homeStyles.statCard}>
        <Text style={homeStyles.statValue}>0</Text>
        <Text style={homeStyles.statLabel}>Courses enrolled</Text>
      </View>

      <View style={homeStyles.statCard}>
        <Text style={homeStyles.statValue}>0%</Text>
        <Text style={homeStyles.statLabel}>Learning progress</Text>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
