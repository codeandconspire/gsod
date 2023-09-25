<script>
  import { page } from '$app/stores'

  import { resolve } from '$lib/sanity.js'
  import Text from '$lib/Text.svelte'
  import Hero from '$lib/Hero.svelte'
  import Menu from '$lib/Menu.svelte'

  export let data

  $: chapter = data.chapter
  $: menu = chapter.cover.menu.map(function each(item) {
    const { link, label } = item
    const href = resolve(link)
    const children = item.children?.map(each)
    const active =
      $page.url.pathname === href ||
      children?.some((child) => $page.url.pathname === child.href)
    return { href, label, active, children }
  })
</script>

<Hero
  size="small"
  back={resolve(chapter.cover)}
  primaryColor={chapter.primaryColor}
  secondaryColor={chapter.secondaryColor}>
  <Menu slot="menu" items={menu} />
  <Text slot="heading" content={chapter.title} plain />
  <Text slot="subheading" content={chapter.subheading} plain />
</Hero>
