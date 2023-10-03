<script context="module">
  /**
   * @param image {import('sanity').Image & { asset: import('sanity').ImageAsset }}
   * @param size {number?}
   * @param opts {{ aspect?: number?, transforms?: Object<string, string>? }?}
   */
  export function getSrc(image, size, { aspect, transforms } = {}) {
    const { width, height } = image.asset.metadata.dimensions
    const params = {
      fit: 'min',
      width: String(size || width),
      height: String(size && aspect ? size * aspect : height),
      ...transforms
    }
    if (image.crop) {
      params.rect = [
        width * image.crop.left,
        height * image.crop.top,
        width - width * image.crop.left - width * image.crop.right,
        height - height * image.crop.top - height * image.crop.bottom
      ]
        .map(Math.floor)
        .join(',')
    }
    return `${image.asset.url}?${new URLSearchParams(params)}`
  }
</script>

<script>
  export let image

  /** @type {number?} */
  export let width = null

  /** @type {number?} */
  export let height = null

  /** @type {(number|[number, Object<string, string>])[]?} */
  export let variants = []

  export let transforms = null
  export let aspect = width && height ? height / width : null

  $: src = getSrc(image, width, { aspect, transforms })
  $: srcset = variants
    ?.map((variant) => {
      const [size, opts] = Array.isArray(variant) ? variant : [variant]
      return `${getSrc(image, size, opts)} ${size}w`
    })
    .join(',')
</script>

<img alt={image.alt || ''} {width} {height} {srcset} {...$$restProps} {src} />
