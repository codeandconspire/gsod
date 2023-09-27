<script>
  export let groups = []
  export let form = null

  $: email = form?.email
</script>

<footer class="footer">
  <div class="main u-container">
    <form class="form">
      <h2 class="heading">
        Be notified about next year's Global State of Democracy Report
      </h2>
      <div class="control">
        <label for="footer-email">
          <span class="u-hidden">Your email</span>
          <input
            class="field"
            type="email"
            name="email"
            id="footer-email"
            placeholder="Your email"
            bind:value={email} />
        </label>
        <button type="submit" class="submit">Submit</button>
      </div>
      <label for="footer-opt-in">
        <input class="check" checked type="checkbox" id="footer-opt-in" name="opt-in" />
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
    <div class="end">
      <div class="terms">
        <a href="https://www.idea.int/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
        <a href="https://www.idea.int/terms-and-conditions" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
        <a href="https://www.idea.int/cookies" target="_blank" rel="noopener noreferrer">Cookie policy</a>
      </div>
      <p>© 2023 International IDEA. All Rights Reserved</p>
    </div>
  </div>
</footer>

<style>
  .footer {
    background: #326593;
    color: #fff;
    font-size: var(--framework-font-size);
    padding: 0 var(--page-gutter);
    font-family: var(--sans-serif);
    margin-top: 10rem;
  }

  .main {
    display: grid;
    /* grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr; */
  }

  .form {
    background: #62A3BF;
    border-radius: 0.75rem;
    padding: var(--page-gutter);
    margin-top: -4.3rem;
  }

  .heading {
    font-weight: var(--sans-serif-normal);
    line-height: 1.3;
    font-size: clamp(1.25rem, 3vw, 1.75rem);
    text-wrap: balance;
    max-width: 28rem;
  }

  /* Email input */

  .control {
    width: 100%;
    display: flex;
    align-items: center;
    max-width: 26.35rem;
    margin: 1.25rem 0 0.75rem;
  }

  .control label {
    width: 100%;
  }

  .submit {
    flex: 0 0 auto;
    border-radius: 50%;
    background-color: #326593;
    font-size: 0;
    width: 2rem;
    height: 2rem;
    margin-left: -2.5rem;
  }

  .field {
    background: #fff;
    color: #000;
    border-radius: 0.25rem;
    border: 0;
    height: 3rem;
    padding: 0 3rem 0 1.25rem;
    font-size: 1rem;
    width: 100%;
  }

  .field::placeholder {
    color: inherit;
    opacity: 1;
  }

  /* Checkbox */


  .check {
    position: absolute;
    width: 0;
    height: 0;
    opacity: 0;
  }

  .label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: nowrap;
    cursor: pointer;
  }

  .check:focus-within + .label::before {
    outline: 2px solid;
  }

  .label::before {
    content: "";
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: -0.1rem;
    width: 1.25rem;
    height: 1.25rem;
    background: #fff;
    border-radius: 0.25rem;
    color: #326593;
    font-size: 1.1rem;
    font-weight: bold;
  }

  .check:checked + .label::before {
    content: "✓";
  }

  /* Ending */

  .end {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem 2rem;
    margin-top: clamp(2.5rem, 6vw, 4rem);
    padding: clamp(1.5rem, 6vw, 2rem) 0;
    justify-content: space-between;
    border-top: 1px solid rgba(255, 255, 255, 0.2)
  }

  .terms {
    display: flex;
    gap: 1.1em;
  }

  @media (width > 40rem) {
    .terms {
      gap: 1.75em;
    }
  }
</style>
