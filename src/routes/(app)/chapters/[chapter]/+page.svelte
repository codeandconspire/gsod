<script>
  import Chapter from '$lib/Chapter.svelte'
  import Meta from '$lib/Meta.svelte'

  export let data
</script>

<Meta {...data.meta} />

<Chapter {data} />
