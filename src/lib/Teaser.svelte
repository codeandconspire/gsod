<script>
  export let heading

  export let flip = false

  /** @type {string?} */
  export let description = null

  /** @type {({ href: string } & { [key: string]: any })?} */
  export let link = null
</script>

<article class="teaser" class:flip>
  <div class="image">
    <slot name="image" />
  </div>
  <div class="content">
    <h2 class="heading">{heading}</h2>
    {#if description}<p class="description">{description}</p>{/if}
    <slot />
    {#if link}
      {@const { label, href, ...attrs } = link}
      <a {...attrs} {href} class="link">
        {label}
        <svg viewBox="0 -960 960 960" class="chevron">
          <path
            fill="currentcolor"
            d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
        </svg>
      </a>
    {/if}
  </div>
</article>

<style>
  .teaser {
    display: flex;
    flex-direction: row-reverse;
    align-items: flex-start;
    gap: clamp(2rem, 4vw, 8rem);
    flex-wrap: wrap;
  }

  @media (min-width: 40rem) {
    .teaser {
      flex-wrap: nowrap;
    }

    .teaser.flip {
      flex-direction: row;
    }
  }

  .image {
    width: 100%;
  }

  @media (min-width: 40rem) {
    .image {
      flex: 1 1 clamp(20rem, 20vw, 33rem);
    }
  }

  .image :global(img) {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1.25em;
    width: 100%;
  }

  @media (min-width: 40rem) {
    .teaser:not(.flip) .content {
      align-items: flex-end;
      text-align: right;
    }

    .content {
      flex: 1 1 clamp(25rem, 25vw, 20rem);
    }
  }

  .heading {
    font-family: var(--sans-serif);
    font-size: clamp(2rem, 5vw, 3.875rem);
    font-weight: var(--sans-serif-bold);
    color: var(--theme-primary-color);
    line-height: 1.1;
    margin: -0.15em 0;
  }

  .description {
    font-family: var(--sans-serif);
    font-size: clamp(1.5rem, 3vw, 1.75rem);
    color: var(--theme-primary-color);
  }

  .link {
    display: flex;
    align-items: center;
    padding: 0.8rem 1.1rem 0.8rem 1.5rem;
    font-family: var(--sans-serif);
    font-weight: var(--sans-serif-bold);
    border-radius: var(--border-radius);
    color: var(--theme-text-color);
    background-color: var(--theme-primary-color);
    transition: background-color 190ms cubic-bezier(0.33, 1, 0.68, 1);
    font-size: var(--framework-font-size);
  }

  .link:hover {
    background-color: var(--theme-dark-color);
  }

  .chevron {
    display: block;
    width: 1.35em;
    margin: 0 -0.2em 0 0;
    height: auto;
    transition: transform 190ms cubic-bezier(0.33, 1, 0.68, 1);
  }

  .link:hover .chevron {
    transform: translateX(0.15rem);
  }
</style>
