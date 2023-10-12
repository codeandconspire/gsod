<script>
  import { page } from '$app/stores'

  import { resolve } from '$lib/sanity.js'
  import Theme from '$lib/Theme.svelte'
  import Intro from '$lib/Intro.svelte'
  import Menu from '$lib/Menu.svelte'

  export let data

  $: ranking = data.ranking
  $: menu = ranking.cover.menu.map(function each(item) {
    const { link, label } = item
    const href = resolve(link)
    const children = item.children?.map(each)
    const active =
      $page.url.pathname === href ||
      children?.some((child) => $page.url.pathname === child.href)
    return { href, label, active, children }
  })
</script>

<Theme
  primary="#000"
  secondary="#000"
  dark="#000">
  sdafasdf
  <Intro simple back={resolve(ranking.cover)}>
    <Menu slot="menu" items={menu} color />
    <span slot="heading">{ranking.title}</span>
    <span slot="subheading">{ranking.subheading}</span>
  </Intro>
</Theme>
