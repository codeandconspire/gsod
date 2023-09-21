<script>
  export let data
  $: cover = data.cover
</script>

<ol>
  {#each cover.chapters as chapter}
    <li>
      <a href="/chapters/{chapter.slug.current}">
        Chapter
        <br />
        {chapter.shortname || chapter.title}
        <br />
        Explore chapter
      </a>
    </li>
  {/each}
</ol>
