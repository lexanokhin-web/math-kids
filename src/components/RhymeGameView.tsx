import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { expandedRhymeData, type RhymeItem } from '../utils/bigDataStore';
import { trackGeneralGame, loadProgress, setGameLevel } from '../utils/progressManager';
import { soundManager } from '../utils/soundManager';
import RewardCelebration, { type Reward } from './RewardCelebration';
import LevelSelectionOverlay from './LevelSelectionOverlay';

const RhymeGameView = () => {
    const navigate = useNavigate();
    const [currentPair, setCurrentPair] = useState<RhymeItem | null>(null);
    const [options, setOptions] = useState<string[]>([]);
    const [rounds, setRounds] = useState(1);
    const [selected, setSelected] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [reward, setReward] = useState<Reward | null>(null);
    const [showReward, setShowReward] = useState(false);
    const [activeItems, setActiveItems] = useState<RhymeItem[]>([]);
    
    // Level State
    const [playerProgress, setPlayerProgress] = useState(loadProgress());
    const [level, setLevel] = useState(playerProgress.rhymeLevel || 1);
    const [showLevelPicks, setShowLevelPicks] = useState(false);

    const generateRound = useCallback((index: number, currentActive: RhymeItem[] = activeItems) => {
        if (index >= currentActive.length) return;
        const next = currentActive[index];
        setCurrentPair(next);
        
        const rhyme = next.rhyme;
        const dist = [...next.distractors].sort(() => 0.5 - Math.random()).slice(0, 3);
        setOptions([rhyme, ...dist].sort(() => 0.5 - Math.random()));
        
        setSelected(null);
        setIsCorrect(null);
        setShowLevelPicks(false);
    }, [activeItems]);

    const startNextRound = useCallback(() => {
        if (rounds >= 10) {
            const res = trackGeneralGame('rhyme', 25, true);
            setReward({ sticker: res.unlockedSticker, achievement: res.unlockedAchievement, leveledUp: res.leveledUp, xp: 25 });
            setShowReward(true);
            setPlayerProgress(res.progress);
            return;
        }
        const nextIndex = rounds; // index in activeItems
        setRounds(prev => prev + 1);
        generateRound(nextIndex);
    }, [rounds, generateRound]);

    const handleSelectLevel = useCallback((l: number) => {
        setLevel(l);
        setRounds(1);
        setShowReward(false);
        
        // Save level to progress
        const newProgress = setGameLevel('rhyme', l);
        setPlayerProgress(newProgress);
        
        // Map 3 levels to source pool depth
        const poolSize = l === 1 ? 30 : l === 2 ? 80 : expandedRhymeData.length;
        const pool = expandedRhymeData.slice(0, poolSize);
        
        // For Medium/Hard, we might want to skip the very introductory items too?
        // But user said "nothing delete".
        
        const shuffled = [...pool].sort(() => 0.5 - Math.random());
        const session = shuffled.slice(0, 10);
        setActiveItems(session);
        
        generateRound(0, session);
        setShowLevelPicks(false);
    }, [generateRound]);

    const hasInitialized = useRef(false);
    useEffect(() => {
        if (!hasInitialized.current) {
            hasInitialized.current = true;
            setTimeout(() => {
                handleSelectLevel(level);
            }, 0);
        }
    }, [handleSelectLevel, level]);

    const handleSelect = (opt: string) => {
        if (selected || !currentPair || showReward) return;

        const correct = currentPair.rhyme === opt;
        setSelected(opt);
        setIsCorrect(correct);

        if (correct) {
            soundManager.playCorrect();
            setTimeout(() => startNextRound(), 1500);
        } else {
            soundManager.playIncorrect();
            setTimeout(() => {
                setSelected(null);
                setIsCorrect(null);
            }, 1000);
        }
    };

const getDifficultyName = (l: number) => {
    if (l === 1) return 'Einfach';
    if (l === 2) return 'Mittel';
    return 'Schwer';
};

    return (
        <div className="game-view rhyme-game">
            <div className="game-header">
                <button className="back-button" onClick={() => navigate('/')}>←</button>
                <button className="level-indicator-btn" onClick={() => setShowLevelPicks(true)}>{getDifficultyName(level)}</button>
                <div className="round-counter">Runde {rounds}/10</div>
            </div>

            <AnimatePresence>
                {showLevelPicks && (
                    <LevelSelectionOverlay 
                        gameId="rhyme"
                        currentLevel={level}
                        onSelectLevel={handleSelectLevel}
                        onClose={() => currentPair ? setShowLevelPicks(false) : navigate('/')}
                        icon="🕵️"
                        title="Reim-Detektiv"
                    />
                )}
            </AnimatePresence>

            {!showLevelPicks && currentPair && (
                <div className="rhyme-content">
                    <h2 className="section-header center">Was reimt sich auf...</h2>
                    
                    <motion.div 
                        className="target-word glass-card"
                        key={currentPair.word}
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                    >
                        <span className="big-emoji">{currentPair.emoji}</span>
                        <span className="display-word">{currentPair.word}</span>
                    </motion.div>

                    <div className="options-grid">
                        {options.map((opt, i) => (
                            <motion.button
                                key={`${opt}-${i}`}
                                className={`opt-btn ${selected === opt ? (isCorrect ? 'correct' : 'wrong') : ''}`}
                                onClick={() => handleSelect(opt)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {opt}
                            </motion.button>
                        ))}
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
                .rhyme-game { padding: 20px; }
                .level-indicator-btn {
                    padding: 8px 16px; border-radius: 20px; background: #6c5ce7;
                    color: white; border: none; font-weight: 800; cursor: pointer;
                }
                .rhyme-content { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 40px; }
                .target-word {
                    display: flex; flex-direction: column; align-items: center; justify-content: center;
                    padding: 30px 60px; background: white; color: #1e3a8a; border-radius: 40px;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.1); border: 8px solid #6c5ce7;
                }
                .big-emoji { font-size: 5rem; }
                .display-word { font-size: 2.5rem; font-weight: 800; }

                .options-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; width: 100%; max-width: 500px; }
                .opt-btn {
                    padding: 25px; background: white; border: 4px solid #e2e8f0; border-radius: 24px;
                    font-size: 1.8rem; font-weight: 800; cursor: pointer; color: #1e3799;
                }
                .opt-btn.correct { background: #22c55e; color: white; border-color: #16a34a; }
                .opt-btn.wrong { background: #ef4444; color: white; border-color: #dc2626; }
            `}</style>
        </div>
    );
};

export default RhymeGameView;
