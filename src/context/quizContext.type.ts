export type Leaderboard = {
    _id: string,
    firstName: string,
    category: Category,
    score: number,
    attempts: number
}

export type ScoreDetails = {
    category: Category,
    score: number,
    rightAns: number,
    wrongAns: number,
    attempts: number,
}

export type Options = {
    _id: string,
    text: string,
    isRight: boolean
}

export type QuestionsList = {
    points: number,
    _id: string,
    question: string,
    options: Options[]
}

export enum Category {
    brands = "brands",
    skincare = "skincare",
    science = "science",
}

export type Quizes = {
    _id: string,
    category: Category,
    questionsList: QuestionsList[],
    image: string,
    description: string
}

export type State = {
    quizes: Quizes[],
    scoreDetails: ScoreDetails[],
    leaderboard: Leaderboard[]
}

export type incOrDecScoreProps = {
    type: 'INCREMENT_SCORE' | 'DECREMENT_SCORE', 
    category: Category, 
    score: number
}

export type QuizContextType = {
    quizState: State,
    quizDispatch: React.Dispatch<any>,
    incOrDecScore: (props: incOrDecScoreProps) => void,
    submitScore: ({ category, score, attempts }: {category: Category, score: number, attempts: number}) => void,
}

export type Action = 
            | { type: 'SET_QUIZ', payload: Quizes[]}
            | { type: 'SET_USER_SCOREBOARD', payload: ScoreDetails[]}
            | { type: 'SET_LEADERBOARD', payload: Leaderboard[]}
            | { type: 'INITIATE_QUIZ', payload: Category}
            | { type: 'INCREMENT_SCORE', payload: Category}
            | { type: 'DECREMENT_SCORE', payload: Category}

