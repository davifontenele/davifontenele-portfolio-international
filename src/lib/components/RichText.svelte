<script lang="ts">
  import { richSegments, useI18n } from '$lib/i18n';
  import { useFootnotes, noteId } from './footnotes';

  /**
   * Texto com **negrito** e citações [^id], sem {@html}.
   * Fora de um case (sem notas), as citações simplesmente não aparecem.
   */
  let { text }: { text: string } = $props();
  const fn = useFootnotes();
  const i18n = useI18n();
</script>

{#each richSegments(text) as seg, i (i)}{#if seg.kind === 'strong'}<strong>{seg.text}</strong
    >{:else if seg.kind === 'cite'}{#if fn && fn.number(seg.id)}{@const n = fn.number(seg.id)}<sup
        class="fn-ref"
        ><a
          href="#{noteId(fn.prefix, n)}"
          data-fn={n}
          aria-label={i18n.t.ui.sourceRef(n)}
          onclick={(e) => fn.jump(e, noteId(fn.prefix, n))}>[{n}]</a
        ></sup
      >{/if}{:else}{seg.text}{/if}{/each}
