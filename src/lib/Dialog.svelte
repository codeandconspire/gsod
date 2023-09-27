<script>
  export let dialog

  function click(event) {
    if (event.target === dialog) dialog.close()
  }

  function close() {
    dialog.close()
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog class="dialog" bind:this={dialog} on:close on:click={click}>
  <div class="main">
    <button class="close" on:click={close}>
      <svg class="icon" height="24" viewBox="0 -960 960 960" width="24">
        <path
          fill="currentcolor"
          d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
      </svg>
      <span class="u-hidden">Close dialog</span>
    </button>
    <slot />
  </div>
</dialog>

<style>
  .dialog {
    border: 0;
    background: transparent;
    padding: 2rem;
  }

  @media (width < 40rem) {
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

  .main {
    position: relative;
    padding: 5rem var(--page-gutter);
    background: var(--theme-primary-color);
    color: var(--theme-text-color);
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1), 0 1px 0 rgba(0, 0, 0, 0.05);
    border-radius: 0.75rem;
    max-width: 53rem;
  }

  @media (width < 40rem) {
    .main {
      height: 100%;
      border-radius: 0;
      box-shadow: none;
    }
  }

  .dialog::backdrop {
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(4px);
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
  }
</style>
