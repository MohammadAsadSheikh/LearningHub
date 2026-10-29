import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { courseApi } from "../services/api";
import styles from "../styles/courseDetailsStyles";

import type { RootStackParamList } from "../navigation/RootNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "CourseDetails">;

export default function CourseDetailsScreen({ route, navigation }: Props) {
  const { course } = route.params;

  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isCheckingEnrollment, setIsCheckingEnrollment] = useState(true);
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [isCourseCompleted, setIsCourseCompleted] = useState(false);

  useEffect(() => {
    let isActive = true;

    const loadEnrollmentStatus = async () => {
      setIsCheckingEnrollment(true);
      setError(null);

      try {
        const result = await courseApi.getEnrollmentStatus(course.id);

        if (isActive) {
          setIsEnrolled(result.isEnrolled);
        }
      } catch (err) {
        if (isActive) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load enrollment status.",
          );
        }
      } finally {
        if (isActive) {
          setIsCheckingEnrollment(false);
        }
      }
    };

    loadEnrollmentStatus();

    return () => {
      isActive = false;
    };
  }, [course.id]);

  useEffect(() => {
    let isActive = true;

    const loadCourseProgress = async () => {
      if (!isEnrolled) {
        setProgressPercentage(0);
        setIsCourseCompleted(false);
        return;
      }

      try {
        const result = await courseApi.getLessons(course.id);

        if (isActive) {
          setProgressPercentage(result.progressPercentage);
          setIsCourseCompleted(result.progressPercentage === 100);
        }
      } catch (err) {
        console.warn("Unable to load course progress:", err);
      }
    };

    loadCourseProgress();

    return () => {
      isActive = false;
    };
  }, [course.id, isEnrolled]);

  const handleEnroll = async () => {
    if (isEnrolled || isEnrolling) {
      return;
    }

    setIsEnrolling(true);
    setError(null);

    try {
      await courseApi.enroll(course.id);
      setIsEnrolled(true);
      Alert.alert("Success", "You have enrolled in this course.");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to enroll. Please try again.",
      );
    } finally {
      setIsEnrolling(false);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 24 }}
    >
      <Text style={styles.title}>{course.title}</Text>
      <Text style={styles.description}>{course.description}</Text>

      <Text style={styles.meta}>Level: {course.level}</Text>
      <Text style={styles.meta}>Duration: {course.duration}</Text>

      <Text style={styles.sectionTitle}>What you will learn</Text>

      {course.outcomes.map((outcome, index) => (
        <Text key={`${course.id}-outcome-${index}`} style={styles.outcome}>
          {"\u2022"} {outcome}
        </Text>
      ))}

      {isCheckingEnrollment ? (
        <ActivityIndicator style={styles.loading} />
      ) : (
        <TouchableOpacity
          style={[
            styles.enrollButton,
            (isEnrolled || isEnrolling) && styles.enrolledButton,
          ]}
          onPress={handleEnroll}
          disabled={isEnrolled || isEnrolling}
        >
          {isEnrolling ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.enrollButtonText}>
              {isEnrolled ? "Enrolled" : "Enroll Now"}
            </Text>
          )}
        </TouchableOpacity>
      )}

      {!isCheckingEnrollment && isEnrolled && (
        <>
          {isCourseCompleted ? (
            <View style={styles.completionMessage}>
              <Text style={styles.completionTitle}>🎉 Course Completed!</Text>
              <Text style={styles.completionDescription}>
                Congratulations! You have completed all the lessons.
              </Text>
            </View>
          ) : (
            <>
              <Text style={styles.progressLabel}>
                Course progress: {progressPercentage}%
              </Text>

              <TouchableOpacity
                style={styles.enrollButton}
                onPress={() => navigation.navigate("CourseLessons", { course })}
              >
                <Text style={styles.enrollButtonText}>Continue Learning</Text>
              </TouchableOpacity>
            </>
          )}
        </>
      )}

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </ScrollView>
  );
}
