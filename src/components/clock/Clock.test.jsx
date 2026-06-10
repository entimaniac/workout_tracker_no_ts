// @vitest-environment jsdom

import React from "react";
import { act, render } from "@testing-library/react";
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { Clock } from "./Clock";
import { getColor } from "./ClockUtils";

vi.mock("@mui/material", () => ({
  Grid: ({ children }) => <div>{children}</div>,
  Typography: ({ children, sx = {} }) => <h1 style={sx}>{children}</h1>,
}));

const getClockNodes = (container) => {
  return container.querySelectorAll("h1");
};

const getSecondsNode = (container) => {
  return getClockNodes(container)[4];
};

const normalizeRgb = (value) => value.replace(/\s+/g, "");

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

test("clock seconds render with the live blended color and update over time", () => {
  vi.setSystemTime(new Date("2026-06-10T19:11:02.760"));

  const { container } = render(<Clock />);
  const initialSecondsNode = getSecondsNode(container);
  const initialSecondsText = initialSecondsNode.textContent.trim();

  expect(initialSecondsText).toBe("02");
  expect(normalizeRgb(window.getComputedStyle(initialSecondsNode).color)).toBe(
    normalizeRgb(getColor(new Date("2026-06-10T19:11:02.760")))
  );

  vi.setSystemTime(new Date("2026-06-10T19:11:03.760"));
  act(() => {
    vi.advanceTimersByTime(1000);
  });

  const updatedSecondsNode = getSecondsNode(container);
  const expectedUpdatedTime = new Date();

  expect(updatedSecondsNode.textContent.trim()).toBe(
    expectedUpdatedTime.getSeconds().toString().padStart(2, "0")
  );
  expect(updatedSecondsNode.textContent.trim()).not.toBe(initialSecondsText);
  expect(normalizeRgb(window.getComputedStyle(updatedSecondsNode).color)).toBe(
    normalizeRgb(getColor(expectedUpdatedTime))
  );
});
