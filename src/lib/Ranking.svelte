<script>
  import { writable } from 'svelte/store'
  import { slide } from 'svelte/transition'
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
      if (a[$order] < b[$order]) {
        return -$direction
      } else if (a[$order] > b[$order]) {
        return $direction
      }
      return 0
    })
    items.set(sorted)
  }
</script>

<div class="ranking">
  <div class="search">
    <input
      bind:value={query}
      type="text"
      id="table-search"
      placeholder="Search" />
  </div>
  <table>
    <thead>
      <th on:click={() => setSort('name')}>Name</th>
      <th on:click={() => setSort('region')}>Region</th>
    </thead>
    <tbody>
      {#each $items as item, index}
        <tr on:click={() => toggle(index)}>
          <td>
            <strong>{item.name}</strong>
            <br />
            {item.region}
          </td>
          <td>{item.name}</td>
        </tr>
        {#if open === index}
          <tr>
            <td class="expandable" colspan="4">
              <div
                class="details"
                transition:slide={{ duration: 300, axis: 'y' }}>
                <ul>
                  <li>
                    <strong>Representation</strong>
                    <ul>
                      <li>Score: {item.years[0].representation.score}</li>
                      <li>Rank: {item.years[0].representation.rank}</li>
                      <li>
                        Change_1y: {item.years[0].representation.change_1y}
                      </li>
                      <li>
                        Change_5y: {item.years[0].representation.change_5y}
                      </li>
                    </ul>
                  </li>
                  <li>
                    <strong>Rights</strong>
                    <ul>
                      <li>Score: {item.years[0].rights.score}</li>
                      <li>Rank: {item.years[0].rights.rank}</li>
                      <li>Change_1y: {item.years[0].rights.change_1y}</li>
                      <li>Change_5y: {item.years[0].rights.change_5y}</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Law</strong>
                    <ul>
                      <li>Score: {item.years[0].law.score}</li>
                      <li>Rank: {item.years[0].law.rank}</li>
                      <li>Change_1y: {item.years[0].law.change_1y}</li>
                      <li>Change_5y: {item.years[0].law.change_5y}</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Participation</strong>
                    <ul>
                      <li>Score: {item.years[0].participation.score}</li>
                      <li>Rank: {item.years[0].participation.rank}</li>
                      <li>
                        Change_1y: {item.years[0].participation.change_1y}
                      </li>
                      <li>
                        Change_5y: {item.years[0].participation.change_5y}
                      </li>
                    </ul>
                  </li>
                </ul>
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
    margin: var(--space-large) 0;
  }

  .search {
    margin-bottom: 2rem;
  }

  table {
    width: 100%;
    font-family: var(--sans-serif);
    font-size: var(--framework-font-size);
    border-collapse: collapse;
  }

  tr,
  td,
  th {
    padding: 0;
    margin: 0;
    text-align: left;
  }

  tr {
  }

  td,
  th {
    border-top: 1px solid;
    padding: 0.5rem 0;
  }

  .expandable {
    border: 0;
    padding: 0;
  }

  .details {
    padding: 1rem;
  }

  th {
    position: sticky;
    top: 0;
    background: #fff;
  }
</style>
