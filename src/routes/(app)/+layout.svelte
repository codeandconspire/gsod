<script>
  import { page } from '$app/stores'

  import Footnotes from '$lib/Footnotes.svelte'
  import { resolve } from '$lib/sanity.js'
  import Footer from '$lib/Footer.svelte'

  export let data
  export let form

  $: groups = data.settings.footer?.groups?.map((group) => {
    return group.links.map((item) => {
      const { label, link } = item
      const href = resolve(link)
      const active = $page.url.pathname === href
      return { href, label, active }
    })
  })
</script>

<div class="layout">
  <div class="content"><slot /></div>
  <Footer form={form?.signup} {groups} />
</div>

<style>
  @import url('$lib/main.css');

  .layout {
    display: flex;
    flex-direction: column;
    min-height: 100svh;
  }

  .content {
    margin-bottom: auto;
  }
</style>
