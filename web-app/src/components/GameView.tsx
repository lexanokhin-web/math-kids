import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import type { GameMode, MathProblem } from '../utils/gameLogic';
import {
    generateProblem,
    getSymbol,
    isVertical
} from '../utils/gameLogic';
import {
    loadProgress,
    saveProgress,
    checkAchievements,
} from '../utils/progressManager';
import type { Achievement } from '../utils/progressManager';
import { soundManager } from '../utils/soundManager';

const GameView = () => {
    const { mode } = useParams<{ mode: string }>();
    const navigate = useNavigate();
    const gameMode = (mode as GameMode) || 'addition';

    const [difficulty] = useState(() => {
        const stored = localStorage.getItem('mathkids_difficulty');
        return stored ? parseInt(stored) : 10;
    });

    const [problem, setProblem] = useState<MathProblem>(() =>
        generateProblem(gameMode, difficulty)
    );
    const [score, setScore] = useState(0);
    const [showFeedback, setShowFeedback] = useState<'correct' | 'incorrect' | null>(null);
    const [showAchievement, setShowAchievement] = useState<Achievement | null>(null);

    const nextProblem = useCallback(() => {
        setProblem(generateProblem(gameMode, difficulty));
    }, [gameMode, difficulty]);

    const handleAnswer = (answer: number) => {
        soundManager.playClick();

        if (answer === problem.correctAnswer) {
            soundManager.playCorrect();
            setShowFeedback('correct');
            setScore(s => s + 1);

            // Update progress
            const progress = loadProgress();
            progress.totalCorrectAnswers += 1;
            if (score + 1 > progress.highScore) {
                progress.highScore = score + 1;
            }

            const unlockedAchievement = checkAchievements(progress);
            saveProgress(progress);

            if (unlockedAchievement) {
                setTimeout(() => setShowAchievement(unlockedAchievement), 600);
                setTimeout(() => setShowAchievement(null), 3000);
            }
        } else {
            soundManager.playIncorrect();
            setShowFeedback('incorrect');
        }

        setTimeout(() => {
            setShowFeedback(null);
            if (answer === problem.correctAnswer) {
                nextProblem();
            }
        }, 500);
    };

    const resetGame = () => {
        setScore(0);
        nextProblem();
    };

    useEffect(() => {
        nextProblem();
    }, [gameMode, nextProblem]);

    return (
        <div className="game-view">
            {/* Header */}
            <div className="game-header">
                <button className="back-button" onClick={() => navigate('/')}>
                    ←
                </button>

                <motion.div
                    className="score-display"
                    animate={{ scale: showFeedback === 'correct' ? 1.2 : 1 }}
                >
                    <span className="star">⭐</span>
                    <span>Score: {score}</span>
                </motion.div>

                <button className="reset-button" onClick={resetGame}>
                    🔄
                </button>
            </div>

            {/* Problem Display */}
            <motion.div
                className="problem-card"
                key={problem.firstNumber + '-' + problem.secondNumber}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 300 }}
            >
                {isVertical(gameMode) ? (
                    <div className="problem-vertical">
                        <span>{problem.firstNumber}</span>
                        <div className="operator-row">
                            <span>{getSymbol(gameMode)}</span>
                            <span>{problem.secondNumber}</span>
                        </div>
                        <div className="divider" />
                        <span>?</span>
                    </div>
                ) : (
                    <div className="problem-horizontal">
                        <span>{problem.firstNumber}</span>
                        <span>{getSymbol(gameMode)}</span>
                        <span>{problem.secondNumber}</span>
                        <span>=</span>
                        <span>?</span>
                    </div>
                )}
            </motion.div>

            {/* Answer Buttons */}
            <div className="answers-grid">
                {problem.options.map((option, index) => (
                    <motion.button
                        key={option + '-' + index}
                        className="answer-button"
                        onClick={() => handleAnswer(option)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {option}
                    </motion.button>
                ))}
            </div>

            {/* Feedback Overlay */}
            <AnimatePresence>
                {showFeedback && (
                    <motion.div
                        className="feedback-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="feedback-content"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                        >
                            {showFeedback === 'correct' ? '✅' : '❌'}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Achievement Toast */}
            <AnimatePresence>
                {showAchievement && (
                    <motion.div
                        className="achievement-toast"
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                    >
                        <span className="trophy">🏆</span>
                        <div className="text">
                            <h4>Achievement Unlocked!</h4>
                            <p>{showAchievement.title}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default GameView;
