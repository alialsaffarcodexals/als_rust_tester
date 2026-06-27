import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import ResizeHandle from './components/layout/ResizeHandle';
import { useResizable, useMediaQuery } from './hooks/useResizable';
import Dashboard from './pages/Dashboard';
import IntroPage from './pages/IntroPage';
import LessonPage from './pages/LessonPage';
import ExamPage from './pages/ExamPage';
import QuizPage from './pages/QuizPage';
import FinalPrepPage from './pages/FinalPrepPage';
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
  const totalExercises = exercises.length;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Resizable sidebar (desktop only — on mobile it's an overlay drawer).
  const isDesktop = useMediaQuery('(min-width: 769px)');
  const sidebar = useResizable<HTMLDivElement>({
    storageKey: 'rustpath_sidebar_width',
    axis: 'x',
    cssVar: '--sidebar-width',
    min: 210,
    max: () => Math.min(560, Math.round(window.innerWidth * 0.42)),
  });

  return (
    <div className="app-layout" ref={sidebar.panelRef} style={isDesktop ? sidebar.style : undefined}>
      <Sidebar
        progress={progress}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      {isDesktop && (
        <ResizeHandle
          axis="x"
          className="sidebar-resize-handle"
          ariaLabel="Resize sidebar"
          onResizeStart={sidebar.onResizeStart}
          onResize={sidebar.onResize}
          onResizeEnd={sidebar.onResizeEnd}
          onReset={sidebar.reset}
        />
      )}
      <div className="main-content">
        <Header
          progress={progress}
          totalExercises={totalExercises}
          onMenuToggle={() => setSidebarOpen((o) => !o)}
        />
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
            <Route path="/quiz" element={<QuizPage exercises={exercises} />} />
            <Route path="/final-prep" element={<FinalPrepPage />} />
            <Route path="/playground" element={<Playground />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
