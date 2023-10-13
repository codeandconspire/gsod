<script context="module">
  import { getContext, setContext } from 'svelte'

  const bindings = new WeakMap()

  const HEADING_REG = /h(\d)/
  const LINK_REG = /<(https?:\/\/.+?)>/g

  const OFFSET = Symbol('offset')

  export function setOffset(offset) {
    setContext(OFFSET, offset)
  }

  export function getOffset() {
    return getContext(OFFSET) || 0
  }

  export function asText(content) {
    if (content == null) return null
    if (!Array.isArray(content)) return String(content)
    return content
      .filter((block) => block._type === 'block')
      .flatMap((block) => block.children.map((child) => child.text))
      .join(' ')
  }

  function format(string) {
    if (LINK_REG.test(string)) {
      return format(string.replace(LINK_REG, '\0$1\0')).replace(
        /\0(.+?)\0/,
        '&lt;<a href="$1" style="word-break: break-all;" rel="noopener noreferrer" target="_blank">$1</a>&gt;'
      )
    }
    return string
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\n/g, '<br />')
  }
</script>

<script>
  import * as footnotes from '$lib/Footnotes.svelte'
  import * as figure from '$lib/Figure.svelte'
  import { resolve } from '$lib/sanity.js'

  /** @type {any[]}*/
  export let content
  export let plain = false

  const figures = getContext(figure.FIGURES)
  const shortcode = getContext('SHORTCODE')

  // The Sanity PortableText format is a flat array of blocks which needs
  // processing to collect list items and preserve markDef references
  $: blocks = content?.reduce(function compile(acc, block) {
    const { _key, children, marks, markDefs, listItem } = block
    const prev = acc.at(-1)

    if (markDefs) {
      for (const def of markDefs) {
        if (def._type === 'footnote') {
          footnotes.add(def)
        } else if (def._type === 'figureReference') {
          // figure.add(def)
        }
      }
    }

    if (listItem) {
      // Create a faux child list item
      const child = { _key, children, marks, _type: '$li' }

      // Determine the list type
      const _type = listItem === 'bullet' ? '$ul' : '$ol'

      // Associate the faux child with block markDefs
      bindings.set(child, markDefs)

      if (prev?._type === _type) {
        // Append list item key to block key
        prev._key += `-${_key}`

        // Append faux child
        prev.children.push(child)
      } else {
        // Create a new list block
        acc.push({ _key, _type, children: [child] })
      }
    } else {
      // Associate all children with the block markDefs
      children?.forEach((child) => bindings.set(child, markDefs))

      // Append block as-is
      acc.push(block)
    }

    return acc
  }, [])
</script>

{#if plain}
  {@html asText(content)?.replace(/\n/g, '<br />')}
{:else if blocks}
  {#each blocks as block (block._key)}
    {@const { _type, style, children } = block}
    <slot {block}>
      {#if style === 'normal'}
        <p><svelte:self content={children} /></p>
      {:else if style?.match(HEADING_REG)}
        {@const offset = getOffset()}
        {@const tag = style.replace(HEADING_REG, (_, num) => +num + offset)}
        <svelte:element
          this={`h${tag}`}
          class={style}
          id={`heading-${block._key}`}>
          <svelte:self content={children} />
        </svelte:element>
      {:else if style === 'blockquote'}
        <blockquote><svelte:self content={children} /></blockquote>
      {:else if _type === '$ul'}
        <ul><svelte:self content={children} /></ul>
      {:else if _type === '$ol'}
        <ol><svelte:self content={children} /></ol>
      {:else if _type === '$li'}
        <li><svelte:self content={children} /></li>
      {:else if _type === 'span'}
        {@const [mark, ...marks] = block.marks}
        {#if mark}
          {#if mark === 'strong'}
            <strong><svelte:self content={[{ ...block, marks }]} /></strong>
          {:else if mark === 'em'}
            <em><svelte:self content={[{ ...block, marks }]} /></em>
          {:else if mark === 'code'}
            <code><svelte:self content={[{ ...block, marks }]} /></code>
          {:else if mark === 'underline'}
            <u><svelte:self content={[{ ...block, marks }]} /></u>
          {:else if mark === 'strikethrough'}
            <s><svelte:self content={[{ ...block, marks }]} /></s>
          {:else}
            {@const defs = bindings.get(block)}
            {@const def = defs?.find((def) => def._key === mark)}
            {#if def?._type === 'externalLink'}
              <a href={def.url} target="_blank" rel="noopener noreferrer">
                <svelte:self content={[{ ...block, marks }]} />
              </a>
            {:else if def?._type === 'internalLink'}
              {@const href = resolve(def.reference)}
              {#if href}
                <a href={resolve(def.reference)}>
                  <svelte:self content={[{ ...block, marks }]} />
                </a>
              {:else}
                <svelte:self content={[{ ...block, marks }]} />
              {/if}
            {:else if def?._type === 'footnote'}
              <a
                class="anchor"
                id="anchor-{def._key}"
                href="#footnote-{def._key}"
                on:click|preventDefault={() => {
                  footnotes.select(def)
                }}>
                <svelte:self content={[{ ...block, marks }]} />
              </a>
            {:else if def?._type === 'figureReference'}
              {@const id = figure.anchor(def.figure)}
              {@const index = $figures.findIndex((figure) => figure === id)}
              {@const text =
                index > -1
                  ? block.text.replace(
                      /\[X\]/gi,
                      `${shortcode ? `${shortcode}.` : ''}${index + 1}`
                    )
                  : block.text}
              <a
                href="#{id}"
                on:click|preventDefault={() =>
                  document.getElementById(id)?.scrollIntoView({
                    block: 'center',
                    behavior: 'smooth'
                  })}>
                <svelte:self content={[{ ...block, text, marks }]} />
              </a>
            {/if}
          {/if}
        {:else}
          {@html format(block.text)}
        {/if}
      {/if}
    </slot>
  {/each}
{/if}

<style>
  .anchor:target {
    background: var(--theme-primary-color);
    color: var(--theme-text-color);
    border-radius: 2px;
    box-shadow: 0 0 0 0.2em var(--theme-primary-color);
  }
</style>
