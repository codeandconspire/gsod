<script>
  import { setOffset } from '$lib/Text.svelte'
  import Chapter from '$lib/Chapter.svelte'
  import Meta from '$lib/Meta.svelte'
  import Box from '$lib/Box.svelte'

  export let data

  setOffset(1)
</script>

<Meta {...data.meta} />

<Chapter {data}>
  <Box {data} />
</Chapter>
