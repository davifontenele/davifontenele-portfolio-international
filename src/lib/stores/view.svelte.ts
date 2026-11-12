import { tick } from 'svelte';
import { defaultTitleMode, type TitleMode } from '$lib/config/typography';

/** Preferências de apresentação que não pertencem à navegação. */
export const view = $state<{ titleMode: TitleMode; watching: boolean }>({
  titleMode: defaultTitleMode,
  /** Modo "assistir vídeo": interface oculta, só o vídeo de fundo. */
  watching: false
});

/** Entra no modo vídeo. O foco vai para a camada que devolve a interface. */
export async function enterWatch() {
  view.watching = true;
  await tick();
  document.querySelector<HTMLElement>('.watch-exit')?.focus({ preventScroll: true });
}

/** Sai do modo vídeo e devolve o foco ao botão que o abriu. */
export async function exitWatch() {
  if (!view.watching) return;
  view.watching = false;
  await tick();
  document.querySelector<HTMLElement>('.navigator .watch')?.focus({ preventScroll: true });
}
