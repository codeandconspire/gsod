<script>
  export let back
  export let heading
  export let subheading
</script>

<header>
  {#if back}<a href={back} class="back">Back</a>{/if}
  <h1 class="heading">{heading}</h1>
  <p class="subheading">{subheading}</p>
</header>
