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
        <svg class="icon" height="18.8884" width="18.8733">
          <path
            d="m.375211 18.5122c.509293.4976 1.368269.4912 1.853189.0063l7.20892-7.2089 7.20468 7.2068c.4934.4934 1.3514.5009 1.8511-.0063.4997-.5093.5018-1.3481.0084-1.8436l-7.2047-7.21642 7.2047-7.2047c.4934-.49335.5009-1.341784-.0084-1.841467-.5093-.509293-1.3577-.511402-1.8511-.008437l-7.20468 7.204704-7.20892-7.206813c-.48492-.492419-1.353506-.510466-1.853189.008437-.497574.509293-.491246 1.356546-.006328 1.841466l7.208917 7.20681-7.208917 7.22062c-.484918.4828-.500856 1.3418.006328 1.8415z"
            fill="currentcolor" />
        </svg>
        <span class="u-hidden">Close</span>
      </svelte:element>
      {#if $$slots.image}
        <div class="image">
          <slot name="image" />
        </div>
      {/if}
      <slot />
    </div>
    <button
      tabindex="-1"
      class="close backdrop"
      title="Close"
      on:click|preventDefault={close}>
      <span class="u-hidden">Close</span>
    </button>
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
      background: rgba(0, 0, 0, 0);
      backdrop-filter: blur(0px);
    }
    to {
      background: rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(10px);
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
    position: relative;
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
    z-index: 1;
    overflow: hidden;
    background: #fff;
    border-radius: var(--border-radius);
    animation: slide-in 400ms forwards cubic-bezier(0.25, 1, 0.5, 1);
    box-shadow: 0 0.3rem 3rem rgba(0, 0, 0, 0.05),
      0 0.5px 0 0 rgba(0, 0, 0, 0.1);
  }

  @media (width <= 40rem) {
    .container {
      padding: 0;
    }

    .main {
      --padding: 2rem;

      min-height: 100%;
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
    top: 1.25rem;
    right: 1.25rem;
    padding: 0.6rem;
    transition: opacity 100ms ease-out;
  }

  .close:active {
    opacity: 0.6;
    transition: none;
  }

  .close .icon {
    display: block;
  }

  .close.backdrop {
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    cursor: default;
  }

  .main.has-image .close {
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.5);
    transition: background-color 250ms cubic-bezier(0.22, 1, 0.36, 1),
      color 250ms cubic-bezier(0.22, 1, 0.36, 1);
  }

  .main.has-image .close:hover {
    color: #000;
    background-color: rgba(255, 255, 255, 1);
  }
</style>
