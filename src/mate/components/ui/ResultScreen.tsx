import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, ArrowLeft, Trophy } from 'lucide-react';
import { useLocalization } from '../../hooks/useLocalization';

interface Props {
    score: number;
    correctCount: number;
    totalExercises: number;
    time: number;
    stars: number;
    onRetry: () => void;
    onBack: () => void;
}

export default function ResultScreen({ score, correctCount, totalExercises, time, stars, onRetry, onBack }: Props) {
    const accuracy = Math.round((correctCount / totalExercises) * 100);
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const { t } = useLocalization();

    const getMessage = () => {
        if (stars === 3) return { text: t('wellDone'), sub: t('perfectResult') };
        if (stars === 2) return { text: t('awesome'), sub: t('almostPerfect') };
        if (stars === 1) return { text: t('goodJob'), sub: t('canBeBetter') };
        return { text: t('keepTrying'), sub: t('tryAgain') };
    };

    const msg = getMessage();

    const confetti = useMemo(() => {
        if (stars < 3) return [];
        /* eslint-disable react-hooks/purity */
        return [...Array(30)].map((_, i) => ({
            left: `${Math.random() * 100}%`,
            delay: `${Math.random() * 2}s`,
            duration: `${2 + Math.random() * 3}s`,
            color: ['#ff6b9d', '#c084fc', '#67e8f9', '#4ade80', '#fbbf24'][i % 5]
        }));
        /* eslint-enable react-hooks/purity */
    }, [stars]);

    return (
        <motion.div
            className="result-screen"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        >
            <div className="result-screen__card glass">
                <motion.div
                    className="result-screen__stars"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: 'spring', stiffness: 260 }}
                >
                    {[1, 2, 3].map((s) => (
                        <motion.span
                            key={s}
                            className={`result-screen__star ${s <= stars ? 'result-screen__star--active' : ''}`}
                            initial={{ rotateY: 180, opacity: 0 }}
                            animate={{ rotateY: 0, opacity: 1 }}
                            transition={{ delay: 0.4 + s * 0.2 }}
                        >
                            {s <= stars ? '⭐' : '☆'}
                        </motion.span>
                    ))}
                </motion.div>

                <h1 className="result-screen__title">{msg.text}</h1>
                <p className="result-screen__subtitle">{msg.sub}</p>

                <div className="result-screen__stats">
                    <div className="result-screen__stat">
                        <Trophy size={20} />
                        <div>
                            <span className="result-screen__stat-value">{score}</span>
                            <span className="result-screen__stat-label">{t('points')}</span>
                        </div>
                    </div>
                    <div className="result-screen__stat">
                        <span className="result-screen__stat-icon">✅</span>
                        <div>
                            <span className="result-screen__stat-value">{correctCount}/{totalExercises}</span>
                            <span className="result-screen__stat-label">{t('correct')}</span>
                        </div>
                    </div>
                    <div className="result-screen__stat">
                        <span className="result-screen__stat-icon">🎯</span>
                        <div>
                            <span className="result-screen__stat-value">{accuracy}%</span>
                            <span className="result-screen__stat-label">{t('accuracy')}</span>
                        </div>
                    </div>
                    <div className="result-screen__stat">
                        <span className="result-screen__stat-icon">⏱️</span>
                        <div>
                            <span className="result-screen__stat-value">{minutes}:{seconds.toString().padStart(2, '0')}</span>
                            <span className="result-screen__stat-label">{t('time')}</span>
                        </div>
                    </div>
                </div>

                <div className="result-screen__actions">
                    <motion.button
                        className="result-screen__btn result-screen__btn--retry"
                        onClick={onRetry}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <RotateCcw size={18} />
                        {t('retry')}
                    </motion.button>
                    <motion.button
                        className="result-screen__btn result-screen__btn--back"
                        onClick={onBack}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <ArrowLeft size={18} />
                        {t('toTopics')}
                    </motion.button>
                </div>
            </div>

            {/* Confetti for 3 stars */}
            {stars === 3 && (
                <div className="result-screen__confetti">
                    {confetti.map((item, i) => (
                        <div
                            key={i}
                            className="confetti-piece"
                            style={{
                                left: item.left,
                                animationDelay: item.delay,
                                animationDuration: item.duration,
                                background: item.color,
                            }}
                        />
                    ))}
                </div>
            )}

            <style>{`
        .result-screen {
          min-height: calc(100vh - var(--navbar-height));
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          position: relative;
          overflow: hidden;
        }
        .result-screen__card {
          max-width: 440px;
          width: 100%;
          padding: 2.5rem 2rem;
          border-radius: var(--radius-xl);
          text-align: center;
          position: relative;
          z-index: 2;
        }
        .result-screen__stars {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }
        .result-screen__star {
          font-size: 3rem;
          filter: grayscale(1);
          transition: filter 0.3s;
        }
        .result-screen__star--active {
          filter: none;
        }
        .result-screen__title {
          font-size: var(--fs-2xl);
          font-weight: 800;
          margin-bottom: 0.25rem;
        }
        .result-screen__subtitle {
          font-size: var(--fs-md);
          color: var(--text-secondary);
          margin-bottom: 2rem;
        }
        .result-screen__stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 2rem;
        }
        .result-screen__stat {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem;
          background: var(--bg-card);
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
        }
        .result-screen__stat-icon {
          font-size: 1.2rem;
        }
        .result-screen__stat div {
          display: flex;
          flex-direction: column;
          text-align: left;
        }
        .result-screen__stat-value {
          font-size: var(--fs-lg);
          font-weight: 800;
        }
        .result-screen__stat-label {
          font-size: var(--fs-xs);
          color: var(--text-muted);
        }
        .result-screen__actions {
          display: flex;
          gap: 0.75rem;
        }
        .result-screen__btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.875rem;
          border-radius: var(--radius-md);
          font-weight: 700;
          font-size: var(--fs-md);
          transition: all 0.2s;
        }
        .result-screen__btn--retry {
          background: var(--accent-gradient);
          color: var(--text-on-accent);
        }
        .result-screen__btn--back {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
        }
        /* Confetti */
        .result-screen__confetti {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 1;
        }
        .confetti-piece {
          position: absolute;
          width: 8px;
          height: 16px;
          border-radius: 2px;
          top: -20px;
          animation: confetti-fall linear forwards;
        }
        @keyframes confetti-fall {
          0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
        </motion.div>
    );
}
