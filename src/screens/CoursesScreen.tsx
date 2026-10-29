import React from "react";
import { ScrollView, Text, Pressable } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { courses } from "../data/courses";
import coursesStyles from "../styles/coursesStyles";
import type { CompositeScreenProps } from "@react-navigation/native";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

import type { CoursesStackParamList } from "../navigation/CoursesStackNavigator";
import type { MainTabParamList } from "../navigation/MainTabNavigator";
import type { RootStackParamList } from "../navigation/RootNavigator";

type Props = CompositeScreenProps<
  NativeStackScreenProps<CoursesStackParamList, "CourseList">,
  CompositeScreenProps<
    BottomTabScreenProps<MainTabParamList, "Courses">,
    NativeStackScreenProps<RootStackParamList>
  >
>;
const CoursesScreen = ({ navigation }: Props) => {
  return (
    <ScrollView contentContainerStyle={coursesStyles.container}>
      <Text style={coursesStyles.heading}>Explore Courses</Text>
      <Text style={coursesStyles.subtitle}>
        Choose a topic and continue learning.
      </Text>

      {courses.map((course) => (
        <Pressable
          key={course.id}
          style={coursesStyles.courseCard}
          accessibilityRole="button"
          onPress={() =>
            navigation
              .getParent()
              ?.getParent()
              ?.navigate("CourseDetails", { course })
          }
        >
          <Text style={coursesStyles.level}>{course.level}</Text>
          <Text style={coursesStyles.courseTitle}>{course.title}</Text>
          <Text style={coursesStyles.description}>{course.description}</Text>
          <Text style={coursesStyles.description}>
            Duration: {course.duration}
          </Text>
          <Text style={coursesStyles.viewDetails}>View course details →</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
};

export default CoursesScreen;
