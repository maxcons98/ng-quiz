export enum QuizDifficulty {
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard"
}

export const QUIZ_DIFFICULTIES = [
    { label: "Easy", value: QuizDifficulty.EASY },
    { label: "Medium", value: QuizDifficulty.MEDIUM },
    { label: "Hard", value: QuizDifficulty.HARD }
]

export const BASE_URL = "https://opentdb.com"
export const CATEGORIES_API = "api_category.php";
export const QUIZ_API = "api.php";