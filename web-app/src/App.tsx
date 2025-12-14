import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { applyTheme } from './utils/theme';
import MainMenu from './components/MainMenu';
import GameView from './components/GameView';
import SyllablesView from './components/SyllablesView';
import TwoSyllableWordsView from './components/TwoSyllableWordsView';
import ProgressView from './components/ProgressView';
import SettingsView from './components/SettingsView';
import './index.css';

function App() {
  const [themeId, setThemeId] = useState(() =>
    localStorage.getItem('mathkids_theme') || 'classic'
  );

  useEffect(() => {
    applyTheme(themeId);
  }, [themeId]);

  const handleThemeChange = (newThemeId: string) => {
    setThemeId(newThemeId);
    localStorage.setItem('mathkids_theme', newThemeId);
    applyTheme(newThemeId);
  };

  return (
    <BrowserRouter>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<MainMenu />} />
          <Route path="/game/:mode" element={<GameView />} />
          <Route path="/syllables" element={<SyllablesView />} />
          <Route path="/words" element={<TwoSyllableWordsView />} />
          <Route path="/progress" element={<ProgressView />} />
          <Route
            path="/settings"
            element={<SettingsView themeId={themeId} onThemeChange={handleThemeChange} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
