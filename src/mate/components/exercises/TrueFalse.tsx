import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { TrueFalseExercise } from '../../data/types';
import { useSpeech } from '../../hooks/useSpeech';
import SpeakButton from '../ui/SpeakButton';
import { useLocalization, translate } from '../../hooks/useLocalization';

interface Props {
  exercise: TrueFalseExercise;
  onAnswer: (correct: boolean) => void;
}

export default function TrueFalse({ exercise, onAnswer }: Props) {
  const [answered, setAnswered] = useState(false);
  const [chosen, setChosen] = useState<boolean | null>(null);
  const { speak, autoSpeak } = useSpeech();
  const { t, lang } = useLocalization();

  useEffect(() => {
    if (autoSpeak) speak(translate(exercise.statement, lang) + '. ' + translate('Правда или ложь?', lang));
  }, [exercise.id, autoSpeak, speak, exercise.statement, lang]);

  const handleChoice = (choice: boolean) => {
    if (answered) return;
    setChosen(choice);
    setAnswered(true);
    const correct = choice === exercise.isTrue;

    setTimeout(() => {
      onAnswer(correct);
      setAnswered(false);
      setChosen(null);
    }, 1200);
  };

  const getButtonClass = (isTrue: boolean) => {
    let cls = 'exercise-tf__btn';
    if (!answered) return cls;
    if (isTrue === exercise.isTrue) cls += ' exercise-tf__btn--correct';
    else if (isTrue === chosen) cls += ' exercise-tf__btn--wrong';
    return cls;
  };

  return (
    <div className="exercise-tf">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <h2 className="exercise-tf__question">{translate(exercise.question, lang)}</h2>
        <SpeakButton onClick={() => speak(translate(exercise.statement, lang) + '. ' + translate('Правда или ложь?', lang))} size="sm" />
      </div>
      <div className="exercise-tf__statement">{translate(exercise.statement, lang)}</div>

      <div className="exercise-tf__buttons">
        <motion.button
          className={getButtonClass(true)}
          onClick={() => handleChoice(true)}
          whileHover={!answered ? { scale: 1.05 } : {}}
          whileTap={!answered ? { scale: 0.95 } : {}}
        >
          ✅ {t('truth')}
        </motion.button>
        <motion.button
          className={getButtonClass(false)}
          onClick={() => handleChoice(false)}
          whileHover={!answered ? { scale: 1.05 } : {}}
          whileTap={!answered ? { scale: 0.95 } : {}}
        >
          ❌ {t('lie')}
        </motion.button>
      </div>

      {answered && chosen !== exercise.isTrue && exercise.hint && (
        <motion.div
          className="exercise-tf__hint"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          💡 {translate(exercise.hint, lang)}
        </motion.div>
      )}

      <style>{`
        .exercise-tf {
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
        .exercise-tf__question {
          font-size: var(--fs-xl);
          font-weight: 700;
          color: var(--text-secondary);
          text-align: center;
        }
        .exercise-tf__statement {
          font-size: var(--fs-3xl);
          font-weight: 900;
          text-align: center;
          padding: 2rem 2.5rem;
          background: var(--bg-card);
          border: 4px solid var(--border-color);
          border-radius: var(--radius-xl);
          width: 100%;
          color: var(--text-primary);
          box-shadow: var(--shadow-md);
        }
        .exercise-tf__buttons {
          display: flex;
          gap: 1.5rem;
          width: 100%;
        }
        .exercise-tf__btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          border-radius: var(--radius-lg);
          font-size: var(--fs-xl);
          font-weight: 800;
          background: var(--bg-card);
          border: 3px solid var(--border-color);
          color: var(--text-primary);
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          box-shadow: var(--shadow-sm);
        }
        .exercise-tf__btn:hover:not(.exercise-tf__btn--correct):not(.exercise-tf__btn--wrong) {
          border-color: var(--accent-primary);
          background: var(--bg-card-hover);
          transform: translateY(-8px);
          box-shadow: var(--shadow-lg);
        }
        .exercise-tf__btn--correct {
          border-color: var(--accent-success);
          background: rgba(74, 222, 128, 0.2);
          transform: scale(1.05);
          color: var(--accent-success);
          box-shadow: 0 0 20px rgba(74, 222, 128, 0.3);
        }
        .exercise-tf__btn--wrong {
          border-color: var(--accent-danger);
          background: rgba(248, 113, 113, 0.2);
          color: var(--accent-danger);
          animation: shake 0.4s var(--ease-smooth);
        }
        .exercise-tf__hint {
          padding: 1.5rem;
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
          .exercise-tf__statement { font-size: var(--fs-xl); }
          .exercise-tf__btn { font-size: var(--fs-lg); }
        }
      `}</style>
    </div>
  );
}
