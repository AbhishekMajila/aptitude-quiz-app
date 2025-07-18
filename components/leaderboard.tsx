"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getLeaderboard, clearLeaderboard } from "@/lib/quiz-storage"
import { Trophy, Medal, Award, ArrowLeft, Trash2 } from "lucide-react"

interface LeaderboardEntry {
  name: string
  score: number
  totalQuestions: number
  percentage: number
  date: string
}

interface LeaderboardProps {
  onBack: () => void
}

export function Leaderboard({ onBack }: LeaderboardProps) {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])

  useEffect(() => {
    setLeaderboard(getLeaderboard())
  }, [])

  const handleClearLeaderboard = () => {
    if (confirm("Are you sure you want to clear the leaderboard?")) {
      clearLeaderboard()
      setLeaderboard([])
    }
  }

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="w-6 h-6 text-yellow-500" />
      case 1:
        return <Medal className="w-6 h-6 text-gray-400" />
      case 2:
        return <Award className="w-6 h-6 text-amber-600" />
      default:
        return <div className="w-6 h-6 flex items-center justify-center text-gray-500 font-bold">{index + 1}</div>
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold text-gray-800">Leaderboard</h1>
          <Button variant="outline" onClick={handleClearLeaderboard} className="text-red-600 bg-transparent">
            <Trash2 className="w-4 h-4 mr-2" />
            Clear
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">Top Performers</CardTitle>
          </CardHeader>
          <CardContent>
            {leaderboard.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Trophy className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>No scores yet. Be the first to take the quiz!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {leaderboard.map((entry, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-4 rounded-lg border ${
                      index === 0
                        ? "bg-yellow-50 border-yellow-200"
                        : index === 1
                          ? "bg-gray-50 border-gray-200"
                          : index === 2
                            ? "bg-amber-50 border-amber-200"
                            : "bg-white border-gray-100"
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      {getRankIcon(index)}
                      <div>
                        <div className="font-semibold text-gray-800">{entry.name}</div>
                        <div className="text-sm text-gray-500">{new Date(entry.date).toLocaleDateString()}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg">
                        {entry.score}/{entry.totalQuestions}
                      </div>
                      <div className="text-sm text-gray-600">{entry.percentage}%</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
