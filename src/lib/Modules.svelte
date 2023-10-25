<script>
  import { onMount, setContext } from 'svelte'
  import { browser } from '$app/environment'

  import Footnotes from '$lib/Footnotes.svelte'
  import MegaList from '$lib/MegaList.svelte'
  import Details from '$lib/Details.svelte'
  import { resolve } from '$lib/sanity.js'
  import Figure from '$lib/Figure.svelte'
  import Button from '$lib/Button.svelte'
  import Teaser from '$lib/Teaser.svelte'
  import Image from '$lib/Image.svelte'
  import Theme from '$lib/Theme.svelte'
  import Tilt from '$lib/Tilt.svelte'
  import Card from '$lib/Card.svelte'
  import Html from '$lib/Html.svelte'
  import Text from '$lib/Text.svelte'
  import Video from './Video.svelte'

  export let modules = []
  export let narrow = false

  setContext(
    'FIGURES',
    modules.filter((module) => module._type === 'figure')
  )

  /** @type {string?} */
  export let current = null

  const headings = new Map()
  const scrolltracker = (node, key) => {
    headings.set(node, { key })
  }

  let scrollY
  let scrollHeight
  const onscroll = () => {
    for (const [, details] of headings) {
      if (details.top < scrollY + scrollHeight) current = details.key
      else break
    }
  }

  const measure = () => {
    for (const [node, details] of headings) {
      details.top = node.getBoundingClientRect().top + scrollY
    }
  }

  onMount(() => {
    measure()
    onscroll()
  })
</script>

<svelte:window
  bind:scrollY
  bind:innerHeight={scrollHeight}
  on:scroll={onscroll}
  on:resize={measure} />

{#each modules as module}
  <div class="module module-{module._type}" id="module-{module._key}">
    {#if module._type === 'divider'}
      <div
        id="module-{module._key}"
        class="divider"
        class:visible={module.visible}
        class:small={module.size === 'small'}
        class:medium={module.size === 'medium'}
        class:large={module.size === 'large'} />
    {:else if module._type === 'heading'}
      <div class="divider large visible" />
      <div
        class="contain"
        id="module-{module._key}"
        use:scrolltracker={module._key}>
        <Html size="large">
          <Text content={module.content} />
        </Html>
      </div>
    {:else if module._type === 'richText'}
      <div class="contain" id="module-{module._key}">
        <Html>
          <Text content={module.content} />
        </Html>
      </div>
    {:else if module._type === 'megaList'}
      {@const { link, content } = module}
      {@const items = content
        .filter((block) => block.listItem)
        .map((block) => ({ ...block, listItem: false }))}
      <div class="contain" id="module-{module._key}">
        {#if link}
          <Theme
            primary={link?.document?.primaryColor}
            secondary={link?.document?.secondaryColor}
            dark={link?.document?.darkColor}>
            <MegaList {items} let:item>
              <Html>
                <Text content={[item]} />
              </Html>
            </MegaList>
          </Theme>
        {:else}
          <MegaList {items} let:item>
            <Html>
              <Text content={[item]} />
            </Html>
          </MegaList>
        {/if}
      </div>
    {:else if module._type === 'teaser'}
      {@const { title, description, flip, image, content, link } = module}
      {@const href = resolve(link.document)}
      <div class="uncontain" id="module-{module._key}">
        <Theme
          primary={link.document.primaryColor}
          secondary={link.document.secondaryColor}
          dark={link.document.darkColor}>
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
    {:else if module._type === 'button'}
      {@const { link } = module}
      {@const href = resolve(link.document)}
      <div id="module-{module._key}">
        {#if link.document}
          <Theme
            primary={link.document.primaryColor}
            secondary={link.document.secondaryColor}
            dark={link.document.darkColor}>
            <Button {href}>{link.label}</Button>
          </Theme>
        {:else}
          <Button {href}>{link.label}</Button>
        {/if}
      </div>
    {:else if module._type === 'figure'}
      <div class={module.fill ? 'unwrap' : ''} id="module-{module._key}">
        <Figure
          fill={module.fill}
          {narrow}
          id={module._key}
          label={module.group}>
          {#if module.image}
            <img alt={module.image.alt || ''} src={module.image.asset.url} />
          {:else if module.embed?.content}
            {@html module.embed.content}
          {/if}
          <svelte:fragment slot="description">
            {#if module.description}
              <Text content={module.description} let:block>
                {#if block.style === 'normal'}
                  <p>
                    <Text content={block.children} />
                  </p>
                {:else}
                  <Text content={block} />
                {/if}
              </Text>
            {/if}
          </svelte:fragment>
          <svelte:fragment slot="source">
            {#if module.source}
              <Text content={module.source} let:block>
                {#if block.style === 'normal'}
                  <p>
                    <Text content={block.children} />
                  </p>
                {:else}
                  <Text content={block} />
                {/if}
              </Text>
            {/if}
          </svelte:fragment>
        </Figure>
      </div>
    {:else if module._type === 'footnotes'}
      <div id="module-{module._key}">
        <Details
          heading={module.heading || 'References'}
          open={!browser}
          small={narrow}>
          <div class="contain">
            <Html>
              <Footnotes />
            </Html>
          </div>
        </Details>
      </div>
    {:else if module._type === 'accordion'}
      <div id="module-{module._key}">
        <Details heading={module.title || 'Details'} small={narrow}>
          <div class="contain">
            <Html>
              <Text content={module.content} />
            </Html>
          </div>
        </Details>
      </div>
    {:else if module._type === 'blurbs'}
      {#each module.items as item}
        {@const href = resolve(item.link.document)}
        {#if href}
          <Tilt
            {href}
            data-sveltekit-noscroll
            data-sveltekit-replacestate
            let:hover>
            {#if item.link.document.image}
              <Card
                {hover}
                heading={item.title}
                subheading={item.subheading}
                link={href ? { label: item.link.label || 'Read more' } : null}>
                <Image
                  slot="image"
                  image={item.link.document.image}
                  width={300}
                  variants={[300, 600, 900]}
                  sizes="(min-width: 40rem) 50vw, (min-width: 60rem) 33vw" />
              </Card>
            {:else}
              <Card
                {hover}
                heading={item.title}
                subheading={item.subheading}
                link={href
                  ? { label: item.link.label || 'Read more' }
                  : null} />
            {/if}
          </Tilt>
        {/if}
      {/each}
    {:else if module._type === 'video'}
      {#if module.video}
        <div id="module-{module._key}">
          <Video url={module.video} />
        </div>
      {/if}
    {/if}
  </div>
{/each}

<style>
  /* Content wrapping */

  .contain {
    max-width: var(--text-width-max);
  }

  @media (width > 70rem) {
    .contain {
      max-width: var(--text-width);
    }

    .uncontain {
      margin-left: calc(-50vw + (var(--text-width) / 2) + var(--page-gutter));
      padding-left: calc(50vw - (var(--page-width) / 2) - var(--page-gutter));
    }

    .unwrap {
      margin-left: calc(-50vw + (var(--text-width) / 2));
      width: 100vw;
    }
  }

  /* Blurbs */

  .module-blurbs {
    display: grid;
    gap: clamp(1.5rem, 10vw, 4rem);
    grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
    margin: var(--space-small) 0 var(--space-small);
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

  .module-heading:first-child .divider {
    display: none;
  }

  .module-heading:first-child {
    margin-top: -0.2em;
  }

  /* Module margins */

  .module + .module-teaser {
    margin-top: var(--space-large);
  }

  .module-figure {
    margin-top: var(--space-medium);
    margin-bottom: var(--space-medium);
  }

  .module-video {
    margin-top: var(--space-small);
    margin-bottom: var(--space-small);
  }

  .module-megaList {
    margin-top: var(--space-small);
    margin-bottom: var(--space-small);
  }

  .module-megaList + .module:not(.module-button) {
    margin-top: calc(var(--space-medium) - 1rem);
  }

  .module-button {
    margin-top: var(--space-small);
    margin-bottom: var(--space-small);
  }

  .module + .module-richText {
    margin-top: var(--space-small);
  }

  .module + .module-details {
    margin-top: var(--space-large);
  }

  .module-footnotes,
  .module-accordion {
    margin-top: var(--space-medium);
  }

  .module-footnotes + .module-footnotes,
  .module-footnotes + .module-accordion,
  .module-accordion + .module-footnotes,
  .module-accordion + .module-accordion {
    margin-top: -1px;
  }

  .module:last-child {
    margin-bottom: 0 !important;
  }
</style>
