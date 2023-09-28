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
  .figure {
    display: flex;
    flex-direction: column;
    gap: 1.25rem 2rem;
    text-align: center;
  }

  .main {
    background: #f8f8f8;
    padding: var(--page-gutter);
  }

  .figure:not(.fill) .main {
    border-radius: 0.5rem;
    padding: 1.5rem;
  }

  @media (width > 70rem) {
    .figure:not(.fill) {
      flex-direction: row;
      flex-wrap: nowrap;
      text-align: right;
    }

    .figure:not(.fill) .main {
      max-width: var(--text-width);
    }

    .figure:not(.fill) .caption {
      position: sticky;
      top: var(--sticky-top-margin);
    }
  }

  .figure :global(img) {
    width: 100%;
  }

  .caption {
    margin: 0 auto;
    max-width: 35rem;
    text-wrap: balance;
  }
</style>
