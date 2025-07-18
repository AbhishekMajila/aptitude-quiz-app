"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Timer } from "@/components/timer"
import { QuizResults } from "@/components/quiz-results"
import { getQuestions, saveScore } from "@/lib/quiz-storage"
import { CheckCircle, XCircle } from "lucide-react"

interface Question {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  category: string
}

interface QuizGameProps {
  playerName: string
  onComplete: () => void
}

export function QuizGame({ playerName, onComplete }: QuizGameProps) {
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [isAnswered, setIsAnswered] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)

  useEffect(() => {
    const loadedQuestions = getQuestions()
    setQuestions(loadedQuestions.slice(0, 10)) // Limit to 10 questions
  }, [])

  const currentQuestion = questions[currentQuestionIndex]

  const handleAnswerSelect = (answerIndex: number) => {
    if (isAnswered) return

    setSelectedAnswer(answerIndex)
    setIsAnswered(true)
    setShowResult(true)

    if (answerIndex === currentQuestion.correctAnswer) {
      setScore(score + 1)
    }

    setTimeout(() => {
      nextQuestion()
    }, 2000)
  }

  const nextQuestion = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedAnswer(null)
      setIsAnswered(false)
      setShowResult(false)
      setTimeLeft(30)
    } else {
      // Quiz completed
      const finalScore = selectedAnswer === currentQuestion.correctAnswer ? score + 1 : score
      saveScore(playerName, finalScore, questions.length)
      setQuizCompleted(true)
    }
  }, [currentQuestionIndex, questions.length, selectedAnswer, currentQuestion, score, playerName])

  const handleTimeUp = useCallback(() => {
    if (!isAnswered) {
      setIsAnswered(true)
      setShowResult(true)
      setTimeout(() => {
        nextQuestion()
      }, 2000)
    }
  }, [isAnswered, nextQuestion])

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <p>Loading questions...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (quizCompleted) {
    return (
      <QuizResults score={score} totalQuestions={questions.length} playerName={playerName} onComplete={onComplete} />
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-800">Aptitude Quiz</h1>
            <div className="text-sm text-gray-600">
              Question {currentQuestionIndex + 1} of {questions.length}
            </div>
          </div>
          <Progress value={(currentQuestionIndex / questions.length) * 100} className="mb-4" />
        </div>

        <Card className="mb-6">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">{currentQuestion.category}</CardTitle>
              <Timer timeLeft={timeLeft} onTimeUp={handleTimeUp} isActive={!isAnswered} onTick={setTimeLeft} />
            </div>
          </CardHeader>
          <CardContent>
            <h2 className="text-xl font-semibold mb-6">{currentQuestion.question}</h2>
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => {
                let buttonClass = "w-full text-left p-4 rounded-lg border transition-all duration-200 "

                if (showResult) {
                  if (index === currentQuestion.correctAnswer) {
                    buttonClass += "bg-green-100 border-green-500 text-green-800"
                  } else if (index === selectedAnswer && index !== currentQuestion.correctAnswer) {
                    buttonClass += "bg-red-100 border-red-500 text-red-800"
                  } else {
                    buttonClass += "bg-gray-50 border-gray-200 text-gray-600"
                  }
                } else {
                  buttonClass += "bg-white border-gray-200 hover:bg-blue-50 hover:border-blue-300"
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={isAnswered}
                    className={buttonClass}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option}</span>
                      {showResult && index === currentQuestion.correctAnswer && (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      )}
                      {showResult && index === selectedAnswer && index !== currentQuestion.correctAnswer && (
                        <XCircle className="w-5 h-5 text-red-600" />
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <p className="text-gray-600">
            Score: {score}/{questions.length}
          </p>
        </div>
      </div>
    </div>
  )
}
