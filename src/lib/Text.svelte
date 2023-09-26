<script context="module">
  export function asText(content) {
    if (!Array.isArray(content)) return String(content)
    return content
      .filter((block) => block._type === 'block')
      .flatMap((block) => block.children.map((child) => child.text))
      .join(' ')
  }
</script>

<script>
  export let content = null
  export let plain = false

  $: blocks = Array.isArray(content)
    ? content.reduce(function listify(acc, block) {
        const last = acc.at(-1)
        if (block.listItem) {
          const { _key, level } = block
          const _type = block.listItem === 'bullet' ? '$ul' : '$ol'
          const children = block.children?.reduce(listify, [])
          const item = { children, _key, _type: '$li' }
          if (last._type === _type) {
            last.children.push(item)
          } else {
            acc.push({ _key, _type, level, children: [item] })
          }
        } else {
          if (block.children) {
            block = { ...block, children: block.children.reduce(listify, []) }
          }
          acc.push(block)
        }
        return acc
      }, [])
    : []
  $: console.log(blocks)
</script>

{#if plain}
  {@html asText(content).replace(/\n/g, '<br />')}
{:else if content}
  {#each blocks as block (block._key)}
    {@const { style, _type } = block}
    <slot {block}>
      {#if style === 'normal'}
        <p><svelte:self content={block.children} /></p>
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
        <blockquote><svelte:self content={block.children} /></blockquote>
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
        {@html block.marks.reduce(
          (acc, mark) => `<${mark}>${acc.replace(/\n/g, '<br />')}</${mark}>`,
          block.text.replace(/\n/g, '<br />')
        )}
      {/if}
    </slot>
  {/each}
{/if}
