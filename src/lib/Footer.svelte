<script>
  export let groups = []
  export let form = null

  $: email = form?.email
</script>

<footer class="footer">
  <form class="form">
    <h2 class="heading">
      Be notified about next year's Global State of Democracy Report
    </h2>
    <label for="footer-email">
      <span class="u-hidden">Your email</span>
      <input
        type="email"
        name="email"
        id="footer-email"
        placeholder="Your email"
        bind:value={email} />
    </label>
    <button type="submit" class="submit">Submit</button>
    <label for="footer-opt-in">
      <input type="checkbox" id="footer-opt-in" name="opt-in" />
      <span class="label">Receive news about our other projects</span>
    </label>
  </form>
  <nav class="menu">
    {#each groups as group}
      <ul>
        {#each group as { label, active, href }}
          <li>
            <a class="link" class:active {href}>{label}</a>
          </li>
        {/each}
      </ul>
    {/each}
  </nav>
</footer>
