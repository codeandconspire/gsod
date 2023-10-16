<script>
  import { setOffset, asText } from '$lib/Text.svelte'
  import * as footnotes from '$lib/Footnotes.svelte'
  import * as figure from '$lib/Figure.svelte'
  import Modules from '$lib/Modules.svelte'
  import { resolve } from '$lib/sanity.js'
  import Dialog from '$lib/Dialog.svelte'
  import Page from '../../+page.svelte'

  export let data

  footnotes.reset()
  figure.reset()

  setOffset(1)
</script>

<Page {data}>
  <Dialog open href={resolve(data.chapter)}>
    <div class="box">
      <h1 class="heading">
        {data.box.shortname}
        <strong class="title">{asText(data.box.title)}</strong>
      </h1>
      <Modules modules={data.box.modules} />
    </div>
  </Dialog>
</Page>

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
</style>
