# Fujitec — NEXO · Video Analytics e Geolocalização

Apresentação web da Fujitec com a trilha do NEXO limitada a Geolocalização e Video Analytics, em formato linear de 7 telas. Derivada da apresentação global Fujitec.

## Entradas

- `index.html` encaminha para a apresentação light.
- `fujitec-apresentacao-geo-analitico.html` é a apresentação light.
- `fujitec-apresentacao-geo-analitico-dark.html` é a variante dark.

Todas as imagens, fontes e scripts são locais — o site é 100% estático e funciona offline.

## Estrutura

- `assets/fujitec-geo/` — conteúdo, navegação e app do deck (JS) e ajustes de CSS.
- `assets/fujitec-global/` — base visual compartilhada com a apresentação global Fujitec (CSS, fontes, marca, mídia e GSAP).

## Desenvolvimento local

Sirva a pasta com qualquer servidor HTTP estático, por exemplo:

```sh
npx http-server . -p 4173 -c-1
```

Abra `http://localhost:4173/`.

## Publicação

Por ser um site estático sem build, basta publicar a pasta inteira (Cloudflare Pages, GitHub Pages, etc.).
