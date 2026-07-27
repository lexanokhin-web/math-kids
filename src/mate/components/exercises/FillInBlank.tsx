import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { FillBlankExercise } from '../../data/types';
import { useSpeech } from '../../hooks/useSpeech';
import SpeakButton from '../ui/SpeakButton';
import { useLocalization, translate } from '../../hooks/useLocalization';

interface Props {
  exercise: FillBlankExercise;
  onAnswer: (correct: boolean) => void;
}

export default function FillInBlank({ exercise, onAnswer }: Props) {
  const [value, setValue] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { speak, autoSpeak } = useSpeech();
  const { t, lang } = useLocalization();

  useEffect(() => {
    inputRef.current?.focus();
    const q = translate(exercise.question, lang);
    const tmpl = translate(exercise.template, lang).replace('___', lang === 'de' ? 'was?' : 'что?');
    if (autoSpeak) speak(q + '. ' + tmpl);
  }, [exercise.id, autoSpeak, speak, exercise.question, exercise.template, lang]);

  const handleSubmit = () => {
    if (!value.trim() || showResult) return;
    const translatedAnswer = translate(exercise.correctAnswer, lang);
    const correct = value.trim().toLowerCase() === translatedAnswer.toLowerCase();
    setIsCorrect(correct);
    setShowResult(true);

    setTimeout(() => {
      onAnswer(correct);
      setValue('');
      setShowResult(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSubmit();
  };

  // Render template with blank highlighted
  const parts = translate(exercise.template, lang).split('___');

  return (
    <div className="exercise-fb">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <h2 className="exercise-fb__question">{translate(exercise.question, lang)}</h2>
        <SpeakButton onClick={() => speak(translate(exercise.question, lang) + '. ' + translate(exercise.template, lang).replace('___', lang === 'de' ? 'was?' : 'что?'))} size="sm" />
      </div>

      <div className="exercise-fb__template">
        {parts.map((part, i) => (
          <span key={i}>
            <span className="exercise-fb__text">{part}</span>
            {i < parts.length - 1 && (
              <span className={`exercise-fb__blank ${showResult ? (isCorrect ? 'exercise-fb__blank--correct' : 'exercise-fb__blank--wrong') : ''}`}>
                {showResult ? (isCorrect ? value : translate(exercise.correctAnswer, lang)) : (
                  <input
                    ref={i === 0 ? inputRef : undefined}
                    className="exercise-fb__input"
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="?"
                    autoComplete="off"
                  />
                )}
              </span>
            )}
          </span>
        ))}
      </div>

      {!showResult && (
        <motion.button
          className="exercise-fb__submit"
          onClick={handleSubmit}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={!value.trim()}
        >
          {t('check')}
        </motion.button>
      )}

      {showResult && !isCorrect && exercise.hint && (
        <motion.div
          className="exercise-fb__hint"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          💡 {translate(exercise.hint, lang)}
        </motion.div>
      )}

      <style>{`
        .exercise-fb {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3rem;
          width: 100%;
          max-width: 800px;
          margin: 0 auto;
          padding: 2.5rem;
          background: var(--bg-overlay);
          backdrop-filter: blur(12px);
          border-radius: var(--radius-xl);
          border: 2px solid var(--border-color);
          box-shadow: var(--shadow-lg);
        }
        .exercise-fb__question {
          font-size: var(--fs-2xl);
          font-weight: 800;
          text-align: center;
          color: var(--text-primary);
          background: var(--accent-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .exercise-fb__template {
          font-size: var(--fs-3xl);
          font-weight: 800;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.75rem;
          color: var(--text-primary);
        }
        .exercise-fb__blank {
          display: inline-flex;
          align-items: center;
          min-width: 120px;
          padding: 8px 20px;
          border-bottom: 5px solid var(--accent-primary);
          font-size: var(--fs-3xl);
          font-weight: 900;
          text-align: center;
          justify-content: center;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          background: rgba(255, 255, 255, 0.3);
          border-radius: var(--radius-sm) var(--radius-sm) 0 0;
        }
        .exercise-fb__blank--correct {
          border-color: var(--accent-success);
          color: var(--accent-success);
          background: rgba(74, 222, 128, 0.1);
        }
        .exercise-fb__blank--wrong {
          border-color: var(--accent-danger);
          color: var(--accent-danger);
          background: rgba(248, 113, 113, 0.1);
          animation: shake 0.4s var(--ease-smooth);
        }
        .exercise-fb__input {
          background: none;
          border: none;
          outline: none;
          font: inherit;
          color: var(--accent-primary);
          text-align: center;
          width: 100%;
          caret-color: var(--accent-primary);
        }
        .exercise-fb__submit {
          padding: 1.25rem 3.5rem;
          background: #ec4899 !important; /* Fallback for older browsers */
          background: linear-gradient(135deg, #f472b6 0%, #ec4899 100%) !important;
          color: white !important;
          border-radius: var(--radius-full);
          font-weight: 800;
          font-size: var(--fs-lg);
          box-shadow: 0 4px 15px rgba(236, 72, 153, 0.4);
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          border: 2px solid rgba(255, 255, 255, 0.3);
          cursor: pointer;
        }
        .exercise-fb__submit:hover:not(:disabled) {
          transform: translateY(-4px) scale(1.02);
          background: #7c3aed !important; /* Fallback */
          background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%) !important;
          box-shadow: 0 8px 25px rgba(124, 58, 237, 0.5);
          border-color: rgba(255, 255, 255, 0.5);
        }
        .exercise-fb__submit:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          filter: none; /* Removed grayscale to keep color visible */
          background: #f472b6 !important;
        }
        .exercise-fb__hint {
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
          20% { transform: translateX(-10px); }
          40% { transform: translateX(10px); }
          60% { transform: translateX(-7px); }
          80% { transform: translateX(7px); }
        }
        @media (max-width: 640px) {
          .exercise-fb {
            padding: 1.5rem;
            gap: 2rem;
          }
          .exercise-fb__template {
            font-size: var(--fs-2xl);
          }
          .exercise-fb__blank {
            font-size: var(--fs-2xl);
            min-width: 100px;
          }
        }
      `}</style>
    </div>
  );
}
