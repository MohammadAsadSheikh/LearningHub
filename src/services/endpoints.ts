export const API_ENDPOINTS = {
  auth: {
    register: '/users/register',
    login: '/users/login',
    profile: '/users/me',
  },
  courses: {
    enrolled: '/courses/enrolled',
    enroll: (courseId: string) => `/courses/${courseId}/enroll`,
    enrollmentStatus: (courseId: string) => `/courses/${courseId}/enrollment`,
    lessons: (courseId: string) => `/courses/${courseId}/lessons`,
    completeLesson: (courseId: string, lessonId: string) =>
      `/courses/${courseId}/lessons/${lessonId}/complete`,
  },
} as const;
