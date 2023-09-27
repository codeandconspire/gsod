<div class="html {$$props.class || ''}">
  <slot />
</div>

<style>
  .html {
    font-size: 1.125rem;
    line-height: 1.4;
    letter-spacing: -0.005em;
    letter-spacing: -0.005em;
  }

  .html :global(p) {
    margin: 1em 0;
  }

  .html :global(:first-child) {
    margin-top: 0;
  }

  .html :global(:last-child) {
    margin-bottom: 0;
  }

  /* Headings */

  .html :global(:is(h1, h2, h3, h4, h5, h6)) {
    font-family: var(--sans-serif);
    font-weight: var(--sans-serif-bold);
    line-height: 1.3;
    letter-spacing: 0;
    margin: 1em 0;
    text-wrap: balance;
  }

  .html :global(h1) {
    font-size: clamp(2.5rem, 5vw, 4.5rem);
    font-weight: var(--sans-serif-heavy);
    letter-spacing: -0.005em;
    line-height: 1.05;
  }

  .html :global(h2) {
    font-size: clamp(2rem, 5vw, 2.5rem);
    font-weight: var(--sans-serif-heavy);
    letter-spacing: -0.005em;
    line-height: 1.15;
    margin: 0.75em 0;
  }

  .html :global(h3) {
    font-size: clamp(1.75rem, 5vw, 2rem);
    margin: 0.75em 0;
    line-height: 1.25;
  }

  .html :global(h4) {
    font-size: inherit;
  }

  .html :global(:is(h6, h5)) {
    font-size: 1rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  /* Quotes */

  .html :global(blockquote) {
    display: flex;
    gap: 0.25em;
    color: var(--theme-secondary-color);
    font-family: var(--sans-serif);
    line-height: 1.3;
    letter-spacing: 0;
    margin: 1em 0;
    text-wrap: balance;
    font-weight: 700;
    font-size: clamp(1.25rem, 3vw, 1.75rem);
  }

  .html :global(blockquote::before) {
    content: "“";
  }

  /* Lists */

  .html :global(:is(ul, ol)) {
    margin: 1.5em 0;
    counter-reset: list;
  }

  .html :global(li) {
    padding-left: 1.75em;
    position: relative;
    margin: 0.75em 0;
  }

  .html :global(ul li::before) {
    content: '';
    width: 0.35em;
    height: 0.35em;
    position: absolute;
    top: 0.5em;
    left: 1px;
    border-radius: 50%;
    background: var(--theme-primary-color, currentColor);
  }

  .html :global(ol li::before) {
    counter-increment: list;
    content: counter(list) '. ';
    position: absolute;
    top: 0;
    left: 0;
    font-weight: bold;
    color: var(--theme-primary-color, currentColor);
  }

  .html :global(a) {
    color: blue;
    text-decoration: underline;
  }

  .html :global(a sup) {
    /* Prevent text underline */
    display: inline-block;
  }
</style>
