// Verificação rápida: compila todos os .svelte e transpila os .ts do projeto.
// Uso: node scripts/check.mjs src
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { compile } from 'svelte/compiler';
import { createRequire } from 'node:module';
const ts = createRequire(import.meta.url)('typescript');

const root = process.argv[2] ?? 'src';
const files = [];
(function walk(d) {
  for (const f of readdirSync(d)) {
    const p = join(d, f);
    statSync(p).isDirectory() ? walk(p) : files.push(p);
  }
})(root);

let errors = 0;
let warnings = 0;

for (const f of files) {
  const code = readFileSync(f, 'utf8');
  try {
    if (f.endsWith('.svelte')) {
      const src = code.replace(
        /<script([^>]*lang=["']ts["'][^>]*)>([\s\S]*?)<\/script>/g,
        (_m, attrs, body) => {
          const js = ts.transpileModule(body, {
            compilerOptions: { target: ts.ScriptTarget.ES2022, verbatimModuleSyntax: false }
          }).outputText;
          return `<script${attrs.replace(/lang=["']ts["']/, '')}>${js}</script>`;
        }
      );
      const res = compile(src, { filename: f, generate: 'client' });
      for (const w of res.warnings) {
        warnings++;
        console.log(`  aviso  ${f}: [${w.code}] ${w.message}`);
      }
    } else if (f.endsWith('.ts')) {
      const out = ts.transpileModule(code, {
        compilerOptions: { target: ts.ScriptTarget.ES2022 },
        reportDiagnostics: true
      });
      if (out.diagnostics?.length) throw new Error(out.diagnostics[0].messageText.toString());
    }
  } catch (e) {
    errors++;
    console.log(`ERRO   ${f}\n  ${e.message}`);
  }
}
console.log(`\n${files.length} arquivos · ${errors} erro(s) · ${warnings} aviso(s)`);
process.exit(errors ? 1 : 0);
