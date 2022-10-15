import type { FC } from "react"
import { renderToString } from "react-dom/server"
import { SiDiscord } from "react-icons/si"

type Props = {
  name: string
}

export const Card: FC<Props> = ({ name }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", padding: "1rem" }}>
      <h1 style={{ color: "blue" }}>Hello, {name}!</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "green",
          padding: "1rem",
        }}
      >
        <h1>Card</h1>
        <div style={{ height: "3rem", width: "3rem", backgroundColor: "gray" }}>
          <SiDiscord />
        </div>
        <h1>SiDiscord</h1>
        <h1>Card 🤯</h1>
      </div>
    </div>
  )
}
