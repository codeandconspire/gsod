<script>
  import { setOffset } from '$lib/Text.svelte'
  import * as footnotes from '$lib/Footnotes.svelte'
  import * as figure from '$lib/Figure.svelte'
  import Page from '../../+page.svelte'
  import CaseStudy from '$lib/CaseStudy.svelte'

  export let data

  footnotes.reset()
  figure.reset()

  setOffset(1)
</script>

<Page {data}>
  <CaseStudy {data} />
</Page>
