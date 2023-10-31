<script>
  import { page } from '$app/stores'

  import { resolve } from '$lib/sanity.js'
  import Ranking from '$lib/Ranking.svelte'
  import Theme from '$lib/Theme.svelte'
  import Intro from '$lib/Intro.svelte'
  import Menu from '$lib/Menu.svelte'
  import Html from '$lib/Html.svelte'
  import Meta from '$lib/Meta.svelte'

  export let data

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

<Meta {...data.meta} />

<Theme primary="#62a3bf" secondary="#326593" dark="#1f5280">
  <Intro simple back={resolve(ranking.cover)}>
    <Menu slot="menu" items={menu} color />
    <span slot="heading">{ranking.title}</span>
    <Html slot="extra">
      <p>
        This year, we have included annual global rankings of country
        performance for each of the categories of democratic
        performance—Representation, Rights, Rule of Law, and Participation—
        rather than classifying regimes on an overall basis.
      </p>
      <p>
        The focus on category-level performance (rather than on something like
        regime types) allows for a more nuanced understanding of where democracy
        is thriving and where it is suffering. It also shifts the focus from the
        broad idea of democracy generally to specific and narrower aspects of
        democracy, which are more appropriate to target for reform and
        intervention.
      </p>
      <p>
        <a href="/chapters/methodology">Read more about the methodology</a>
      </p>
    </Html>
  </Intro>
</Theme>

<Ranking />
