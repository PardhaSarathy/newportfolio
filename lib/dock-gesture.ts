/** Distinguishes a navigation tap from a finger sliding across the dock. */
export class DockGesture {
  private active: {
    pointerId: number;
    x: number;
    y: number;
    dragged: boolean;
  } | null = null;
  private draggedOnRelease = false;

  begin(pointerId: number, x: number, y: number) {
    this.active = { pointerId, x, y, dragged: false };
    this.draggedOnRelease = false;
  }

  move(pointerId: number, x: number, y: number) {
    if (this.active?.pointerId !== pointerId) return false;
    // Allow the small amount of movement that occurs during an ordinary tap.
    if (Math.hypot(x - this.active.x, y - this.active.y) > 8) {
      this.active.dragged = true;
    }
    return true;
  }

  end(pointerId: number) {
    if (this.active?.pointerId !== pointerId) return false;
    this.draggedOnRelease = this.active.dragged;
    this.active = null;
    return true;
  }

  consumeClick(detail: number) {
    // Keyboard / assistive-technology activation has detail=0 and stays native.
    const suppress = detail > 0 && this.draggedOnRelease;
    this.draggedOnRelease = false;
    return suppress;
  }

  cancel() {
    this.active = null;
    this.draggedOnRelease = false;
  }
}
