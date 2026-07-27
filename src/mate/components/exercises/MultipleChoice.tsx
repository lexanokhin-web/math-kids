import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { MultipleChoiceExercise } from '../../data/types';
import { useSpeech } from '../../hooks/useSpeech';
import { useLocalization, translate } from '../../hooks/useLocalization';
import SpeakButton from '../ui/SpeakButton';

interface Props {
  exercise: MultipleChoiceExercise;
  onAnswer: (correct: boolean) => void;
}

export default function MultipleChoice({ exercise, onAnswer }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const { speak, autoSpeak } = useSpeech();
  const { lang } = useLocalization();

  useEffect(() => {
    if (autoSpeak) speak(translate(exercise.question, lang));
  }, [exercise.id, autoSpeak, speak, exercise.question, lang]);

  const handleSelect = (index: number) => {
    if (showResult) return;
    setSelected(index);
    setShowResult(true);
    const correct = index === exercise.correctIndex;

    setTimeout(() => {
      onAnswer(correct);
      setSelected(null);
      setShowResult(false);
    }, 1200);
  };

  return (
    <div className="exercise-mc">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <h2 className="exercise-mc__question">{translate(exercise.question, lang)}</h2>
        <SpeakButton onClick={() => speak(translate(exercise.question, lang))} size="sm" />
      </div>

      <div className="exercise-mc__options">
        <AnimatePresence>
          {exercise.options.map((opt, i) => {
            let cls = 'exercise-mc__option';
            if (showResult && i === exercise.correctIndex) cls += ' exercise-mc__option--correct';
            else if (showResult && i === selected && i !== exercise.correctIndex) cls += ' exercise-mc__option--wrong';
            else if (selected === i) cls += ' exercise-mc__option--selected';

            return (
              <motion.button
                key={i}
                className={cls}
                onClick={() => handleSelect(i)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08, type: 'spring', stiffness: 300 }}
                whileHover={!showResult ? { scale: 1.02 } : {}}
                whileTap={!showResult ? { scale: 0.97 } : {}}
              >
                <span className="exercise-mc__option-letter">
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="exercise-mc__option-text">{translate(opt, lang)}</span>
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>

      {showResult && selected !== null && selected !== exercise.correctIndex && exercise.hint && (
        <motion.div
          className="exercise-mc__hint"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          💡 {translate(exercise.hint, lang)}
        </motion.div>
      )}

      <style>{`
        .exercise-mc {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2.5rem;
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
        .exercise-mc__question {
          font-size: var(--fs-2xl);
          font-weight: 800;
          text-align: center;
          line-height: 1.3;
          color: var(--text-primary);
          background: var(--accent-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .exercise-mc__options {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
          width: 100%;
        }
        .exercise-mc__option {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          width: 100%;
          padding: 1.5rem 2rem;
          background: var(--bg-card);
          border: 3px solid var(--border-color);
          border-radius: var(--radius-lg);
          font-size: var(--fs-lg);
          font-weight: 700;
          color: var(--text-primary);
          text-align: left;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          box-shadow: var(--shadow-sm);
        }
        .exercise-mc__option:hover {
          border-color: var(--accent-primary);
          background: var(--bg-card-hover);
          transform: translateY(-4px);
          box-shadow: var(--shadow-md);
        }
        .exercise-mc__option--selected {
          border-color: var(--accent-primary);
          background: var(--bg-card-hover);
          box-shadow: var(--shadow-glow);
        }
        .exercise-mc__option--correct {
          border-color: var(--accent-success);
          background: rgba(74, 222, 128, 0.15);
          transform: scale(1.05);
          box-shadow: 0 0 20px rgba(74, 222, 128, 0.4);
        }
        .exercise-mc__option--wrong {
          border-color: var(--accent-danger);
          background: rgba(248, 113, 113, 0.15);
          animation: shake 0.4s var(--ease-smooth);
        }
        .exercise-mc__option-letter {
          width: 48px;
          height: 48px;
          border-radius: var(--radius-md);
          background: var(--accent-gradient);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: var(--fs-lg);
          flex-shrink: 0;
          box-shadow: var(--shadow-sm);
        }
        .exercise-mc__hint {
          padding: 1.25rem;
          background: rgba(251, 191, 36, 0.15);
          border: 2px dashed var(--accent-warning);
          border-radius: var(--radius-md);
          font-size: var(--fs-md);
          font-weight: 600;
          color: var(--text-secondary);
          width: 100%;
          text-align: center;
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-10px) rotate(-1deg); }
          40% { transform: translateX(10px) rotate(1deg); }
          60% { transform: translateX(-7px) rotate(-0.5deg); }
          80% { transform: translateX(7px) rotate(0.5deg); }
        }
        @media (max-width: 640px) {
          .exercise-mc__options {
            grid-template-columns: 1fr;
          }
          .exercise-mc__question {
            font-size: var(--fs-xl);
          }
        }
      `}</style>
    </div>
  );
}
