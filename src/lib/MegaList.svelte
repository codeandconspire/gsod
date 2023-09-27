<script>
  export let items
</script>

<ol class="megalist">
  {#each items as item}
    <li class="item"><slot {item} /></li>
  {/each}
</ol>

<style>
  .megalist {
    margin: 1.5em 0;
    counter-reset: list;
  }

  .item {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
  }

  .item + .item {
    margin-top: clamp(1.5em, 3.5vw, 2.5em);
  }

  .item::before {
    counter-increment: list;
    content: counter(list) '. ';
    display: block;
    line-height: 0.75;
    min-width: 3rem;
    color: var(--theme-primary-color, currentColor);
    font-weight: bold;
    font-size: 3.75rem;
    letter-spacing: -0.05em;
  }

  @media (width > 30rem) {
    .item::before {
      font-size: 6.15rem;
      line-height: 0.7;
      min-width: 5rem;
    }
  }
</style>
