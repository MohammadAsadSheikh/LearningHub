import type { Course } from "../types/course";
export const courses: Course[] = [
  {
    id: "1",
    title: "React Native Fundamentals",
    description:
      "Learn how to build mobile applications using React Native, reusable components, state, and navigation.",
    level: "Beginner",
    duration: "4 weeks",
    outcomes: [
      "Understand components, props, and state",
      "Build layouts for iOS and Android",
      "Implement screen navigation",
    ],
  },
  {
    id: "2",
    title: "JavaScript Essentials",
    description:
      "Strengthen your JavaScript foundations, including arrays, functions, objects, and asynchronous programming.",
    level: "Beginner",
    duration: "3 weeks",
    outcomes: [
      "Understand JavaScript fundamentals",
      "Work confidently with arrays and objects",
      "Use promises and async/await",
    ],
  },
  {
    id: "3",
    title: "Redux Toolkit",
    description:
      "Learn centralized state management with Redux Toolkit and React Redux.",
    level: "Intermediate",
    duration: "2 weeks",
    outcomes: [
      "Configure a Redux store",
      "Create slices and reducers",
      "Connect components to Redux state",
    ],
  },
];
