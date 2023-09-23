<div class="html {$$props.class || ''}">
  <slot />
</div>

<style>
  .html {
    font-size: 1.125rem;
  }

  .html :global(:is(h1, h2, h3, h4, h5, h6)) {
    font-family: var(--sans-serif);
    font-weight: var(--sans-serif-bold);
    line-height: var(--sans-serif-line-height);
  }

  .html :global(.heavy:is(h1, h2, h3, h4, h5, h6)) {
    font-weight: var(--sans-serif-heavy);
  }

  .html :global(h1) {
    font-size: 4rem;
  }

  .html :global(h2) {
    font-size: 2.3rem;
  }

  .html :global(h3) {
    font-size: 1.8rem;
  }

  .html :global(h4) {
    font-size: 1.4rem;
  }

  .html :global(h5) {
    font-size: 1rem;
  }

  .html :global(h6) {
    font-size: 0.9375rem;
    text-transform: uppercase;
  }
</style>
