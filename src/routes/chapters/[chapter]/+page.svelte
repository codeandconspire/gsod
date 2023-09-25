<script>
  import { page } from '$app/stores'

  import Text, { asText } from '$lib/Text.svelte'
  import { resolve } from '$lib/sanity.js'
  import Html from '$lib/Html.svelte'
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

<div class="content">
  <nav class="toc">
    <ol class="items">
      {#each chapter.modules as module}
        {#if module._type === 'richText'}
          {@const heading = module.content.find(
            (block) => block.style === 'h2'
          )}
          {#if heading}
            <li class="heading">
              <a href="{resolve(chapter)}#{heading._key}">
                {asText([heading])}
              </a>
            </li>
          {/if}
        {/if}
      {/each}
    </ol>
  </nav>
  <div class="body">
    {#each chapter.modules as module}
      {#if module._type === 'divider'}
        <div
          class="divider"
          class:small={module.size === 'small'}
          class:medium={module.size === 'medium'}
          class:large={module.size === 'large'} />
      {:else if module._type === 'richText'}
        <div class="module">
          <Html>
            <Text content={module.content} />
          </Html>
        </div>
      {/if}
    {/each}
  </div>
</div>

<style>
  .content {
    display: grid;
    grid-template-columns: auto var(--content-max-width);
    gap: clamp(1.5rem, 3vw, 4.5rem);
    max-width: min(calc(100vw - var(--page-gutter) * 2), var(--page-max-width));
    margin: clamp(3rem, 10vh, 7rem) auto;
  }

  .items {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .divider,
  .divider.medium {
    margin: clamp(2rem, 8vh, 4rem) auto;
  }

  .divider.small {
    margin: clamp(1rem, 4vh, 2rem) auto;
  }

  .divider.large {
    margin: clamp(4rem, 12vh, 8rem) auto;
  }
</style>
