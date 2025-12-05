<script lang="ts">
  interface ManifestoItem {
    number: number;
    title: string;
    slug: string;
  }

  let { items, currentNumber }: { items: ManifestoItem[]; currentNumber: number } = $props();
</script>

<nav class="nav">
  <ul class="nav-list">
    {#each items as item}
      <li class="nav-item">
        <a
          href={`/${item.number}`}
          class="nav-link"
          class:active={item.number === currentNumber}
        >
          <span class="nav-number">{String(item.number).padStart(2, '0')}</span>
          <span class="nav-title">{item.title}</span>
        </a>
      </li>
    {/each}
  </ul>
</nav>

<style>
  .nav {
    padding: 2rem 0;
  }

  .nav-list {
    list-style: none;
  }

  .nav-item {
    margin-bottom: 0.25rem;
  }

  .nav-link {
    display: flex;
    align-items: baseline;
    gap: 0.75rem;
    padding: 0.5rem 1rem;
    text-decoration: none;
    color: var(--color-muted);
    border-radius: 4px;
    transition: all 0.15s ease;
  }

  .nav-link:hover {
    color: var(--color-text);
    background: rgba(0, 0, 0, 0.03);
  }

  .nav-link.active {
    color: var(--color-text);
    font-weight: 600;
  }

  .nav-number {
    font-size: 0.75rem;
    font-family: monospace;
    min-width: 1.5rem;
  }

  .nav-title {
    font-size: 0.9rem;
  }
</style>
