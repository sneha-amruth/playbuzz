import { State, Action } from "./quizContext.type";

export const quizReducer = (state: State, action: Action): State => {
    switch(action.type) {
        case 'SET_QUIZ': 
            return {
                ...state,
                quizes: action.payload, 
            }
        case 'SET_USER_SCOREBOARD':
            return{
                ...state,
                scoreDetails: action.payload
            }
        case 'SET_LEADERBOARD':
            return {
                ...state,
                leaderboard: action.payload
            }
        case "INITIATE_QUIZ":
            return {
                ...state,
                scoreDetails: (state.scoreDetails.filter(item => item.category === action.payload).length === 0) ? 
                ([...state.scoreDetails, { category: action.payload, score: 0, rightAns: 0, wrongAns: 0, attempts: 1 }]) : 
                (state.scoreDetails.map(item =>  item.category === action.payload ? {category: action.payload, score: 0, rightAns: 0, wrongAns: 0, attempts: item.attempts + 1} : item ))
            }
        case 'INCREMENT_SCORE':
            return {
                ...state,
                scoreDetails: state.scoreDetails.map(item =>  item.category === action.payload ? 
                    {...item, score: item.score + 2, rightAns: item.rightAns+1} : item)
            }
        case 'DECREMENT_SCORE':
            return {
                ...state,
               scoreDetails: state.scoreDetails.map(item =>  item.category === action.payload ? 
                {...item, score: item.score - 2, wrongAns: item.wrongAns+1} : item)
            }

        default:
            return state;
    }
}