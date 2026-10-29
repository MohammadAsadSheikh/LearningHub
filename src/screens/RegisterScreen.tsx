import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import type { RootStackParamList } from "../navigation/RootNavigator";
import registerStyles from "../styles/registerStyles";
import AppButton from "../components/AppButton";
import AppTextInput from "../components/AppTextInput";
import { authApi } from "../services/api";

type Props = NativeStackScreenProps<RootStackParamList, "Register">;

const RegisterScreen = ({ navigation }: Props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      setError("Please complete all fields.");
      return;
    }

    if (name.trim().length < 2) {
      setError("Name must contain at least 2 characters.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await authApi.register({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
      });

      Alert.alert(
        "Account created",
        response.message || "Your account has been created successfully.",
        [
          {
            text: "Continue to Login",
            onPress: () => navigation.goBack(),
          },
        ],
      );
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to create your account. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={registerStyles.screen}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={registerStyles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={registerStyles.content}>
          <View style={registerStyles.logo}>
            <Text style={registerStyles.logoText}>L</Text>
          </View>

          <Text style={registerStyles.title}>Create Account</Text>

          <Text style={registerStyles.subtitle}>
            Create your LearningHub account to get started.
          </Text>

          <View style={registerStyles.form}>
            <AppTextInput
              label="Full name"
              placeholder="Enter your name"
              value={name}
              onChangeText={(value) => {
                setName(value);
                setError("");
              }}
              autoCapitalize="words"
              autoCorrect={false}
              returnKeyType="next"
            />

            <AppTextInput
              label="Email address"
              placeholder="you@example.com"
              value={email}
              onChangeText={(value) => {
                setEmail(value);
                setError("");
              }}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="next"
            />

            <AppTextInput
              label="Password"
              placeholder="At least 8 characters"
              value={password}
              onChangeText={(value) => {
                setPassword(value);
                setError("");
              }}
              secureTextEntry
              autoCapitalize="none"
              returnKeyType="next"
            />

            <AppTextInput
              label="Confirm password"
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChangeText={(value) => {
                setConfirmPassword(value);
                setError("");
              }}
              secureTextEntry
              autoCapitalize="none"
              returnKeyType="done"
              onSubmitEditing={handleRegister}
            />

            {error ? <Text style={registerStyles.error}>{error}</Text> : null}

            <AppButton
              title="Create Account"
              onPress={handleRegister}
              loading={loading}
              disabled={loading}
            />
          </View>

          <View style={registerStyles.footer}>
            <Text style={registerStyles.footerText}>
              Already have an account?{" "}
            </Text>

            <Pressable
              accessibilityRole="button"
              onPress={() => navigation.goBack()}
            >
              <Text style={registerStyles.link}>Sign In</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
