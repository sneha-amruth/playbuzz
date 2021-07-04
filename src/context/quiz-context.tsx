import { createContext, useContext, useReducer, useEffect } from "react";
import { QuizContextType, State, ScoreDetails, incOrDecScoreProps } from "./quizContext.type";
import { quizReducer } from "./quizReducer";
import React from "react";
import { restAPICalls } from "../utils/CallRestAPI";
import { useLoader } from "./loader-context";

const QuizContext = createContext<QuizContextType>({} as QuizContextType);

const defaultState: State = { 
    quizes: [], 
    scoreDetails: [],
    leaderboard: []
}

export const QuizProvider: React.FC = ({children}) => {
    const { request } = restAPICalls();
    const { setLoading } = useLoader();
    const [ quizState , quizDispatch] = useReducer(quizReducer, defaultState);

    useEffect(() => {
       (async () => {
        setLoading(true); 
        try {
          const {data, success} = await request({
                method:  "GET",
                endpoint: `/api/quiz`,
            });
            if(success) {
                quizDispatch({
                    type: 'SET_QUIZ',
                    payload: data
                });
                setLoading(false);
            }
        } catch(err) {
            console.error(err);
            setLoading(false);
        }
       })();
    }, [])

    const incOrDecScore = ({type, category, score}: incOrDecScoreProps) => {
        (async () => {
            try {
                setLoading(true);
             const { success } =  await request({
                    method:  "POST",
                    endpoint: `/api/scoreboard`,
                    body: {
                        category,
                        score: type === 'INCREMENT_SCORE' ? score+2 : score-2
                    }
                });
                if(success){
                    quizDispatch({
                        type: type,
                        payload: category
                    });
                     setLoading(false);
                }
            } catch(err) {
                setLoading(false);
                console.error(err);
            }
           })();
    }

    const submitScore = ({category, score, attempts}: ScoreDetails) => {
        (async () => {
            try {
                setLoading(true);
             const { success } =  await request({
                    method:  "POST",
                    endpoint: `/api/scoreboard`,
                    body: {
                        category,
                        score,
                        attempts
                    }
                });
                if(success)
                     setLoading(false);
            } catch(err) {
                setLoading(false);
                console.error(err);
            }
           })();
    }
    const getLeaderboard = () => {
            (async () => {
             try {
                setLoading(true);
                 const {data, success} = await request({
                     method:  "GET",
                     endpoint: `/api/leaderboard`,
                 });
                 if(success) {
                    quizDispatch({
                        type: 'SET_LEADERBOARD',
                        payload: data
                    });
                    setLoading(false);
                 }
             } catch(err) {
                 console.error(err);
                 setLoading(false);
             }
            })();
         }

    return (
        <QuizContext.Provider value={{quizState , quizDispatch, incOrDecScore, submitScore, getLeaderboard}}>
            {children}
        </QuizContext.Provider>
    )
} 

export const useQuiz = () => {
   return useContext(QuizContext);
}