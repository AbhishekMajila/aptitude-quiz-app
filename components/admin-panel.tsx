"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { getQuestions, addQuestion, deleteQuestion } from "@/lib/quiz-storage"
import { ArrowLeft, Plus, Trash2, BookOpen } from "lucide-react"

interface Question {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  category: string
}

interface AdminPanelProps {
  onBack: () => void
}

export function AdminPanel({ onBack }: AdminPanelProps) {
  const [questions, setQuestions] = useState<Question[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [newQuestion, setNewQuestion] = useState({
    question: "",
    options: ["", "", "", ""],
    correctAnswer: 0,
    category: "",
  })

  useEffect(() => {
    setQuestions(getQuestions())
  }, [])

  const handleAddQuestion = () => {
    if (!newQuestion.question.trim() || !newQuestion.category.trim()) {
      alert("Please fill in all required fields")
      return
    }

    if (newQuestion.options.some((option) => !option.trim())) {
      alert("Please fill in all answer options")
      return
    }

    const question: Question = {
      id: Date.now().toString(),
      question: newQuestion.question,
      options: newQuestion.options,
      correctAnswer: newQuestion.correctAnswer,
      category: newQuestion.category,
    }

    addQuestion(question)
    setQuestions(getQuestions())
    setNewQuestion({
      question: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
      category: "",
    })
    setShowAddForm(false)
  }

  const handleDeleteQuestion = (id: string) => {
    if (confirm("Are you sure you want to delete this question?")) {
      deleteQuestion(id)
      setQuestions(getQuestions())
    }
  }

  const updateOption = (index: number, value: string) => {
    const updatedOptions = [...newQuestion.options]
    updatedOptions[index] = value
    setNewQuestion({ ...newQuestion, options: updatedOptions })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
          <Button onClick={() => setShowAddForm(!showAddForm)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Question
          </Button>
        </div>

        {showAddForm && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Add New Question</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={newQuestion.category}
                  onChange={(e) => setNewQuestion({ ...newQuestion, category: e.target.value })}
                  placeholder="e.g., Mathematics, Logic, General Knowledge"
                />
              </div>

              <div>
                <Label htmlFor="question">Question</Label>
                <Textarea
                  id="question"
                  value={newQuestion.question}
                  onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
                  placeholder="Enter your question here..."
                  rows={3}
                />
              </div>

              <div>
                <Label>Answer Options</Label>
                <div className="space-y-2">
                  {newQuestion.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        value={option}
                        onChange={(e) => updateOption(index, e.target.value)}
                        placeholder={`Option ${index + 1}`}
                      />
                      <input
                        type="radio"
                        name="correctAnswer"
                        checked={newQuestion.correctAnswer === index}
                        onChange={() => setNewQuestion({ ...newQuestion, correctAnswer: index })}
                        className="w-4 h-4"
                      />
                      <Label className="text-sm">Correct</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex space-x-2">
                <Button onClick={handleAddQuestion}>Add Question</Button>
                <Button variant="outline" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="w-5 h-5 mr-2" />
              Question Bank ({questions.length} questions)
            </CardTitle>
          </CardHeader>
          <CardContent>
            {questions.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <BookOpen className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>No questions available. Add some questions to get started!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {questions.map((question, index) => (
                  <div key={question.id} className="border rounded-lg p-4 bg-white">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <div className="text-sm text-blue-600 font-medium mb-1">{question.category}</div>
                        <h3 className="font-semibold text-gray-800 mb-3">{question.question}</h3>
                        <div className="space-y-1">
                          {question.options.map((option, optionIndex) => (
                            <div
                              key={optionIndex}
                              className={`text-sm p-2 rounded ${
                                optionIndex === question.correctAnswer
                                  ? "bg-green-100 text-green-800 font-medium"
                                  : "bg-gray-50 text-gray-600"
                              }`}
                            >
                              {optionIndex + 1}. {option}
                              {optionIndex === question.correctAnswer && " ✓"}
                            </div>
                          ))}
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteQuestion(question.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
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
