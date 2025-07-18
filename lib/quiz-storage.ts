interface Question {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  category: string
}

interface LeaderboardEntry {
  name: string
  score: number
  totalQuestions: number
  percentage: number
  date: string
}

// Default questions
const defaultQuestions: Question[] = [
  {
    id: "1",
    question: "What is 15% of 200?",
    options: ["25", "30", "35", "40"],
    correctAnswer: 1,
    category: "Mathematics",
  },
  {
    id: "2",
    question: "If a train travels 120 km in 2 hours, what is its speed?",
    options: ["50 km/h", "60 km/h", "70 km/h", "80 km/h"],
    correctAnswer: 1,
    category: "Mathematics",
  },
  {
    id: "3",
    question: "Complete the series: 2, 6, 12, 20, ?",
    options: ["28", "30", "32", "34"],
    correctAnswer: 1,
    category: "Logic",
  },
  {
    id: "4",
    question: "Which number comes next: 1, 4, 9, 16, ?",
    options: ["20", "25", "30", "36"],
    correctAnswer: 1,
    category: "Logic",
  },
  {
    id: "5",
    question: "If BOOK is coded as CPPL, how is WORD coded?",
    options: ["XPSE", "XQSE", "YPSE", "YQSE"],
    correctAnswer: 0,
    category: "Logic",
  },
  {
    id: "6",
    question: "What is the square root of 144?",
    options: ["10", "11", "12", "13"],
    correctAnswer: 2,
    category: "Mathematics",
  },
  {
    id: "7",
    question: "In a group of 40 people, 25 like tea and 20 like coffee. How many like both?",
    options: ["5", "10", "15", "20"],
    correctAnswer: 0,
    category: "Logic",
  },
  {
    id: "8",
    question: "What is 3/4 expressed as a percentage?",
    options: ["70%", "75%", "80%", "85%"],
    correctAnswer: 1,
    category: "Mathematics",
  },
  {
    id: "9",
    question: "If today is Wednesday, what day will it be after 100 days?",
    options: ["Monday", "Tuesday", "Wednesday", "Thursday"],
    correctAnswer: 3,
    category: "Logic",
  },
  {
    id: "10",
    question: "A car covers 300 km in 5 hours. What is its average speed?",
    options: ["50 km/h", "55 km/h", "60 km/h", "65 km/h"],
    correctAnswer: 2,
    category: "Mathematics",
  },
  {
    id: "11",
    question: "Find the odd one out: 2, 4, 6, 9, 10",
    options: ["2", "4", "9", "10"],
    correctAnswer: 2,
    category: "Logic",
  },
  {
    id: "12",
    question: "What is 25% of 80?",
    options: ["15", "20", "25", "30"],
    correctAnswer: 1,
    category: "Mathematics",
  },
]

export function getQuestions(): Question[] {
  if (typeof window === "undefined") return defaultQuestions

  const stored = localStorage.getItem("quiz-questions")
  if (stored) {
    const questions = JSON.parse(stored)
    return questions.length > 0 ? questions : defaultQuestions
  }

  localStorage.setItem("quiz-questions", JSON.stringify(defaultQuestions))
  return defaultQuestions
}

export function addQuestion(question: Question): void {
  if (typeof window === "undefined") return

  const questions = getQuestions()
  questions.push(question)
  localStorage.setItem("quiz-questions", JSON.stringify(questions))
}

export function deleteQuestion(id: string): void {
  if (typeof window === "undefined") return

  const questions = getQuestions().filter((q) => q.id !== id)
  localStorage.setItem("quiz-questions", JSON.stringify(questions))
}

export function saveScore(name: string, score: number, totalQuestions: number): void {
  if (typeof window === "undefined") return

  const entry: LeaderboardEntry = {
    name,
    score,
    totalQuestions,
    percentage: Math.round((score / totalQuestions) * 100),
    date: new Date().toISOString(),
  }

  const leaderboard = getLeaderboard()
  leaderboard.push(entry)
  leaderboard.sort((a, b) => b.percentage - a.percentage || b.score - a.score)

  localStorage.setItem("quiz-leaderboard", JSON.stringify(leaderboard.slice(0, 10)))
}

export function getLeaderboard(): LeaderboardEntry[] {
  if (typeof window === "undefined") return []

  const stored = localStorage.getItem("quiz-leaderboard")
  return stored ? JSON.parse(stored) : []
}

export function clearLeaderboard(): void {
  if (typeof window === "undefined") return

  localStorage.removeItem("quiz-leaderboard")
}
