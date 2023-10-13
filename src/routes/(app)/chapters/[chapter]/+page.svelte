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

  let current
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
    open = false
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

{#key chapter._id}
  <Theme
    primary={chapter.primaryColor}
    secondary={chapter.secondaryColor}
    dark={chapter.darkColor}>
    <Intro simple={chapter.simplify} back={resolve(chapter.cover)}>
      <Menu slot="menu" items={menu} color={chapter.simplify} />
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
            <svg height="18.8884" width="18.8733">
              <path
                d="m.375211 18.5122c.509293.4976 1.368269.4912 1.853189.0063l7.20892-7.2089 7.20468 7.2068c.4934.4934 1.3514.5009 1.8511-.0063.4997-.5093.5018-1.3481.0084-1.8436l-7.2047-7.21642 7.2047-7.2047c.4934-.49335.5009-1.341784-.0084-1.841467-.5093-.509293-1.3577-.511402-1.8511-.008437l-7.20468 7.204704-7.20892-7.206813c-.48492-.492419-1.353506-.510466-1.853189.008437-.497574.509293-.491246 1.356546-.006328 1.841466l7.208917 7.20681-7.208917 7.22062c-.484918.4828-.500856 1.3418.006328 1.8415z"
                fill="currentcolor" />
            </svg>
          </a>
          <a
            href="#toc"
            class="toggle open"
            on:click|preventDefault={() => {
              open = true
            }}>
            <svg height="17.7056" width="24.1638">
              <path d="m0 0h24.1638v17.7056h-24.1638z" opacity="0" />
              <g fill="currentcolor">
                <path
                  d="m7.12873 17.1644h15.91927c.6201 0 1.1158-.484 1.1158-1.1062 0-.6298-.4936-1.1159-1.1158-1.1159h-15.91927c-.62976 0-1.11585.484-1.11585 1.1159 0 .6201.48398 1.1062 1.11585 1.1062z" />
                <path
                  d="m1.64741 17.7056c.91313 0 1.64953-.7439 1.64953-1.6474 0-.9131-.7364-1.6474-1.64953-1.6474-.911007 0-1.64741.7343-1.64741 1.6474 0 .9035.736403 1.6474 1.64741 1.6474z" />
                <path
                  d="m7.12873 9.97451h15.91927c.6201 0 1.1158-.49359 1.1158-1.11585 0-.62015-.4936-1.10624-1.1158-1.10624h-15.91927c-.62976 0-1.11585.48398-1.11585 1.10624 0 .62015.48398 1.11585 1.11585 1.11585z" />
                <path
                  d="m1.64741 10.5082c.91313 0 1.64953-.73642 1.64953-1.64954s-.7364-1.64741-1.64953-1.64741c-.911007 0-1.64741.73429-1.64741 1.64741s.736403 1.64954 1.64741 1.64954z" />
                <path
                  d="m7.12873 2.77499h15.91927c.6201 0 1.1158-.48399 1.1158-1.10625 0-.62765-.4936-1.115849-1.1158-1.115849h-15.91927c-.62976 0-1.11585.483979-1.11585 1.115849 0 .62016.48398 1.10625 1.11585 1.10625z" />
                <path
                  d="m1.64741 3.30866c.91313 0 1.64953-.73641 1.64953-1.63992 0-.911009-.7364-1.6474118-1.64953-1.6474118-.911007 0-1.64741.7364028-1.64741 1.6474118 0 .90351.736403 1.63992 1.64741 1.63992z" />
              </g>
            </svg>
            <span>Table of Contents</span>
          </a>
          <ol class="items">
            {#each chapter.modules as module}
              {#if module._type === 'heading'}
                <li class="item">
                  <a
                    class="anchor"
                    class:current={current === module._key}
                    href="#module-{module._key}"
                    on:click={scroll}>
                    {asText(module.content)}
                  </a>
                </li>
              {/if}
            {/each}
          </ol>
        {/if}
      </nav>
      <div class="body">
        <Modules modules={chapter.modules} bind:current />
      </div>
    </div>
  </Theme>
{/key}

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

  .items {
    font-family: var(--sans-serif);
    font-size: var(--framework-font-size);
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .anchor {
    transition: opacity 100ms ease-out;
  }

  .anchor.current {
    font-weight: var(--sans-serif-bold);
  }

  .anchor:active {
    opacity: 0.5;
    transition: none;
  }

  @media (width <= 70rem) {
    .toc {
      --narrow: 0;

      position: sticky;
      padding: 0.5rem 0;
      top: 0;
      font-weight: bold;
      width: calc(100% + (var(--page-gutter) * 2));
      margin-left: calc(var(--page-gutter) * -1);
      background: #fff;
      box-shadow: 0 0.3rem 1.5rem rgba(0, 0, 0, 0.08),
        0 0.5px 0 0 rgba(0, 0, 0, 0.1);
      margin-bottom: var(--margin);
      user-select: none;
      z-index: 1;
    }

    .toc:empty {
      display: none;
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
      z-index: 6;
      padding: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .items {
      padding: var(--page-gutter);
      width: 100%;
      font-size: 1.25rem;
      font-weight: normal;
      margin-top: -4rem;
    }

    .item + .item {
      border-top: 1px solid #ddd;
      padding-top: 1rem;
    }

    .anchor {
      padding: 0.5rem;
      margin: -0.5rem;
    }

    .toggle {
      font-family: var(--sans-serif);
      font-size: var(--framework-font-size);
      display: block;
      width: 100%;
      display: flex;
      gap: 0.75rem;
      align-items: center;
      padding: 0.5rem var(--page-gutter);
      transition: opacity 100ms ease-out;
    }

    .toggle:active {
      opacity: 0.6;
      transition: none;
    }

    .toggle.close {
      display: none;
    }

    .toc:is(.open, :target) .toggle.open {
      display: none;
    }

    .toc:is(.open, :target) .toggle.close {
      display: block;
      position: absolute;
      top: 1.2rem;
      right: 1.2rem;
      width: auto;
      padding: 0.5rem;
    }

    :root:has(.toc:is(.open, :target)) {
      overflow: hidden;
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
