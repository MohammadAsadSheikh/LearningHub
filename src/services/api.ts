import { authStorage } from './authStorage';
import { API_BASE_URL } from '../config/api';

type ApiErrorBody = {
  message?: string;
  error?: string;
};

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const body = data as ApiErrorBody;

    throw new Error(
      body.message || body.error || `Request failed (${response.status})`,
    );
  }

  return data as T;
}

export type AuthUser = {
  id: string;
  name: string;
  email: string;
};

export type LoginResponse = {
  message: string;
  token: string;
  user: AuthUser;
};

export type RegisterResponse = {
  message: string;
  user: AuthUser;
};

export type ProfileResponse = {
  user: AuthUser;
};

export const authApi = {
  register: (input: { name: string; email: string; password: string }) =>
    request<RegisterResponse>('/users/register', {
      method: 'POST',
      body: JSON.stringify(input),
    }),

  login: (input: { email: string; password: string }) =>
    request<LoginResponse>('/users/login', {
      method: 'POST',
      body: JSON.stringify(input),
    }),

  getProfile: (token: string) =>
    request<ProfileResponse>('/users/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};

export type Enrollment = {
  _id: string;
  courseId: string;
  courseTitle: string;
  createdAt: string;
  updatedAt: string;
};

type EnrollmentStatusResponse = {
  isEnrolled: boolean;
  enrollment: Enrollment | null;
};

type MyEnrollmentsResponse = {
  enrollments: Enrollment[];
};

async function authenticatedRequest<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const token = await authStorage.getToken();

  if (!token) {
    throw new Error('Please log in again.');
  }

  return request<T>(path, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  });
}

export const courseApi = {
  enroll: (courseId: string) =>
    authenticatedRequest<{ message: string; enrollment: Enrollment }>(
      `/courses/${courseId}/enroll`,
      { method: 'POST' },
    ),

  getEnrollmentStatus: (courseId: string) =>
    authenticatedRequest<EnrollmentStatusResponse>(
      `/courses/${courseId}/enrollment`,
    ),

  getMyEnrollments: () =>
    authenticatedRequest<MyEnrollmentsResponse>('/courses/enrolled'),

  // Add these methods inside your existing courseApi object:
  getLessons: (courseId: string) =>
    authenticatedRequest<CourseLessonsResponse>(`/courses/${courseId}/lessons`),

  completeLesson: (courseId: string, lessonId: string) =>
    authenticatedRequest<CompleteLessonResponse>(
      `/courses/${courseId}/lessons/${lessonId}/complete`,
      { method: 'PATCH' },
    ),
};

export type CourseLesson = {
  id: string;
  title: string;
  isCompleted: boolean;
};

export type CourseLessonsResponse = {
  courseId: string;
  courseTitle: string;
  totalLessons: number;
  completedLessons: number;
  progressPercentage: number;
  lessons: CourseLesson[];
};

export type CompleteLessonResponse = {
  message: string;
  courseId: string;
  lessonId: string;
  completedLessons: number;
  totalLessons: number;
  progressPercentage: number;
};
