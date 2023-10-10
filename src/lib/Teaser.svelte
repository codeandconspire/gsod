<script>
  import Button from '$lib/Button.svelte'
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
      <Button {...attrs} {href}>
        {label}
      </Button>
    {/if}
  </div>
</article>

<style>
  .teaser {
    display: grid;
    gap: clamp(2rem, 5vw, 5rem);
  }

  @media (width > 60rem) {
    .teaser {
      grid-template-columns: 1fr 1fr;
      align-items: self-start;
    }

    .teaser.flip {
      text-align: right;
    }
  }

  .image {
    width: 100%;
    order: -1;
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

  @media (width > 60rem) {
    .teaser.flip .content {
      order: -2;
      align-items: flex-end;
    }
  }

  .heading {
    font-family: var(--sans-serif);
    font-size: clamp(2rem, 5vw, 3.875rem);
    font-weight: var(--sans-serif-bold);
    color: var(--theme-primary-color);
    line-height: 1.1;
    margin: -0.15em 0;
    text-wrap: balance;
  }

  .description {
    font-family: var(--sans-serif);
    color: var(--theme-dark-color);
    font-size: clamp(1.5rem, 3vw, 1.75rem);
    text-wrap: balance;
  }
</style>
