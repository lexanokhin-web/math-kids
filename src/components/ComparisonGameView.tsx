import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { trackGeneralGame, loadProgress, setGameLevel } from '../utils/progressManager';
import { soundManager } from '../utils/soundManager';
import RewardCelebration, { type Reward } from './RewardCelebration';
import LevelSelectionOverlay from './LevelSelectionOverlay';

interface ComparisonProblem {
    left: number;
    right: number;
    leftLabel: string | number;
    rightLabel: string | number;
}

const ComparisonGameView = () => {
    const navigate = useNavigate();
    const [problem, setProblem] = useState<ComparisonProblem | null>(null);
    const [answer, setAnswer] = useState<'<' | '>' | '=' | null>(null);
    const [result, setResult] = useState<'correct' | 'incorrect' | null>(null);
    const [rounds, setRounds] = useState(1);
    const [reward, setReward] = useState<Reward | null>(null);
    const [showReward, setShowReward] = useState(false);
    
    // Level State
    const [playerProgress, setPlayerProgress] = useState(loadProgress());
    const [level, setLevel] = useState(playerProgress.comparisonLevel || 1);
    const [showLevelPicks, setShowLevelPicks] = useState(false);

    const generateRound = useCallback((currentLevel: number = level) => {
        // Difficulty mapping
        const maxNum = currentLevel === 1 ? 20 : currentLevel === 2 ? 100 : 1000;
        const forceExpression = currentLevel >= 2;
        const expressionChance = currentLevel === 2 ? 0.4 : 0.8;
        
        let lValue, rValue, lExpr, rExpr;
        
        if (forceExpression && Math.random() < expressionChance) {
            // Expression comparison
            const op = Math.random() > 0.5 ? '+' : '-';
            const a = Math.floor(Math.random() * (maxNum / 2)) + 1;
            const b = Math.floor(Math.random() * (maxNum / 2)) + 1;
            lValue = op === '+' ? a + b : Math.abs(a - b);
            lExpr = `${a} ${op} ${b}`;
            
            rValue = Math.floor(Math.random() * maxNum) + 1;
            rExpr = rValue;
        } else {
            // Simple number comparison
            lValue = Math.floor(Math.random() * maxNum) + 1;
            rValue = Math.floor(Math.random() * maxNum) + 1;
            lExpr = lValue;
            rExpr = rValue;
        }

        setProblem({ 
            left: lValue, 
            right: rValue, 
            leftLabel: lExpr, 
            rightLabel: rExpr 
        });
        setAnswer(null);
        setResult(null);
        setShowLevelPicks(false);
    }, [level]);

    const handleSelectLevel = useCallback((l: number) => {
        setLevel(l);
        setRounds(1);
        setShowReward(false);
        
        // Save level to progress
        const newProgress = setGameLevel('comparison', l);
        setPlayerProgress(newProgress);
        
        generateRound(l);
        setShowLevelPicks(false);
    }, [generateRound]);

    useEffect(() => {
        const timer = setTimeout(() => {
            generateRound(level);
        }, 0);
        return () => clearTimeout(timer);
    }, [generateRound, level]);

    const handleCompare = (choice: '<' | '>' | '=') => {
        if (!problem || answer || showReward) return;

        setAnswer(choice);
        const isCorrect = 
            (choice === '<' && problem.left < problem.right) ||
            (choice === '>' && problem.left > problem.right) ||
            (choice === '=' && problem.left === problem.right);

        if (isCorrect) {
            soundManager.playCorrect();
            setResult('correct');
            if (rounds < 10) {
                setTimeout(() => {
                    setRounds(prev => prev + 1);
                    generateRound();
                }, 1000);
            } else {
                const res = trackGeneralGame('comparison', 25, true);
                setReward({
                    sticker: res.unlockedSticker,
                    achievement: res.unlockedAchievement,
                    leveledUp: res.leveledUp,
                    xp: 25
                });
                setShowReward(true);
                setPlayerProgress(res.progress);
            }
        } else {
            soundManager.playIncorrect();
            setResult('incorrect');
            setTimeout(() => {
                setAnswer(null);
                setResult(null);
            }, 1000);
        }
    };

const getDifficultyName = (l: number) => {
    if (l === 1) return 'Einfach';
    if (l === 2) return 'Mittel';
    return 'Schwer';
};

    return (
        <div className="game-view comparison-game">
            <div className="game-header">
                <button className="back-button" onClick={() => navigate('/')}>←</button>
                <button className="level-indicator-btn" onClick={() => setShowLevelPicks(true)}>
                    {getDifficultyName(level)}
                </button>
                <div className="round-counter">Runde {rounds}/10</div>
            </div>

            <AnimatePresence>
                {showLevelPicks && (
                    <LevelSelectionOverlay 
                        gameId="comparison"
                        currentLevel={level}
                        onSelectLevel={handleSelectLevel}
                        onClose={() => problem ? setShowLevelPicks(false) : navigate('/')}
                        icon="🐊"
                        title="Größer oder Kleiner?"
                    />
                )}
            </AnimatePresence>

            {!showLevelPicks && problem && (
                <div className="comp-content">
                    <h2 className="section-header center">Was ist größer?</h2>
                    
                    <div className="comparison-row">
                        <motion.div 
                            className="comp-val"
                            initial={{ scale: 0.8 }} animate={{ scale: 1 }}
                        >
                            {problem.leftLabel}
                        </motion.div>

                        <div className="comparison-controls">
                            <button 
                                className={`comp-btn ${answer === '>' ? (result === 'correct' ? 'correct' : 'incorrect') : ''}`}
                                onClick={() => handleCompare('>')}
                            >
                                {'>'}
                            </button>
                            <button 
                                className={`comp-btn ${answer === '=' ? (result === 'correct' ? 'correct' : 'incorrect') : ''}`}
                                onClick={() => handleCompare('=')}
                            >
                                {'='}
                            </button>
                            <button 
                                className={`comp-btn ${answer === '<' ? (result === 'correct' ? 'correct' : 'incorrect') : ''}`}
                                onClick={() => handleCompare('<')}
                            >
                                {'<'}
                            </button>
                        </div>

                        <motion.div 
                            className="comp-val"
                            initial={{ scale: 0.8 }} animate={{ scale: 1 }}
                        >
                            {problem.rightLabel}
                        </motion.div>
                    </div>

                    <div className="crocodile-anim">
                        {result === 'correct' ? '🐊 YUM!' : result === 'incorrect' ? '🐊 OH NO!' : '🐊 ???'}
                    </div>
                </div>
            )}

            <RewardCelebration 
                show={showReward}
                onClose={() => {
                    setShowReward(false);
                    setShowLevelPicks(true);
                }}
                reward={reward}
            />

            <style>{`
                .comparison-game { padding: 20px; }
                .level-indicator-btn {
                    padding: 8px 16px; border-radius: 20px; background: #22a6b3;
                    color: white; border: none; font-weight: 800; cursor: pointer;
                }
                .comp-content { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%; max-width: 800px; gap: 40px; }
                .comparison-row { display: flex; align-items: center; gap: 30px; width: 100%; justify-content: center; }
                
                .comp-val {
                    background: white; padding: 30px 40px; border-radius: 30px;
                    font-size: 3rem; font-weight: 800; color: #1e3a8a;
                    box-shadow: var(--shadow-lg); min-width: 180px; text-align: center;
                }

                .comparison-controls { display: flex; flex-direction: column; gap: 15px; }
                .comp-btn {
                    width: 80px; height: 80px; border-radius: 20px; border: 3px solid #e2e8f0;
                    background: white; font-size: 2.5rem; font-weight: 800; color: #334155;
                    cursor: pointer; transition: all 0.2s;
                }
                .comp-btn:hover { border-color: #3b82f6; transform: scale(1.05); }
                .comp-btn.correct { background: #22c55e; color: white; border-color: #16a34a; }
                .comp-btn.incorrect { background: #ef4444; color: white; border-color: #dc2626; }

                .crocodile-anim { font-size: 2rem; font-weight: 800; color: #1e3a8a; }

                @media (max-width: 600px) {
                    .comparison-row { flex-direction: column; }
                    .comparison-controls { flex-direction: row; }
                    .comp-val { font-size: 2rem; padding: 20px; min-width: 140px; }
                }
            `}</style>
        </div>
    );
};

export default ComparisonGameView;
