<script lang="ts">
  import { richSegments } from '$lib/i18n';
  /** Renderiza texto com **negrito** sem {@html}. */
  let { text }: { text: string } = $props();
</script>

{#each richSegments(text) as seg, i (i)}{#if seg.strong}<strong>{seg.text}</strong>{:else}{seg.text}{/if}{/each}
