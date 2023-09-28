<script>
  export let fill = false
</script>

<figure class="figure" class:fill>
  <div class="main">
    <div class:u-container={fill}>
      <slot />
    </div>
  </div>
  {#if $$slots.description}
    <figcaption class:u-container={fill}>
      <div class="caption">
        <slot name="description" />
      </div>
    </figcaption>
  {/if}
</figure>

<style>
  .main {
    background: #f8f8f8;
    padding: var(--page-gutter);
  }

  .figure:not(.fill) .main {
    border-radius: 0.5rem;
    padding: 1.5rem;
  }

  .figure :global(img) {
    width: 100%;
  }

  .caption {
    margin: 1.25rem auto 0;
    max-width: 35rem;
    text-align: center;
    text-wrap: balance;
  }
</style>
