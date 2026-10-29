export function calculateProgress(
  completedLessons: number,
  totalLessons: number,
): number {
  if (totalLessons <= 0) {
    return 0;
  }

  const safeCompletedLessons = Math.max(
    0,
    Math.min(completedLessons, totalLessons),
  );

  return Math.round((safeCompletedLessons / totalLessons) * 100);
}
