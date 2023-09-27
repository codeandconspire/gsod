<script>
  import { page } from '$app/stores'

  import Text, { asText, reset } from '$lib/Text.svelte'
  import Footnotes from '$lib/Footnotes.svelte'
  import { resolve } from '$lib/sanity.js'
  import Dialog from '$lib/Dialog.svelte'
  import Theme from '$lib/Theme.svelte'
  import Html from '$lib/Html.svelte'
  import Hero from '$lib/Hero.svelte'
  import Menu from '$lib/Menu.svelte'

  export let data
  let open = false
  let dialog

  reset()

  console.log(data)

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

<Theme primary={chapter.primaryColor} secondary={chapter.secondaryColor}>
  <Hero size="small" back={resolve(chapter.cover)}>
    <Menu slot="menu" items={menu} />
    <Text slot="heading" content={chapter.title} plain />
    <Text slot="subheading" content={chapter.subheading} plain />
  </Hero>

  <div class="content">
    <nav class="aside toc" class:open id="toc">
      <!-- svelte-ignore a11y-invalid-attribute -->
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
          {#if module._type === 'richText'}
            {@const heading = module.content.find(
              (block) => block.style === 'h2'
            )}
            {#if heading}
              <li class="item">
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
      <button on:click={() => dialog.showModal()}>Open dialog</button>
      <Dialog bind:dialog>
        Qui incididunt veniam fugiat. Ipsum labore sit ullamco esse velit anim.
        Nulla pariatur duis magna elit ea enim ea nostrud elit velit fugiat
        fugiat proident commodo. Est amet adipisicing nulla ullamco ad dolor
        consequat eiusmod nulla et.
      </Dialog>
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
        {:else if module._type === 'megaList'}
          <div class="module">Mega</div>
        {:else if module._type === 'teaser'}
          <div class="module">Mega</div>
        {/if}
      {/each}
      <div class="divider large" />
      <Html>
        <Footnotes />
      </Html>
    </div>
    <div class="aside share" />
  </div>
</Theme>

<style>
  .content {
    position: relative;
    max-width: min(calc(100vw - var(--page-gutter) * 2), var(--page-max-width));
    margin: var(--margin) auto;

    --margin: clamp(3rem, 10vh, 7rem);
  }

  @media (width > 70rem) {
    .content {
      display: grid;
      grid-template-columns: 1fr var(--text-max-width) 1fr;
      gap: clamp(2.5rem, 3vw, 4.5rem);
      align-items: flex-start;
    }
  }

  @media (width < 70rem) {
    .content:has(.items) {
      margin-top: 0;
    }
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
      position: sticky;
      top: 0;
      width: calc(100% + (var(--page-gutter) * 2));
      margin-left: calc(var(--page-gutter) * -1);
      background: rgba(255, 255, 255, 0.85);
      backdrop-filter: blur(4px);
      box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1), 0 1px 0 rgba(0, 0, 0, 0.05);
      margin-bottom: var(--margin);

      --narrow: 0;
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
  }

  @media (width > 70rem) {
    .toc {
      position: sticky;
      top: var(--page-gutter);
      margin-bottom: var(--margin);
    }

    .toggle {
      display: none;
    }
  }

  /* Divider */

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
