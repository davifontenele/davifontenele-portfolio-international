<script lang="ts">
  import { contact } from '$lib/data/cases';
  import PillButton from './PillButton.svelte';
  type Props = { compact?: boolean };
  let { compact = false }: Props = $props();
</script>

<section class="contact" class:compact id="contato" aria-label="Contato">
  {#if !compact}
    <h3 class="eyebrow">Contato</h3>
    <dl>
      <div><dt>Nome</dt><dd>{contact.name}</dd></div>
      <div><dt>Atuação</dt><dd>{contact.role}</dd></div>
      <div><dt>Local</dt><dd>{contact.location}</dd></div>
      <div><dt>WhatsApp</dt><dd>{contact.whatsappLabel}</dd></div>
    </dl>
  {/if}
  <PillButton
    href={contact.whatsapp}
    variant="solid"
    label="Falar com Davi Fontenele pelo WhatsApp"
  >
    Falar pelo WhatsApp
  </PillButton>
</section>

<style>
  .contact {
    margin-top: 3.5rem;
    border-top: 1px solid var(--line);
    padding-top: 2rem;
  }
  .contact.compact {
    margin: 0;
    border: 0;
    padding: 0;
  }
  dl {
    margin: 1.25rem 0 2rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 1.25rem 2rem;
  }
  dt {
    font-size: 0.6875rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--fg-faint);
    margin-bottom: 0.35rem;
  }
  dd {
    margin: 0;
    font-size: 0.95rem;
    color: #fff;
  }
</style>
