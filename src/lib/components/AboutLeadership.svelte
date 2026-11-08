<script lang="ts">
  import { contact, whatsappUrl, type Slide } from '$lib/data/slides';
  import PillButton from './PillButton.svelte';
  import { nav } from '$lib/stores/nav.svelte';
  import { useI18n } from '$lib/i18n';

  type Props = { slide: Slide; onWork: () => void };
  let { slide, onWork }: Props = $props();
  const i18n = useI18n();
  const t = $derived(i18n.t);
  const a = $derived(t.about);
</script>

<article class="about" aria-label={t.ui.fullCaseRegion(a.eyebrow)}>
  <!-- 1. Apresentação -->
  <header class="lead">
    <p class="short">{a.intro[0]}</p>
    {#each a.intro.slice(1) as p, i (i)}
      <p class="body-text">{p}</p>
    {/each}
  </header>

  <!-- 2. Filosofia de liderança -->
  <section class="block">
    <h2 class="block-title">{a.philosophy.heading}</h2>
    <div class="prose">
      {#each a.philosophy.items as item (item.title)}
        <div class="principle">
          <h3 class="sub">{item.title}</h3>
          {#each item.paragraphs as p, i (i)}
            <p class="body-text">{p}</p>
          {/each}
        </div>
      {/each}
    </div>
  </section>

  <!-- 3. IA e tecnologia criativa -->
  <section class="block">
    <h2 class="block-title">{a.ai.heading}</h2>
    <div class="prose">
      <p class="statement-line">{a.ai.statement}</p>
      {#each a.ai.paragraphs as p, i (i)}
        <p class="body-text">{p}</p>
      {/each}
    </div>
  </section>

  <!-- 4. Trajetória em números -->
  <section class="block glance">
    <h2 class="block-title">{a.glance.heading}</h2>
    <dl class="stats">
      {#each a.glance.items as s (s.value)}
        <div>
          <dt>{s.value}</dt>
          <dd>{s.label}</dd>
        </div>
      {/each}
    </dl>
  </section>

  <!-- 5. Contato -->
  <section class="contact" id="contact">
    <h2 class="eyebrow">{a.contact.heading}</h2>
    <p class="contact-title">{a.contact.title}</p>
    {#each a.contact.paragraphs as p, i (i)}
      <p class="body-text">{p}</p>
    {/each}
    <div class="ctas">
      <PillButton
        href={whatsappUrl(t.whatsappMessage)}
        variant="solid"
        label={`${a.contact.ctaPrimary} — WhatsApp (${t.ui.opensInNewTab})`}
      >
        {a.contact.ctaPrimary}
      </PillButton>
      <PillButton variant="ghost" onclick={onWork}>{a.contact.ctaSecondary}</PillButton>
    </div>
    <address class="card">
      <span class="who">{a.contact.name}</span>
      <span>{a.contact.role}</span>
      <span>{a.contact.location}</span>
      <span>
        {a.contact.whatsappLabel}:
        <a href={whatsappUrl(t.whatsappMessage)} target="_blank" rel="noopener noreferrer"
          >{contact.whatsappLabel}</a
        >
      </span>
    </address>
  </section>

  <footer class="foot">
    <div class="links">
      {#each slide.links ?? [] as link (link.href)}
        <PillButton href={link.href} size="sm" label={`${t.links[link.label]} (${t.ui.opensInNewTab})`}>
          {t.links[link.label]}
        </PillButton>
      {/each}
      <PillButton variant="ghost" size="sm" onclick={() => nav.closeCase()}>
        {t.ui.backToFullscreen}
      </PillButton>
    </div>
    <p class="legal">{t.footer}</p>
  </footer>
</article>

<style>
  .about {
    max-width: 72rem;
    padding: 0 0 5rem;
    border-top: 1px solid var(--line);
    margin-top: 2rem;
  }
  .lead {
    padding: 2.5rem 0 3rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }
  .short {
    font-family: var(--font-ui);
    font-weight: 200;
    font-size: clamp(1.15rem, 2.2vw, 1.9rem);
    line-height: 1.35;
    color: #fff;
    margin: 0 0 1.5rem;
    max-width: 46ch;
  }
  .lead .body-text {
    margin: 0 0 1.1rem;
    max-width: 64ch;
  }
  .block {
    display: grid;
    grid-template-columns: minmax(0, 20rem) minmax(0, 1fr);
    gap: 2rem 4rem;
    padding: 3rem 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }
  .block-title {
    font-family: var(--font-ui);
    font-weight: 200;
    font-size: clamp(1.5rem, 3vw, 2.25rem);
    line-height: 1.1;
    margin: 0;
    color: #fff;
  }
  .prose p {
    margin: 0 0 1.15rem;
    max-width: 64ch;
  }
  .principle + .principle {
    margin-top: 2.25rem;
  }
  .sub {
    margin: 0 0 0.75rem;
    font-family: var(--font-ui);
    font-weight: 400;
    font-size: clamp(1.05rem, 1.3vw, 1.25rem);
    color: #fff;
  }
  .statement-line {
    font-family: var(--font-ui);
    font-weight: 200;
    font-size: clamp(1.25rem, 2.2vw, 1.9rem);
    line-height: 1.3;
    color: #fff;
    max-width: 30ch;
  }
  .stats {
    margin: 0;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 2rem 3rem;
  }
  .stats dt {
    font-family: var(--font-title);
    font-weight: 900;
    font-size: clamp(1.6rem, 3vw, 2.6rem);
    line-height: 1;
    letter-spacing: -0.04em;
    color: #fff;
  }
  .stats dd {
    margin: 0.6rem 0 0;
    font-size: 0.9rem;
    line-height: 1.55;
    color: var(--fg-dim);
    max-width: 32ch;
  }
  .contact {
    padding-top: 3rem;
  }
  .contact .eyebrow {
    margin: 0;
  }
  .contact-title {
    font-family: var(--font-ui);
    font-weight: 200;
    font-size: clamp(1.75rem, 4vw, 3.25rem);
    line-height: 1.1;
    color: #fff;
    margin: 0.75rem 0 1.25rem;
    max-width: 22ch;
  }
  .contact .body-text {
    margin: 0 0 1rem;
    max-width: 60ch;
  }
  .ctas {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin: 2rem 0 2.5rem;
  }
  .card {
    font-style: normal;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    font-size: 0.9rem;
    color: var(--fg-dim);
  }
  .card .who {
    color: #fff;
  }
  .card a {
    color: #fff;
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  }
  .foot {
    margin-top: 3.5rem;
    padding-top: 2rem;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
  }
  .links {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
  }
  .legal {
    margin: 1.75rem 0 0;
    font-size: 0.75rem;
    color: var(--fg-faint);
  }
  @media (max-width: 860px) {
    .block {
      grid-template-columns: 1fr;
      gap: 1.25rem;
      padding: 2.25rem 0;
    }
    .stats {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
  }
</style>
