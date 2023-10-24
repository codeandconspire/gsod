<script>
  import Text, { setOffset, asText } from '$lib/Text.svelte'
  import * as footnotes from '$lib/Footnotes.svelte'
  import Modules from '$lib/Modules.svelte'
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
</style>
