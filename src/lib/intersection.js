/**
 * @param {HTMLElement} node
 * @param {{ onintersect: function(number): void, once?: boolean, threshold?: number|number[] }} params
 * @returns {{ update: function({ onintersect: function(number): void }): void, destroy: function(): void }}
 */
export function intersection(node, { onintersect, once = false, threshold }) {
  const observer = new IntersectionObserver(
    function ([entry]) {
      onintersect(entry.intersectionRatio)
      if (once && entry.isIntersecting) observer.disconnect()
    },
    { threshold }
  )

  observer.observe(node)

  return {
    update(next) {
      onintersect = next.onintersect
    },
    destroy() {
      observer.disconnect()
    }
  }
}
