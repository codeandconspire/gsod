<script>
  import { page } from '$app/stores'

  export let title = 'The Global State of Democracy 2023'
  export let description = ''
  export let image = null

  const truncate = (value) =>
    value.length > 155
      ? value
          .split('. ')
          .reduce((str, sentence) => {
            return str.length < 155 ? str + `${sentence}. ` : str
          }, '')
          .trim()
      : value
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={truncate(description)} />
  <meta property="og:url" content={$page.url.href} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={truncate(description)} />
  {#if image?.asset?.url}
    <meta property="og:image" content={image.asset.url} />
  {/if}
</svelte:head>
