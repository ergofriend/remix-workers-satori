import type { LoaderFunction } from "@remix-run/cloudflare";

// @ts-expect-error satori/wasm is not typed
import satori, { init } from "satori/wasm"
// @ts-expect-error yoga-wasm-web is not typed
import initYoga from "yoga-wasm-web"

import { loadGoogleFont } from "../util/font"

export let loader: LoaderFunction = async ({ request }) => {
  console.log("begin loader")

  // @ts-expect-error
  const yoga = await initYoga(YOGA_WASM)
  await init(yoga)
  console.log("initialized yoga")


  const params = new URLSearchParams(new URL(request.url).search)
  const title = params.get("title") || "no title"
  console.log("params title:", title)

  const html = `
    <div style={{ fontFamily: 'Bitter' }}>${title}</div>,
  `

  const font = await loadGoogleFont({ family: "Bitter", weight: 600 })
  console.log("Bitter font data", font)

  const svg = await satori(html, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: "Bitter",
        data: await font,
        weight: 600,
        style: "normal",
      },
    ],
    debug: true,
  })
  console.log("generated svg:", svg)

  return new Response(svg, {
    headers: {
      "Content-Type": "img/svg+xml",
    },
  })
}
