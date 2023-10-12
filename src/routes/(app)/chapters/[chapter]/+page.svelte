<script>
  import { page } from '$app/stores'

  import { resolver, resolve } from '$lib/sanity.js'
  import * as footnotes from '$lib/Footnotes.svelte'
  import * as figure from '$lib/Figure.svelte'
  import { asText } from '$lib/Text.svelte'
  import Modules from '$lib/Modules.svelte'
  import Theme from '$lib/Theme.svelte'
  import Intro from '$lib/Intro.svelte'
  import Menu from '$lib/Menu.svelte'

  export let data

  let open = false

  const reset = () => {
    footnotes.reset()
    figure.reset()
  }

  reset()

  resolver(function (doc) {
    switch (doc?._type) {
      case 'case':
        return `${resolve(chapter)}/${doc.slug.current}`
      default:
        return null
    }
  })

  function scroll(event) {
    const { hash } = new URL(event.currentTarget.href)
    const target = document.querySelector(hash)
    target?.scrollIntoView({ block: 'start', behavior: 'smooth' })
    event.preventDefault()
  }

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

<Theme
  primary={chapter.primaryColor}
  secondary={chapter.secondaryColor}
  dark={chapter.darkColor}>
  <Intro simple={chapter.simplify} back={resolve(chapter.cover)}>
    <Menu slot="menu" items={menu} />
    <span slot="heading">{chapter.title}</span>
    <span slot="subheading">{chapter.subheading}</span>
  </Intro>

  <div class="content">
    <nav class="aside toc" class:open id="toc">
      <!-- svelte-ignore a11y-invalid-attribute -->
      {#if !chapter.hidetoc}
        <a
          href="#"
          class="toggle close"
          aria-controls="toc"
          on:click|preventDefault={() => {
            open = false
          }}>
          <svg class="icon" height="24" viewBox="0 -960 960 960" width="24">
            <path
              fill="currentcolor"
              d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
          </svg>
          <span>Close table of contents</span>
        </a>
        <a
          href="#toc"
          class="toggle open"
          on:click|preventDefault={() => {
            open = true
          }}>
          <svg class="icon" height="24" viewBox="0 -960 960 960" width="24">
            <path
              fill="currentcolor"
              d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
          </svg>
          <span>Open table of contents</span>
        </a>
        <ol class="items">
          {#each chapter.modules as module}
            {#if module._type === 'richText' || module._type === 'heading'}
              {@const heading = module.content.find(
                (block) => block.style === 'h2'
              )}
              {#if heading}
                <li class="item">
                  <a
                    href="{resolve(chapter)}#heading-{heading._key}"
                    on:click={scroll}>
                    {asText([heading])}
                  </a>
                </li>
              {/if}
            {/if}
          {/each}
        </ol>
      {/if}
    </nav>
    <div class="body">
      <Modules modules={chapter.modules} />
    </div>
  </div>
</Theme>

<style>
  .content {
    --margin: clamp(3rem, 10vh, 7rem);

    position: relative;
    max-width: min(calc(100vw - var(--page-gutter) * 2), var(--page-width));
    margin: var(--margin) auto;
  }

  @media (width > 70rem) {
    .content {
      display: grid;
      grid-template-columns: 1fr var(--text-width) 1fr;
      gap: clamp(2.5rem, 3vw, 4.5rem);
      align-items: flex-start;
    }
  }

  @media (width <= 70rem) {
    .content:has(.items) {
      margin-top: 0;
    }
  }

  .body {
    grid-column: span 2;
  }

  .icon {
    width: 2rem;
    height: 2rem;
    margin: 0 0.5rem 0 -0.1rem;
  }

  .items {
    font-family: var(--sans-serif);
    font-size: var(--framework-font-size);
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  @media (width <= 70rem) {
    .toc {
      --narrow: 0;

      position: sticky;
      top: 0;
      z-index: 1;
      width: calc(100% + (var(--page-gutter) * 2));
      margin-left: calc(var(--page-gutter) * -1);
      background: #fff;
      box-shadow: 0 0.3rem 1.5rem rgba(0, 0, 0, 0.1),
        0 0 0 0.5px rgba(0, 0, 0, 0.1);
      margin-bottom: var(--margin);
      user-select: none;
    }

    .toc:not(:is(.open, :target)) .items {
      display: none;
    }

    .toc:is(.open, :target) {
      position: fixed;
      inset: 0;
      overflow: auto;
      width: 100%;
      margin: 0;
      z-index: 1;
    }

    .items {
      padding: var(--page-gutter);
      width: 100%;
      font-size: 1.25rem;
    }

    .item {
      padding-top: 1rem;
      border-top: 1px solid rgba(0, 0, 0);
    }

    .toggle {
      font-family: var(--sans-serif);
      font-size: var(--framework-font-size);
      display: block;
      width: 100%;
      display: flex;
      align-items: center;
      padding: 0.5rem var(--page-gutter);
    }

    .toggle.close {
      display: none;
    }

    .toc:is(.open, :target) .toggle.open {
      display: none;
    }

    .toc:is(.open, :target) .toggle.close {
      display: flex;
    }

    :root:has(.toc:is(.open, :target)) {
      overflow: hidden;
    }

    :root:has(.toc:not(.open, :target)) {
      /* .toggle[padding] + .icon[height] + extra space for good measure */
      --current-scroll-margin-top: calc(1rem + 2rem + 2rem);
    }
  }

  @media (width > 70rem) {
    .toc {
      position: sticky;
      top: var(--sticky-top-margin);
      margin-bottom: var(--margin);
      user-select: none;
    }

    .toggle {
      display: none;
    }
  }
</style>
