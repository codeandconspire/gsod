<script>
  let active = false
  let innerWidth
  let duration
  let timeout
  let height
  let delay
  let width
  let tiltY
  let tiltX

  export let reverse = false
  export let glare = true
  export let depth = 1.75
  export let foreground = false

  $: tiltDepth = depth + depth * (1 - width / Math.min(1350, innerWidth))

  function onmousemove(event) {
    let x = -tiltDepth + (event.layerX / width) * (tiltDepth * 2)
    let y = tiltDepth + (event.layerY / height) * (tiltDepth * -2)

    if (reverse) {
      x *= -1
      y *= -1
    }

    tiltY = x.toFixed(2)
    tiltX = y.toFixed(2)
  }

  function onmouseenter() {
    delay = '0ms'
    duration = '100ms'
    timeout = setTimeout(() => {
      active = true
    }, 100)
  }

  function onmouseleave() {
    clearTimeout(timeout)
    active = false
    duration = null
    delay = null
    tiltY = null
    tiltX = null
  }
</script>

<svelte:window bind:innerWidth />

{#if foreground}
  <div class="tilt" class:foreground>
    <div class="content" class:active class:reverse>
      <slot />
    </div>
  </div>
{:else}
  <div
    class="tilt"
    class:active
    class:reverse
    style:--tilt-y={tiltY}
    style:--tilt-x={tiltX}
    style:--tilt-delay={delay}
    style:--tilt-depth={tiltDepth.toFixed(2)}
    style:--tilt-duration={duration}
    bind:offsetWidth={width}
    bind:offsetHeight={height}
    on:mousemove={onmousemove}
    on:mouseenter={onmouseenter}
    on:mouseleave={onmouseleave}>
    <div class="content" class:glare>
      <slot />
    </div>
  </div>
{/if}

<style>
  .tilt {
    display: grid; /* Force content to cover self */
    transform-style: preserve-3d;
    transform: perspective(100rem);
  }

  .tilt:not(.foreground) {
    --tilt-x: 0;
    --tilt-y: 0;
    --tilt-depth: 0;
    --tilt-delay: 50ms;
    --tilt-duration: 300ms;
    --tilt-lift: 0;
  }

  .tilt.foreground {
    --tilt-lift: calc(var(--tilt-depth) * 2.8em);
    transform: scale(calc((var(--tilt-depth) * 2.8em) / 5));
    transform-origin: 0 0;
    transition: text-shadow var(--tilt-duration) var(--tilt-delay);
  }

  :global(.tilt:hover) .tilt.foreground {
    text-shadow: 0 0 0.8em rgba(0, 0, 0, 0.2);
  }

  .content {
    display: grid; /* Force slot to cover content */
    transform: rotateX(calc(var(--tilt-x) * 1deg))
      rotateY(calc(var(--tilt-y) * 1deg)) translateZ(var(--tilt-lift));
    transition: transform var(--tilt-duration) var(--tilt-delay)
      cubic-bezier(0.33, 1, 0.68, 1);
  }

  .tilt.active .content {
    transition: none;
  }

  .glare::after {
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0;
    pointer-events: none;
    background: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(255, 255, 255, 0.01) 70%,
      rgba(255, 255, 255, 0) 80%
    );
    background-repeat: no-repeat;
    background-size: 200% 200%;
    background-position: calc(50% + 50% * var(--tilt-y) / var(--tilt-depth))
      calc(50% + 50% * (var(--tilt-x) * -1) / var(--tilt-depth));
    transition: opacity var(--tilt-duration) var(--tilt-delay)
        cubic-bezier(0.33, 1, 0.68, 1),
      background-position var(--tilt-duration) var(--tilt-delay)
        cubic-bezier(0.33, 1, 0.68, 1);
  }

  .glare:hover::after {
    opacity: 1;
  }

  .tilt.active .glare::after {
    transition: none;
  }
</style>
