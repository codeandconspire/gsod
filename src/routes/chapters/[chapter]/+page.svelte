<script>
  import { PortableText } from '@portabletext/svelte'

  import Hero from '$lib/Hero.svelte'

  export let data

  $: chapter = data.chapter
</script>

<Hero heading={chapter.title} subheading={chapter.subheading} back="/" />
