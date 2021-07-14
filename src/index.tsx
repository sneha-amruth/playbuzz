import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import { QuizProvider } from "../src/context/quiz-context";
import { LoaderContextProvider } from "./context/loader-context";
import { AuthProvider } from "./context/auth-context";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <LoaderContextProvider>
      <AuthProvider>
      <QuizProvider>
        <App />
        </QuizProvider>
        </AuthProvider>
      </LoaderContextProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
