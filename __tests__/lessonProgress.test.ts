import { calculateProgress } from "../src/utils/lessonProgress";

describe("calculateProgress", () => {
  it("returns 0 when no lessons are completed", () => {
    expect(calculateProgress(0, 4)).toBe(0);
  });

  it("calculates 25% progress", () => {
    expect(calculateProgress(1, 4)).toBe(25);
  });

  it("calculates 50% progress", () => {
    expect(calculateProgress(2, 4)).toBe(50);
  });

  it("calculates 75% progress", () => {
    expect(calculateProgress(3, 4)).toBe(75);
  });

  it("returns 100% when all lessons are completed", () => {
    expect(calculateProgress(4, 4)).toBe(100);
  });

  it("returns 0 for an empty course", () => {
    expect(calculateProgress(0, 0)).toBe(0);
  });

  it("does not return negative progress", () => {
    expect(calculateProgress(-1, 4)).toBe(0);
  });

  it("does not exceed 100%", () => {
    expect(calculateProgress(5, 4)).toBe(100);
  });
});
