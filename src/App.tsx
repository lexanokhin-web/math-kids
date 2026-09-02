import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { applyTheme } from './utils/theme';
import MainMenu from './components/MainMenu';
import GameView from './components/GameView';
import SyllablesView from './components/SyllablesView';
import TwoSyllableWordsView from './components/TwoSyllableWordsView';
import PhrasesView from './components/PhrasesView';
import SentencesView from './components/SentencesView';
import LolaLevel2View from './components/LolaLevel2View';
import LolaLevel3View from './components/LolaLevel3View';
import LolaLevel4View from './components/LolaLevel4View';
import ExtendedSentencesView from './components/ExtendedSentencesView';
import ProgressView from './components/ProgressView';
import SettingsView from './components/SettingsView';
import ElsaAnnaView from './components/ElsaAnnaView';
import StickerBookView from './components/StickerBookView';
import MatchingGameView from './components/MatchingGameView';
import ArtikelGameView from './components/ArtikelGameView';
import SyllableTrainView from './components/SyllableTrainView';
import ComparisonGameView from './components/ComparisonGameView';
import RhymeGameView from './components/RhymeGameView';
import SequenceGameView from './components/SequenceGameView';
import GapGameView from './components/GapGameView';
import UnscrambleGameView from './components/UnscrambleGameView';

import SequenceMemoryGameView from './components/SequenceMemoryGameView';
import BridgeGameView from './components/BridgeGameView';
import ImageWordMatchView from './components/ImageWordMatchView';
import MultiplicationLevelSelect from './components/MultiplicationLevelSelect';
import MultiplicationGameView from './components/MultiplicationGameView';
import ClockGameView from './components/ClockGameView';
import MateApp from './mate/App';
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
          <Route path="/game/multiplication" element={<MultiplicationLevelSelect />} />
          <Route path="/game/multiplication/level/:levelId" element={<MultiplicationGameView />} />
          <Route path="/syllables" element={<SyllablesView />} />
          <Route path="/words" element={<TwoSyllableWordsView />} />
          <Route path="/phrases" element={<PhrasesView />} />
          <Route path="/sentences" element={<SentencesView />} />
          <Route path="/lola-level-2" element={<LolaLevel2View />} />
          <Route path="/lola-level-3" element={<LolaLevel3View />} />
          <Route path="/lola-level-4" element={<LolaLevel4View />} />
          <Route path="/extended-sentences" element={<ExtendedSentencesView />} />
          <Route path="/elsa-anna" element={<ElsaAnnaView />} />
          <Route path="/progress" element={<ProgressView />} />
          <Route path="/sticker-book" element={<StickerBookView />} />
          <Route path="/matching/:type" element={<MatchingGameView />} />
          <Route path="/artikel" element={<ArtikelGameView />} />
          <Route path="/syllables-train" element={<SyllableTrainView />} />
          <Route path="/comparison" element={<ComparisonGameView />} />
          <Route path="/rhyme" element={<RhymeGameView />} />
          <Route path="/sequence" element={<SequenceGameView />} />
          <Route path="/gap" element={<GapGameView />} />
          <Route path="/unscramble" element={<UnscrambleGameView />} />

          <Route path="/sequence-memory" element={<SequenceMemoryGameView />} />
          <Route path="/bridge" element={<BridgeGameView />} />
          <Route path="/image-match" element={<ImageWordMatchView />} />
          <Route path="/clock" element={<ClockGameView />} />
          <Route path="/mate/*" element={<MateApp />} />
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
