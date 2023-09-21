<script>
  import { page } from '$app/stores'

  import { resolve } from '$lib/sanity.js'
  import Text from '$lib/Text.svelte'
  import Menu from '$lib/Menu.svelte'
  import Hero from '$lib/Hero.svelte'

  export let data

  $: cover = data.cover
  $: menu = cover.menu.map(function each(item) {
    const { link, label } = item
    const href = resolve(link)
    const children = item.children?.map(each)
    const selected =
      $page.url.pathname === href ||
      children?.some((child) => $page.url.pathname === child.href)
    return { href, label, selected, children }
  })
</script>

<Hero
  fill
  primaryColor={cover.primaryColor}
  secondaryColor={cover.secondaryColor}>
  <Menu slot="menu" items={menu} />
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
