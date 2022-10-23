import type { FC } from "react"

type Pops = {
  title?: string
}

export const Sample: FC<Pops> = ({ title = "Hello World!" }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 1200,
        height: 630,
        backgroundColor: "whitesmoke",
      }}
    >
      <p
        style={{
          fontFamily: "Noto Sans JP",
          textAlign: "center",
          fontSize: "100px",
        }}
      >
        {title}
      </p>
    </div>
  )
}
