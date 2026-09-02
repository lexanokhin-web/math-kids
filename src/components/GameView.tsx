import { useState, useCallback, useEffect } from 'react';
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

    const isInitialManual = gameMode.startsWith('manual');

    const [inputMode, setInputMode] = useState<'choice' | 'manual'>(() => {
        if (isInitialManual) return 'manual';
        return (localStorage.getItem('mathkids_input_mode') as 'choice' | 'manual') || 'choice';
    });

    const [userAnswer, setUserAnswer] = useState<string>('');

    const [difficulty] = useState(() => {
        const stored = localStorage.getItem('mathkids_difficulty');
        return stored ? parseInt(stored, 10) : 10;
    });

    const [problem, setProblem] = useState<MathProblem>(() =>
        generateProblem(gameMode, difficulty)
    );
    const [score, setScore] = useState(0);
    const [showFeedback, setShowFeedback] = useState<'correct' | 'incorrect' | null>(null);
    const [showAchievement, setShowAchievement] = useState<Achievement | null>(null);
    const [prevGameMode, setPrevGameMode] = useState(gameMode);

    // Reset game state when mode changes (Standard React pattern for prop-based resets)
    if (gameMode !== prevGameMode) {
        setPrevGameMode(gameMode);
        setProblem(generateProblem(gameMode, difficulty));
        setScore(0);
        setUserAnswer('');
        if (isInitialManual) {
            setInputMode('manual');
        }
    }

    const nextProblem = useCallback(() => {
        setProblem(generateProblem(gameMode, difficulty));
        setUserAnswer('');
    }, [gameMode, difficulty]);

    const handleAnswer = useCallback((answer: number) => {
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

            setTimeout(() => {
                setShowFeedback(null);
                nextProblem();
            }, 500);
        } else {
            soundManager.playIncorrect();
            setShowFeedback('incorrect');

            setTimeout(() => {
                setShowFeedback(null);
                setUserAnswer('');
            }, 650);
        }
    }, [problem.correctAnswer, score, nextProblem]);

    const handleNumpadDigit = useCallback((digit: string) => {
        soundManager.playClick();
        setUserAnswer(prev => {
            if (prev.length >= 4) return prev;
            return prev + digit;
        });
    }, []);

    const handleNumpadBackspace = useCallback(() => {
        soundManager.playClick();
        setUserAnswer(prev => prev.slice(0, -1));
    }, []);

    const handleNumpadSubmit = useCallback(() => {
        if (!userAnswer) return;
        const answer = parseInt(userAnswer, 10);
        if (isNaN(answer)) return;
        handleAnswer(answer);
    }, [userAnswer, handleAnswer]);

    // Keyboard support for desktop / tablet
    useEffect(() => {
        if (inputMode !== 'manual') return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

            if (e.key >= '0' && e.key <= '9') {
                e.preventDefault();
                handleNumpadDigit(e.key);
            } else if (e.key === 'Backspace') {
                e.preventDefault();
                handleNumpadBackspace();
            } else if (e.key === 'Enter') {
                e.preventDefault();
                handleNumpadSubmit();
            } else if (e.key === 'Escape' || e.key === 'c' || e.key === 'C') {
                e.preventDefault();
                setUserAnswer('');
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [inputMode, handleNumpadDigit, handleNumpadBackspace, handleNumpadSubmit]);

    const handleModeSwitch = (newMode: 'choice' | 'manual') => {
        setInputMode(newMode);
        setUserAnswer('');
        localStorage.setItem('mathkids_input_mode', newMode);
    };

    const resetGame = () => {
        setScore(0);
        setUserAnswer('');
        nextProblem();
    };

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

                {/* In-game Input Mode Switcher */}
                <div className="header-mode-toggle" title="Eingabemodus">
                    <button
                        type="button"
                        className={`toggle-option ${inputMode === 'choice' ? 'active' : ''}`}
                        onClick={() => handleModeSwitch('choice')}
                        aria-label="4 Optionen"
                    >
                        🔲 4
                    </button>
                    <button
                        type="button"
                        className={`toggle-option ${inputMode === 'manual' ? 'active' : ''}`}
                        onClick={() => handleModeSwitch('manual')}
                        aria-label="Selber tippen"
                    >
                        ✍️ Tippen
                    </button>
                </div>

                <button className="reset-button" onClick={resetGame} title="Neu starten">
                    🔄
                </button>
            </div>

            {/* Quick Operation Switcher for Typing Mode (➕ Plus | ➖ Minus | 🔀 Mix) */}
            {inputMode === 'manual' && (
                <div className="math-operation-tabs">
                    <button
                        type="button"
                        className={`operation-tab-btn ${gameMode === 'manualAddition' ? 'active plus' : ''}`}
                        onClick={() => navigate('/game/manualAddition')}
                    >
                        ➕ Plus
                    </button>
                    <button
                        type="button"
                        className={`operation-tab-btn ${gameMode === 'manualSubtraction' ? 'active minus' : ''}`}
                        onClick={() => navigate('/game/manualSubtraction')}
                    >
                        ➖ Minus
                    </button>
                    <button
                        type="button"
                        className={`operation-tab-btn ${gameMode === 'manual' ? 'active mix' : ''}`}
                        onClick={() => navigate('/game/manual')}
                    >
                        🔀 Mix
                    </button>
                </div>
            )}

            {/* Problem Display */}
            <motion.div
                className="problem-card"
                key={problem.firstNumber + '-' + problem.secondNumber + '-' + (problem.operation || '')}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 300 }}
            >
                {isVertical(gameMode) ? (
                    <div className="problem-vertical">
                        <span>{problem.firstNumber}</span>
                        <div className="operator-row">
                            <span>{getSymbol(gameMode, problem)}</span>
                            <span>{problem.secondNumber}</span>
                        </div>
                        <div className="divider" />
                        <span className={`answer-slot ${inputMode === 'manual' ? 'manual-slot' : ''} ${showFeedback === 'incorrect' ? 'error-shake' : ''}`}>
                            {inputMode === 'manual' ? (userAnswer || '?') : '?'}
                        </span>
                    </div>
                ) : (
                    <div className="problem-horizontal">
                        <span>{problem.firstNumber}</span>
                        <span>{getSymbol(gameMode, problem)}</span>
                        <span>{problem.secondNumber}</span>
                        <span>=</span>
                        <span className={`answer-slot ${inputMode === 'manual' ? 'manual-slot' : ''} ${showFeedback === 'incorrect' ? 'error-shake' : ''}`}>
                            {inputMode === 'manual' ? (userAnswer || '?') : '?'}
                        </span>
                    </div>
                )}
            </motion.div>

            {/* Choice Buttons or Kid-Friendly Numpad */}
            {inputMode === 'choice' ? (
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
            ) : (
                <div className="manual-numpad-container">
                    <div className="numpad-grid">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                            <motion.button
                                key={num}
                                type="button"
                                className="numpad-btn"
                                onClick={() => handleNumpadDigit(String(num))}
                                whileTap={{ scale: 0.92 }}
                                whileHover={{ scale: 1.05 }}
                            >
                                {num}
                            </motion.button>
                        ))}
                        <motion.button
                            type="button"
                            className="numpad-btn numpad-action numpad-delete"
                            onClick={handleNumpadBackspace}
                            whileTap={{ scale: 0.92 }}
                            whileHover={{ scale: 1.05 }}
                            aria-label="Löschen"
                            title="Löschen (Backspace)"
                        >
                            ⌫
                        </motion.button>
                        <motion.button
                            type="button"
                            className="numpad-btn"
                            onClick={() => handleNumpadDigit('0')}
                            whileTap={{ scale: 0.92 }}
                            whileHover={{ scale: 1.05 }}
                        >
                            0
                        </motion.button>
                        <motion.button
                            type="button"
                            className={`numpad-btn numpad-action numpad-submit ${userAnswer ? 'ready' : ''}`}
                            onClick={handleNumpadSubmit}
                            disabled={!userAnswer}
                            whileTap={{ scale: 0.92 }}
                            whileHover={{ scale: 1.05 }}
                            aria-label="Bestätigen"
                            title="Bestätigen (Enter)"
                        >
                            ✔️
                        </motion.button>
                    </div>
                </div>
            )}

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
