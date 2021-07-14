import { createContext, useContext, useReducer, useEffect } from "react";
import { QuizContextType, State, Category, incOrDecScoreProps } from "./quizContext.type";
import { quizReducer } from "./quizReducer";
import React from "react";
import { restAPICalls } from "../utils/CallRestAPI";
import { useLoader } from "./loader-context";
import { useAuth } from "./auth-context";

const QuizContext = createContext<QuizContextType>({} as QuizContextType);

const defaultState: State = { 
    quizes: [], 
    scoreDetails: [],
    leaderboard: []
}

export const QuizProvider: React.FC = ({children}) => {
    const { request } = restAPICalls();
    const { setLoading } = useLoader();
    const { isUserLoggedIn, token } = useAuth();
    const [ quizState , quizDispatch] = useReducer(quizReducer, defaultState);

    useEffect(() => {
        if(isUserLoggedIn){
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
       (async () => {
        try {
            setLoading(true); 
            const {data, success} = await request({
                method:  "GET",
                endpoint: `/api/scoreboard`,
            });
            if(success) {
                quizDispatch({
                    type: 'SET_USER_SCOREBOARD',
                    payload: data
                })
                setLoading(false);
            }
        } catch(err) {
            console.error(err);
            setLoading(false);
        }
       })();
    }
       // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token])

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

    const submitScore = ({category, score, attempts}: {category: Category, score: number, attempts: number}) => {
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

    return (
        <QuizContext.Provider value={{quizState , quizDispatch, incOrDecScore, submitScore }}>
            {children}
        </QuizContext.Provider>
    )
} 

export const useQuiz = () => {
   return useContext(QuizContext);
}