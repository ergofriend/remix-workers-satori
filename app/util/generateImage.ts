import { Resvg, initWasm } from "@resvg/resvg-wasm"
import type { ReactNode } from "react"
// @ts-expect-error satori/wasm is not typed
import satori, { init } from "satori/wasm"
// @ts-expect-error yoga-wasm-web is not typed
import initYoga from "yoga-wasm-web"

import { loadGoogleFont } from "./font"

const initialize = async () => {
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
}

export const generateImage = async (element: ReactNode) => {
  await initialize()
  const svg = await getSvg(element)
  const pngBuffer = await getPng(svg)
  return pngBuffer
}

const getSvg = async (element: ReactNode) => {
  const font = await loadGoogleFont({ family: "Noto Sans JP", weight: 400 })

  const svg = await satori(element, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: "NotoSansJP",
        data: font,
        weight: 400,
        style: "normal",
      },
    ],
    debug: false,
  })

  return svg
}

// convert the SVG into a PNG Buffer
const getPng = async (svg: string) => {
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
  return pngBuffer
}
