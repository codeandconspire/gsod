<script>
  import { writable } from 'svelte/store'
  import { countries } from '$lib/countries'

  let query = ''
  let data = countries()

  const items = writable(data)

  // default sorting
  const col = writable('rank')
  let panel = 'participation'
  let reverse = writable(true)

  function sort(key) {
    if ($col === key) {
      reverse.set(!$reverse)
    } else {
      col.set(key)
    }
  }

  $: {
    items.set(data)
    if (query) {
      const filtered = $items.filter((item) => {
        query = query.toLowerCase()
        const nameMatch = item.name.toLowerCase().indexOf(query) !== -1
        const regionMatch = item.region.toLowerCase().indexOf(query) !== -1
        return nameMatch || regionMatch
      })
      items.set(filtered)
    }

    let sorted = [...$items]
    if ($col === 'name') {
      sorted.sort((a, b) => {
        if ($reverse) {
          if (a[$col] < b[$col]) return -1
          if (a[$col] > b[$col]) return 1
          return 0
        } else {
          if (a[$col] > b[$col]) return -1
          if (a[$col] < b[$col]) return 1
          return 0
        }
      })
    } else {
      if ($reverse) {
        sorted.sort((a, b) => {
          return +a[panel][$col] - +b[panel][$col]
        })
      } else {
        sorted.sort((a, b) => {
          return +b[panel][$col] - +a[panel][$col]
        })
      }
    }
    items.set(sorted)
  }
</script>

<div class="ranking">
  <div class="intro">
    <div class="search">
      <span class="label">Search</span>
      <input
        bind:value={query}
        type="text"
        id="table-search"
        placeholder="Country or region…" />
      <span class="label">Rankings</span>
      <div class="nav">
        <button
          class:selected={panel === 'participation'}
          on:click={() => (panel = 'participation')}>
          Participation
        </button>
        <button
          class:selected={panel === 'representation'}
          on:click={() => (panel = 'representation')}>
          Representation
        </button>
        <button
          class:selected={panel === 'rights'}
          on:click={() => (panel = 'rights')}>
          Rights
        </button>
        <button
          class:selected={panel === 'law'}
          on:click={() => (panel = 'law')}>
          Rule of Law
        </button>
      </div>
    </div>
  </div>
  <div class="panel {panel === 'participation' ? 'visible' : ''}">
    <table>
      <thead>
        <th on:click={() => sort('name')} style="width: 28%">Name</th>
        <th on:click={() => sort('score')} style="width: 12%">Score</th>
        <th on:click={() => sort('rank')} style="width: 12%">
          Ranking
          <br />
          2022
        </th>
        <th on:click={() => sort('change_1y')} style="width: 12%">
          Change
          <br />
          2021→2022
        </th>
        <th on:click={() => sort('rank_2021')} style="width: 12%">
          Ranking
          <br />
          2021
        </th>
        <th on:click={() => sort('change_5y')} style="width: 12%">
          Change
          <br />
          2017→2022
        </th>
        <th on:click={() => sort('rank_2017')} style="width: 12%">
          Ranking
          <br />
          2017
        </th>
      </thead>
      <tbody>
        {#each $items as item, index}
          {@const slug = item.name
            .toLowerCase()
            .replaceAll(' ', '-')
            .replaceAll('-of-the-', '-')
            .replaceAll('north-korea', 'democratic-peoples-republic-korea')
            .replaceAll('south-korea', 'republic-korea')
            .replaceAll('united-states', 'united-states-america')
            .replaceAll('east-germany', 'germany')}
          <tr>
            <td>
              <a
                class="country"
                title="View country profile"
                href="https://www.idea.int/democracytracker/country/{slug}"
                target="_blank"
                rel="noopener">
                {item.name}
              </a>
              ,
              <span class="region">{item.region}</span>
            </td>
            <td>
              <span class="box">
                {(+item.participation.score).toFixed(3)}
              </span>
            </td>
            <td>
              <span class="box">
                {item.participation.rank}
              </span>
            </td>
            <td>
              <span
                class="box"
                class:negative={item.participation.change_1y.includes('-')}>
                {item.participation.change_1y}
              </span>
            </td>
            <td>
              <span class="box">
                {item.participation.rank_2021}
              </span>
            </td>
            <td>
              <span
                class="box"
                class:negative={item.participation.change_5y.includes('-')}>
                {item.participation.change_5y}
              </span>
            </td>
            <td>
              <span class="box">
                {item.participation.rank_2017}
              </span>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
  <div class="panel {panel === 'representation' ? 'visible' : ''}">
    <table>
      <thead>
        <th on:click={() => sort('name')} style="width: 28%">Name</th>
        <th on:click={() => sort('score')} style="width: 12%">Score</th>
        <th on:click={() => sort('rank')} style="width: 12%">
          Ranking
          <br />
          2022
        </th>
        <th on:click={() => sort('change_1y')} style="width: 12%">
          Change
          <br />
          2021→2022
        </th>
        <th on:click={() => sort('rank_2021')} style="width: 12%">
          Ranking
          <br />
          2021
        </th>
        <th on:click={() => sort('change_5y')} style="width: 12%">
          Change
          <br />
          2017→2022
        </th>
        <th on:click={() => sort('rank_2017')} style="width: 12%">
          Ranking
          <br />
          2017
        </th>
      </thead>
      <tbody>
        {#each $items as item, index}
          {@const slug = item.name
            .toLowerCase()
            .replaceAll(' ', '-')
            .replaceAll('-of-the-', '-')
            .replaceAll('north-korea', 'democratic-peoples-republic-korea')
            .replaceAll('south-korea', 'republic-korea')
            .replaceAll('united-states', 'united-states-america')
            .replaceAll('east-germany', 'germany')}
          <tr>
            <td>
              <a
                class="country"
                title="View country profile"
                href="https://www.idea.int/democracytracker/country/{slug}"
                target="_blank"
                rel="noopener">
                {item.name}
              </a>
              ,
              <span class="region">{item.region}</span>
            </td>
            <td>
              <span class="box">
                {(+item.representation.score).toFixed(3)}
              </span>
            </td>
            <td>
              <span class="box">
                {item.representation.rank}
              </span>
            </td>
            <td>
              <span
                class="box"
                class:negative={item.representation.change_1y.includes('-')}>
                {item.representation.change_1y}
              </span>
            </td>
            <td>
              <span class="box">
                {item.representation.rank_2021}
              </span>
            </td>
            <td>
              <span
                class="box"
                class:negative={item.representation.change_5y.includes('-')}>
                {item.representation.change_5y}
              </span>
            </td>
            <td>
              <span class="box">
                {item.representation.rank_2017}
              </span>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
  <div class="panel {panel === 'rights' ? 'visible' : ''}">
    <table>
      <thead>
        <th on:click={() => sort('name')} style="width: 28%">Name</th>
        <th on:click={() => sort('score')} style="width: 12%">Score</th>
        <th on:click={() => sort('rank')} style="width: 12%">
          Ranking
          <br />
          2022
        </th>
        <th on:click={() => sort('change_1y')} style="width: 12%">
          Change
          <br />
          2021→2022
        </th>
        <th on:click={() => sort('rank_2021')} style="width: 12%">
          Ranking
          <br />
          2021
        </th>
        <th on:click={() => sort('change_5y')} style="width: 12%">
          Change
          <br />
          2017→2022
        </th>
        <th on:click={() => sort('rank_2017')} style="width: 12%">
          Ranking
          <br />
          2017
        </th>
      </thead>
      <tbody>
        {#each $items as item, index}
          {@const slug = item.name
            .toLowerCase()
            .replaceAll(' ', '-')
            .replaceAll('-of-the-', '-')
            .replaceAll('north-korea', 'democratic-peoples-republic-korea')
            .replaceAll('south-korea', 'republic-korea')
            .replaceAll('united-states', 'united-states-america')
            .replaceAll('east-germany', 'germany')}
          <tr>
            <td>
              <a
                class="country"
                title="View country profile"
                href="https://www.idea.int/democracytracker/country/{slug}"
                target="_blank"
                rel="noopener">
                {item.name}
              </a>
              ,
              <span class="region">{item.region}</span>
            </td>
            <td>
              <span class="box">
                {(+item.rights.score).toFixed(3)}
              </span>
            </td>
            <td>
              <span class="box">
                {item.rights.rank}
              </span>
            </td>
            <td>
              <span
                class="box"
                class:negative={item.rights.change_1y.includes('-')}>
                {item.rights.change_1y}
              </span>
            </td>
            <td>
              <span class="box">
                {item.rights.rank_2021}
              </span>
            </td>
            <td>
              <span
                class="box"
                class:negative={item.rights.change_5y.includes('-')}>
                {item.rights.change_5y}
              </span>
            </td>
            <td>
              <span class="box">
                {item.rights.rank_2017}
              </span>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
  <div class="panel {panel === 'law' ? 'visible' : ''}">
    <table>
      <thead>
        <th on:click={() => sort('name')} style="width: 28%">Name</th>
        <th on:click={() => sort('score')} style="width: 12%">Score</th>
        <th on:click={() => sort('rank')} style="width: 12%">
          Ranking
          <br />
          2022
        </th>
        <th on:click={() => sort('change_1y')} style="width: 12%">
          Change
          <br />
          2021→2022
        </th>
        <th on:click={() => sort('rank_2021')} style="width: 12%">
          Ranking
          <br />
          2021
        </th>
        <th on:click={() => sort('change_5y')} style="width: 12%">
          Change
          <br />
          2017→2022
        </th>
        <th on:click={() => sort('rank_2017')} style="width: 12%">
          Ranking
          <br />
          2017
        </th>
      </thead>
      <tbody>
        {#each $items as item, index}
          {@const slug = item.name
            .toLowerCase()
            .replaceAll(' ', '-')
            .replaceAll('-of-the-', '-')
            .replaceAll('north-korea', 'democratic-peoples-republic-korea')
            .replaceAll('south-korea', 'republic-korea')
            .replaceAll('united-states', 'united-states-america')
            .replaceAll('east-germany', 'germany')}
          <tr>
            <td>
              <a
                class="country"
                title="View country profile"
                href="https://www.idea.int/democracytracker/country/{slug}"
                target="_blank"
                rel="noopener">
                {item.name}
              </a>
              ,
              <span class="region">{item.region}</span>
            </td>
            <td>
              <span class="box">
                {(+item.law.score).toFixed(3)}
              </span>
            </td>
            <td>
              <span class="box">
                {item.law.rank}
              </span>
            </td>
            <td>
              <span
                class="box"
                class:negative={item.law.change_1y.includes('-')}>
                {item.law.change_1y}
              </span>
            </td>
            <td>
              <span class="box">
                {item.law.rank_2021}
              </span>
            </td>
            <td>
              <span
                class="box"
                class:negative={item.law.change_5y.includes('-')}>
                {item.law.change_5y}
              </span>
            </td>
            <td>
              <span class="box">
                {item.law.rank_2017}
              </span>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>

<style>
  .ranking {
    --padding: min(calc(var(--page-gutter) / 2), 5vw);

    margin: var(--space-small) 0;
    color: #11253e;
    width: 100%;
    user-select: text;
  }

  .ranking::selection {
    background-color: rgba(98, 163, 191, 0.25);
  }

  .intro {
    position: relative;
    z-index: 2;
    background: #fff;
  }

  .search {
    padding: 2rem var(--page-gutter) var(--space-small);
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
    width: 100%;
    max-width: 20rem;
    background: #f7f9fc;
    color: #000;
    border-radius: 0.5rem;
    height: 3rem;
    padding: 0 3rem 0 1.25rem;
    font-size: 1rem;
    font-weight: bold;
    margin-bottom: 1.5rem;
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

  .nav {
    display: flex;
    gap: 0.25rem;
    justify-content: space-around;
    font-family: var(--sans-serif);
    font-size: var(--framework-font-size);
    border-bottom: 1px solid #797f87;
  }

  .nav button {
    border-radius: 0.5rem 0.5rem 0 0;

    background: linear-gradient(#f7f9fc, #fff);
    border: 1px solid #797f87;
    border-width: 1px 1px 0 1px;
    width: 100%;
    flex-grow: 1;
    padding: 0.8rem 0.5rem 0.8rem;
    transition: color 100ms ease-out;
  }

  @media (width <= 32rem) {
    .nav {
      flex-direction: column;
      border: 0;
      gap: 0.5rem;
    }
    .nav button {
      background: none;
      border: 0;
      padding: 0;
      text-align: left;
      display: flex;
      gap: 0.5rem;
      align-items: center;
    }

    .nav button::before {
      content: '';
      width: 1.25rem;
      height: 1.25rem;
      border-radius: 50%;
      border: 1px solid #797f87;
      position: relative;
      top: -0.05rem;
      background: #f7f9fc;
    }

    .nav button.selected::before {
      background: #4468aa;
      border-color: #4468aa;
    }

    .search {
      margin-top: -2rem;
    }
  }

  .nav button.selected {
    margin-bottom: -1px;
    border-bottom: 1px solid #fff;
    font-weight: bold;
    background: #fff;
    transition: none;
  }

  .nav button:hover {
    color: #4468aa;
  }

  .nav button.selected:hover {
    color: #000;
    cursor: default;
  }

  .label {
    margin-bottom: 0.5rem;
    font-weight: bold;
    display: block;
    font-family: var(--sans-serif);
    font-size: var(--framework-font-size);
  }

  .panel {
    display: none;
  }

  .panel.visible {
    display: block;
  }

  @media (width <= 55rem) {
    .panel {
      overflow-x: auto;
    }
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

  thead {
    position: sticky;
    top: 0;
    z-index: 1;
    font-weight: bold;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.03em;
    width: 100%;
    background: #fff;
    cursor: pointer;
    box-shadow: 0 0.3rem 1.5rem rgba(0, 0, 0, 0.08),
      0 0.5px 0 0 rgba(0, 0, 0, 0.1);
  }

  th {
    padding: 0.3rem var(--padding);
    line-height: 1.1;
  }

  td {
    padding: 0.6rem var(--padding);
    vertical-align: baseline;
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

  .country {
    font-weight: bold;
    color: #4468aa;
    font-size: var(--framework-font-size);
    transition: opacity 100ms ease-out, color 100ms ease-out;
    text-decoration: underline;
    margin-right: 0.1em;
  }

  .country:active {
    opacity: 0.6;
    transition: none;
  }

  .country:hover {
    color: #000;
  }

  .box {
    position: relative;
    top: -1px;
    width: 2.2em;
    z-index: 0;
    font-family: monospace;
    text-align: right;
    color: #000;
  }

  .box.negative {
    color: #ff3b58;
  }
</style>
