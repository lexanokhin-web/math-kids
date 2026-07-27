import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { trackGeneralGame, loadProgress, setGameLevel } from '../utils/progressManager';
import { soundManager } from '../utils/soundManager';
import RewardCelebration, { type Reward } from './RewardCelebration';
import LevelSelectionOverlay from './LevelSelectionOverlay';

interface SequenceProblem {
    sequence: (number | null)[];
    answer: number;
}

const SequenceGameView = () => {
    const navigate = useNavigate();
    const [currentSeq, setCurrentSeq] = useState<SequenceProblem | null>(null);
    const [options, setOptions] = useState<number[]>([]);
    const [rounds, setRounds] = useState(1);
    const [reward, setReward] = useState<Reward | null>(null);
    const [showReward, setShowReward] = useState(false);
    const [selected, setSelected] = useState<number | null>(null);
    
    // Level State
    const [playerProgress, setPlayerProgress] = useState(loadProgress());
    const [level, setLevel] = useState(playerProgress.sequenceLevel || 1);
    const [showLevelPicks, setShowLevelPicks] = useState(false);

    const generateProblem = useCallback((currentLevel: number = level) => {
        let start, step, sequence, answer;
        
        // Difficulty logic
        // Difficulty mapping
        if (currentLevel === 1) {
            // Tier 1: Easy (Step 1 or 2, start up to 10)
            start = Math.floor(Math.random() * 10) + 1;
            step = Math.random() < 0.5 ? 1 : 2;
            sequence = [start, start + step, start + step * 2, null];
            answer = start + step * 3;
        } else if (currentLevel === 2) {
            // Tier 2: Medium (Subtractions or Addition up to 100)
            if (Math.random() < 0.5) {
                // Add up to 100
                start = Math.floor(Math.random() * 50) + 1;
                step = Math.floor(Math.random() * 5) + 2;
                sequence = [start, start + step, start + step * 2, null];
                answer = start + step * 3;
            } else {
                // Subtract
                start = Math.floor(Math.random() * 100) + 30;
                step = Math.floor(Math.random() * 5) + 2;
                sequence = [start, start - step, start - step * 2, null];
                answer = start - step * 3;
            }
        } else {
            // Tier 3: Hard (Geometric or Complex)
            start = Math.floor(Math.random() * 6) + 2;
            const mult = Math.random() < 0.5 ? 2 : 3;
            sequence = [start, start * mult, start * mult * mult, null];
            answer = start * mult * mult * mult;
        }

        const distractors = [answer + 2, answer - 1, answer + 5, Math.floor(answer * 1.2)].filter(v => v !== answer);
        setCurrentSeq({ sequence, answer });
        setOptions([answer, ...distractors].slice(0, 3).sort(() => 0.5 - Math.random()));
        setSelected(null);
        setShowLevelPicks(false);
    }, [level]);

    const startNextRound = useCallback(() => {
        if (rounds >= 10) {
            const res = trackGeneralGame('sequence', 25, true);
            setReward({ sticker: res.unlockedSticker, achievement: res.unlockedAchievement, leveledUp: res.leveledUp, xp: 25 });
            setShowReward(true);
            return;
        }
        setRounds(prev => prev + 1);
        generateProblem();
    }, [rounds, generateProblem]);

    const hasInitialized = useRef(false);
    useEffect(() => {
        if (!hasInitialized.current) {
            hasInitialized.current = true;
            setTimeout(() => {
                generateProblem(level);
            }, 0);
        }
    }, [generateProblem, level]);

    const handleSelectLevel = (l: number) => {
        setLevel(l);
        setShowReward(false);
        setRounds(1);
        
        // Save level to progress
        const newProgress = setGameLevel('sequence', l);
        setPlayerProgress(newProgress);
        
        generateProblem(l);
        setShowLevelPicks(false);
    };

    const handleSelect = (val: number) => {
        if (selected || !currentSeq || showReward) return;
        setSelected(val);
        if (val === currentSeq.answer) {
            soundManager.playCorrect();
            setTimeout(() => startNextRound(), 1500);
        } else {
            soundManager.playIncorrect();
            setTimeout(() => setSelected(null), 1000);
        }
    };

    const resetGame = () => {
        setShowLevelPicks(true);
        setShowReward(false);
    };

const getDifficultyName = (l: number) => {
    if (l === 1) return 'Einfach';
    if (l === 2) return 'Mittel';
    return 'Schwer';
};

    return (
        <div className="game-view sequence-game">
            <div className="game-header">
                <button className="back-button" onClick={() => navigate('/')}>←</button>
                <button className="level-indicator-btn" onClick={() => setShowLevelPicks(true)}>{getDifficultyName(level)}</button>
                <div className="round-counter">Schritt {rounds}/10</div>
            </div>

            <AnimatePresence>
                {showLevelPicks && (
                    <LevelSelectionOverlay 
                        gameId="sequence"
                        currentLevel={level}
                        onSelectLevel={handleSelectLevel}
                        onClose={() => currentSeq ? setShowLevelPicks(false) : navigate('/')}
                        icon="🐍"
                        title="Zahlen-Schlange"
                    />
                )}
            </AnimatePresence>

            {!showLevelPicks && currentSeq && (
                <div className="sequence-content">
                    <h2 className="section-header center">Was kommt als Nächstes?</h2>
                    
                    <div className="sequence-trail">
                        {currentSeq.sequence.map((n, i) => (
                            <motion.div
                                key={`step-${i}-${n}`}
                                className={`seq-step ${n === null ? 'missing' : ''}`}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                            >
                                {n === null ? (selected && selected === currentSeq.answer ? selected : '?') : n}
                            </motion.div>
                        ))}
                    </div>

                    <div className="options-row">
                        {options.map((opt, i) => (
                            <motion.button
                                key={`${opt}-${i}`}
                                className={`opt-btn ${selected === opt ? (opt === currentSeq.answer ? 'correct' : 'wrong') : ''}`}
                                onClick={() => handleSelect(opt)}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                {opt}
                            </motion.button>
                        ))}
                    </div>
                </div>
            )}

            <RewardCelebration 
                show={showReward}
                onClose={resetGame}
                reward={reward}
            />

            <style>{`
                .sequence-game { padding: 20px; }
                .level-indicator-btn {
                    padding: 8px 16px; border-radius: 20px; background: #67e6dc;
                    color: #1e3799; border: none; font-weight: 800; cursor: pointer;
                }
                .sequence-content { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 60px; }
                .sequence-trail {
                    display: flex; gap: 15px; padding: 40px; background: #f8fafc;
                    border-radius: 40px; border-bottom: 8px solid #cbd5e1;
                }
                .seq-step {
                    width: 85px; height: 85px; background: #3b82f6; color: white; border-radius: 24px;
                    display: flex; align-items: center; justify-content: center;
                    font-size: 2.2rem; font-weight: 800; box-shadow: 0 5px 10px rgba(0,0,0,0.1);
                }
                .seq-step.missing { background: #e2e8f0; color: #94a3b8; border: 4px dashed #cbd5e1; }

                .options-row { display: flex; gap: 20px; }
                .opt-btn {
                    width: 100px; height: 100px; border-radius: 28px; border: 4px solid #4f46e5;
                    background: white; font-size: 2.5rem; font-weight: 800; cursor: pointer; color: #4f46e5;
                }
                .opt-btn.correct { background: #22c55e; color: white; border-color: #16a34a; }
                .opt-btn.wrong { background: #ef4444; color: white; border-color: #dc2626; }

                @media (max-width: 600px) {
                    .sequence-trail { padding: 20px; gap: 10px; }
                    .seq-step { width: 65px; height: 65px; font-size: 1.5rem; }
                }
            `}</style>
        </div>
    );
};

export default SequenceGameView;
