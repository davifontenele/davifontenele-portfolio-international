<script lang="ts">
  type Props = {
    /** Número do case (1…total). 0 = slide fora da contagem (About). */
    number: number;
    total: number;
    name: string;
    inert?: boolean;
  };
  let { number, total, name, inert = false }: Props = $props();
  const pad = (n: number) => String(n).padStart(2, '0');
</script>

<div class="progress chrome" {inert} aria-live="polite">
  <p class="label">
    {#if number > 0}
      <span class="num">{pad(number)}</span>
      <span class="sep">/</span>
      <span class="total">{pad(total)}</span>
      <span class="dash">—</span>
    {/if}
    <span class="title">{name}</span>
  </p>
  <ol class="ticks" aria-hidden="true">
    {#each { length: total } as _, i (i)}
      <li class:on={number === 0 || i < number}></li>
    {/each}
  </ol>
</div>

<style>
  .progress {
    position: fixed;
    left: var(--gutter);
    bottom: var(--safe-bottom);
    z-index: 40;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    pointer-events: none;
  }
  .label {
    margin: 0;
    font-family: var(--font-ui);
    font-weight: 400;
    font-size: 0.75rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.72);
    display: flex;
    gap: 0.45em;
    align-items: baseline;
  }
  .sep,
  .total,
  .dash {
    color: rgba(255, 255, 255, 0.4);
  }
  .num {
    font-variant-numeric: tabular-nums;
  }
  .ticks {
    display: flex;
    gap: 4px;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .ticks li {
    width: 18px;
    height: 1px;
    background: rgba(255, 255, 255, 0.22);
    transition: background 500ms var(--ease-cine);
  }
  .ticks li.on {
    background: rgba(255, 255, 255, 0.9);
  }
  @media (max-width: 640px) {
    .ticks li {
      width: 12px;
    }
  }
</style>
