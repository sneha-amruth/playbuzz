import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { LoaderContextProvider } from './context/loader-context';
import { AuthProvider } from './context/auth-context';
import { QuizProvider } from './context/quiz-context';

test('renders the playbuzz home page', () => {
  render(
    <Router>
      <LoaderContextProvider>
        <AuthProvider>
          <QuizProvider>
            <App />
          </QuizProvider>
        </AuthProvider>
      </LoaderContextProvider>
    </Router>
  );
  const heading = screen.getByText(/welcome to playbuzz/i);
  expect(heading).toBeInTheDocument();
});
