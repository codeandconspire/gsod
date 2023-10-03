<script>
  import Figure, * as figure from '$lib/Figure.svelte'
  import Footnotes from '$lib/Footnotes.svelte'
  import MegaList from '$lib/MegaList.svelte'
  import Details from '$lib/Details.svelte'
  import { resolve } from '$lib/sanity.js'
  import Teaser from '$lib/Teaser.svelte'
  import Image from '$lib/Image.svelte'
  import Theme from '$lib/Theme.svelte'
  import Tilt from '$lib/Tilt.svelte'
  import Card from '$lib/Card.svelte'
  import Html from '$lib/Html.svelte'
  import Text from '$lib/Text.svelte'

  export let modules = []
</script>

{#each modules as module}
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
      <div class={module.fill ? 'unwrap' : ''}>
        <Figure fill={module.fill} id={figure.anchor(module._key)}>
          {#if module.image}
            <img alt={module.image.alt || ''} src={module.image.asset.url} />
          {:else if module.embed?.content}
            {@html module.embed.content}
          {/if}
          <svelte:fragment slot="description">
            {#if module.description}
              <Text content={module.description} let:block>
                {#if block.style === 'normal'}
                  <Text content={block.children} />
                {:else}
                  <Text content={block} />
                {/if}
              </Text>
            {/if}
          </svelte:fragment>
        </Figure>
      </div>
    {:else if module._type === 'footnotes'}
      <div class="module module-details">
        <Details heading={module.heading || 'References'}>
          <div class="contain">
            <Html>
              <Footnotes />
            </Html>
          </div>
        </Details>
      </div>
    {:else if module._type === 'blurbs'}
      <div class="module module-blurbs">
        <div class="blurbs">
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
                    link={href
                      ? { label: item.link.label || 'Show more' }
                      : null}>
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
                      ? { label: item.link.label || 'Show more' }
                      : null} />
                {/if}
              </Tilt>
            {/if}
          {/each}
        </div>
      </div>
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

  /** Blurbs*/

  .blurbs {
    display: grid;
    gap: clamp(1.5rem, 10vw, 4rem);
    grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
    margin-top: 2rem;
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

  .module + .module-teaser {
    margin-top: var(--space-large);
  }

  .module + .module-figure {
    margin-top: var(--space-medium);
  }

  .module + .module-richText {
    margin-top: var(--space-small);
  }

  .module + .module-details {
    margin-top: var(--space-large);
  }

  .module-details + .module-details {
    margin-top: -1px;
  }
</style>
