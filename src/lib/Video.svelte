<script context="module">
  // match short and long youtube links
  // https://www.youtube.com/watch?foo=bar&v=WwE7TxtoyqM&bin=baz
  // https://youtu.be/gd6_ZECm58g
  const YOUTUBE_RE =
    /https?:\/\/(?:www.)?youtu\.?be(?:\.com\/watch\?(?:.*?)v=|\/)(.+?)(?:&|$)/

  const VIMEO_RE = /vimeo\.com\/(.+?)(?:\?|$)/

  export function getEmbedUrl(url) {
    if (YOUTUBE_RE.test(url)) {
      const match = url.match(YOUTUBE_RE)
      if (!match) return null
      const [, id] = match
      return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&showinfo=0`
    }

    if (VIMEO_RE.test(url)) {
      const match = url.match(/vimeo\.com\/(.+?)(?:\?|$)/)
      if (!match) return null
      const [, id] = match
      return `https://player.vimeo.com/video/${id}?badge=0&autoplay=1`
    }
  }
</script>

<script>
  export let url
  $: src = getEmbedUrl(url)
</script>

{#if src}
  <div class="video">
    <iframe frameborder="0" allowfullscreen {src} title="Video" />
  </div>
{/if}

<style>
  .video {
    aspect-ratio: 16 / 9;
    position: relative;
    user-select: none;
    background: #f2f3f8;
    border-radius: var(--border-radius);
  }

  .video iframe {
    width: calc(100% - 3rem);
    height: calc(100% - 3rem);
    position: absolute;
    inset: 1.5rem;
  }
</style>
