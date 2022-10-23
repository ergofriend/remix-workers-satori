import type { LoaderFunction } from "@remix-run/cloudflare"

import { Sample } from "~/components/Sample"
import { ImageResponse } from "~/util/ImageResponse"

export let loader: LoaderFunction = async ({ request }) => {
  console.log("begin loader")

  const params = new URLSearchParams(new URL(request.url).search)
  const title = params.get("title") || "no title"
  console.log("params title:", title)

  const html = <Sample title={title} />

  return new ImageResponse(html, {
    debug: true,
    width: 1200,
    height: 630,
  })
}
