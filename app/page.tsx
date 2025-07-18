"use client"

import { useState } from "react"
import { QuizGame } from "@/components/quiz-game"
import { Leaderboard } from "@/components/leaderboard"
import { AdminPanel } from "@/components/admin-panel"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Brain, Settings, Play } from "lucide-react"

type View = "home" | "quiz" | "leaderboard" | "admin"

export default function Home() {
  const [currentView, setCurrentView] = useState<View>("home")
  const [playerName, setPlayerName] = useState("")

  const renderView = () => {
    switch (currentView) {
      case "quiz":
        return <QuizGame playerName={playerName} onComplete={() => setCurrentView("leaderboard")} />
      case "leaderboard":
        return <Leaderboard onBack={() => setCurrentView("home")} />
      case "admin":
        return <AdminPanel onBack={() => setCurrentView("home")} />
      default:
        return (
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-800">Aptitude Quiz App</CardTitle>
                <CardDescription>Test your knowledge with timed questions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label htmlFor="playerName" className="block text-sm font-medium text-gray-700 mb-2">
                    Enter your name
                  </label>
                  <input
                    id="playerName"
                    type="text"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    placeholder="Your name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <Button onClick={() => setCurrentView("quiz")} disabled={!playerName.trim()} className="w-full">
                  <Play className="w-4 h-4 mr-2" />
                  Start Quiz
                </Button>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" onClick={() => setCurrentView("leaderboard")}>
                    <Trophy className="w-4 h-4 mr-2" />
                    Leaderboard
                  </Button>
                  <Button variant="outline" onClick={() => setCurrentView("admin")}>
                    <Settings className="w-4 h-4 mr-2" />
                    Admin
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )
    }
  }

  return renderView()
}
