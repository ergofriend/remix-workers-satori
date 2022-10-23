# Remix (Cloudflare Workers) + satori

https://remix-workers-satori.ergofriend.workers.dev

Remix can't bundle `*.wasm` files, so we need to use worker's `wasm_modules`.

see also [\[Feature\]: Support Wasm loader in ESBuild · Discussion #2752 · remix-run/remix](https://github.com/remix-run/remix/discussions/2752)

## wranger.toml

```toml
[wasm_modules]
YOGA_WASM = "node_modules/yoga-wasm-web/dist/yoga.wasm"
RESVG_WASM = "node_modules/@resvg/resvg-wasm/index_bg.wasm"
```

## remix.env.d.ts

```ts
declare const YOGA_WASM: WebAssembly.Module
declare const RESVG_WASM: WebAssembly.Module
```

## related

- [vercel/satori: Enlightened library to convert HTML and CSS to SVG](https://github.com/vercel/satori)
- [kvnang/workers-og: An `og:image` (social card) generator that is fast, browser-less (no Puppeteer), and capable of running on the edge. This package is designed to be used with Cloudflare Workers (but may be used elsewhere), with the simple API inspired by `@vercel/og`.](https://github.com/kvnang/workers-og)
