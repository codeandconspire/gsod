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
  import { fly } from 'svelte/transition'
  import { page } from '$app/stores'

  import * as footnotes from '$lib/Footnotes.svelte'
  import * as figure from '$lib/Figure.svelte'
  import { resolve } from '$lib/sanity.js'
  import Html from './Html.svelte'

  /** @type {any[]} */
  export let content
  export let plain = false

  const shortcode = getContext('SHORTCODE')
  const figures = getContext('FIGURES') || []

  // The Sanity PortableText format is a flat array of blocks which needs
  // processing to collect list items and preserve markDef references
  $: blocks = content?.reduce(function compile(acc, block) {
    const { _key, children, marks, markDefs, listItem } = block
    const prev = acc.at(-1)

    if (markDefs) {
      for (const def of markDefs) {
        if (def._type === 'footnote') {
          footnotes.add(def)
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

  const onshare = (text) => (event) => {
    const { href } = event.currentTarget
    if ('share' in navigator) {
      navigator.share({ url: href, text })
    } else if ('clipboard' in navigator) {
      const type = 'text/plain'
      const blob = new Blob([href], { type })
      const data = [new ClipboardItem({ [type]: blob })]
      // @ts-ignore
      navigator.clipboard.write(data)
    }
  }

  const anchors = {}
  let selected = null
  let selectedNode = null

  const onclickoutside = async (event) => {
    const anchorNodes = Object.values(anchors)
    if (anchorNodes.includes(event.target)) return
    let parent = event.target
    while (parent) {
      if (parent === selectedNode) return
      parent = parent.parentNode
    }
    selected = null
  }
</script>

<svelte:document on:click={onclickoutside} />

{#if plain}
  {@html format(asText(content))}
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
              <a
                href={def.url}
                target="_blank"
                rel="noopener noreferrer"
                class="external">
                <svelte:self content={[{ ...block, marks }]} />
                <svg class="icon" viewBox="0 -960 960 960">
                  <path
                    fill="currentcolor"
                    d="M212.309-140.001q-30.308 0-51.308-21t-21-51.308v-535.382q0-30.308 21-51.308t51.308-21h252.305V-760H212.309q-4.616 0-8.463 3.846-3.846 3.847-3.846 8.463v535.382q0 4.616 3.846 8.463 3.847 3.846 8.463 3.846h535.382q4.616 0 8.463-3.846 3.846-3.847 3.846-8.463v-252.305h59.999v252.305q0 30.308-21 51.308t-51.308 21H212.309Zm176.46-206.615-42.153-42.153L717.847-760H560v-59.999h259.999V-560H760v-157.847L388.769-346.616Z" />
                </svg>
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
                bind:this={anchors[def._key]}
                on:click|preventDefault={() => {
                  selected = def
                }}>
                <svelte:self content={[{ ...block, marks }]} />
              </a>
            {:else if def?._type === 'figureReference'}
              {#if def.figure}
                {@const item = figures.find((item) => item._key === def.figure)}
                {@const ofType = figures.filter(
                  ({ label }) => item.label === label
                )}
                {@const index = ofType.indexOf(item)}
                {@const id = figure.anchor(def.figure)}
                {@const text = item
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
              {:else}
                {@html format(block.text)}
              {/if}
            {/if}
          {/if}
        {:else}
          {@html format(block.text)}
        {/if}
      {/if}
    </slot>
  {/each}
{/if}

{#if selected}
  {#key selected._key}
    <div
      class="footnote"
      in:fly|global={{ y: '100%', duration: 300 }}
      out:fly|global={{ y: '100%', duration: 300 }}>
      <Html>
        <svelte:self content={selected.content} />
      </Html>
      <div class="actions">
        <a
          title="Share"
          class="action"
          on:click|preventDefault={onshare(asText(selected.content))}
          href={$page.url.href.replace(/(#.+)|$/, `#anchor-${selected._key}`)}>
          <svg viewBox="0 -960 960 960">
            <path
              d="M440-280H280q-83 0-141.5-58.5T80-480q0-83 58.5-141.5T280-680h160v80H280q-50 0-85 35t-35 85q0 50 35 85t85 35h160v80ZM320-440v-80h320v80H320Zm200 160v-80h160q50 0 85-35t35-85q0-50-35-85t-85-35H520v-80h160q83 0 141.5 58.5T880-480q0 83-58.5 141.5T680-280H520Z" />
          </svg>
        </a>
        <button
          class="action"
          title="Close"
          on:click|preventDefault={() => {
            selected = null
          }}>
          <svg viewBox="0 -960 960 960">
            <path
              d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
          </svg>
        </button>
      </div>
    </div>
  {/key}
{/if}

<style>
  .anchor:target {
    background: var(--theme-primary-color);
    color: var(--theme-text-color);
    border-radius: 2px;
    box-shadow: 0 0 0 0.2em var(--theme-primary-color);
  }

  .external {
    display: inline-flex;
    align-items: flex-start;
    gap: 0.25em;
  }

  .icon {
    width: 0.75em;
    height: 0.75em;
  }

  .footnote {
    text-align: left;
    padding: 1rem 5rem 1rem var(--page-gutter);
    position: fixed;
    inset: auto 0 0;
    z-index: 3;
    box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.025),
      0 -0.8rem 1.4rem rgba(0, 0, 0, 0.035);
    background: #fff;
    box-shadow: 0 -0.3rem 1.5rem rgba(0, 0, 0, 0.1),
      0 0 0 0.5px rgba(0, 0, 0, 0.1);
    font-family: var(--sans-serif);
    letter-spacing: 0;
    font-size: var(--framework-font-size);
  }

  @media (width > 45rem) {
    .footnote {
      width: calc(var(--text-width) - 2rem);
      max-width: 36rem;
      margin: 0 auto;
      padding: 1rem 4.5rem 1rem 1.5rem;
      bottom: 2rem;
      border-radius: 0.5rem;
      box-shadow: 0 0.3rem 1.5rem rgba(0, 0, 0, 0.1),
        0 0 0 0.5px rgba(0, 0, 0, 0.1);
    }
  }

  .actions {
    display: flex;
    gap: 0.5rem;
    position: absolute;
    top: 0.7rem;
    right: 0.7rem;
  }

  .action {
    width: 1.2rem;
    height: 1.2rem;
  }
</style>
