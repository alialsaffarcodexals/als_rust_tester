import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Dashboard from './pages/Dashboard';
import IntroPage from './pages/IntroPage';
import LessonPage from './pages/LessonPage';
import ExamPage from './pages/ExamPage';
import Playground from './pages/Playground';
import { useProgress } from './hooks/useProgress';
import type { Exercise } from './types';
import './styles/globals.css';

// Import curriculum — populated by build agents
// Falls back to empty array if files don't exist yet
import { getAllExercises } from './data/curriculum';

const exercises: Exercise[] = getAllExercises();

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const { progress, completeLesson, saveExam, markIntroComplete } = useProgress();
  const totalExercises = 63;

  return (
    <div className="app-layout">
      <Sidebar progress={progress} />
      <div className="main-content">
        <Header progress={progress} totalExercises={totalExercises} />
        <div className="page-body">
          <Routes>
            <Route
              path="/"
              element={<Dashboard progress={progress} totalExercises={totalExercises} />}
            />
            <Route
              path="/chapter/intro"
              element={
                <IntroPage
                  onComplete={markIntroComplete}
                  isCompleted={progress.introCompleted}
                />
              }
            />
            <Route
              path="/lesson/:id"
              element={
                <LessonPage
                  exercises={exercises}
                  progress={progress}
                  onComplete={completeLesson}
                />
              }
            />
            <Route
              path="/exam/:checkpoint"
              element={
                <ExamPage
                  exercises={exercises}
                  progress={progress}
                  onSaveResult={saveExam}
                />
              }
            />
            <Route path="/playground" element={<Playground />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
