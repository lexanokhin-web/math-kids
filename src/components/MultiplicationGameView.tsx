import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { getRandomMultiplicationExercise, type UnifiedMultiplicationExercise } from '../data/multiplication';
import { trackMultiplicationAnswer } from '../utils/progressManager';
import { soundManager } from '../utils/soundManager';
import RewardCelebration, { type Reward } from './RewardCelebration';

const MultiplicationGameView: React.FC = () => {
  const { levelId } = useParams<{ levelId: string }>();
  const navigate = useNavigate();
  const parsedLevel = parseInt(levelId || '1', 10);

  const [currentEx, setCurrentEx] = useState<UnifiedMultiplicationExercise | null>(null);
  const [solvedCount, setSolvedCount] = useState(1);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showHint, setShowHint] = useState(false);

  // Sticker & Reward Popup state
  const [showReward, setShowReward] = useState(false);
  const [rewardData, setRewardData] = useState<Reward | null>(null);

  // Load initial random exercise
  useEffect(() => {
    setCurrentEx(getRandomMultiplicationExercise(parsedLevel));
    setSolvedCount(1);
    setScore(0);
    setStreak(0);
  }, [parsedLevel]);

  const loadNextQuestion = useCallback(() => {
    setSelectedOption(null);
    setFeedback(null);
    setShowHint(false);
    setCurrentEx(getRandomMultiplicationExercise(parsedLevel));
    setSolvedCount(prev => prev + 1);
  }, [parsedLevel]);

  if (!currentEx) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Aufgaben werden geladen...</div>;
  }

  const handleAnswerSubmit = (givenOption: string) => {
    if (feedback !== null) return;

    soundManager.playClick();
    setSelectedOption(givenOption);
    const isCorrect = currentEx.options && currentEx.correctIndex !== undefined
      ? givenOption === currentEx.options[currentEx.correctIndex]
      : false;

    if (isCorrect) {
      soundManager.playCorrect();
      setFeedback('correct');
      setScore(prev => prev + 10 + streak * 2);
      setStreak(prev => prev + 1);

      // Track Multiplication Progress, XP, Stickers and Achievements
      const res = trackMultiplicationAnswer();

      // Check if unlocked a sticker or leveled up
      if (res.unlockedSticker || res.leveledUp || res.unlockedAchievement) {
        setRewardData({
          xp: 10,
          leveledUp: res.leveledUp,
          achievement: res.unlockedAchievement,
          sticker: res.unlockedSticker
        });
        setShowReward(true);
      }

      // Celebrate every 5th streak with confetti
      if ((streak + 1) % 5 === 0) {
        confetti({ particleCount: 70, spread: 65, origin: { y: 0.6 } });
      }

      // Automatically transition to next question immediately after 450ms
      setTimeout(() => {
        loadNextQuestion();
      }, 450);
    } else {
      soundManager.playIncorrect();
      setFeedback('incorrect');
      setStreak(0);

      setTimeout(() => {
        setSelectedOption(null);
        setFeedback(null);
      }, 650);
    }
  };

  return (
    <div className="game-container" style={{ maxWidth: '700px', margin: '0 auto', padding: '20px' }}>
      {/* Reward & Sticker Celebration Modal */}
      <RewardCelebration
        show={showReward}
        reward={rewardData}
        onClose={() => setShowReward(false)}
      />

      {/* Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <button
          onClick={() => navigate('/game/multiplication')}
          className="btn-secondary"
          style={{ padding: '8px 16px', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          ← Zurück
        </button>

        <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#3b82f6' }}>
          Aufgabe #{solvedCount}
        </div>

        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          {streak > 1 && <span style={{ color: '#f59e0b', fontWeight: 'bold' }}>🔥 {streak}</span>}
          <span style={{ fontWeight: 'bold', color: '#10b981' }}>⭐ {score} XP</span>
        </div>
      </div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentEx.id}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.15 }}
          className="glass-card"
          style={{
            padding: '40px 30px',
            borderRadius: '28px',
            background: '#ffffff',
            boxShadow: '0 16px 40px rgba(0,0,0,0.08)',
            textAlign: 'center'
          }}
        >
          {/* Main Formula Display e.g. 3 × 5 = ? */}
          <div style={{ fontSize: '3.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '32px', letterSpacing: '0.05em' }}>
            {currentEx.question.de}
          </div>

          {/* 4 Options Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {currentEx.options?.map((opt, idx) => {
              let btnBg = '#f8fafc';
              let btnBorder = '2px solid #e2e8f0';

              if (selectedOption === opt) {
                if (feedback === 'correct') {
                  btnBg = '#dcfce7';
                  btnBorder = '3px solid #22c55e';
                } else if (feedback === 'incorrect') {
                  btnBg = '#fee2e2';
                  btnBorder = '3px solid #ef4444';
                }
              }

              return (
                <motion.button
                  key={idx}
                  whileHover={{ scale: feedback === null ? 1.03 : 1 }}
                  whileTap={{ scale: feedback === null ? 0.97 : 1 }}
                  onClick={() => handleAnswerSubmit(opt)}
                  disabled={feedback !== null}
                  style={{
                    padding: '22px',
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    borderRadius: '22px',
                    border: btnBorder,
                    background: btnBg,
                    color: '#1e293b',
                    cursor: feedback === null ? 'pointer' : 'default',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {opt}
                </motion.button>
              );
            })}
          </div>

          {/* Feedback Message */}
          {feedback === 'correct' && (
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              style={{ color: '#16a34a', fontWeight: 'bold', fontSize: '1.5rem', marginTop: '25px' }}
            >
              🎉 Sehr gut! Richtig!
            </motion.div>
          )}
          {feedback === 'incorrect' && (
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              style={{ color: '#dc2626', fontWeight: 'bold', fontSize: '1.5rem', marginTop: '25px' }}
            >
              ❌ Falsch! Versuche es noch einmal!
            </motion.div>
          )}

          {/* Hint */}
          {currentEx.hint && !showHint && (
            <button
              onClick={() => setShowHint(true)}
              style={{ background: 'none', border: 'none', color: '#94a3b8', textDecoration: 'underline', marginTop: '25px', cursor: 'pointer', fontSize: '0.95rem' }}
            >
              💡 Hinweis anzeigen
            </button>
          )}
          {showHint && currentEx.hint && (
            <div style={{ marginTop: '15px', padding: '12px', background: '#fef3c7', color: '#92400e', borderRadius: '12px', fontSize: '1rem', fontWeight: 600 }}>
              💡 {currentEx.hint.de}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default MultiplicationGameView;
