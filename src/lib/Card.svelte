<script>
  /** @type {string?}*/
  export let primaryColor = null

  /** @type {string?}*/
  export let secondaryColor = null

  /** @type {({ src: string } & { [key: string]: string })?} */
  export let image = null

  /** @type {{ href: string, label: string }?}*/
  export let link = null

  /** @type {string?}*/
  export let heading = null

  /** @type {string?}*/
  export let subheading = null
</script>

<article class="card">
  {#if image}
    <div class="graphic">
      <img alt="" {...image} class="image" />
    </div>
  {:else if primaryColor}
    <div
      class="graphic"
      style:--primary-color={primaryColor}
      style:--secondary-color={secondaryColor} />
  {/if}
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
    <a href={link.href} class="link">
      {link.label}
    </a>
  {/if}
</article>

<style>
  .card {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;
    border-radius: var(--border-radius);
    background-color: #f8f8f8;
    font-family: var(--sans-serif);
    box-shadow: var(--tilt-box-shadow);
    transition: var(--tilt-box-shadow-transition);
  }

  .graphic {
    aspect-ratio: 1.8;
    position: relative;
    background-color: var(--primary-color);
  }

  .image {
    object-fit: cover;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }

  .heading {
    padding: 1.2rem;
    font-size: clamp(1.25rem, 3vw, 2rem);
    font-weight: var(--sans-serif-heavy);
  }

  .subheading {
    font-size: 1rem;
    font-weight: var(--sans-serif-normal);
  }

  .link {
    padding: 1.2rem;
    font-weight: var(--sans-serif-bold);
  }

  .link:not(:first-child) {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }

  .link::after {
    content: '';
    position: absolute;
    inset: 0;
  }
</style>
