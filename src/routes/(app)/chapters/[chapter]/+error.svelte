<script>
  import { page } from '$app/stores'

  import { resolve } from '$lib/sanity'
  import Menu from '$lib/Menu.svelte'

  $: menu = $page.data.chapter?.cover?.menu.map(function each(item) {
    const { link, label } = item
    const href = resolve(link)
    const children = item.children?.map(each)
    const active =
      $page.url.pathname === href ||
      children?.some((child) => $page.url.pathname === child.href)
    return { href, label, active, children }
  })
</script>

<Menu items={menu} />

<slot />
