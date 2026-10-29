import React from "react";
import { Alert } from "react-native";
import { fireEvent, render, waitFor } from "@testing-library/react-native";

import CourseLessonsScreen from "../src/screens/CourseLessonsScreen";
import { courseApi } from "../src/services/api";

jest.mock("../src/services/api", () => ({
  courseApi: {
    getLessons: jest.fn(),
    completeLesson: jest.fn(),
  },
}));

jest.mock("../src/data/lessonContent", () => ({
  lessonContent: {
    "rn-lesson-1": {
      summary: "Introduction to React Native",
      sections: [
        {
          heading: "What is React Native?",
          body: "Build native mobile interfaces using React.",
        },
      ],
    },
    "rn-lesson-2": {
      summary: "Learn components, props, and state.",
      sections: [
        {
          heading: "Components",
          body: "Components are reusable UI building blocks.",
        },
      ],
    },
  },
}));

const mockCourse = {
  id: "1",
  title: "React Native Fundamentals",
  description: "Learn React Native.",
  level: "Beginner",
  duration: "4 weeks",
  outcomes: ["Build mobile apps"],
};

const mockLessons = {
  courseId: "1",
  courseTitle: "React Native Fundamentals",
  totalLessons: 2,
  completedLessons: 0,
  progressPercentage: 0,
  lessons: [
    {
      id: "rn-lesson-1",
      title: "Introduction to React Native",
      isCompleted: false,
    },
    {
      id: "rn-lesson-2",
      title: "Components, Props, and State",
      isCompleted: false,
    },
  ],
};

const mockRoute = {
  key: "CourseLessons-test",
  name: "CourseLessons" as const,
  params: {
    course: mockCourse,
  },
};

const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
};

describe("CourseLessonsScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (courseApi.getLessons as jest.Mock).mockResolvedValue(mockLessons);
  });

  it("renders lessons and initial progress", async () => {
    const { getByText, getAllByText } = await render(
      <CourseLessonsScreen
        route={mockRoute}
        navigation={mockNavigation as never}
      />,
    );

    await waitFor(() => {
      expect(getByText("React Native Fundamentals")).toBeTruthy();
      expect(getByText("0%")).toBeTruthy();

      expect(
        getAllByText("Introduction to React Native").length,
      ).toBeGreaterThan(0);

      expect(getByText("Components, Props, and State")).toBeTruthy();
    });
  });

  it("opens the selected lesson content", async () => {
    const { getByText } = await render(
      <CourseLessonsScreen
        route={mockRoute}
        navigation={mockNavigation as never}
      />,
    );

    await waitFor(() => {
      expect(getByText("What is React Native?")).toBeTruthy();
      expect(
        getByText("Build native mobile interfaces using React."),
      ).toBeTruthy();
    });
  });

  it("marks a lesson complete and updates progress", async () => {
    (courseApi.completeLesson as jest.Mock).mockResolvedValue({
      message: "Lesson completed",
      courseId: "1",
      lessonId: "rn-lesson-1",
      completedLessons: 1,
      totalLessons: 2,
      progressPercentage: 50,
    });

    const { getByText } = await render(
      <CourseLessonsScreen
        route={mockRoute}
        navigation={mockNavigation as never}
      />,
    );

    const completeButton = await waitFor(() => getByText("Mark as Complete"));

    fireEvent.press(completeButton);

    await waitFor(() => {
      expect(courseApi.completeLesson).toHaveBeenCalledWith("1", "rn-lesson-1");
      expect(getByText("50%")).toBeTruthy();
      expect(getByText("1 of 2 lessons completed")).toBeTruthy();
      expect(getByText("✓ Lesson Completed")).toBeTruthy();
    });
  });

  it("shows an alert when lesson completion fails", async () => {
    const alertSpy = jest.spyOn(Alert, "alert").mockImplementation(() => {});

    (courseApi.completeLesson as jest.Mock).mockRejectedValue(
      new Error("Network error"),
    );

    try {
      const { getByText } = await render(
        <CourseLessonsScreen
          route={mockRoute}
          navigation={mockNavigation as never}
        />,
      );

      const completeButton = await waitFor(() => getByText("Mark as Complete"));

      fireEvent.press(completeButton);

      await waitFor(() => {
        expect(alertSpy).toHaveBeenCalledWith(
          "Unable to update progress",
          "Network error",
        );
      });
    } finally {
      alertSpy.mockRestore();
    }
  });
});
