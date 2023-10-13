<script>
  import { page } from '$app/stores'

  import { resolve } from '$lib/sanity.js'
  import Ranking from '$lib/Ranking.svelte'
  import Theme from '$lib/Theme.svelte'
  import Intro from '$lib/Intro.svelte'
  import Menu from '$lib/Menu.svelte'

  export let data

  console.log(data)

  $: ranking = data.countries
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

<Theme primary="#62a3bf" secondary="#326593" dark="#1f5280">
  <Intro simple back={resolve(ranking.cover)}>
    <Menu slot="menu" items={menu} color />
    <span slot="heading">{ranking.title}</span>
    <span slot="subheading">{ranking.subheading}</span>
  </Intro>
</Theme>

<Ranking />
