import type { LoaderFunction } from "@remix-run/cloudflare"
import { Resvg, initWasm } from "@resvg/resvg-wasm"
// @ts-expect-error satori/wasm is not typed
import satori, { init } from "satori/wasm"
// @ts-expect-error yoga-wasm-web is not typed
import initYoga from "yoga-wasm-web"

import { loadGoogleFont } from "../util/font"

export let loader: LoaderFunction = async ({ request }) => {
  console.log("begin loader")

  // Init yoga wasm
  try {
    const yoga = await initYoga(YOGA_WASM)
    await init(yoga)
    console.log("initialized yoga")
  } catch (err) {
    console.error(err)
  }

  // Init resvg wasm
  try {
    await initWasm(RESVG_WASM)
    console.log("initialized resvg")
  } catch (err) {
    console.error(err)
  }

  const params = new URLSearchParams(new URL(request.url).search)
  const title = params.get("title") || "no title"
  console.log("params title:", title)

  const html = <div style={{ fontFamily: "Bitter" }}>{title}</div>

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
  console.log("satori generated svg")

  // convert the SVG into a PNG
  const opts = {
    fitTo: {
      mode: "width" as const,
      value: 1200,
    },
    font: {
      loadSystemFonts: false, // It will be faster to disable loading system fonts.
    },
  }
  const resvg = new Resvg(svg, opts)
  const pngData = resvg.render()
  const pngBuffer = pngData.asPng()

  return new Response(pngBuffer, {
    headers: {
      "Content-Type": "image/png",
    },
  })
}
