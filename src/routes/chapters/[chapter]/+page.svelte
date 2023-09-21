<script>
  import Hero from '$lib/Hero.svelte'

  export let data

  $: chapter = data.chapter
</script>

<Hero heading={chapter.title} subheading={chapter.subheading} back="/" />
