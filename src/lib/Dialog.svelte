<script>
  import { goto } from '$app/navigation'

  import Theme from '$lib/Theme.svelte'

  /** @type {HTMLDialogElement?} */
  export let dialog = null

  /** @type {boolean?} */
  export let open = false

  /** @type {string?} */
  export let href

  function click(event) {
    if (event.target === dialog) {
      if (href) goto(href, { noScroll: true, replaceState: true })
      else dialog?.close()
    }
  }

  function close() {
    if (href) goto(href, { noScroll: true, replaceState: true })
    else dialog?.close()
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
  class="dialog"
  {open}
  bind:this={dialog}
  on:close
  on:click|preventDefault={click}>
  <div class="container">
    <div class="main" class:has-image={$$slots.image}>
      <svelte:element
        this={href ? 'a' : 'button'}
        {href}
        class="close"
        on:click|preventDefault={close}>
        <svg class="icon" height="24" viewBox="0 -960 960 960" width="24">
          <path
            fill="currentcolor"
            d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
        </svg>
        <span class="u-hidden">Close dialog</span>
      </svelte:element>
      {#if $$slots.image}
        <div class="image">
          <slot name="image" />
        </div>
      {/if}
      <Theme primary="#000" secondary="#000">
        <slot />
      </Theme>
    </div>
  </div>
</dialog>

<style>
  .dialog {
    display: flex;
    width: 100%;
    height: 100%;
    padding: 0;
    border: 0;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 2;
    animation: fade-in 400ms forwards cubic-bezier(0.25, 1, 0.5, 1);
  }

  @keyframes fade-in {
    from {
      background: rgba(255, 255, 255, 0);
      backdrop-filter: blur(0px);
    }
    to {
      background: rgba(255, 255, 255, 0.65);
      backdrop-filter: blur(4px);
    }
  }

  :root:has(.dialog[open]) {
    overflow: hidden;
  }

  @media (width <= 40rem) {
    .dialog {
      width: 100%;
      height: 100%;
      margin: 0;
      inset: 0;
      max-width: none;
      min-width: auto;
      padding: 0;
    }
  }

  .container {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    padding: var(--page-gutter);
    overflow: auto;
    -ms-scroll-chaining: none;
    overscroll-behavior: contain;
    -webkit-overflow-scrolling: touch;
  }

  .main {
    --spacing: clamp(1rem, 4vw, 2rem);

    width: 100%;
    height: auto;
    max-width: 48rem;
    padding: var(--spacing) var(--page-gutter) calc(var(--spacing) + 1rem);
    margin: auto 0;
    position: relative;
    overflow: hidden;
    color: var(--theme-text-color);
    background: var(--theme-primary-color);
    border-radius: var(--border-radius);
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1), 0 1px 0 rgba(0, 0, 0, 0.05);
    animation: slide-in 400ms forwards cubic-bezier(0.25, 1, 0.5, 1);
  }

  @keyframes slide-in {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }

  @media (width <= 40rem) {
    .main {
      height: 100%;
      border-radius: 0;
      box-shadow: none;
    }
  }

  .image {
    margin: calc(var(--spacing) * -1) calc(var(--page-gutter) * -1)
      var(--spacing);
  }

  .image :global(img) {
    width: 100%;
  }

  .close {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
  }

  .icon {
    width: 3rem;
    height: 3rem;
    padding: 0.5rem;
    margin: -0.5rem;
    border-radius: 100%;
  }

  .main.has-image .icon {
    width: 2rem;
    height: 2rem;
    background-color: rgba(255, 255, 255, 0.8);
    transition: background-color 250ms cubic-bezier(0.22, 1, 0.36, 1);
  }

  .main.has-image .icon:hover {
    background-color: rgba(255, 255, 255, 1);
  }
</style>
