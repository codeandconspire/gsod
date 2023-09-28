<script>
  /** @type {string?}*/
  export let heading = null
</script>

<details class="details">
  <summary class="summary">
    <span class="heading">{heading}</span>
    <div class="marker" />
  </summary>
  <div class="main">
    <slot />
  </div>
</details>

<style>
  .details {
    border: solid;
    border-width: 1px 0;
  }

  .summary {
    display: flex;
    justify-content: space-between;
    align-items: center;
    user-select: none;
    padding: 2rem 0;
    font-family: var(--sans-serif);
    font-size: clamp(2rem, 5vw, 2.5rem);
    font-weight: var(--sans-serif-heavy);
    text-wrap: balance;
    letter-spacing: -0.005em;
    line-height: 1.15;
    cursor: pointer;
  }

  .summary + * {
    margin-top: 0 !important;
  }

  .summary::-webkit-details-marker {
    display: none;
  }

  .marker {
    width: 0.8em;
    height: 0.8em;
    flex: 0 0 auto;
    transition: transform 160ms cubic-bezier(0.22, 1, 0.36, 1);
  }

  .details[open] .marker {
    transform: rotate(45deg);
  }

  .marker::before,
  .marker::after {
    content: '';
    display: block;
    order: 1;
    width: var(--icon-line-width);
    height: 100%;
    border-radius: calc(var(--icon-line-width) / 2);
    transform-origin: center;
    background-color: currentcolor;
  }

  .marker::before {
    margin-top: calc(0.5em - calc(var(--icon-line-width) / 2));
    transform: rotate(90deg)
      translate(
        calc(-0.5em + calc(var(--icon-line-width) / 2)),
        calc(-0.5em + calc(var(--icon-line-width) / 2))
      );
  }

  .marker::after {
    margin-top: -100%;
    transform: translate(
      calc(0.5em - calc(var(--icon-line-width) / 2)),
      calc(-0.5em + calc(var(--icon-line-width) / 2))
    );
  }

  .details[open] {
    padding-bottom: 1.4em;
  }
</style>
