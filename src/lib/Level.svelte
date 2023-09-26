<script>
  import { browser } from '$app/environment'

  import { intersection } from '$lib/intersection.js'

  let inview = !browser
  let alternate
  let secondary

  let delay = '0ms'
  let level = 6 + 10 * Math.random()

  function onintersect() {
    inview = true
  }

  function tilt(element, direction, turn = 0) {
    element.addEventListener(
      'transitionend',
      () => {
        level *= 0.75
        if (turn < 2) {
          element.classList.remove(direction)
          tilt(element, direction === 'right' ? 'left' : 'right', turn + 1)
        }
      },
      { once: true }
    )
    element.classList.add(direction)
  }

  function onanimationend() {
    const directions = ['left', 'right']
    const direction = Math.random() > 0.5 ? 0 : 1

    delay = '250ms'
    tilt(alternate, directions.at(direction))
    tilt(secondary, directions.at(direction - 1))
  }
</script>

<div
  class="level"
  class:inview
  style:--delay={delay}
  style:--level={level.toFixed(2)}
  use:intersection={onintersect}>
  <div class="parts">
    <div class="board alternate" bind:this={alternate} />
    <div class="board secondary" bind:this={secondary} />
    <div class="bend" on:animationend|once={onanimationend} />
  </div>
</div>

<style>
  .level {
    --level: 0;
    --delay: 250ms;

    position: relative;
    overflow: hidden;
    background: var(--theme-primary-color);
  }

  .parts {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    transform: translateY(100%);
    transition: transform 1400ms 50ms cubic-bezier(0.23, 1, 0.32, 1);
    will-change: transform;
  }

  .level.inview .parts {
    transform: translateY(0);
  }

  .bend {
    display: none;
    width: 200%;
    height: 100%;
    position: absolute;
    left: 50%;
    top: 0;
    transform: translateX(-50%) scaleY(1);
    background: var(--theme-primary-color);
    border-radius: 100%;
  }

  .level.inview .bend {
    display: block;
    animation: disappear 1600ms 200ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }

  @keyframes disappear {
    to {
      transform: translateX(-50%) scaleY(0);
    }
  }

  .board {
    width: 200%;
    height: 100%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%);
    transform-origin: 50% 0;
    transition: transform 2200ms var(--delay)
      cubic-bezier(0.455, 0.03, 0.515, 0.955);
  }

  .level :global(.board.right) {
    transform: translateX(-50%) rotate(calc(var(--level) * 1deg));
  }

  .level :global(.board.left) {
    transform: translateX(-50%) rotate(calc(var(--level) * -1deg));
  }

  .alternate {
    opacity: 0.15;
    background-color: #fff;
  }

  .secondary {
    background: var(--theme-secondary-color);
  }
</style>
