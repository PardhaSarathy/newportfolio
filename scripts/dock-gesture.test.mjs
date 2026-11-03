import assert from "node:assert/strict";
import test from "node:test";
import { DockGesture } from "../lib/dock-gesture.ts";

test("a tap with natural finger jitter still activates its link", () => {
  const gesture = new DockGesture();
  gesture.begin(1, 100, 700);
  gesture.move(1, 104, 703);
  gesture.end(1);
  assert.equal(gesture.consumeClick(1), false);
});

test("sliding to another icon cannot activate the starting link", () => {
  const gesture = new DockGesture();
  gesture.begin(1, 100, 700);
  gesture.move(1, 195, 700);
  gesture.end(1);
  assert.equal(gesture.consumeClick(1), true);
  assert.equal(
    gesture.consumeClick(1),
    false,
    "only the swipe's click is suppressed",
  );
});

test("sliding away and returning is still a preview gesture", () => {
  const gesture = new DockGesture();
  gesture.begin(1, 100, 700);
  gesture.move(1, 160, 700);
  gesture.move(1, 100, 700);
  gesture.end(1);
  assert.equal(gesture.consumeClick(1), true);
});

test("a second finger cannot move or release the primary gesture", () => {
  const gesture = new DockGesture();
  gesture.begin(1, 100, 700);
  assert.equal(gesture.move(2, 250, 700), false);
  assert.equal(gesture.end(2), false);
  assert.equal(gesture.end(1), true);
  assert.equal(gesture.consumeClick(1), false);
});

test("scroll cancellation resets the wave gesture and permits the next tap", () => {
  const gesture = new DockGesture();
  gesture.begin(1, 100, 700);
  gesture.move(1, 100, 680);
  gesture.cancel();
  assert.equal(gesture.move(1, 180, 680), false);
  assert.equal(gesture.end(1), false);
  gesture.begin(3, 160, 700);
  gesture.end(3);
  assert.equal(gesture.consumeClick(1), false);
});

test("keyboard activation remains available after a swipe without a native click", () => {
  const gesture = new DockGesture();
  gesture.begin(1, 100, 700);
  gesture.move(1, 160, 700);
  gesture.end(1);
  assert.equal(gesture.consumeClick(0), false);
});

test("a fresh tap clears any previous swipe suppression", () => {
  const gesture = new DockGesture();
  gesture.begin(1, 100, 700);
  gesture.move(1, 160, 700);
  gesture.end(1);
  gesture.begin(2, 160, 700);
  gesture.end(2);
  assert.equal(gesture.consumeClick(1), false);
});
