import type { ReactNode } from "react"

import { generateImage } from "./generateImage"

export class ImageResponse extends Response {
  constructor(element: ReactNode, options: ImageResponseOptions = {}) {
    super()
    const body = new ReadableStream({
      async start(controller) {
        const pngBuffer = await generateImage(element)

        controller.enqueue(pngBuffer)
        controller.close()
      },
    })

    return new Response(body, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": options.debug
          ? "no-cache, no-store"
          : "public, immutable, no-transform, max-age=31536000",
        ...options.headers,
      },
      status: options.status || 200,
      statusText: options.statusText,
    })
  }
}

export interface ImageResponseOptions {
  width?: number
  height?: number
  // emoji?: 'twemoji' | 'blobmoji' | 'noto' | 'openmoji' = 'twemoji',
  fonts?: {
    name: string
    data: ArrayBuffer
    weight: number
    style: "normal" | "italic"
  }[]
  debug?: boolean

  // Options that will be passed to the HTTP response
  status?: number
  statusText?: string
  headers?: Record<string, string>
}
