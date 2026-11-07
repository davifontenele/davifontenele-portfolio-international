<script lang="ts">
  type Props = {
    href?: string;
    label?: string;
    variant?: 'default' | 'solid' | 'ghost';
    size?: 'sm' | 'md';
    onclick?: (e: MouseEvent) => void;
    children?: import('svelte').Snippet;
    [key: string]: unknown;
  };
  let {
    href,
    label,
    variant = 'default',
    size = 'md',
    onclick,
    children,
    ...rest
  }: Props = $props();
</script>

{#if href}
  <a
    class="cta {variant} {size}"
    {href}
    target={href.startsWith('http') ? '_blank' : undefined}
    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
    aria-label={label}
    {...rest}>{@render children?.()}</a
  >
{:else}
  <button class="cta {variant} {size}" type="button" aria-label={label} {onclick} {...rest}>
    {@render children?.()}
  </button>
{/if}

<style>
  .cta {
    display: inline-flex;
    align-items: center;
    gap: 0.6em;
    border-radius: 999px;
    padding: 6px 20px;
    font-family: var(--font-ui);
    font-weight: 400;
    font-size: 0.875rem;
    line-height: 1.9;
    color: #fff;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.28);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    transition:
      background 220ms var(--ease-cine),
      color 220ms var(--ease-cine),
      border-color 220ms var(--ease-cine),
      transform 220ms var(--ease-cine);
    white-space: nowrap;
    cursor: pointer;
  }
  .cta.sm {
    font-size: 0.75rem;
    padding: 4px 14px;
  }
  .cta.solid {
    background: #fff;
    color: #060606;
    border-color: #fff;
  }
  .cta.ghost {
    background: transparent;
    border-color: rgba(255, 255, 255, 0.18);
    color: var(--fg-dim);
  }
  .cta:hover {
    background: #fff;
    color: #060606;
    border-color: #fff;
  }
  .cta.solid:hover {
    background: rgba(255, 255, 255, 0.86);
  }
  .cta:active {
    transform: translateY(1px);
  }
</style>
