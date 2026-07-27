import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { trackGeneralGame, loadProgress, setGameLevel } from '../utils/progressManager';
import { soundManager } from '../utils/soundManager';
import RewardCelebration, { type Reward } from './RewardCelebration';
import LevelSelectionOverlay from './LevelSelectionOverlay';

const BridgeGameView = () => {
    const navigate = useNavigate();
    const [rounds, setRounds] = useState(1);
    const [problem, setProblem] = useState({ q: '', a: 0 });
    const [options, setOptions] = useState<number[]>([]);
    const [isStepping, setIsStepping] = useState(false);
    const [charPos, setCharPos] = useState(0);
    const [reward, setReward] = useState<Reward | null>(null);
    const [showReward, setShowReward] = useState(false);
    
    // Level State
    const [playerProgress, setPlayerProgress] = useState(loadProgress());
    const [level, setLevel] = useState(playerProgress.bridgeLevel || 1);
    const [showLevelPicks, setShowLevelPicks] = useState(false);

    const generateProblem = useCallback((currentLevel: number = level) => {
        let a, b, q, ans;
        
        // Progression Logic
        // Difficulty mapping
        if (currentLevel === 1) {
            // Tier 1: Easy (Addition/Subtraction up to 20)
            if (Math.random() > 0.5) {
                a = Math.floor(Math.random() * 10) + 1;
                b = Math.floor(Math.random() * 10) + 1;
                q = `${a} + ${b}`;
                ans = a + b;
            } else {
                a = Math.floor(Math.random() * 15) + 5;
                b = Math.floor(Math.random() * a) + 1;
                q = `${a} - ${b}`;
                ans = a - b;
            }
        } else if (currentLevel === 2) {
            // Tier 2: Medium (Multiplication or Subtraction up to 100)
            if (Math.random() > 0.5) {
                a = Math.floor(Math.random() * 10) + 2;
                b = Math.floor(Math.random() * 8) + 2;
                q = `${a} × ${b}`;
                ans = a * b;
            } else {
                a = Math.floor(Math.random() * 50) + 50;
                b = Math.floor(Math.random() * 40) + 10;
                q = `${a} - ${b}`;
                ans = a - b;
            }
        } else {
            // Tier 3: Hard (Division or Complex mix)
            const res = Math.floor(Math.random() * 12) + 1;
            const divisor = Math.floor(Math.random() * 9) + 2;
            const dividend = res * divisor;
            q = `${dividend} : ${divisor}`;
            ans = res;
        }

        const dist = [ans + 1, ans - 1, ans + 2, Math.floor(ans * 1.5)].filter(v => v !== ans && v >= 0);
        setProblem({ q, a: ans });
        setOptions([ans, ...dist].slice(0, 3).sort(() => 0.5 - Math.random()));
        setIsStepping(false);
        setShowLevelPicks(false);
    }, [level]);

    const startNextRound = useCallback(() => {
        if (rounds >= 10) {
            const res = trackGeneralGame('bridge', 30, true);
            setReward({ sticker: res.unlockedSticker, achievement: res.unlockedAchievement, leveledUp: res.leveledUp, xp: 30 });
            setShowReward(true);
            return;
        }
        setRounds(prev => prev + 1);
        generateProblem();
    }, [rounds, generateProblem]);

    const handleSelectLevel = useCallback((l: number) => {
        setLevel(l);
        setShowReward(false);
        setRounds(1);
        setCharPos(0);
        
        // Save level to progress
        const newProgress = setGameLevel('bridge', l);
        setPlayerProgress(newProgress);
        
        generateProblem(l);
        setShowLevelPicks(false);
    }, [generateProblem]);

    useEffect(() => {
        const timer = setTimeout(() => {
            generateProblem(level);
        }, 0);
        return () => clearTimeout(timer);
    }, [generateProblem, level]);

    const handleAnswer = useCallback((val: number) => {
        if (isStepping || showReward) return;

        if (val === problem.a) {
            soundManager.playCorrect();
            setIsStepping(true);
            setCharPos(prev => prev + 1);
            
            setTimeout(() => {
                startNextRound();
            }, 800);
        } else {
            soundManager.playIncorrect();
            setCharPos(prev => Math.max(0, prev - 1));
            setRounds(prev => Math.max(1, prev - 1));
            generateProblem();
        }
    }, [isStepping, showReward, problem.a, startNextRound, generateProblem]);

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
        <div className="game-view bridge-game">
            <div className="game-header">
                <button className="back-button" onClick={() => navigate('/')}>←</button>
                <button className="level-indicator-btn" onClick={() => setShowLevelPicks(true)}>{getDifficultyName(level)}</button>
                <div className="round-counter">Schritt {rounds}/10</div>
            </div>

            <AnimatePresence>
                {showLevelPicks && (
                    <LevelSelectionOverlay 
                        gameId="bridge"
                        currentLevel={level}
                        onSelectLevel={handleSelectLevel}
                        onClose={() => charPos > 0 ? setShowLevelPicks(false) : navigate('/')}
                        icon="🌉"
                        title="Rechen-Brücke"
                    />
                )}
            </AnimatePresence>

            {!showLevelPicks && problem.q && (
                <div className="bridge-content">
                    <h2 className="section-header center">Baue die Brücke!</h2>
                    
                    <div className="bridge-scene">
                        <div className="cliff left">⛰️</div>
                        <div className="water">🌊</div>
                        <div className="cliff right">🏝️</div>

                        <div className="bridge-path">
                            {Array.from({ length: 11 }).map((_, i) => (
                                <div key={i} className={`plank ${i < charPos ? 'solid' : i === charPos ? 'active' : ''}`}>
                                    {i === charPos && (
                                        <div className="plank-q-container">
                                            <span className="plank-q">{problem.q}</span>
                                        </div>
                                    )}
                                </div>
                            ))}
                            
                            <motion.div 
                                className="character"
                                animate={{ 
                                    left: `${((charPos + 0.5) / 11) * 100}%`,
                                }}
                                transition={{ type: 'spring', damping: 15 }}
                            >
                                🏃
                            </motion.div>
                        </div>
                    </div>

                    <div className="options-row">
                        {options.map((opt, i) => (
                            <motion.button
                                key={`${opt}-${i}`}
                                className="opt-btn"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleAnswer(opt)}
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
                .bridge-game { padding: 20px; background: #e0f2fe; }
                .level-indicator-btn {
                    padding: 8px 16px; border-radius: 20px; background: #78350f;
                    color: white; border: none; font-weight: 800; cursor: pointer;
                }
                .bridge-content { flex: 1; display: flex; flex-direction: column; }
                .bridge-scene {
                    position: relative; width: 100%; max-width: 800px; height: 250px;
                    margin: 40px auto; background: rgba(255,255,255,0.2);
                    border-radius: 40px; border: 4px solid rgba(255,255,255,0.4);
                }
                .cliff { position: absolute; bottom: 20px; font-size: 3.5rem; z-index: 5; }
                .cliff.left { left: 10px; }
                .cliff.right { right: 10px; }
                .water { position: absolute; bottom: 0; width: 100%; height: 40px; background: #3b82f6; opacity: 0.4; border-radius: 0 0 40px 40px; }

                .bridge-path { position: absolute; bottom: 80px; left: 60px; right: 60px; display: flex; align-items: flex-end; height: 60px; }
                .plank { flex: 1; height: 12px; background: rgba(0,0,0,0.1); border-radius: 6px; margin: 0 3px; position: relative; transition: all 0.3s; }
                .plank.solid { background: #78350f; border-bottom: 3px solid #451a03; }
                .plank.active { background: transparent; border: 2px dashed #78350f; height: 40px; }
                .plank-q-container { position: absolute; top: -60px; left: 50%; transform: translateX(-50%); z-index: 10; }
                .plank-q { white-space: nowrap; font-weight: 800; color: #1e3a8a; background: white; padding: 8px 16px; border-radius: 12px; font-size: 1.5rem; border: 3px solid #3b82f6; display: block; }

                .character { position: absolute; bottom: 12px; width: 60px; font-size: 3rem; display: flex; justify-content: center; z-index: 6; transform: translateX(-50%); pointer-events: none; }

                .options-row { display: flex; gap: 20px; flex-wrap: wrap; justify-content: center; padding: 0 10px; }
                .opt-btn { padding: 15px 30px; min-width: 100px; background: white; border: 4px solid #78350f; border-radius: 20px; font-size: 1.8rem; font-weight: 800; color: #78350f; cursor: pointer; }

                @media (max-width: 600px) {
                    .bridge-scene { height: 200px; }
                    .cliff { font-size: 2.5rem; bottom: 15px; }
                    .bridge-path { left: 40px; right: 40px; bottom: 65px; }
                    .plank-q { font-size: 1rem; padding: 4px 8px; }
                    .plank-q-container { top: -45px; }
                }
            `}</style>
        </div>
    );
};

export default BridgeGameView;
