<script>
  export let content = null
  export let plain = false

  const asPlainText = () =>
    content
      .filter((block) => block._type === 'block')
      .flatMap((block) => block.children.map((child) => child.text))
      .join(' ')
</script>

{#if plain}
  {asPlainText()}
{:else if content}
  {#each content as block (block._key)}
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
      {:else if _type === 'span'}
        {@html block.marks.reduce(
          (acc, mark) => `<${mark}>${acc.replace(/\n/g, '<br />')}</${mark}>`,
          block.text.replace(/\n/g, '<br />')
        )}
      {/if}
    </slot>
  {/each}
{/if}
