<script>
  export let form = null
  export let groups = []

  $: email = form?.email
</script>

<footer class="footer">
  <div class="main u-container">
    <form
      class="form"
      method="post"
      target="_blank"
      action="https://idea.us7.list-manage.com/subscribe/post">
      <input type="hidden" name="u" value="cff338e1420e74122593d17fc" />
      <input type="hidden" name="id" value="1ba6a7f450" />
      <input type="hidden" name="gdpr[100321]" value="Y" />
      <h2 class="heading">
        <strong>Stay up to date</strong>
        with the latest changes in democracy across the world
      </h2>
      <div class="control">
        <label for="footer-email">
          <span class="u-hidden">Enter you email address</span>
          <input
            class="field"
            type="email"
            name="MERGE0"
            id="footer-email"
            placeholder="Your email address"
            bind:value={email} />
        </label>
        <button type="submit" class="submit">
          <svg class="chevron" fill="currentcolor" viewBox="0 -960 960 960">
            <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z" />
          </svg>
          <span class="u-hidden">Submit</span>
        </button>
      </div>
    </form>
    <nav class="menu">
      {#each groups as children}
        <ul>
          {#each children as { text, href, external, ...attrs }}
            <li>
              <a
                class="link"
                {href}
                {...attrs}
                target={external ? '_blank' : null}>
                {text}
              </a>
            </li>
          {/each}
        </ul>
      {/each}
    </nav>
    <div class="end">
      <div class="terms">
        <a
          href="https://www.idea.int/privacy-policy"
          target="_blank"
          class="link"
          rel="noopener noreferrer">
          Privacy Policy
        </a>
        <a
          href="https://www.idea.int/terms-and-conditions"
          target="_blank"
          class="link"
          rel="noopener noreferrer">
          Terms and Conditions
        </a>
        <a
          href="https://www.idea.int/cookies"
          target="_blank"
          class="link"
          rel="noopener noreferrer">
          Cookie policy
        </a>
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
    user-select: none;
  }

  @media (width > 70rem) {
    .main {
      display: grid;
      grid-template-columns: 30.6rem 1fr;
      grid-template-rows: 1fr auto;
      gap: 0 3rem;
    }
  }

  @media (width > 80rem) {
    .main {
      grid-template-columns: 30.6rem 1fr;
      gap: 0 6rem;
    }
  }

  .form {
    background: #62a3bf;
    border-radius: 0.75rem;
    padding: var(--page-gutter);
    margin-top: -4.3rem;
  }

  @media (width > 70rem) {
    .form {
      padding: 3rem 3.3rem 2.5rem;
      margin-top: -4.5rem;
    }
  }

  .heading {
    font-weight: var(--sans-serif-normal);
    line-height: 1.25;
    font-size: clamp(1.5rem, 3vw, 1.75rem);
    max-width: 13em;
  }

  /* Email input */

  .control {
    width: 100%;
    display: flex;
    align-items: center;
    max-width: 24rem;
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
    transition: background 100ms ease;
  }

  .submit:hover {
    background-color: #1f5280;
  }

  .chevron {
    will-change: transform;
    transition: transform 160ms cubic-bezier(0.22, 1, 0.36, 1);
    height: 1.5rem;
    width: 1.5rem;
    transform: rotate(180deg);
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
    font-weight: bold;
  }

  .field::placeholder {
    color: inherit;
    opacity: 0.4;
    font-weight: normal;
  }

  .field::selection {
    background-color: rgba(98, 163, 191, 0.25);
  }

  .field:focus-visible {
    outline: 2px solid #326593;
  }

  /* Menu */

  .menu {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin-top: clamp(2.5rem, 6vw, 4rem);
  }

  @media (width > 40rem) {
    .menu {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }

  .menu ul {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .link:hover {
    text-decoration: underline;
  }

  .link {
    transition: opacity 100ms ease-out;
    max-width: 10em;
    display: block;
    text-wrap: balance;
  }

  .link:active {
    opacity: 0.5;
    transition: none;
  }

  /* Ending */

  .end {
    grid-column: span 2;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem 2rem;
    margin-top: clamp(2.5rem, 6vw, 4rem);
    padding: clamp(1.5rem, 6vw, 2rem) 0;
    justify-content: space-between;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
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

  @media (width > 70rem) {
    .end {
      grid-column: span 2;
    }
  }
</style>
