import { motivationalQuotes } from "@/utils/constant"
import { useEffect, useState } from "react"

const getRandom = () =>
  motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]

const TypingQuote = () => {
  const [currentQuote, setCurrentQuote] = useState(getRandom)
  const [displayText, setDisplayText] = useState("")
  const [index, setIndex] = useState(0)

  const changeQuote = () => {
    setCurrentQuote(getRandom())
    setDisplayText("")
    setIndex(0)
  }

  useEffect(() => {
    if (index < currentQuote.quote.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + currentQuote.quote[index])
        setIndex((prev) => prev + 1)
      }, 40)

      return () => clearTimeout(timeout)
    } else {
      const timeout = setTimeout(() => {
        changeQuote()
      }, 2000)

      return () => clearTimeout(timeout)
    }
  }, [index, currentQuote])

  return (
    <div className="flex flex-col items-center justify-center p-6 text-center ">
      <p className="min-h-15 text-lg font-mono text-zinc-800">
        {displayText}
        <span className="animate-pulse">|</span>
      </p>

      {index >= currentQuote.quote.length && (
        <p className="text-md mt-2 text-zinc-500">— {currentQuote.author}</p>
      )}
    </div>
  )
}

export default TypingQuote
