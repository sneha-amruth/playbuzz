import React, { FC } from 'react';
import { Home } from "../src/components/Home/Home";
import { Explore } from "../src/components/Home/Explore";
import { Quiz } from "../src/components/Quiz/Quiz";
import { Routes, Route } from "react-router-dom";
import './App.css';
import { Scoreboard } from './components/Activity/Scoreboard';
import { Leaderboard } from "./components/Activity/Leaderboard";
import PrivateRoute from "./components/Account/PrivateRoute";
import Login from "./components/Account/Login";
import SignUp from "./components/Account/SignUp";
import Account from "./components/Account/Account";
import NotFound from "./components/Account/404";

const App: FC = () => {
  return (
    <div className="App">
     <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/explore" element={<PrivateRoute><Explore/></PrivateRoute>} />
        <Route path="/leaderboard" element={<Leaderboard/>} />
        <Route path="/quiz/:quizId" element={<PrivateRoute><Quiz/></PrivateRoute>} />
        <Route path="/quiz/:quizId/scoreboard" element={<PrivateRoute><Scoreboard /></PrivateRoute>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<SignUp/>} />
        <Route path="/account" element={<PrivateRoute><Account/></PrivateRoute>} />
        <Route path="*" element={<NotFound />} />
     </Routes>
    </div>
  );
}

export default App;
