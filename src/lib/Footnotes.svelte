<script>
  import Text, { collect } from '$lib/Text.svelte'
  import Html from '$lib/Html.svelte'
</script>

<Html>
  <ol>
    {#each collect() as footnote, index}
      <li class="item" id="footnote-{footnote._key}">
        <sup>[{index + 1}]</sup>
        <div><Text content={footnote.content} /></div>
      </li>
    {/each}
  </ol>
</Html>

<style>
  .item {
    display: flex;
    align-items: baseline;
    gap: 0.25rem;
  }
</style>
