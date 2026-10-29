import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import type { RootStackParamList } from "../navigation/RootNavigator";
import { courseApi, type CourseLessonsResponse } from "../services/api";
import { lessonContent } from "../data/lessonContent";
import colors from "../theme/colors";
import styles from "../styles/courseLessonsStyles";

type Props = NativeStackScreenProps<RootStackParamList, "CourseLessons">;

export default function CourseLessonsScreen({ route }: Props) {
  const { course } = route.params;

  const [data, setData] = useState<CourseLessonsResponse | null>(null);
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingLessonId, setLoadingLessonId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadLessons = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await courseApi.getLessons(course.id);
      setData(result);

      setSelectedLessonId((currentId) => {
        if (
          currentId &&
          result.lessons.some((lesson) => lesson.id === currentId)
        ) {
          return currentId;
        }

        return result.lessons[0]?.id ?? null;
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load lessons.");
    } finally {
      setIsLoading(false);
    }
  }, [course.id]);

  useEffect(() => {
    loadLessons();
  }, [loadLessons]);

  const selectedIndex =
    data?.lessons.findIndex((lesson) => lesson.id === selectedLessonId) ?? -1;

  const selectedLesson =
    selectedIndex >= 0 ? data?.lessons[selectedIndex] : undefined;

  const content = selectedLesson ? lessonContent[selectedLesson.id] : undefined;

  const handleComplete = async (lessonId: string) => {
    if (!data || loadingLessonId) {
      return;
    }

    const lesson = data.lessons.find((item) => item.id === lessonId);

    if (!lesson || lesson.isCompleted) {
      return;
    }

    setLoadingLessonId(lessonId);

    try {
      const result = await courseApi.completeLesson(course.id, lessonId);

      setData((current) => {
        if (!current) {
          return current;
        }

        return {
          ...current,
          completedLessons: result.completedLessons,
          totalLessons: result.totalLessons,
          progressPercentage: result.progressPercentage,
          lessons: current.lessons.map((item) =>
            item.id === lessonId ? { ...item, isCompleted: true } : item,
          ),
        };
      });
    } catch (err) {
      Alert.alert(
        "Unable to update progress",
        err instanceof Error ? err.message : "Please try again.",
      );
    } finally {
      setLoadingLessonId(null);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.secondaryText}>Loading lessons...</Text>
      </View>
    );
  }

  if (error || !data) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>
          {error ?? "Unable to load lessons."}
        </Text>

        <Pressable style={styles.retryButton} onPress={loadLessons}>
          <Text style={styles.retryText}>Try Again</Text>
        </Pressable>
      </View>
    );
  }

  if (!data.lessons.length) {
    return (
      <View style={styles.centered}>
        <Text style={styles.courseTitle}>No lessons available yet</Text>
        <Text style={styles.secondaryText}>
          Please check back later for course content.
        </Text>
      </View>
    );
  }

  const isSaving = loadingLessonId === selectedLesson?.id;
  const isCourseCompleted =
    data.totalLessons > 0 && data.completedLessons === data.totalLessons;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.courseTitle}>{data.courseTitle}</Text>

      <View style={styles.progressCard}>
        <View style={styles.progressLabels}>
          <Text style={styles.progressHeading}>Your progress</Text>
          <Text style={styles.progressPercent}>{data.progressPercentage}%</Text>
        </View>

        <View
          style={styles.progressTrack}
          accessibilityRole="progressbar"
          accessibilityValue={{
            min: 0,
            max: 100,
            now: data.progressPercentage,
          }}
        >
          <View
            style={[
              styles.progressFill,
              {
                width: `${data.progressPercentage}%`,
                backgroundColor: isCourseCompleted
                  ? colors.success
                  : colors.primary,
              },
            ]}
          />
        </View>

        <Text style={styles.secondaryText}>
          {data.completedLessons} of {data.totalLessons} lessons completed
        </Text>

        {isCourseCompleted && (
          <Text style={styles.completionMessage}>
            🎉 Congratulations! You've completed this course.
          </Text>
        )}
      </View>

      <Text style={styles.sectionTitle}>Course lessons</Text>

      {data.lessons.map((lesson, index) => {
        const isSelected = lesson.id === selectedLessonId;

        return (
          <Pressable
            key={lesson.id}
            accessibilityRole="button"
            accessibilityState={{ selected: isSelected }}
            onPress={() => setSelectedLessonId(lesson.id)}
            style={[styles.lessonCard, isSelected && styles.selectedLessonCard]}
          >
            <View
              style={[
                styles.lessonNumber,
                lesson.isCompleted && styles.completedLessonNumber,
              ]}
            >
              <Text style={styles.lessonNumberText}>
                {lesson.isCompleted ? "✓" : index + 1}
              </Text>
            </View>

            <View style={styles.lessonInfo}>
              <Text style={styles.lessonTitle}>{lesson.title}</Text>
              <Text style={styles.secondaryText}>
                {lesson.isCompleted
                  ? "Completed"
                  : isSelected
                    ? "Currently selected"
                    : "Not completed"}
              </Text>
            </View>
          </Pressable>
        );
      })}

      {selectedLesson && (
        <View style={styles.readerCard}>
          <Text style={styles.readerEyebrow}>
            LESSON {selectedIndex + 1} OF {data.totalLessons}
          </Text>

          <Text style={styles.readerTitle}>{selectedLesson.title}</Text>

          <Text style={styles.readerSummary}>
            {content?.summary ??
              "Learning material for this lesson will be available soon."}
          </Text>

          {content?.sections.map((section, index) => (
            <View
              key={`${selectedLesson.id}-${index}`}
              style={styles.contentSection}
            >
              <Text style={styles.contentHeading}>{section.heading}</Text>
              <Text style={styles.contentBody}>{section.body}</Text>
            </View>
          ))}

          <Pressable
            accessibilityRole="button"
            disabled={selectedLesson.isCompleted || loadingLessonId !== null}
            onPress={() => handleComplete(selectedLesson.id)}
            style={[
              styles.completeButton,
              selectedLesson.isCompleted && styles.completedButton,
            ]}
          >
            {isSaving ? (
              <ActivityIndicator color={colors.surface} size="small" />
            ) : (
              <Text
                style={[
                  styles.completeButtonText,
                  selectedLesson.isCompleted && styles.completedButtonText,
                ]}
              >
                {selectedLesson.isCompleted
                  ? "✓ Lesson Completed"
                  : "Mark as Complete"}
              </Text>
            )}
          </Pressable>

          <View style={styles.lessonNavigation}>
            <Pressable
              accessibilityRole="button"
              disabled={selectedIndex <= 0}
              onPress={() =>
                setSelectedLessonId(data.lessons[selectedIndex - 1]?.id ?? null)
              }
              style={[
                styles.navigationButton,
                selectedIndex <= 0 && styles.disabledNavigationButton,
              ]}
            >
              <Text style={styles.navigationButtonText}>← Previous</Text>
            </Pressable>

            <Pressable
              accessibilityRole="button"
              disabled={selectedIndex >= data.lessons.length - 1}
              onPress={() =>
                setSelectedLessonId(data.lessons[selectedIndex + 1]?.id ?? null)
              }
              style={[
                styles.navigationButton,
                selectedIndex >= data.lessons.length - 1 &&
                  styles.disabledNavigationButton,
              ]}
            >
              <Text style={styles.navigationButtonText}>Next →</Text>
            </Pressable>
          </View>
        </View>
      )}
    </ScrollView>
  );
}
