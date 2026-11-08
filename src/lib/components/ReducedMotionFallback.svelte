<script lang="ts">
  /**
   * Camada estática exibida quando:
   * - o usuário pediu movimento reduzido, ou
   * - o autoplay do vídeo falhou, ou
   * - o arquivo de vídeo ainda não existe (placeholders).
   */
  type Props = { poster: string; alt: string; label?: string; visible?: boolean; accent?: string };
  let { poster, alt, label, visible = true, accent = '#1a1a1a' }: Props = $props();

  /** Se o poster ainda não existir, some com a imagem e fica só o gradiente. */
  function hideBroken(e: Event) {
    (e.currentTarget as HTMLImageElement).style.opacity = '0';
  }
</script>

<div class="fallback" class:visible aria-hidden="true" data-label={label} style="--accent:{accent}">
  {#if visible && poster}
    <!-- Só baixa o poster quando a camada está realmente visível. -->
    <img src={poster} {alt} loading="eager" decoding="async" onerror={hideBroken} />
  {/if}
</div>

<style>
  .fallback {
    position: absolute;
    inset: 0;
    opacity: 0;
    transition: opacity 600ms var(--ease-cine);
    background:
      radial-gradient(120% 90% at 20% 10%, color-mix(in srgb, var(--accent) 55%, #000) 0%, #050505 70%),
      #050505;
  }
  .fallback.visible {
    opacity: 1;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>
