import type { LoaderFunction } from "@remix-run/node"
import { Response } from "@remix-run/node" // or cloudflare/deno
import satori from "satori"
import { renderAsync } from "@resvg/resvg-js"
import path from "path"
import fs from "fs/promises"
import { Card } from "dmp/cards/test"

export const loader: LoaderFunction = async ({ request }) => {
  // handle "GET" request
  const tmp = await fs.readFile(
    path.join(__dirname, "../public/NotoSansJP-Regular.otf")
  )
  const url = new URL(request.url)
  const text = url.searchParams.get("text")
  console.log(text)

  const svg = await satori(
    <div style={{ display: "flex" }}>
      <Card name={text ?? ""} />
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "NotoSansJP",
          data: tmp,
          weight: 400,
          style: "normal",
        },
      ],
      debug: true,
      graphemeImages: {
        "🤯": "https://twemoji.maxcdn.com/v/13.1.0/svg/1f92f.svg",
      },
    }
  )

  const img = await renderAsync(svg)

  return new Response(img.asPng(), {
    headers: {
      // "content-type": "image/svg+xml",
      "content-type": "image/png",
    },
  })
}
