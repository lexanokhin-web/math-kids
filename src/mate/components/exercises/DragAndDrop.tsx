import { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { DragDropExercise } from '../../data/types';
import { useSpeech } from '../../hooks/useSpeech';
import SpeakButton from '../ui/SpeakButton';
import { useLocalization, translate } from '../../hooks/useLocalization';

interface Props {
  exercise: DragDropExercise;
  onAnswer: (correct: boolean) => void;
}

export default function DragAndDrop({ exercise, onAnswer }: Props) {
  const [items, setItems] = useState(() => {
    const shuffled = [...exercise.items];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  });
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const { speak, autoSpeak } = useSpeech();
  const { lang } = useLocalization();

  useEffect(() => {
    if (autoSpeak) speak(translate(exercise.question, lang));
  }, [exercise.id, autoSpeak, speak, exercise.question, lang]);

  const handleDragStart = (index: number) => {
    setDragIdx(index);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = useCallback((targetIdx: number) => {
    if (dragIdx === null || dragIdx === targetIdx) return;
    const newItems = [...items];
    const [removed] = newItems.splice(dragIdx, 1);
    newItems.splice(targetIdx, 0, removed);
    setItems(newItems);
    setDragIdx(null);
  }, [dragIdx, items]);

  const handleCheck = () => {
    setShowResult(true);
    const correct = items.every((item, i) => item === exercise.correctOrder[i]);
    setTimeout(() => {
      onAnswer(correct);
      if (!correct) {
        setShowResult(false);
      }
    }, 1500);
  };

  const handleTapSwap = (index: number) => {
    if (dragIdx === null) {
      setDragIdx(index);
    } else {
      const newItems = [...items];
      [newItems[dragIdx], newItems[index]] = [newItems[index], newItems[dragIdx]];
      setItems(newItems);
      setDragIdx(null);
    }
  };

  return (
    <div className="exercise-dd">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <h2 className="exercise-dd__question">{translate(exercise.question, lang)}</h2>
        <SpeakButton onClick={() => speak(translate(exercise.question, lang))} size="sm" />
      </div>
      <p className="exercise-dd__instruction">
        {lang === 'ru' ? 'Расставь элементы в правильном порядке (перетаскивай или кликай)' : 'Ordne die Elemente in der richtigen Reihenfolge an (ziehen oder klicken)'}
      </p>

      <div className="exercise-dd__list">
        {items.map((item, i) => {
          let cls = 'exercise-dd__item';
          if (dragIdx === i) cls += ' exercise-dd__item--dragging';
          if (showResult) {
            cls += item === exercise.correctOrder[i]
              ? ' exercise-dd__item--correct'
              : ' exercise-dd__item--wrong';
          }

          return (
            <motion.div
              key={`${item}-${i}`}
              className={cls}
              draggable
              onDragStart={() => handleDragStart(i)}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(i)}
              onClick={() => handleTapSwap(i)}
              layout
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              <span className="exercise-dd__num">{i + 1}</span>
              <span>{translate(item, lang)}</span>
            </motion.div>
          );
        })}
      </div>

      {!showResult && (
        <motion.button
          className="exercise-dd__check"
          onClick={handleCheck}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {lang === 'ru' ? 'Проверить порядок ✓' : 'Reihenfolge prüfen ✓'}
        </motion.button>
      )}

      <style>{`
        .exercise-dd {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
          width: 100%;
          max-width: 500px;
          margin: 0 auto;
        }
        .exercise-dd__question {
          font-size: var(--fs-xl);
          font-weight: 700;
          text-align: center;
        }
        .exercise-dd__instruction {
          font-size: var(--fs-sm);
          color: var(--text-muted);
          text-align: center;
        }
        .exercise-dd__list {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .exercise-dd__item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.875rem 1rem;
          background: var(--bg-card);
          border: 2px solid var(--border-color);
          border-radius: var(--radius-md);
          cursor: grab;
          font-weight: 600;
          transition: border-color 0.2s, background 0.2s;
          user-select: none;
        }
        .exercise-dd__item:hover {
          border-color: var(--accent-primary);
        }
        .exercise-dd__item--dragging {
          opacity: 0.5;
          border-style: dashed;
        }
        .exercise-dd__item--correct {
          border-color: var(--accent-success);
          background: rgba(74, 222, 128, 0.1);
        }
        .exercise-dd__item--wrong {
          border-color: var(--accent-danger);
          background: rgba(248, 113, 113, 0.1);
        }
        .exercise-dd__num {
          width: 28px;
          height: 28px;
          border-radius: var(--radius-sm);
          background: var(--bg-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: var(--fs-sm);
          flex-shrink: 0;
        }
        .exercise-dd__check {
          padding: 0.875rem 2.5rem;
          background: #ec4899 !important;
          background: linear-gradient(135deg, #f472b6 0%, #ec4899 100%) !important;
          color: white !important;
          border-radius: var(--radius-full);
          font-weight: 800;
          font-size: var(--fs-md);
          box-shadow: 0 4px 15px rgba(236, 72, 153, 0.4);
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          border: 2px solid rgba(255, 255, 255, 0.3);
          cursor: pointer;
        }
        .exercise-dd__check:hover {
          transform: translateY(-4px) scale(1.02);
          background: #7c3aed !important;
          background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%) !important;
          box-shadow: 0 8px 25px rgba(124, 58, 237, 0.5);
          border-color: rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </div>
  );
}
