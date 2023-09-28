<script>
  import { page } from '$app/stores'

  import Text, { asText, reset } from '$lib/Text.svelte'
  import Footnotes from '$lib/Footnotes.svelte'
  import MegaList from '$lib/MegaList.svelte'
  import { resolve } from '$lib/sanity.js'
  import Figure from '$lib/Figure.svelte'
  import Teaser from '$lib/Teaser.svelte'
  import Dialog from '$lib/Dialog.svelte'
  import Theme from '$lib/Theme.svelte'
  import Html from '$lib/Html.svelte'
  import Hero from '$lib/Hero.svelte'
  import Menu from '$lib/Menu.svelte'

  export let data
  let open = false
  let dialog

  reset()

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
        <div class="module module-{module._type}">
          {#if module._type === 'divider'}
            <div
              class="divider"
              class:visible={module.visible}
              class:small={module.size === 'small'}
              class:medium={module.size === 'medium'}
              class:large={module.size === 'large'} />
          {:else if module._type === 'heading'}
            <div class="divider large visible" />
            <div class="contain">
              <Html size="large">
                <Text content={module.content} />
              </Html>
            </div>
          {:else if module._type === 'richText'}
            <div class="contain">
              <Html>
                <Text content={module.content} />
              </Html>
            </div>
          {:else if module._type === 'megaList'}
            <div class="contain">
              <MegaList
                items={module.content.filter((block) => block.listItem)}
                let:item>
                <Html>
                  <Text content={item.children} />
                </Html>
              </MegaList>
            </div>
          {:else if module._type === 'teaser'}
            {@const { title, description, flip, image, content, link } = module}
            {@const href = resolve(link.document)}
            <div class="uncontain">
              <Theme
                primary={link.document.primaryColor}
                secondary={link.document.secondaryColor}>
                <Teaser
                  heading={title}
                  {description}
                  {flip}
                  link={href ? { href, label: link.label } : null}>
                  <img
                    slot="image"
                    alt={image.alt || ''}
                    src={image.asset.url}
                    sizes="(min-width: 40rem) 40rem"
                    srcset={[300, 500, 600]
                      .map((size) => `${image.asset.url}?w=${size} ${size}w`)
                      .join(',')} />
                  <Html>
                    <Text {content} />
                  </Html>
                </Teaser>
              </Theme>
            </div>
          {:else if module._type === 'figure'}
            <div class={module.fill ? 'uncontain' : 'contain'}>
              <Figure fill={module.fill}>
                {#if module.image.image}
                  <img
                    alt={module.image.alt || ''}
                    src={module.image.asset.url} />
                {:else if module.embed.content}
                  {@html module.embed.content}
                {/if}
                <Html slot="description">
                  <Text content={module.description} />
                </Html>
              </Figure>
            </div>
          {/if}
        </div>
      {/each}
      <div class="divider large" />
      <Html>
        <Footnotes />
      </Html>
    </div>
  </div>
</Theme>

<style>
  .content {
    position: relative;
    max-width: min(calc(100vw - var(--page-gutter) * 2), var(--page-width));
    margin: var(--margin) auto;

    --margin: clamp(3rem, 10vh, 7rem);
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

  .contain {
    max-width: var(--text-width-max);
  }

  @media (width > 70rem) {
    .uncontain {
      margin-left: calc(-50vw + (var(--text-width) / 2) + var(--page-gutter));
      padding-left: calc(50vw - (var(--page-width) / 2) - var(--page-gutter));
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

  .divider {
    height: 0;
  }

  .divider,
  .divider.medium {
    margin: var(--space-medium) auto;
  }

  .divider.small {
    margin: clamp(5.5rem, 8.5vw, 8rem) auto;
  }

  .divider.large {
    margin: var(--space-large) auto;
  }

  .divider.visible {
    border-top: 1px solid currentcolor;
  }

  .module-heading .divider {
    margin-bottom: 2rem;
  }

  /* Module margins */

  .module-teaser {
    margin-top: var(--space-large);
  }
</style>
