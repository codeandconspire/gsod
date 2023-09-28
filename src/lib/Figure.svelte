<script>
  export let fill = false
</script>

<figure class="figure" class:fill>
  <slot />
  {#if $$slots.description}
    <figcaption class="caption">
      <slot name="description" />
    </figcaption>
  {/if}
</figure>

<style>
  .figure :global(img) {
    width: 100%;
  }
</style>
