import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Pressable, Text, View } from "react-native";
import CoursesScreen from "../screens/CoursesScreen";
import MyCoursesScreen from "../screens/MyCoursesScreen";
import colors from "../theme/colors";

export type CoursesStackParamList = {
  CourseList: undefined;
  MyCourses: undefined;
};

const Stack = createNativeStackNavigator<CoursesStackParamList>();

const CoursesStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.surface },
        headerTintColor: colors.text,
        headerTitleStyle: { fontWeight: "700" },
      }}
    >
      <Stack.Screen
        name="CourseList"
        component={CoursesScreen}
        options={({ navigation }) => ({
          title: "Explore Courses",
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate("MyCourses")}
              hitSlop={10}
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 8,
                paddingHorizontal: 10,
                gap: 6,
              }}
            >
              <Text style={{ fontSize: 17, color: colors.primary }}>▤</Text>
              <Text
                style={{
                  color: colors.primary,
                  fontSize: 14,
                  fontWeight: "700",
                }}
              >
                My Courses
              </Text>
            </Pressable>
          ),
        })}
      />

      <Stack.Screen
        name="MyCourses"
        component={MyCoursesScreen}
        options={{ title: "My Courses" }}
      />
    </Stack.Navigator>
  );
};

export default CoursesStackNavigator;
