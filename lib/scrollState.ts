export const scrollY = { current: 0 };
export const viewportH = { current: 0 };

if (typeof window !== "undefined") {
  viewportH.current = window.innerHeight;
  window.addEventListener("resize", () => {
    viewportH.current = window.innerHeight;
  });
}
