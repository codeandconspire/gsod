<script>
  let mouseover = false
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
  export let depth = 1.5

  /** @type {string?} */
  export let href = null

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
    mouseover = true
    timeout = setTimeout(() => {
      active = true
      duration = '0ms'
    }, 100)
  }

  function onmouseleave() {
    clearTimeout(timeout)
    mouseover = false
    active = false
    duration = null
    delay = null
    tiltY = null
    tiltX = null
  }
</script>

<svelte:window bind:innerWidth />

<svelte:element
  this={href ? 'a' : 'div'}
  {href}
  {...$$restProps}
  on:click
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
    <slot hover={mouseover} />
  </div>
</svelte:element>

<style>
  .tilt {
    --tilt-x: 0;
    --tilt-y: 0;
    --tilt-depth: 0;
    --tilt-delay: 50ms;
    --tilt-duration: 300ms;
    --tilt-easing-function: cubic-bezier(0.33, 1, 0.68, 1);
    --tilt-transform: rotateX(calc(var(--tilt-x) * 1deg))
      rotateY(calc(var(--tilt-y) * 1deg));
    --tilt-transform-transition: transform var(--tilt-duration)
      var(--tilt-delay) var(--tilt-easing-function);
    --tilt-foreground-transform: var(--tilt-transform)
      translateZ(calc(var(--tilt-depth) * 1.5em));
    --tilt-background-transform: scale(1.05) var(--tilt-transform)
      translateZ(calc(var(--tilt-depth) * -1.5em));
    --tilt-box-shadow: 0 1px 0 rgba(0, 0, 0, 0.025),
      calc(var(--tilt-y) * -0.8rem) calc(var(--tilt-x) * 0.8rem + 0.8rem) 1.2rem
        rgba(0, 0, 0, 0.035);
    --tilt-box-shadow-transition: box-shadow var(--tilt-duration)
      var(--tilt-delay) var(--tilt-easing-function);

    transform-style: preserve-3d;
    transform: perspective(100rem);
  }

  .tilt.active {
    --tilt-transform-transition: initial;
  }

  .content {
    display: grid; /* Force slot to cover content */
    transform: var(--tilt-transform);
    transition: var(--tilt-transform-transition);
  }

  .content + :global(iframe) {
    transform: translateZ(0px);
  }

  .glare::after {
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0;
    pointer-events: none;
    background: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.15) 0%,
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

  .tilt:hover .glare::after {
    opacity: 1;
  }

  .tilt.active .glare::after {
    transition: none;
  }
</style>
