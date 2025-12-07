<script lang="ts">
  import { onMount } from 'svelte';

  interface ManifestoItem {
    number: number;
    title: string;
    slug: string;
    lightBg?: string;
    lightFg?: string;
    darkBg?: string;
    darkFg?: string;
  }

  let { items, currentNumber }: { items: ManifestoItem[]; currentNumber: number } = $props();

  onMount(() => {
    // Only scroll on mobile
    if (window.innerWidth <= 768) {
      const activeItem = document.querySelector('.nav-item.active');
      if (activeItem) {
        activeItem.scrollIntoView({ block: 'center', behavior: 'instant' });
      }
    }
  });
</script>

<nav class="nav">
  <ul class="nav-list">
    {#each items as item}
      {@const isActive = item.number === currentNumber}
      {@const isAbove = item.number < currentNumber}
      {@const isBelow = item.number > currentNumber}
      {@const lightBg = item.lightBg || '#fff'}
      {@const lightFg = item.lightFg || '#111'}
      {@const darkBg = item.darkBg || '#111'}
      {@const darkFg = item.darkFg || '#fff'}
      <li
        class="nav-item"
        class:active={isActive}
        class:above={isAbove}
        class:below={isBelow}
        style="--nav-light-bg: {lightBg}; --nav-light-fg: {lightFg}; --nav-dark-bg: {darkBg}; --nav-dark-fg: {darkFg};"
      >
        <a
          href={`/${item.number}`}
          class="nav-link"
          class:active={isActive}
          aria-current={isActive ? 'page' : undefined}
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
    padding: 0.5rem 0;
  }

  .nav-list {
    list-style: none;
    display: flex;
    flex-direction: column;
  }

  .nav-item {
    position: relative;
  }

  .nav-item.above {
    margin-bottom: 2px;
  }

  .nav-item.below {
    margin-top: 2px;
  }

  .nav-item.active {
    margin-top: 0.75rem;
    margin-bottom: 0.75rem;
  }

  .nav-item.active:first-child {
    margin-top: 0;
  }

  .nav-item.active:last-child {
    margin-bottom: 0;
  }

  .nav-link {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    padding: 0.5rem;
    padding-left: 0.75rem;
    text-decoration: none;
    color: var(--color-muted);
    border-radius: 4px;
    transition: color 0.2s ease, background 0.2s ease, margin-right 0.25s ease, border-radius 0.25s ease;
    position: relative;
  }

  .nav-item:not(.active) .nav-link:hover {
    background: var(--nav-light-bg);
    color: var(--nav-light-fg);
    border-radius: 4px;
  }

  @media (prefers-color-scheme: dark) {
    .nav-item:not(.active) .nav-link:hover {
      background: var(--nav-dark-bg);
      color: var(--nav-dark-fg);
    }
  }

  /* All titles hidden by default */
  .nav-title {
    opacity: 0;
    max-height: 0;
    overflow: hidden;
    transition: opacity 0.2s ease, max-height 0.25s ease;
    line-height: 1.3;
  }

  /* Active item styling */
  .nav-item.active .nav-link {
    background: var(--item-light-bg, #fff);
    color: var(--item-light-fg, #111);
    font-weight: 600;
    padding: 0.75rem 0.75rem;
    border-radius: 6px 0 0 6px;
    margin-right: -0.5rem;
    padding-right: 1rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  }

  @media (prefers-color-scheme: dark) {
    .nav-item.active .nav-link {
      background: var(--item-dark-bg, #111);
      color: var(--item-dark-fg, #fff);
    }
  }

  .nav-number {
    font-size: 0.75rem;
    font-family: monospace;
    min-width: 1.25rem;
    flex-shrink: 0;
  }

  .nav-title {
    font-size: 0.85rem;
  }

  /* Mobile styles */
  @media (max-width: 768px) {
    .nav {
      padding: 0;
      width: 100%;
    }

    .nav-list {
      flex-direction: column;
      gap: 0;
      padding: 0;
    }

    .nav-item {
      flex-shrink: 0;
    }

    .nav-item.above,
    .nav-item.below {
      margin: 0;
    }

    .nav-item.active {
      margin: 0;
    }

    .nav-link {
      padding: 0.4rem 0.5rem;
      border-radius: 4px;
      align-items: center;
    }

    .nav-item.active .nav-link {
      margin-right: 0;
      border-radius: 4px;
      padding: 0.4rem 0.5rem;
      background: var(--nav-light-bg);
      color: var(--nav-light-fg);
    }

    @media (prefers-color-scheme: dark) {
      .nav-item.active .nav-link {
        background: var(--nav-dark-bg);
        color: var(--nav-dark-fg);
      }
    }

    .nav-number {
      font-size: 0.65rem;
      min-width: 1rem;
    }

    .nav-title {
      display: inline;
      opacity: 1;
      max-height: none;
      font-size: 0.75rem;
    }
  }
</style>
