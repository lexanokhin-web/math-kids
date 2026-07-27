import { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { MatchPairsExercise } from '../../data/types';
import { useSpeech } from '../../hooks/useSpeech';
import SpeakButton from '../ui/SpeakButton';
import { useLocalization, translate } from '../../hooks/useLocalization';

interface Props {
  exercise: MatchPairsExercise;
  onAnswer: (correct: boolean) => void;
}

export default function MatchPairs({ exercise, onAnswer }: Props) {
  const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
  const [matched, setMatched] = useState<Set<number>>(new Set());
  const [wrongPair, setWrongPair] = useState<[number, number] | null>(null);
  const [shuffledRight] = useState(() => {
    const indices = exercise.pairs.map((_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    return indices;
  });
  const { speak, autoSpeak } = useSpeech();
  const { t, lang } = useLocalization();

  useEffect(() => {
    if (autoSpeak) speak(translate(exercise.question, lang));
  }, [exercise.id, autoSpeak, speak, exercise.question, lang]);

  const handleLeftClick = useCallback((index: number) => {
    if (matched.has(index)) return;
    setSelectedLeft(index);
    setWrongPair(null);
  }, [matched]);

  const handleRightClick = useCallback((rightOriginalIndex: number) => {
    if (selectedLeft === null || matched.has(rightOriginalIndex)) return;

    if (selectedLeft === rightOriginalIndex) {
      // Correct match
      const newMatched = new Set(matched);
      newMatched.add(rightOriginalIndex);
      setMatched(newMatched);
      setSelectedLeft(null);

      if (newMatched.size === exercise.pairs.length) {
        setTimeout(() => onAnswer(true), 600);
      }
    } else {
      // Wrong match
      setWrongPair([selectedLeft, rightOriginalIndex]);
      setTimeout(() => {
        setWrongPair(null);
        setSelectedLeft(null);
      }, 800);
    }
  }, [selectedLeft, matched, exercise.pairs.length, onAnswer]);

  return (
    <div className="exercise-mp">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <h2 className="exercise-mp__question">{translate(exercise.question, lang)}</h2>
        <SpeakButton onClick={() => speak(translate(exercise.question, lang))} size="sm" />
      </div>

      <div className="exercise-mp__grid">
        <div className="exercise-mp__column">
          {exercise.pairs.map((pair, i) => (
            <motion.button
              key={`l-${i}`}
              className={`exercise-mp__item exercise-mp__item--left ${selectedLeft === i ? 'exercise-mp__item--selected' : ''
                } ${matched.has(i) ? 'exercise-mp__item--matched' : ''} ${wrongPair && wrongPair[0] === i ? 'exercise-mp__item--wrong' : ''
                }`}
              onClick={() => handleLeftClick(i)}
              whileHover={!matched.has(i) ? { scale: 1.03 } : {}}
            >
              {translate(pair.left, lang)}
            </motion.button>
          ))}
        </div>

        <div className="exercise-mp__column">
          {shuffledRight.map((origIdx) => (
            <motion.button
              key={`r-${origIdx}`}
              className={`exercise-mp__item exercise-mp__item--right ${matched.has(origIdx) ? 'exercise-mp__item--matched' : ''
                } ${wrongPair && wrongPair[1] === origIdx ? 'exercise-mp__item--wrong' : ''}`}
              onClick={() => handleRightClick(origIdx)}
              whileHover={!matched.has(origIdx) ? { scale: 1.03 } : {}}
            >
              {translate(exercise.pairs[origIdx].right, lang)}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="exercise-mp__counter">
        {matched.size} / {exercise.pairs.length} {t('pairs')}
      </div>

      <style>{`
        .exercise-mp {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
          width: 100%;
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem;
          background: var(--bg-overlay);
          backdrop-filter: blur(12px);
          border-radius: var(--radius-xl);
          border: 2px solid var(--border-color);
          box-shadow: var(--shadow-lg);
        }
        .exercise-mp__question {
          font-size: var(--fs-2xl);
          font-weight: 800;
          text-align: center;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }
        .exercise-mp__grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          width: 100%;
          padding: 1rem;
        }
        .exercise-mp__column {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .exercise-mp__item {
          padding: 1.25rem 1.5rem;
          border-radius: var(--radius-lg);
          border: 3px solid var(--border-color);
          background: var(--bg-card);
          font-size: var(--fs-lg);
          font-weight: 700;
          color: var(--text-primary);
          text-align: center;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          box-shadow: var(--shadow-sm);
        }
        .exercise-mp__item:hover:not(.exercise-mp__item--matched) {
          border-color: var(--accent-primary);
          transform: translateY(-4px) scale(1.02);
          box-shadow: var(--shadow-md);
        }
        .exercise-mp__item--selected {
          border-color: var(--accent-primary);
          background: rgba(124, 58, 237, 0.15);
          box-shadow: var(--shadow-glow);
          transform: scale(1.05);
        }
        .exercise-mp__item--matched {
          border-color: var(--accent-success);
          background: rgba(74, 222, 128, 0.2);
          opacity: 0.7;
          pointer-events: none;
          transform: scale(0.95);
          filter: grayscale(0.2);
        }
        .exercise-mp__item--wrong {
          border-color: var(--accent-danger);
          background: rgba(248, 113, 113, 0.2);
          animation: shake 0.4s ease;
        }
        .exercise-mp__counter {
          font-size: var(--fs-md);
          color: var(--text-secondary);
          font-weight: 800;
          background: var(--bg-secondary);
          padding: 0.5rem 1.5rem;
          border-radius: var(--radius-full);
          margin-top: 1rem;
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-8px); }
          50% { transform: translateX(8px); }
          75% { transform: translateX(-4px); }
        }
        @media (max-width: 640px) {
          .exercise-mp__grid { gap: 1rem; padding: 0.5rem; }
          .exercise-mp__item { font-size: var(--fs-md); padding: 1rem; }
        }
      `}</style>
    </div>
  );
}
