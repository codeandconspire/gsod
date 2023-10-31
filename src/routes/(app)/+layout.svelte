<script>
  import { resolve } from '$lib/sanity.js'
  import Footer from '$lib/Footer.svelte'

  export let data

  $: groups = data.settings.menu.map((group) => {
    return group.children
      .map((item) => {
        const { label: text, link, url, file } = item
        if (url) return { href: url, text, external: true }
        if (file) return { href: file?.asset.url, download: '', text }
        const href = resolve(link)
        return href ? { href, text } : null
      })
      .filter(Boolean)
  })
</script>

<svelte:head>
  <script
    async
    src="https://www.googletagmanager.com/gtag/js?id=G-Y8FMHP9XTC"></script>
  <script>
    window.dataLayer = window.dataLayer || []
    function gtag() {
      dataLayer.push(arguments)
    }
    gtag('js', new Date())
    gtag('config', 'G-Y8FMHP9XTC')
  </script>
</svelte:head>

<div class="layout">
  <div class="content"><slot /></div>
  <Footer {groups} />
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
