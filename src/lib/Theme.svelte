<script>
  import { luma, shade } from '$lib/utils.js'

  /** @type {string} */
  export let primary

  /** @type {string} */
  export let secondary

  $: dark = shade(primary, -30)
  $: text = luma(primary) > 165 ? '#000' : '#fff'
</script>

<div
  class="theme"
  style:--theme-dark-color={dark}
  style:--theme-text-color={text}
  style:--theme-primary-color={primary}
  style:--theme-secondary-color={secondary}>
  <slot />
</div>

<style>
  .theme {
    --theme-text-color: #fff;
    --theme-dark-color: #1e3e5b;
    --theme-primary-color: #62a3bf;
    --theme-secondary-color: #326593;
  }
</style>
