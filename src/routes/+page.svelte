<script>
  import Text from '$lib/Text.svelte'
  import Menu from '$lib/Menu.svelte'
  import Hero from '$lib/Hero.svelte'

  export let data

  $: cover = data.cover
</script>

<Hero
  fill
  primaryColor={cover.primaryColor}
  secondaryColor={cover.secondaryColor}>
  <Menu slot="menu" items={cover.menu} />
  <span slot="heading">
    <Text content={cover.title} let:block>
      {#if block.style === 'normal'}
        <Text content={block.children} />
      {/if}
    </Text>
  </span>
  <Text slot="subheading" content={cover.subheading} plain />
</Hero>

<ol>
  {#each cover.chapters as chapter}
    <li>
      <a href="/chapters/{chapter.slug.current}">
        Chapter
        <br />
        {chapter.shortname || chapter.title}
        <br />
        Explore chapter
      </a>
    </li>
  {/each}
</ol>
