<script>
  import Level from '$lib/Level.svelte'
  import { luma } from '$lib/utils.js'

  export let hover = false

  /** @type {string?}*/
  export let primaryColor = null

  /** @type {string?}*/
  export let secondaryColor = null

  /** @type {({ src: string } & { [key: string]: string })?} */
  export let image = null

  /** @type {{ href?: string, label: string }?}*/
  export let link = null

  /** @type {string?}*/
  export let heading = null

  /** @type {string?}*/
  export let subheading = null
</script>

<article
  class="card"
  class:hover
  class:inverse={image || (primaryColor && luma(primaryColor) < 165)}>
  {#if image}
    <div class="graphic">
      <img alt="" {...image} class="image" />
    </div>
  {:else if primaryColor}
    <div
      class="graphic"
      style:--primary-color={primaryColor}
      style:--secondary-color={secondaryColor}>
      <Level />
    </div>
  {/if}
  <div class="body" class:overlay={image}>
    {#if heading || subheading}
      <h3 class="heading">
        {#if subheading}
          <span class="subheading">{subheading}</span>
          <br />
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
    color: #000;
  }

  .card.inverse {
    color: #fff;
  }

  .card::before {
    content: '';
    display: block;
    padding-top: 65%;
  }

  .graphic {
    display: grid;
    position: absolute;
    inset: 0;
    background-color: var(--primary-color);
    transform: var(--tilt-background-transform);
    transition: var(--tilt-transform-transition);
  }

  .image {
    object-fit: cover;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }

  .body {
    display: flex;
    flex-direction: column;
    gap: clamp(0.3rem, 0.8vw, 1.2rem);
    padding: clamp(1.2rem, 2.5vw, 2rem);
    width: 100%;
    position: relative;
    transform: var(--tilt-foreground-transform);
    transition: var(--tilt-transform-transition);
  }

  .overlay {
    text-shadow: 0 0 0.8em rgba(0, 0, 0, 0.2);
  }

  .heading {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    font-size: clamp(1.25rem, 3vw, 2rem);
    font-weight: var(--sans-serif-heavy);
    text-wrap: balance;
  }

  .subheading {
    margin-bottom: auto;
    font-size: 1rem;
    font-weight: var(--sans-serif-normal);
    text-wrap: balance;
  }

  .link {
    opacity: 0.2;
    transition: opacity var(--tilt-duration, 200ms) var(--tilt-delay, 0)
      var(--tilt-easing-function, ease-out);
  }

  .link:hover,
  .card.hover .link {
    opacity: 1;
  }

  a.link::after {
    content: '';
    position: absolute;
    inset: 0;
  }
</style>
