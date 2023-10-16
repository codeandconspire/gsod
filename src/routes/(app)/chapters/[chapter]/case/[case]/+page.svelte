<script>
  import CaseStudy from '$lib/CaseStudy.svelte'
  import { setOffset } from '$lib/Text.svelte'
  import Page from '../../+page.svelte'

  export let data

  setOffset(1)
</script>

<Page {data}>
  <CaseStudy {data} />
</Page>
