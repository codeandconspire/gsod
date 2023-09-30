<script>
  import Footnotes, * as footnote from '$lib/Footnotes.svelte'
  import Figure, * as figure from '$lib/Figure.svelte'
  import MegaList from '$lib/MegaList.svelte'
  import Details from '$lib/Details.svelte'
  import { resolve } from '$lib/sanity.js'
  import Teaser from '$lib/Teaser.svelte'
  import Theme from '$lib/Theme.svelte'
  import Html from '$lib/Html.svelte'
  import Text from '$lib/Text.svelte'

  export let modules = []

  $: footnotes = footnote.all()
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
          {#if module.image.image}
            <img alt={module.image.alt || ''} src={module.image.asset.url} />
          {:else if module.embed.content}
            {@html module.embed.content}
          {/if}
          <span slot="description">
            <Text content={module.description} let:block>
              {#if block.style === 'normal'}
                <Text content={block.children} />
              {:else}
                <Text content={block} />
              {/if}
            </Text>
          </span>
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

  .module-figure {
    margin: var(--space-medium) 0;
  }

  .module-details {
    margin-top: var(--space-large);
  }

  .module-details + .module-details {
    margin-top: -1px;
  }
</style>
