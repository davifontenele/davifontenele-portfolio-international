import { slides } from '$lib/data/slides';
import {
  clamp,
  easeOutExpo,
  prefersReducedMotion,
  supportsWebGL
} from '$lib/utils/motion';

const TOTAL = slides.length;

/**
 * Estado global de navegação.
 * - `index`      : case visível
 * - `target`     : case de destino enquanto a transição roda (-1 = parado)
 * - `progress`   : 0 → 1 da máscara de faixas
 * - `direction`  : 1 avança (faixas para a esquerda), -1 volta
 * - `open`       : case expandido verticalmente
 */
class NavState {
  index = $state(0);
  target = $state(-1);
  progress = $state(0);
  direction = $state<1 | -1>(1);
  open = $state(false);
  reducedMotion = $state(false);
  webgl = $state(true);
  /** Incrementa a cada entrada em um case: reinicia as animações tipográficas. */
  revision = $state(0);

  #raf = 0;

  get total() {
    return TOTAL;
  }
  get transitioning() {
    return this.target >= 0;
  }
  get current() {
    return slides[this.index];
  }
  /** Vídeos que precisam de frame pronto: atual e destino da transição. */
  get active(): number[] {
    const set = new Set([this.index]);
    if (this.target >= 0) set.add(this.target);
    return [...set].filter((i) => i >= 0 && i < TOTAL);
  }
  /**
   * Vídeos montados: atual, destino e vizinhos imediatos (pré-carga).
   * Os vizinhos ficam pausados no primeiro frame; assim a transição já
   * começa com imagem real em vez do gradiente procedural.
   */
  get nearby(): number[] {
    const set = new Set(this.active);
    set.add(this.index + 1);
    set.add(this.index - 1);
    return [...set].filter((i) => i >= 0 && i < TOTAL);
  }

  /** Estado inicial vindo da URL (deep link). Sem animação. */
  setInitial(index: number, open: boolean) {
    this.index = clamp(index, 0, TOTAL - 1);
    this.target = -1;
    this.progress = 0;
    this.open = open && slides[this.index]?.type !== 'hero';
  }

  init() {
    this.reducedMotion = prefersReducedMotion();
    // Mantém o shader também no mobile; só desliga por suporte ou preferência do usuário.
    this.webgl = supportsWebGL() && !this.reducedMotion;
  }

  go(dir: 1 | -1) {
    if (this.transitioning) return;
    const next = this.index + dir;
    if (next < 0 || next >= TOTAL) {
      this.bounce(dir);
      return;
    }
    this.animateTo(next, dir);
  }

  goTo(i: number) {
    if (this.transitioning || i === this.index) return;
    const target = clamp(i, 0, TOTAL - 1);
    this.animateTo(target, target > this.index ? 1 : -1);
  }

  private animateTo(next: number, dir: 1 | -1) {
    this.open = false; // ao trocar de case, o modo aberto se fecha
    this.direction = dir;
    this.target = next;
    this.progress = 0;

    const duration = this.reducedMotion ? 320 : 1100;
    const start = performance.now();

    const tick = (now: number) => {
      const t = clamp((now - start) / duration);
      this.progress = easeOutExpo(t);
      if (t < 1) {
        this.#raf = requestAnimationFrame(tick);
      } else {
        this.index = next;
        this.target = -1;
        this.progress = 0;
        this.revision++;
      }
    };
    cancelAnimationFrame(this.#raf);
    this.#raf = requestAnimationFrame(tick);
  }

  /** Feedback discreto ao tentar passar do primeiro/último case. */
  bounceDir = $state(0);
  private bounce(dir: number) {
    this.bounceDir = dir;
    setTimeout(() => (this.bounceDir = 0), 260);
  }

  openCase() {
    if (this.transitioning) return;
    // Hero não tem painel expandido — só navegação horizontal entre slides.
    if (slides[this.index]?.type === 'hero') return;
    this.open = true;
  }
  closeCase() {
    this.open = false;
  }
  toggleCase() {
    this.open ? this.closeCase() : this.openCase();
  }
}

export const nav = new NavState();
