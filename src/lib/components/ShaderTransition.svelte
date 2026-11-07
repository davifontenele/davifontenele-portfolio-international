<script lang="ts">
  import type { CaseItem } from '$lib/data/cases';
  import { nav } from '$lib/stores/nav.svelte';

  /**
   * Máscara/transição em faixas verticais paralelas.
   * ------------------------------------------------
   * Desenha o vídeo do case atual em tela cheia e, durante a transição,
   * fatia a imagem em N faixas verticais com stagger — cada faixa corta
   * do vídeo de saída para o de entrada em um momento levemente diferente,
   * deixando a imagem fragmentada no meio do caminho.
   *
   * Os vídeos continuam tocando durante todo o processo (as texturas são
   * atualizadas quadro a quadro).
   *
   * Se não houver arquivo de vídeo/poster ainda, o shader desenha um
   * gradiente procedural — assim a transição já é visível com placeholders.
   */
  type Props = {
    items: CaseItem[];
    videoEls: (HTMLVideoElement | null)[];
    /** Quantidade de faixas verticais (configurável). */
    strips?: number;
    /** Atraso máximo entre faixas, 0–0.8. */
    stagger?: number;
  };
  let { items, videoEls, strips = 18, stagger = 0.42 }: Props = $props();

  let canvas: HTMLCanvasElement | null = $state(null);
  let ok = $state(true);

  const VERT = `
    attribute vec2 aPos;
    varying vec2 vUv;
    void main() {
      vUv = aPos * 0.5 + 0.5;
      vUv.y = 1.0 - vUv.y;
      gl_Position = vec4(aPos, 0.0, 1.0);
    }
  `;

  const FRAG = `
    precision highp float;
    varying vec2 vUv;

    uniform sampler2D uFromTex;
    uniform sampler2D uToTex;
    uniform vec2 uRes, uFromRes, uToRes;
    uniform vec3 uFromColor, uToColor;
    uniform float uFromHas, uToHas;
    uniform float uProgress, uDir, uStrips, uStagger, uActive, uTime;

    // Ajuste "object-fit: cover"
    vec2 cover(vec2 uv, vec2 tex) {
      float rs = uRes.x / max(uRes.y, 1.0);
      float ri = tex.x / max(tex.y, 1.0);
      vec2 s = ri > rs ? vec2(rs / ri, 1.0) : vec2(1.0, ri / rs);
      return (uv - 0.5) * s + 0.5;
    }

    // Placeholder procedural enquanto não há vídeo real
    vec3 placeholder(vec2 uv, vec3 c) {
      vec3 col = mix(c * 0.10, c * 0.62, smoothstep(0.0, 1.0, uv.y));
      col *= 1.0 - distance(uv, vec2(0.5)) * 0.55;
      col += 0.012 * sin(uv.x * 38.0 + uTime * 0.5);
      return col;
    }

    vec3 slide(vec2 uv, sampler2D t, vec2 texRes, float has, vec3 c) {
      if (has > 0.5) return texture2D(t, cover(clamp(uv, 0.0, 1.0), texRes)).rgb;
      return placeholder(clamp(uv, 0.0, 1.0), c);
    }

    float hash(float n) { return fract(sin(n * 12.9898) * 43758.5453); }
    float easeInOut(float t) {
      return t < 0.5 ? 4.0 * t * t * t : 1.0 - pow(-2.0 * t + 2.0, 3.0) / 2.0;
    }

    void main() {
      vec2 uv = vUv;

      if (uActive < 0.5) {
        gl_FragColor = vec4(slide(uv, uFromTex, uFromRes, uFromHas, uFromColor), 1.0);
        return;
      }

      float n = max(uStrips, 1.0);
      float i = floor(uv.x * n);
      // atraso por faixa: metade sequencial, metade pseudoaleatório
      float d = uStagger * mix(i / max(n - 1.0, 1.0), hash(i + 1.0), 0.6);
      float span = max(1.0 - uStagger, 0.001);
      float l = easeInOut(clamp((uProgress - d) / span, 0.0, 1.0));

      vec2 fromUv = uv + vec2(l * uDir, 0.0);
      vec2 toUv   = uv + vec2((l - 1.0) * uDir, 0.0);

      float edge = uDir > 0.0 ? 1.0 - l : l;
      float useTo = uDir > 0.0 ? step(edge, uv.x) : 1.0 - step(edge, uv.x);

      vec3 a = slide(fromUv, uFromTex, uFromRes, uFromHas, uFromColor);
      vec3 b = slide(toUv, uToTex, uToRes, uToHas, uToColor);
      vec3 col = mix(a, b, useTo);

      // sombra no corte de cada faixa, para dar profundidade ao fatiamento
      float dist = abs(uv.x - edge);
      col *= 1.0 - 0.7 * (1.0 - smoothstep(0.0, 0.008, dist));

      // fio de separação entre faixas, apenas durante a transição
      float f = fract(uv.x * n);
      float sep = min(f, 1.0 - f);
      float live = step(0.001, uProgress) * step(uProgress, 0.999);
      col *= 1.0 - 0.22 * (1.0 - smoothstep(0.0, 0.0035, sep)) * live;

      gl_FragColor = vec4(col, 1.0);
    }
  `;

  function compile(gl: WebGLRenderingContext, type: number, src: string) {
    const sh = gl.createShader(type)!;
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
      console.warn('[shader]', gl.getShaderInfoLog(sh));
      return null;
    }
    return sh;
  }

  function hexToRgb(hex = '#141414'): [number, number, number] {
    const h = hex.replace('#', '');
    const v = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
    const n = parseInt(v, 16);
    return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
  }

  $effect(() => {
    if (!canvas || !nav.webgl) return;

    const gl = (canvas.getContext('webgl', {
      alpha: false,
      antialias: false,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: false
    }) || canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;

    if (!gl) {
      ok = false;
      nav.webgl = false;
      return;
    }

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) {
      ok = false;
      nav.webgl = false;
      return;
    }
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      ok = false;
      nav.webgl = false;
      return;
    }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, 'aPos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const U = (n: string) => gl.getUniformLocation(prog, n);
    const u = {
      fromTex: U('uFromTex'),
      toTex: U('uToTex'),
      res: U('uRes'),
      fromRes: U('uFromRes'),
      toRes: U('uToRes'),
      fromColor: U('uFromColor'),
      toColor: U('uToColor'),
      fromHas: U('uFromHas'),
      toHas: U('uToHas'),
      progress: U('uProgress'),
      dir: U('uDir'),
      strips: U('uStrips'),
      stagger: U('uStagger'),
      active: U('uActive'),
      time: U('uTime')
    };

    function makeTexture() {
      const t = gl!.createTexture()!;
      gl!.bindTexture(gl!.TEXTURE_2D, t);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_S, gl!.CLAMP_TO_EDGE);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_T, gl!.CLAMP_TO_EDGE);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MIN_FILTER, gl!.LINEAR);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MAG_FILTER, gl!.LINEAR);
      gl!.texImage2D(
        gl!.TEXTURE_2D,
        0,
        gl!.RGBA,
        1,
        1,
        0,
        gl!.RGBA,
        gl!.UNSIGNED_BYTE,
        new Uint8Array([5, 5, 5, 255])
      );
      return t;
    }

    // Duas texturas: uma para o case que sai, outra para o que entra.
    const texA = makeTexture();
    const texB = makeTexture();

    /** Sobe o quadro atual do vídeo para a textura. Retorna se há imagem válida. */
    function upload(unit: number, tex: WebGLTexture, el: HTMLVideoElement | null) {
      gl!.activeTexture(unit === 0 ? gl!.TEXTURE0 : gl!.TEXTURE1);
      gl!.bindTexture(gl!.TEXTURE_2D, tex);
      if (el && el.readyState >= 2 && el.videoWidth > 0) {
        gl!.pixelStorei(gl!.UNPACK_FLIP_Y_WEBGL, 0);
        try {
          gl!.texImage2D(gl!.TEXTURE_2D, 0, gl!.RGBA, gl!.RGBA, gl!.UNSIGNED_BYTE, el);
          return { has: 1, w: el.videoWidth, h: el.videoHeight };
        } catch {
          return { has: 0, w: 16, h: 9 };
        }
      }
      return { has: 0, w: 16, h: 9 };
    }

    let raf = 0;
    let dpr = 1;

    function resize() {
      if (!canvas) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.round(window.innerWidth * dpr);
      const h = Math.round(window.innerHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl!.viewport(0, 0, w, h);
      }
    }

    const start = performance.now();
    let hidden = false;
    const onVis = () => (hidden = document.hidden);
    document.addEventListener('visibilitychange', onVis);
    window.addEventListener('resize', resize);
    resize();

    const draw = () => {
      raf = requestAnimationFrame(draw);
      if (hidden || !canvas) return;
      resize();

      const fromIdx = nav.index;
      const toIdx = nav.target;
      const active = toIdx >= 0;

      const a = upload(0, texA, videoEls[fromIdx] ?? null);
      const b = active ? upload(1, texB, videoEls[toIdx] ?? null) : { has: 0, w: 16, h: 9 };

      gl!.uniform1i(u.fromTex, 0);
      gl!.uniform1i(u.toTex, 1);
      gl!.uniform2f(u.res, canvas.width, canvas.height);
      gl!.uniform2f(u.fromRes, a.w, a.h);
      gl!.uniform2f(u.toRes, b.w, b.h);
      gl!.uniform3fv(u.fromColor, hexToRgb(items[fromIdx]?.accent ?? '#141414'));
      gl!.uniform3fv(u.toColor, hexToRgb(items[toIdx]?.accent ?? '#141414'));
      gl!.uniform1f(u.fromHas, a.has);
      gl!.uniform1f(u.toHas, b.has);
      gl!.uniform1f(u.progress, nav.progress);
      gl!.uniform1f(u.dir, nav.direction);
      gl!.uniform1f(u.strips, strips);
      gl!.uniform1f(u.stagger, stagger);
      gl!.uniform1f(u.active, active ? 1 : 0);
      gl!.uniform1f(u.time, (performance.now() - start) / 1000);

      gl!.drawArrays(gl!.TRIANGLES, 0, 3);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVis);
      gl.deleteProgram(prog);
      gl.deleteTexture(texA);
      gl.deleteTexture(texB);
      gl.deleteBuffer(buf);
    };
  });
</script>

{#if nav.webgl && ok}
  <canvas bind:this={canvas} aria-hidden="true"></canvas>
{/if}

<style>
  canvas {
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100vh;
    height: 100dvh;
    display: block;
    z-index: 0;
    background: #050505;
  }
</style>
