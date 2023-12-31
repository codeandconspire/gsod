<script>
  import Level from '$lib/Level.svelte'

  export let hover = false

  /** @type {{ href?: string, label: string }?}*/
  export let link = null

  /** @type {string?}*/
  export let heading = null

  /** @type {string?}*/
  export let subheading = null
</script>

<article class="card" class:hover class:has-image={$$slots.image}>
  <div class="graphic">
    {#if $$slots.image}
      <slot name="image" />
    {:else}
      <Level />
    {/if}
  </div>
  <div class="body">
    {#if heading || subheading}
      <h3 class="heading">
        {#if subheading}
          <span class="subheading">{subheading}</span>
        {/if}
        {heading}
      </h3>
    {/if}
    {#if link}
      <svelte:element
        this={link.href ? 'a' : 'span'}
        href={link.href}
        class="link">
        {link.label}
      </svelte:element>
    {/if}
  </div>
</article>

<style>
  .card {
    display: flex;
    overflow: hidden;
    position: relative;
    border-radius: var(--border-radius);
    background-color: #f8f8f8;
    font-family: var(--sans-serif);
    box-shadow: var(--tilt-box-shadow);
    transition: var(--tilt-box-shadow-transition);
    color: var(--theme-text-color);
    user-select: none;
  }

  .card.has-image {
    color: #fff;
    text-shadow: 0 0 1.5em rgba(0, 0, 0, 0.4);
  }

  .card::before {
    content: '';
    display: block;
    padding-top: 60%;
  }

  .graphic {
    display: grid;
    position: absolute;
    inset: 0;
    background-color: var(--theme-primary-color);
    transform: var(--tilt-background-transform);
    transition: var(--tilt-transform-transition);
  }

  .graphic :global(img) {
    object-fit: cover;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }

  .card.has-image .graphic::after {
    content: '';
    display: block;
    position: absolute;
    inset: 0;
    background: linear-gradient(
      244deg,
      rgba(0, 0, 0, 0) 30%,
      rgba(0, 0, 0, 0.15) 60%,
      rgba(0, 0, 0, 0.35) 100%
    );
  }

  .body {
    display: flex;
    flex-direction: column;
    gap: clamp(0.3rem, 0.8vw, 1.2rem);
    padding: max(1.75rem, 5.5%);
    width: 100%;
    position: relative;
    transform: var(--tilt-foreground-transform);
    transition: var(--tilt-transform-transition);
  }

  .heading {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    font-size: clamp(1.5rem, 3vw, 1.75rem);
    font-weight: var(--sans-serif-heavy);
    text-wrap: balance;
    line-height: 1.1;
  }

  .subheading {
    margin-bottom: auto;
    font-size: 1rem;
    font-weight: var(--sans-serif-normal);
    text-wrap: balance;
  }

  a.link::after {
    content: '';
    position: absolute;
    inset: 0;
  }
</style>
