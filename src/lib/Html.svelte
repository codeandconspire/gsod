<script>
  /** @type {('small'|'large')?} */
  export let size = null
</script>

<div
  class="html {$$props.class || ''}"
  class:large={size === 'large'}
  class:small={size === 'small'}>
  <slot />
</div>

<style>
  .html {
    font-size: 1.125rem;
    line-height: 1.4;
    letter-spacing: -0.005em;
  }

  .html.small {
    font-family: var(--sans-serif);
    font-size: var(--framework-font-size);
    letter-spacing: 0;
  }

  .html.large {
    font-family: var(--sans-serif);
    max-width: var(--text-width);
    font-weight: var(--sans-serif-normal);
    line-height: 1.3;
    font-size: clamp(1.25rem, 3vw, 1.75rem);
  }

  @media (width > 40rem) {
    .html.large {
      line-height: 1.2;
    }
  }

  .html :global(p) {
    margin: 1em 0;
  }

  .html.large :global(p) {
    text-wrap: balance;
  }

  .html :global(:first-child) {
    margin-top: 0 !important;
  }

  .html :global(:last-child) {
    margin-bottom: 0 !important;
  }

  /* Headings */

  .html :global(:is(h1, h2, h3, h4, h5, h6, .h1, .h2, .h3, .h4, .h5, .h6)) {
    font-family: var(--sans-serif);
    font-weight: var(--sans-serif-bold);
    line-height: 1.3;
    letter-spacing: 0;
    margin: 1em 0;
    text-wrap: balance;
  }

  .html :global(h1),
  .html :global(.h1) {
    font-size: clamp(2.5rem, 5vw, 4.5rem);
    font-weight: var(--sans-serif-heavy);
    letter-spacing: -0.005em;
    line-height: 1.05;
  }

  .html :global(h2),
  .html :global(.h2) {
    font-size: clamp(2rem, 5vw, 2.5rem);
    font-weight: var(--sans-serif-heavy);
    letter-spacing: -0.005em;
    line-height: 1.15;
    margin: var(--space-medium) 0 var(--space-small);
  }

  .html :global(h2:first-child),
  .html :global(.h2:first-child) {
    margin-top: var(--space-small);
  }

  .html :global(h3),
  .html :global(.h3) {
    font-size: clamp(1.5rem, 3vw, 1.75rem);
    margin: calc(var(--space-medium) - var(--space-small)) 0 var(--space-small);
    line-height: 1.23;
  }

  .html :global(h3:first-child),
  .html :global(.h3:first-child) {
    margin-top: var(--space-small);
  }

  .html :global(h4),
  .html :global(.h4) {
    font-size: inherit;
  }

  .html :global(h5),
  .html :global(.h5),
  .html :global(h6),
  .html :global(.h6) {
    font-size: 1rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  /* Quotes */

  .html :global(blockquote) {
    display: flex;
    gap: 0.25em;
    color: var(--theme-primary-color);
    font-family: var(--sans-serif);
    line-height: 1.3;
    letter-spacing: 0;
    margin: 1em 0;
    text-wrap: balance;
    font-weight: 700;
    font-size: clamp(1.5rem, 3vw, 1.75rem);
  }

  .html :global(blockquote::before) {
    content: '“';
  }

  /* Lists */

  .html :global(:is(ul, ol)) {
    margin: 1.5em 0 1.5em 1em;
    counter-reset: list;
  }

  .html :global(li) {
    display: flex;
    align-items: baseline;
    gap: 0.75rem;
    margin: 0.75em 0;
    text-wrap: balance;
  }

  .html :global(ul li::before) {
    content: '';
    display: block;
    width: 0.35em;
    height: 0.35em;
    border-radius: 50%;
    margin: 0.5em 0 0 1px;
    flex: 0 0 auto;
    align-self: flex-start;
    background: var(--theme-primary-color, currentcolor);
  }

  .html :global(ol li::before) {
    counter-increment: list;
    content: counter(list) '. ';
    font-weight: bold;
    min-width: 1rem;
    color: var(--theme-dark-color, currentcolor);
  }

  /* Links */

  .html :global(a) {
    color: var(--theme-dark-color, #1e3e5b);
    text-decoration: underline;
    transition: opacity 100ms ease-out, color 100ms ease-out;
  }

  .html :global(a:active) {
    opacity: 0.5;
    transition: none;
  }

  .html :global(a:hover) {
    color: #000;
  }

  .html :global(a sup) {
    font-size: 0.75em;
    font-size: var(--framework-font-size);
    font-family: var(--sans-serif);
    letter-spacing: 0;

    /* Prevent text underline */
    display: inline-block;
  }
</style>
