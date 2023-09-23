<script>
  export let preface = null
  export let chapters = []
</script>

<div class="chapters u-container">
  <h2 class="title">Report Chapters</h2>
  {#if preface}
    <article class="preface">
      <img alt="" {...preface.image} />
      <h3 class="heading">{preface.heading}</h3>
      {#if preface.subheading}
        <p class="subheading">
          <slot name="subheading" preface.subheading={preface.subheading}>
            {preface.subheading}
          </slot>
        </p>
      {/if}
      {#if preface.link}
        <a href={preface.link.href}>
          {preface.link.label}
        </a>
      {/if}
    </article>
  {/if}
  <div class="items">
    {#each chapters as chapter}
      <div class="item">
        <slot name="chapter" {chapter} />
      </div>
    {/each}
  </div>
</div>

<style>
  .chapters {
    margin: 3rem 0;
  }

  .title {
    font-weight: var(--sans-serif-heavy);
    font-family: var(--sans-serif);
    font-size: clamp(1.25rem, 10vw, 2.3rem);
    line-height: var(--sans-serif-line-height);
  }

  .items {
    margin-top: 3rem;
    display: grid;
    gap: clamp(1.5rem, 10vw, 4rem);
    grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  }
</style>
