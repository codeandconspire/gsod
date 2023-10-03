<script>
  import Text, { setOffset, asText } from '$lib/Text.svelte'
  import * as footnotes from '$lib/Footnotes.svelte'
  import * as figure from '$lib/Figure.svelte'
  import Modules from '$lib/Modules.svelte'
  import { resolve } from '$lib/sanity.js'
  import Dialog from '$lib/Dialog.svelte'
  import Theme from '$lib/Theme.svelte'
  import Image from '$lib/Image.svelte'
  import Html from '$lib/Html.svelte'
  import Page from '../+page.svelte'

  export let data

  footnotes.reset()
  figure.reset()

  setOffset(1)
</script>

<Theme
  primary={data.chapter.primaryColor}
  secondary={data.chapter.secondaryColor}>
  <Dialog open href={resolve(data.chapter)}>
    <Image
      slot="image"
      image={data.case.image}
      width={900}
      variants={[300, 600, 900]} />
    <div class="case">
      <h1 class="heading">
        Case Study: <strong class="title">{asText(data.case.title)}</strong>
      </h1>
      <Html size="large" class="description">
        <Text content={data.case.description} />
      </Html>
      <Modules modules={data.case.modules} />
    </div>
  </Dialog>
</Theme>

<Page {data} />

<style>
  .heading {
    margin-bottom: clamp(1rem, 4vw, 2rem);
    font-family: var(--sans-serif);
    font-size: clamp(1.5rem, 5vw, 2.625rem);
  }

  .title {
    font-weight: var(--sans-serif-heavy);
  }

  .case :global(.description) {
    --text-width: 100%;

    margin-bottom: clamp(1rem, 4vw, 2rem);
  }
</style>
