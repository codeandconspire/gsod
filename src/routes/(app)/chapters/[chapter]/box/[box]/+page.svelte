<script>
  import { setOffset } from '$lib/Text.svelte'
  import Page from '../../+page.svelte'
  import Box from '$lib/Box.svelte'

  export let data

  setOffset(1)
</script>

<Page {data}>
  <Box {data} />
</Page>
