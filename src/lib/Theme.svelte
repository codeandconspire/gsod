<script>
  import { luma, hexToRgb } from '$lib/utils.js'

  /** @type {string} */
  export let primary

  /** @type {string} */
  export let secondary

  /** @type {string} */
  export let dark

  $: text = primary && luma(primary) > 180 ? '#000' : '#fff'
  $: selection = primary ? hexToRgb(primary) : null
</script>

<div
  class="theme"
  style:--theme-text-color={text}
  style:--theme-primary-color={primary}
  style:--theme-secondary-color={secondary}
  style:--theme-dark-color={dark}
  style:--theme-selection-color={`rgba(${selection}, 0.25)`}>
  <slot />
</div>

<style>
  .theme {
    --theme-text-color: #fff;
    --theme-primary-color: #62a3bf;
    --theme-secondary-color: #326593;
    --theme-dark-color: #1f5280;
    --theme-selection-color: rgba(98, 163, 191, 0.25);
  }
</style>
