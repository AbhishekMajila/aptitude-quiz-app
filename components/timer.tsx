"use client"

import { useEffect } from "react"
import { Clock } from "lucide-react"

interface TimerProps {
  timeLeft: number
  onTimeUp: () => void
  isActive: boolean
  onTick: (time: number) => void
}

export function Timer({ timeLeft, onTimeUp, isActive, onTick }: TimerProps) {
  useEffect(() => {
    if (!isActive) return

    const timer = setInterval(() => {
      onTick((prevTime) => {
        if (prevTime <= 1) {
          onTimeUp()
          return 0
        }
        return prevTime - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isActive, onTimeUp, onTick])

  const getTimerColor = () => {
    if (timeLeft > 20) return "text-green-600"
    if (timeLeft > 10) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className={`flex items-center space-x-2 ${getTimerColor()}`}>
      <Clock className="w-5 h-5" />
      <span className="font-mono text-lg font-bold">{timeLeft}s</span>
    </div>
  )
}
