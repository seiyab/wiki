export class Natural {
  static [Symbol.hasInstance](obj: unknown) {
    if (typeof obj !== "number") return false;
    return obj > 0 && Math.floor(obj) === obj;
  }
}
