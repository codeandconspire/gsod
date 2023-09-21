<script>
  import { resolve } from '$lib/sanity.js'
  import idea from '$lib/assets/idea.svg'
  import gsdi from '$lib/assets/gsdi.svg'

  export let items = []
</script>

<nav class="menu">
  <a href="/" class="home" rel="home">
    <img src={idea} alt="IDEA" class="idea" />
    <img src={gsdi} alt="Global State of Democracy Initiative" class="gsdi" />
  </a>
  <ol class="items">
    {#each items as item}
      {@const hasChildren = Boolean(item.children?.length)}
      <li class="item">
        {#if item.link}
          <a
            href={resolve(item.link)}
            class="anchor"
            class:parent={hasChildren}>
            {item.label}
          </a>
        {:else}
          <span class="anchor" class:parent={hasChildren}>{item.label}</span>
        {/if}
        {#if hasChildren}
          <ol class="children">
            {#each item.children as child}
              {#if child.link}
                <li class="child">
                  <a href={resolve(child.link)} class="anchor">{child.label}</a>
                </li>
              {/if}
            {/each}
          </ol>
        {/if}
      </li>
    {/each}
  </ol>
</nav>

<style>
  .menu {
    display: flex;
    gap: 2rem;
    font-family: var(--sans-serif);
  }

  .home {
    margin-right: auto;
  }

  .items {
    display: flex;
    gap: 1.5rem;
  }
</style>
