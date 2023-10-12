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
      <Theme primary="#000" secondary="#000" dark="#000">
        <slot />
      </Theme>
    </div>
  </div>
</dialog>

<style>
  .dialog {
    --space-medium: var(--space-small);

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
    z-index: 3;
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
    padding: calc(var(--page-gutter) * 1.5);
    align-items: center;
    justify-content: center;
    overflow: auto;
    -ms-scroll-chaining: none;
    overscroll-behavior: contain;
    -webkit-overflow-scrolling: touch;
  }

  .main {
    --padding: clamp(2.5rem, 4vw, 3.75rem);

    width: 100%;
    height: auto;
    max-width: 52rem;
    padding: var(--padding);
    margin: auto 0;
    position: relative;
    overflow: hidden;
    color: var(--theme-text-color);
    background: var(--theme-primary-color);
    border-radius: var(--border-radius);
    animation: slide-in 400ms forwards cubic-bezier(0.25, 1, 0.5, 1);
  }

  @media (width <= 40rem) {
    .container {
      padding: 0;
    }

    .main {
      --padding: 2rem;

      height: 100%;
      border-radius: 0;
    }
  }

  @keyframes slide-in {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }

  .image {
    margin: calc(var(--padding) * -1) calc(var(--padding) * -1) 2rem;
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
    transition: background-color 250ms cubic-bezier(0.22, 1, 0.36, 1),
      color 250ms cubic-bezier(0.22, 1, 0.36, 1);
  }

  .main.has-image .icon:hover {
    color: #000;
    background-color: rgba(255, 255, 255, 1);
  }
</style>
