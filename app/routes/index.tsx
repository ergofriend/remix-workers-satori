import type { ChangeEvent } from "react"
import { useCallback } from "react"
import { useState } from "react"
import { useDebounce } from "usehooks-ts"

import { Sample } from "~/components/Sample"

export default function Page() {
  const [title, setTitle] = useState("Workers Satori with Remix!")
  const debouncedValue = useDebounce<string>(title, 500)

  const openImage = useCallback(
    () =>
      window
        .open?.(`${window.location.href}og?title=${debouncedValue}`, "_blank")
        ?.focus(),
    [debouncedValue]
  )

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "2rem",
        flexDirection: "column",
      }}
    >
      <div
        style={{ transform: "scale(0.5)", cursor: "pointer" }}
        onClick={openImage}
      >
        <Sample title={debouncedValue} />
      </div>
      <input
        type="text"
        value={title}
        onChange={handleChange}
        style={{ width: "100%", padding: "0 1rem" }}
      />
    </div>
  )
}
