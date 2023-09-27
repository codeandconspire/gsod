/**
 * @param {string} color
 * @returns {number}
 */
export function luma(color) {
  const hex = color.replace(/^#/, '')
  const rgb = parseInt(hex, 16)
  const r = (rgb >> 16) & 0xff
  const g = (rgb >> 8) & 0xff
  const b = (rgb >> 0) & 0xff

  // per ITU-R BT.709
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

/**
 * @param {string} color
 * @param {number} amount
 * @returns {string}
 */
export function shade(color, amount) {
  return (
    '#' +
    color
      .replace(/^#/, '')
      .replace(/../g, (color) =>
        (
          '0' +
          Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)
        ).slice(-2)
      )
  )
}
