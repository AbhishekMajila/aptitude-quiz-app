"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trophy, Star, Target } from "lucide-react"

interface QuizResultsProps {
  score: number
  totalQuestions: number
  playerName: string
  onComplete: () => void
}

export function QuizResults({ score, totalQuestions, playerName, onComplete }: QuizResultsProps) {
  const percentage = Math.round((score / totalQuestions) * 100)

  const getPerformanceMessage = () => {
    if (percentage >= 80) return { message: "Excellent!", icon: Trophy, color: "text-yellow-500" }
    if (percentage >= 60) return { message: "Good Job!", icon: Star, color: "text-blue-500" }
    return { message: "Keep Practicing!", icon: Target, color: "text-gray-500" }
  }

  const performance = getPerformanceMessage()
  const Icon = performance.icon

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div
            className={`mx-auto mb-4 w-16 h-16 rounded-full flex items-center justify-center ${
              percentage >= 80 ? "bg-yellow-100" : percentage >= 60 ? "bg-blue-100" : "bg-gray-100"
            }`}
          >
            <Icon className={`w-8 h-8 ${performance.color}`} />
          </div>
          <CardTitle className="text-2xl font-bold">Quiz Complete!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Well done, {playerName}!</h3>
            <p className={`text-xl font-bold ${performance.color}`}>{performance.message}</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-3xl font-bold text-gray-800 mb-2">
              {score}/{totalQuestions}
            </div>
            <div className="text-lg text-gray-600">{percentage}% Correct</div>
          </div>

          <div className="space-y-2">
            <Button onClick={onComplete} className="w-full">
              View Leaderboard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
