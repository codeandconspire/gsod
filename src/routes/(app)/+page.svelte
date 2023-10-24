<script>
  import { page } from '$app/stores'

  import { intersection } from '$lib/intersection.js'
  import Details from '$lib/Details.svelte'
  import { resolve } from '$lib/sanity.js'
  import Image from '$lib/Image.svelte'
  import Theme from '$lib/Theme.svelte'
  import Text from '$lib/Text.svelte'
  import Html from '$lib/Html.svelte'
  import Menu from '$lib/Menu.svelte'
  import Hero from '$lib/Hero.svelte'
  import Card from '$lib/Card.svelte'
  import Tilt from '$lib/Tilt.svelte'
  import Meta from '$lib/Meta.svelte'

  export let data

  let scrolljack = true

  $: cover = data.cover
  $: menu = cover.menu.map(function each(item) {
    const { link, label } = item
    const href = resolve(link)
    const children = item.children?.map(each)
    const active =
      $page.url.pathname === href ||
      children?.some((child) => $page.url.pathname === child.href)
    return { href, label, active, children }
  })
</script>

<Meta {...data.meta} />

<Theme
  primary={cover.primaryColor}
  secondary={cover.secondaryColor}
  dark={cover.darkColor}>
  <Hero slides={cover.highlights} {scrolljack}>
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

  <div
    class="chapters u-container"
    use:intersection={{
      onintersect(ratio) {
        scrolljack = !ratio
      }
    }}>
    <h2 class="title">Report Chapters</h2>
    {#if cover.featuredChapter}
      {@const { featuredChapter: feature } = cover}
      {@const href = resolve(feature.link)}
      <Tilt {href} depth={0.6} let:hover>
        <article class="feature" class:hover>
          {#if feature.image.image}
            <img
              class="image"
              alt={feature.image.alt || ''}
              src={feature.image.image.asset.url} />
          {/if}
          <div class="body">
            <h3 class="heading">
              <Text content={feature.heading} />
            </h3>
            {#if feature.subheading}
              <div class="subheading">
                <Text content={feature.subheading} />
              </div>
            {/if}
            {#if href}
              <span class="link">{feature.label}</span>
            {/if}
          </div>
        </article>
      </Tilt>
    {/if}
    <div class="items">
      {#each cover.chapters as chapter}
        {@const href = resolve(chapter)}
        <Tilt {href} let:hover>
          <Theme
            primary={chapter.primaryColor || cover.primaryColor}
            secondary={chapter.secondaryColor || cover.secondaryColor}
            dark={chapter.darkColor || cover.darkColor}>
            <Card
              {hover}
              heading={chapter.shortname || chapter.title}
              subheading={chapter.category}
              link={href ? { label: 'Explore chapter' } : null} />
          </Theme>
        </Tilt>
      {/each}
    </div>
  </div>

  {#if cover.downloads?.length}
    <div class="u-container">
      <Details heading="Download the Report">
        <div class="downloads">
          {#each cover.downloads as download}
            <a href={download.file.asset.url} download class="download">
              {#if download.thumbnail}
                <Image
                  class="thumbnail"
                  alt={download.label}
                  image={download.thumbnail}
                  sizes="10rem"
                  variants={[200, 400, 600]} />
              {/if}
              <Html class="description">
                <h3 class="h3 label">{download.label}</h3>
                {#if download.description}
                  <p>{download.description}</p>
                {/if}
              </Html>
            </a>
          {/each}
        </div>
      </Details>
    </div>
  {/if}
</Theme>

<style>
  .chapters {
    display: flex;
    flex-direction: column;
    gap: 0;
    margin: var(--space-medium) 0;
    position: relative;
    z-index: 0;
  }

  .title {
    font-weight: var(--sans-serif-heavy);
    font-family: var(--sans-serif);
    font-size: clamp(1.25rem, 10vw, 2.3rem);
    line-height: 1.25;
    margin-bottom: var(--space-small);
  }

  /** Featured chapter */

  .feature {
    display: flex;
    position: relative;
    overflow: hidden;
    border-radius: var(--border-radius);
    box-shadow: var(--tilt-box-shadow);
    transition: var(--tilt-box-shadow-transition);
    user-select: none;
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

  @media (width > 50rem) {
    .feature::before {
      content: '';
      display: block;
      padding-top: 40%;
    }

    .feature::after {
      content: none;
    }
  }

  @media (width > 70rem) {
    .feature .heading {
      font-size: clamp(1.25rem, 10vw, 2.3rem);
    }

    .feature .subheading {
      font-size: 1.25rem;
    }
  }

  @media (width <= 40rem) {
    .feature::before,
    .feature::after {
      display: none;
    }

    .feature .image {
      display: none;
    }

    .feature {
      background-color: #41475a;
    }

    .feature .body {
      text-shadow: none;
    }
  }

  .body {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2rem;
    padding: min(max(1.75rem, 5.5%), var(--page-gutter));
    position: relative;
    color: #fff;
    line-height: 1.25;
    font-family: var(--sans-serif);
    transform: var(--tilt-foreground-transform);
    transition: var(--tilt-transform-transition);
  }

  .heading {
    max-width: 18em;
    margin-bottom: auto;
    font-weight: var(--sans-serif-bold);
    font-size: clamp(1.5rem, 3vw, 1.75rem);
    text-wrap: balance;
    line-height: 1.25;
  }

  .subheading {
    font-size: 1rem;
    line-height: 1.4;
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
    display: inline-flex;
    align-items: center;
    padding: 0.8rem 1.1rem 0.8rem 1.5rem;
    font-family: var(--sans-serif);
    font-weight: var(--sans-serif-bold);
    border-radius: var(--border-radius);
    color: #000;
    background-color: #fff;
    transition: background-color 190ms cubic-bezier(0.33, 1, 0.68, 1),
      opacity 100ms ease-out;
    font-size: var(--framework-font-size);
  }

  .feature:active .link,
  .link:active {
    opacity: 0.7;
    transition: none;
  }

  /** Chapters grid */

  .items {
    margin-top: clamp(2rem, 4vw, 3rem);
    display: grid;
    gap: clamp(2rem, 4vw, 3rem);
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  }

  /** Downloads */

  .downloads {
    display: flex;
    flex-direction: column;
    gap: clamp(1rem, 5vw, 2rem);
  }

  .download {
    display: flex;
    gap: clamp(1rem, 5vw, 2rem);
    align-items: flex-start;
    transition: opacity 100ms ease-out;
    margin-top: 1rem;
  }

  .download:active {
    opacity: 0.7;
    transition: none;
  }

  .download :global(.thumbnail) {
    width: clamp(5rem, 10vw, 8rem);
    height: auto;
    user-select: none;
    box-shadow: 0 0.3rem 1.25rem rgba(0, 0, 0, 0.08),
      0 1px 0 0 rgba(0, 0, 0, 0.1);
    flex: 0 0 auto;
  }

  .download :global(.label) {
    text-wrap: balance;
    max-width: 20em;
    margin: 0 0 0.5em !important;
  }

  .download:hover :global(.label) {
    text-decoration: underline;
    text-decoration-thickness: 1.5px !important;
  }

  .download :global(.description) {
    flex: 1 1 auto;
  }
</style>
