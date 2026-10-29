import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  courseApi,
  type Enrollment,
  type CourseLessonsResponse,
} from "../services/api";
import { courses } from "../data/courses";
import type { Course } from "../types/course";
import type { CoursesStackParamList } from "../navigation/CoursesStackNavigator";
import type { RootStackParamList } from "../navigation/RootNavigator";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import styles from "../styles/myCoursesStyles";

type Props = NativeStackScreenProps<CoursesStackParamList, "MyCourses">;

type EnrolledCourse = {
  enrollment: Enrollment;
  course: Course | undefined;
};

export default function MyCoursesScreen({ navigation }: Props) {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [progressByCourse, setProgressByCourse] = useState<
    Record<string, CourseLessonsResponse>
  >({});
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadMyCourses = useCallback(
    async (isPullToRefresh = false, isActive: () => boolean = () => true) => {
      if (isPullToRefresh) {
        setIsRefreshing(true);
      } else {
        setIsLoading(true);
      }

      setError(null);

      try {
        const result = await courseApi.getMyEnrollments();

        const progressResults = await Promise.all(
          result.enrollments.map(async (enrollment) => {
            try {
              const progress = await courseApi.getLessons(enrollment.courseId);
              return [enrollment.courseId, progress] as const;
            } catch {
              return [enrollment.courseId, null] as const;
            }
          }),
        );

        if (isActive()) {
          const progressMap: Record<string, CourseLessonsResponse> = {};

          progressResults.forEach(([courseId, progress]) => {
            if (progress) {
              progressMap[courseId] = progress;
            }
          });

          setEnrollments(result.enrollments);
          setProgressByCourse(progressMap);
        }
      } catch (err) {
        if (isActive()) {
          setError(
            err instanceof Error ? err.message : "Unable to load your courses.",
          );
        }
      } finally {
        if (isActive()) {
          setIsLoading(false);
          setIsRefreshing(false);
        }
      }
    },
    [],
  );

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      loadMyCourses(false, () => isActive);

      return () => {
        isActive = false;
      };
    }, [loadMyCourses]),
  );

  const enrolledCourses: EnrolledCourse[] = enrollments.map((enrollment) => ({
    enrollment,
    course: courses.find((item) => item.id === enrollment.courseId),
  }));

  const openCourse = (course: Course | undefined) => {
    if (!course) {
      return;
    }

    // Course Details belongs to the root stack, outside the bottom tabs.
    const rootNavigation = navigation
      .getParent()
      ?.getParent() as unknown as NativeStackNavigationProp<RootStackParamList>;

    rootNavigation.navigate("CourseDetails", { course });
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
        <Text style={styles.message}>Loading your courses...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>{error}</Text>
        <Pressable
          style={styles.retryButton}
          onPress={() => navigation.navigate("MyCourses")}
        >
          <Text style={styles.retryText}>Try Again</Text>
        </Pressable>
      </View>
    );
  }

  if (enrollments.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.emptyTitle}>No courses yet</Text>
        <Text style={styles.message}>
          Explore courses and enroll to see them here.
        </Text>
        <Pressable
          style={styles.retryButton}
          onPress={() => navigation.navigate("CourseList")}
        >
          <Text style={styles.retryText}>Explore Courses</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <FlatList
      contentContainerStyle={styles.listContent}
      data={enrolledCourses}
      keyExtractor={({ enrollment }) => enrollment._id}
      renderItem={({ item }) => (
        <Pressable
          style={styles.card}
          onPress={() => openCourse(item.course)}
          disabled={!item.course}
        >
          <Text style={styles.courseTitle}>
            {item.course?.title ?? item.enrollment.courseTitle}
          </Text>

          {item.course ? (
            <>
              <Text style={styles.meta}>Level: {item.course.level}</Text>
              <Text style={styles.meta}>Duration: {item.course.duration}</Text>
            </>
          ) : (
            <Text style={styles.message}>
              Course details are currently unavailable.
            </Text>
          )}

          <View style={styles.statusRow}>
            <Text style={styles.enrolledLabel}>
              {progressByCourse[item.enrollment.courseId]
                ?.progressPercentage === 100
                ? "✓ Completed"
                : "Enrolled"}
            </Text>
          </View>
          {item.course ? (
            <Text style={styles.openLabel}>View course →</Text>
          ) : null}

          {progressByCourse[item.enrollment.courseId] && (
            <>
              <View style={styles.progressHeader}>
                <Text style={styles.progressText}>Progress</Text>

                <Text style={styles.progressPercent}>
                  {
                    progressByCourse[item.enrollment.courseId]
                      .progressPercentage
                  }
                  %
                </Text>
              </View>

              <View style={styles.progressTrack}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${
                        progressByCourse[item.enrollment.courseId]
                          .progressPercentage
                      }%`,
                      backgroundColor:
                        progressByCourse[item.enrollment.courseId]
                          .progressPercentage === 100
                          ? "#16A34A"
                          : undefined,
                    },
                  ]}
                />
              </View>

              <Text style={styles.progressText}>
                {progressByCourse[item.enrollment.courseId].completedLessons} of{" "}
                {progressByCourse[item.enrollment.courseId].totalLessons}{" "}
                lessons completed
              </Text>
            </>
          )}
        </Pressable>
      )}
      refreshing={isRefreshing}
      onRefresh={() => loadMyCourses(true)}
    />
  );
}
