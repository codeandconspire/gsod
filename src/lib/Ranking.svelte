<script>
  import { writable } from 'svelte/store'
  import { countries } from '$lib/countries'

  let query = ''
  let open = null

  let data = countries()

  // default sort key
  const order = writable('name')

  // default sort direction
  const direction = writable(1)

  // copy of the data items
  const items = writable(data)

  function toggle(index) {
    open = open === index ? null : index
  }

  function setSort(target) {
    open = null
    if ($order === target) {
      direction.update((val) => -val)
    } else {
      order.set(target)
      direction.set(1)
    }
  }

  $: {
    items.set(data)
    open = null
    if (query) {
      const filtered = $items.filter((item) => {
        query = query.toLowerCase()
        const nameMatch = item.name.toLowerCase().indexOf(query) !== -1
        const regionMatch = item.region.toLowerCase().indexOf(query) !== -1
        return nameMatch || regionMatch
      })
      items.set(filtered)
    }
    const sorted = [...$items].sort((a, b) => {
      if ($order === 'name') {
        if (a[$order] < b[$order]) {
          return -$direction
        } else if (a[$order] > b[$order]) {
          return $direction
        }
      } else {
        if (a[$order].rank - b[$order].rank) {
          return -$direction
        } else if (b[$order].rank - a[$order].rank) {
          return $direction
        }
      }
      return 0
    })
    items.set(sorted)
  }
</script>

<div class="ranking">
  <div class="intro">
    <div class="search">
      <input
        bind:value={query}
        type="text"
        id="table-search"
        placeholder="Search for country or region" />
    </div>
  </div>
  <table>
    <thead>
      <th on:click={() => setSort('name')} style="width: 35%">Name</th>
      <th on:click={() => setSort('representation')} style="width: 17.5%">
        Representation
      </th>
      <th on:click={() => setSort('rights')} style="width: 17.5%">Rights</th>
      <th on:click={() => setSort('law')} style="width: 17.5%">Rule of Law</th>
      <th on:click={() => setSort('participation')} style="width: 17.5%">
        Participation
      </th>
    </thead>
    <tbody>
      {#each $items as item, index}
        {#if item.name !== 'East Germany'}
          {@const slug = item.name
            .toLowerCase()
            .replaceAll(' ', '-')
            .replaceAll('-of-the-', '-')
            .replaceAll('north-korea', 'democratic-peoples-republic-korea')
            .replaceAll('south-korea', 'republic-korea')
            .replaceAll('united-states', 'united-states-america')
            .replaceAll('east-germany', 'germany')}
          <tr on:click={() => toggle(index)}>
            <td>
              <strong>{item.name},</strong>
              <span class="region">{item.region}</span>
              <br />
              <a
                class="link"
                href="https://www.idea.int/democracytracker/country/{slug}"
                target="_blank"
                rel="noopener">
                View <span class="extra">Country</span>
                Profile
              </a>
            </td>
            <td
              style="--score: {item.representation.rank}; --rank: {item
                .representation
                .rank}; --change1y: {item.representation.change_1y.replace(
                '-',
                ''
              )}; --change5y: {item.representation.change_5y.replace('-', '')}">
              <div class="data rank">
                {#if item.representation.rank !== 'null'}
                  <span class="box">{item.representation.rank}</span>
                {/if}
                Ranking
              </div>
              <!-- <div class="data score">
                Score: {(+item.representation.score).toFixed(2)}
              </div> -->
              <div
                class="data year1"
                class:negative={item.representation.change_1y.includes('-')}>
                {#if item.representation.change_1y !== 'null'}
                  <span class="box">{item.representation.change_1y}</span>
                  Change
                {/if}
                <span class="default">(1y)</span>
                <span class="extra">(1 year)</span>
              </div>
              <div
                class="data year5"
                class:negative={item.representation.change_5y.includes('-')}>
                {#if item.representation.change_5y !== 'null'}
                  <span class="box">{item.representation.change_5y}</span>
                  Change
                {/if}
                <span class="default">(5y)</span>
                <span class="extra">(5 year)</span>
              </div>
            </td>
            <td
              style="--score: {item.rights.rank}; --rank: {item.rights
                .rank}; --change1y: {item.rights.change_1y.replace(
                '-',
                ''
              )}; --change5y: {item.rights.change_5y.replace('-', '')}">
              <div class="data rank">
                {#if item.rights.rank !== 'null'}
                  <span class="box">{item.rights.rank}</span>
                {/if}
                Ranking
              </div>
              <!-- <div class="data score">
                Score: {(+item.rights.score).toFixed(2)}
              </div> -->
              <div
                class="data year1"
                class:negative={item.rights.change_1y.includes('-')}>
                {#if item.rights.change_1y !== 'null'}
                  <span class="box">{item.rights.change_1y}</span>
                  Change
                {/if}
                <span class="default">(1y)</span>
                <span class="extra">(1 year)</span>
              </div>
              <div
                class="data year5"
                class:negative={item.rights.change_5y.includes('-')}>
                {#if item.rights.change_5y !== 'null'}
                  <span class="box">{item.rights.change_5y}</span>
                  Change
                {/if}
                <span class="default">(5y)</span>
                <span class="extra">(5 year)</span>
              </div>
            </td>
            <td
              style="--score: {item.law.rank}; --rank: {item.law
                .rank}; --change1y: {item.law.change_1y.replace(
                '-',
                ''
              )}; --change5y: {item.law.change_5y.replace('-', '')}">
              <div class="data rank">
                {#if item.law.rank !== 'null'}
                  <span class="box">{item.law.rank}</span>
                {/if}
                Ranking
              </div>
              <!-- <div class="data score">
                Score: {(+item.law.score).toFixed(2)}
              </div> -->
              <div
                class="data year1"
                class:negative={item.law.change_1y.includes('-')}>
                {#if item.law.change_1y !== 'null'}
                  <span class="box">{item.law.change_1y}</span>
                  Change
                {/if}
                <span class="default">(1y)</span>
                <span class="extra">(1 year)</span>
              </div>
              <div
                class="data year5"
                class:negative={item.law.change_5y.includes('-')}>
                {#if item.law.change_5y !== 'null'}
                  <span class="box">{item.law.change_5y}</span>
                  Change
                {/if}
                <span class="default">(5y)</span>
                <span class="extra">(5 year)</span>
              </div>
            </td>
            <td
              style="--score: {item.participation.rank}; --rank: {item
                .participation
                .rank}; --change1y: {item.participation.change_1y.replace(
                '-',
                ''
              )}; --change5y: {item.participation.change_5y.replace('-', '')}">
              <div class="data rank">
                {#if item.participation.rank !== 'null'}
                  <span class="box">{item.participation.rank}</span>
                {/if}
                Ranking
              </div>
              <!-- <div class="data score">
                Score: {(+item.participation.score).toFixed(2)}
              </div> -->
              <div
                class="data year1"
                class:negative={item.participation.change_1y.includes('-')}>
                {#if item.participation.change_1y !== 'null'}
                  <span class="box">{item.participation.change_1y}</span>
                  Change
                {/if}
                <span class="default">(1y)</span>
                <span class="extra">(1 year)</span>
              </div>
              <div
                class="data year5"
                class:negative={item.participation.change_5y.includes('-')}>
                {#if item.participation.change_5y !== 'null'}
                  <span class="box">{item.participation.change_5y}</span>
                  Change
                {/if}
                <span class="default">(5y)</span>
                <span class="extra">(5 year)</span>
              </div>
            </td>
          </tr>
        {/if}
      {/each}
    </tbody>
  </table>
</div>

<style>
  .ranking {
    --padding: min(calc(var(--page-gutter) / 2), 5vw);

    margin: var(--space-small) 0;
    color: #11253e;
    width: 100%;
  }

  .intro {
    position: relative;
    z-index: 2;
    background: #fff;
  }

  .search {
    padding: 0 var(--page-gutter) var(--space-medium);
    margin: 0 auto;
  }

  @media (width > 70rem) {
    .search {
      max-width: calc(var(--text-width) + (var(--page-gutter) * 2));
    }
  }

  .search input {
    font-family: var(--sans-serif);
    border: 1px solid #797f87;
    width: 50%;
    background: #f7f9fc;
    color: #000;
    border-radius: 0.5rem;
    height: 3rem;
    padding: 0 3rem 0 1.25rem;
    font-size: 1rem;
    font-weight: bold;
  }

  .search input::placeholder {
    opacity: 1;
    color: inherit;
    font-weight: normal;
  }

  .search input::selection {
    background-color: rgba(98, 163, 191, 0.25);
  }

  .search input:focus-visible {
    outline: 2px solid #326593;
    outline-offset: -1px;
  }

  table {
    width: 100%;
    font-family: var(--sans-serif);
    font-size: var(--framework-font-size);
    border-collapse: collapse;
    min-width: 55rem;
  }

  tr,
  td,
  th {
    padding: 0;
    margin: 0;
    text-align: left;
  }

  tr:nth-child(odd) {
    background-color: #f7f9fc;
  }

  /* .expandable {
    border: 0;
    padding: 0;
  }

  .details {
    padding: 1rem;
  } */

  thead {
    position: sticky;
    top: 0;
    z-index: 1;
    font-weight: bold;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    width: 100%;
    background: #fff;
    cursor: pointer;
    box-shadow: 0 0.3rem 1.5rem rgba(0, 0, 0, 0.08),
      0 0.5px 0 0 rgba(0, 0, 0, 0.1);
  }

  th {
    padding: 0.6rem var(--padding);
  }

  td {
    padding: 1rem var(--padding);
    vertical-align: top;
  }

  td:first-child {
    padding-left: var(--page-gutter);
  }

  th:first-child {
    padding-left: var(--page-gutter);
  }

  td:last-child {
    padding-right: var(--page-gutter);
  }

  th:last-child {
    padding-right: var(--page-gutter);
  }

  .region {
    white-space: nowrap;
  }

  .link {
    color: #4468aa;
    font-size: var(--framework-font-size);
    transition: opacity 100ms ease-out, color 100ms ease-out;
    text-decoration: underline;
  }

  .link:active {
    opacity: 0.6;
    transition: none;
  }

  .link:hover {
    color: #000;
  }

  .default {
    display: none;
  }

  .extra {
    display: none;
  }

  .box ~ .extra {
    display: inline;
  }

  @media (width <= 60rem) {
    .box ~ .extra {
      display: none;
    }

    .box ~ .default {
      display: inline;
    }
  }

  td:first-child {
    font-size: 1.25rem;
  }

  .data {
    display: flex;
    gap: 0.5rem;
    text-wrap: nowrap;
  }

  .data + .data {
    margin-top: 0.25rem;
  }

  .box {
    position: relative;
    top: -1px;
    background: #fff;
    width: 2.2em;
    z-index: 0;
    font-family: monospace;
    border-radius: 2px;
    font-size: 0.9em;
    padding: 0.1em 0.2em;
    text-align: right;
    color: #000;
  }

  .rank .box {
    background: rgba(158, 162, 173, calc(var(--rank) / 173));
  }

  .year1 .box {
    background: rgba(50, 101, 147, calc(var(--change1y) / 40));
  }

  .year5 .box {
    background: rgba(50, 101, 147, calc(var(--change5y) / 40));
  }

  .year1.negative .box {
    background: rgba(196, 61, 81, calc(var(--change1y) / 40));
  }

  .year5.negative .box {
    background: rgba(196, 61, 81, calc(var(--change5y) / 40));
  }
</style>
