<script>
  import CaseStudy from '$lib/CaseStudy.svelte'
  import { setOffset } from '$lib/Text.svelte'
  import Chapter from '$lib/Chapter.svelte'
  import Meta from '$lib/Meta.svelte'

  export let data

  setOffset(1)
</script>

<Meta {...data.meta} />

<Chapter {data}>
  <CaseStudy {data} />
</Chapter>
