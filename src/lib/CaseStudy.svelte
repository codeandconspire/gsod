<script>
  import { setOffset, asText } from '$lib/Text.svelte'
  import * as footnotes from '$lib/Footnotes.svelte'
  import Modules from '$lib/Modules.svelte'
  import Details from '$lib/Details.svelte'
  import { resolve } from '$lib/sanity.js'
  import Dialog from '$lib/Dialog.svelte'
  import Image from '$lib/Image.svelte'
  import Html from '$lib/Html.svelte'

  export let data

  footnotes.reset()

  setOffset(-1)
</script>

<Dialog open href={resolve(data.chapter)}>
  <div class="case">
    <h1 class="heading">
      Case Study: <strong class="title">{asText(data.case.title)}</strong>
    </h1>
    {#if data.case.image}
      <div class="banner">
        <Image
          class="image"
          slot="image"
          image={data.case.image}
          width={900}
          variants={[300, 600, 900]} />
      </div>
    {/if}
    <Modules modules={data.case.modules} narrow />
    {#if data.case.downloads?.length}
      <div style="margin-top: -1px">
        <Details small heading="Download as PDF">
          <div class="downloads">
            {#each data.case.downloads as download}
              <a href={download.file.asset.url} download class="download">
                {#if download.thumbnail}
                  <Image
                    class="thumbnail"
                    alt={download.label}
                    image={download.thumbnail}
                    sizes="10rem"
                    variants={[200, 400, 600]} />
                {/if}
                <Html class="description">
                  <h4 class="h4 label">{download.label}</h4>
                  {#if download.description}
                    <p>{download.description}</p>
                  {/if}
                </Html>
              </a>
            {/each}
          </div>
        </Details>
      </div>
    {/if}
  </div>
</Dialog>

<style>
  .heading {
    font-size: clamp(2rem, 5vw, 2.5rem);
    font-family: var(--sans-serif);
    letter-spacing: -0.005em;
    line-height: 1.15;
    margin: 0 0 0.75em;
    white-space: balance;
    color: var(--theme-primary-color);
  }

  .title {
    font-weight: var(--sans-serif-heavy);
    color: var(--theme-dark-color);
  }

  .title::before {
    content: ' ';
  }

  .banner :global(img) {
    width: 100%;
    height: auto;
    border-radius: var(--border-radius);
    margin: 0 0 var(--space-small);
  }

  /* Downloads */

  .downloads {
    display: flex;
    flex-direction: column;
    gap: clamp(1rem, 5vw, 2rem);
  }

  .download {
    display: flex;
    gap: clamp(1rem, 5vw, 2rem);
    align-items: flex-start;
    transition: opacity 100ms ease-out;
    margin-top: 1rem;
  }

  .download:active {
    opacity: 0.7;
    transition: none;
  }

  .download :global(.thumbnail) {
    width: clamp(5rem, 10vw, 8rem);
    height: auto;
    user-select: none;
    box-shadow: 0 0.3rem 1.25rem rgba(0, 0, 0, 0.08),
      0 1px 0 0 rgba(0, 0, 0, 0.1);
    flex: 0 0 auto;
  }

  .download :global(.label) {
    text-wrap: balance;
    max-width: 20em;
    margin: 0 0 0.5em !important;
  }

  .download:hover :global(.label) {
    text-decoration: underline;
    text-decoration-thickness: 1.5px !important;
  }

  .download :global(.description) {
    flex: 1 1 auto;
    font-family: var(--sans-serif);
    font-size: var(--framework-font-size);
  }
</style>
