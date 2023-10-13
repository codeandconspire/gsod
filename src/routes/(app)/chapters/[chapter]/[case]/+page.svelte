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

<div class="ontop">
  <Theme
    primary={data.chapter.primaryColor}
    secondary={data.chapter.secondaryColor}
    dark={data.chapter.darkColor}>
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
        <Html class="description">
          <strong><Text content={data.case.description} /></strong>
        </Html>
        <Modules modules={data.case.modules} />
      </div>
    </Dialog>
  </Theme>
</div>

<Page {data} />

<style>
  .heading {
    font-size: clamp(2rem, 5vw, 2.5rem);
    font-family: var(--sans-serif);
    letter-spacing: -0.005em;
    line-height: 1.15;
    margin: 0 0 0.75em;
  }

  .title {
    font-weight: var(--sans-serif-heavy);
  }

  .case :global(.description) {
    --text-width: 100%;

    margin-bottom: 1em;
  }

  .ontop {
    position: relative;
    z-index: 2;
  }
</style>
