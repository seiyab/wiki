const zero = new Proxy(() => zero, {
  get() {
    return zero;
  },

  has() {
    return true;
  },
});

export function optionalChain(original) {
  if (typeof original !== "object") return original;
  return new Proxy(original, {
    get(target, key) {
      const value = target[key];
      if (Object.hasOwn(target, key)) return value;
      if (value === null || value === undefined) return zero;
      if (value === optionalChain(Object.getPrototypeOf(target))[key]) {
        return (...args) => optionalChain(target[key](...args));
      }
      return value;
    },
  });
}
