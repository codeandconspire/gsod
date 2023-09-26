<script>
  import { luma } from '$lib/utils.js'

  /** @type {string?} */
  export let primary = null

  /** @type {string?} */
  export let secondary = null

  $: text = luma(primary) > 165 ? '#000' : '#fff'
</script>

<div
  class="theme"
  style:--theme-text-color={text}
  style:--theme-primary-color={primary}
  style:--theme-secondary-color={secondary}>
  <slot />
</div>

<style>
  .theme {
    --theme-text-color: #fff;
    --theme-primary-color: #62a3bf;
    --theme-secondary-color: #326593;
  }
</style>
