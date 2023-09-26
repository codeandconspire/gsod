<script context="module">
  import { setContext, getContext, hasContext } from 'svelte'

  export const FOOTNOTES = Symbol('footnotes')

  export function reset() {
    setContext(FOOTNOTES, [])
  }

  /** @type {function(): any[]} */
  export function collect() {
    return getContext(FOOTNOTES)
  }

  export function asText(content) {
    if (!Array.isArray(content)) return String(content)
    return content
      .filter((block) => block._type === 'block')
      .flatMap((block) => block.children.map((child) => child.text))
      .join(' ')
  }
</script>

<script>
  export let plain = false

  /** @type {any?}*/
  export let content = null

  /** @type {any[]?}*/
  export let defs = null

  if (!hasContext(FOOTNOTES)) reset()

  $: blocks = Array.isArray(content)
    ? content.reduce(function compile(acc, block) {
        const prev = acc.at(-1)
        if (block.listItem) {
          const { _key, children } = block
          const item = { children, _key, _type: '$li' }
          const _type = block.listItem === 'bullet' ? '$ul' : '$ol'
          if (prev._type === _type) {
            prev._key += `-${_key}`
            prev.children.push(item)
          } else {
            acc.push({ _key, _type, children: [item] })
          }
        } else {
          acc.push(block)
        }
        return acc
      }, [])
    : []
</script>

{#if plain}
  {@html asText(content).replace(/\n/g, '<br />')}
{:else if content}
  {#each blocks as block (block._key)}
    {@const { style, _type } = block}
    <slot {block}>
      {#if style === 'normal'}
        <p>
          <svelte:self content={block.children} defs={block.markDefs} />
        </p>
      {:else if style === 'h1'}
        <h1><svelte:self content={block.children} /></h1>
      {:else if style === 'h2'}
        <h2><svelte:self content={block.children} /></h2>
      {:else if style === 'h3'}
        <h3><svelte:self content={block.children} /></h3>
      {:else if style === 'h4'}
        <h4><svelte:self content={block.children} /></h4>
      {:else if style === 'h5'}
        <h5><svelte:self content={block.children} /></h5>
      {:else if style === 'h6'}
        <h6><svelte:self content={block.children} /></h6>
      {:else if style === 'blockquote'}
        <blockquote>
          <svelte:self content={block.children} />
        </blockquote>
      {:else if _type === '$ul'}
        <ul>
          <svelte:self content={block.children} />
        </ul>
      {:else if _type === '$ol'}
        <ol>
          <svelte:self content={block.children} />
        </ol>
      {:else if _type === '$li'}
        <li><svelte:self content={block.children} /></li>
      {:else if _type === 'span'}
        {@html block.marks
          .reduce((acc, mark) => {
            switch (mark) {
              case 'strong':
                return `<strong>${acc}</strong>`
              case 'em':
                return `<em>${acc}</em>`
              case 'code':
                return `<code>${acc}</code>`
              case 'underline':
                return `<u>${acc}</u>`
              case 'strike-through':
                return `<s>${acc}</s>`
              default:
                const def = defs?.find((def) => def._key === mark)
                switch (def?._type) {
                  case 'footnote': {
                    const footnotes = getContext(FOOTNOTES)
                    const index = footnotes.push(def)
                    return `<a href="#footnote-${def._key}">${acc}<sup>[${index}]</sup></a>`
                  }
                  default:
                    return acc
                }
            }
          }, block.text)
          .replace(/\n/g, '<br />')}
      {/if}
    </slot>
  {/each}
{/if}
