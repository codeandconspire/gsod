<script>
  import { page } from '$app/stores'

  import Text, { asText } from '$lib/Text.svelte'
  import { resolve } from '$lib/sanity.js'
  import Menu from '$lib/Menu.svelte'
  import Hero from '$lib/Hero.svelte'
  import Card from '$lib/Card.svelte'
  import Tilt from '$lib/Tilt.svelte'

  export let data

  $: cover = data.cover
  $: menu = cover.menu.map(function each(item) {
    const { link, label } = item
    const href = resolve(link)
    const children = item.children?.map(each)
    const selected =
      $page.url.pathname === href ||
      children?.some((child) => $page.url.pathname === child.href)
    return { href, label, selected, children }
  })
</script>

<Hero
  fill
  primaryColor={cover.primaryColor}
  secondaryColor={cover.secondaryColor}>
  <Menu slot="menu" items={menu} />
  <span slot="heading">
    <Text content={cover.title} let:block>
      {#if block.style === 'normal'}
        <Text content={block.children} />
      {/if}
    </Text>
  </span>
  <Text slot="subheading" content={cover.subheading} plain />
</Hero>

<div class="chapters u-container">
  <h2 class="title">Report Chapters</h2>
  {#if cover.featuredChapter}
    {@const { featuredChapter: feature } = cover}
    {@const href = resolve(feature.link)}
    <Tilt>
      <article class="feature">
        {#if feature.image.image}
          <img
            class="image"
            alt={feature.image.alt || ''}
            src={feature.image.image.asset.url} />
        {/if}
        <div class="body">
          <h3 class="heading">
            <Text content={feature.heading} let:block>
              {#if block.style === 'normal'}
                <Text content={block.children} />
              {/if}
            </Text>
          </h3>
          {#if feature.subheading}
            <div class="subheading">
              <Text content={feature.subheading} />
            </div>
          {/if}
          {#if href}
            <a {href} class="link">{feature.label}</a>
          {/if}
        </div>
      </article>
    </Tilt>
  {/if}
  <div class="items">
    {#each cover.chapters as chapter}
      {@const href = resolve(chapter)}
      <Tilt>
        <Card
          primaryColor={chapter.primaryColor || cover.primaryColor}
          secondaryColor={chapter.secondaryColor || cover.secondaryColor}
          heading={chapter.shortname || chapter.title}
          subheading={chapter.category}
          link={href ? { href, label: 'Explore chapter' } : null} />
      </Tilt>
    {/each}
  </div>
</div>

<style>
  .chapters {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin: 3rem 0;
    position: relative;
    z-index: 0;
  }

  .title {
    font-weight: var(--sans-serif-heavy);
    font-family: var(--sans-serif);
    font-size: clamp(1.25rem, 10vw, 2.3rem);
    line-height: var(--sans-serif-line-height);
  }

  .feature {
    display: flex;
    position: relative;
    overflow: hidden;
    border-radius: var(--border-radius);
    box-shadow: var(--tilt-box-shadow);
    transition: var(--tilt-box-shadow-transition);
  }

  .feature::after {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    background: linear-gradient(
      135deg,
      rgba(0, 0, 0, 0.5) 0%,
      rgba(0, 0, 0, 0) 90%
    );
  }

  @media (min-width: 800px) {
    .feature::before {
      content: '';
      display: block;
      padding-top: 40%;
    }

    .feature::after {
      content: none;
    }
  }

  .body {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2rem;
    padding: clamp(1rem, max(5vh, 6vw), 5rem) clamp(1.5rem, 5vw, 3.5rem)
      clamp(1rem, 4vh, 3rem);
    position: relative;
    color: #fff;
    line-height: var(--sans-serif-line-height);
    font-family: var(--sans-serif);
    text-shadow: 0 0 0.8em rgba(0, 0, 0, 0.2);
    transform: var(--tilt-foreground-transform);
    transition: var(--tilt-transform-transition);
  }

  .heading {
    max-width: 18em;
    margin-bottom: auto;
    font-weight: var(--sans-serif-bold);
    font-size: clamp(1.25rem, 4vw, 2.375rem);
  }

  .subheading {
    font-size: clamp(0.9375rem, 3vw, 1.25rem);
  }

  .image {
    object-fit: cover;
    object-position: right;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    transform: var(--tilt-background-transform);
    transition: var(--tilt-transform-transition);
  }

  .link {
    padding: 1rem 1.6rem;
    border: 2px solid #fff;
    border-radius: var(--border-radius);
    text-shadow: none;
    transition: background-color var(--tilt-duration) var(--tilt-delay)
        cubic-bezier(0.33, 1, 0.68, 1),
      color var(--tilt-duration) var(--tilt-delay)
        cubic-bezier(0.33, 1, 0.68, 1);
  }

  .link:hover {
    color: #000;
    background: #fff;
  }

  .link::after {
    content: '';
    position: absolute;
    inset: 0;
  }

  .items {
    margin-top: 3rem;
    display: grid;
    gap: clamp(1.5rem, 10vw, 4rem);
    grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  }
</style>
