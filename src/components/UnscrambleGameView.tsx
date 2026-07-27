import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { expandedUnscrambleData, type UnscrambleItem } from '../utils/bigDataStore';
import { trackGeneralGame, loadProgress, setGameLevel } from '../utils/progressManager';
import { soundManager } from '../utils/soundManager';
import RewardCelebration, { type Reward } from './RewardCelebration';
import LevelSelectionOverlay from './LevelSelectionOverlay';

const UnscrambleGameView = () => {
    const navigate = useNavigate();
    const [currentWord, setCurrentWord] = useState<UnscrambleItem | null>(null);
    const [activeItems, setActiveItems] = useState<UnscrambleItem[]>([]);
    const [assembled, setAssembled] = useState<string[]>([]);
    const [options, setOptions] = useState<string[]>([]);
    const [rounds, setRounds] = useState(1);
    const [reward, setReward] = useState<Reward | null>(null);
    const [showReward, setShowReward] = useState(false);
    
    // Level State
    const [playerProgress, setPlayerProgress] = useState(loadProgress());
    const [level, setLevel] = useState(playerProgress.unscrambleLevel || 1);
    const [showLevelPicks, setShowLevelPicks] = useState(false);

    const generateRound = useCallback((index: number, currentActive: UnscrambleItem[] = activeItems) => {
        if (index >= currentActive.length) return;
        const next = currentActive[index];
        setCurrentWord(next);
        setOptions([...next.word.split('')].sort(() => 0.5 - Math.random()));
        setAssembled([]);
        setShowLevelPicks(false);
    }, [activeItems]);

    const startNextRound = useCallback(() => {
        if (rounds >= 10) {
            const res = trackGeneralGame('unscramble', 30, true);
            setReward({ sticker: res.unlockedSticker, achievement: res.unlockedAchievement, leveledUp: res.leveledUp, xp: 30 });
            setShowReward(true);
            setPlayerProgress(res.progress);
            return;
        }
        const nextIndex = rounds;
        setRounds(prev => prev + 1);
        generateRound(nextIndex);
    }, [rounds, generateRound]);

    const handleSelectLevel = useCallback((l: number) => {
        setLevel(l);
        setShowReward(false);
        setRounds(1);
        
        // Save level to progress
        const newProgress = setGameLevel('unscramble', l);
        setPlayerProgress(newProgress);
        
        const minLen = l === 1 ? 2 : l === 2 ? 5 : 8;
        const maxLen = l === 1 ? 4 : l === 2 ? 7 : 15;
        
        const filtered = expandedUnscrambleData.filter(w => 
            w.word.length >= minLen && w.word.length <= maxLen
        );
        const shuffled = [...filtered].sort(() => 0.5 - Math.random());
        const session = shuffled.slice(0, 10);
        setActiveItems(session);

        generateRound(0, session);
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

    const handlePick = (letter: string, idx: number) => {
        if (!currentWord || showReward) return;
        
        const nextTarget = currentWord.word[assembled.length];
        if (letter === nextTarget) {
            soundManager.playCorrect();
            const newAssembled = [...assembled, letter];
            setAssembled(newAssembled);
            setOptions(prev => prev.filter((_, i) => i !== idx));
            
            if (newAssembled.length === currentWord.word.length) {
                setTimeout(() => startNextRound(), 1500);
            }
        } else {
            soundManager.playIncorrect();
        }
    };

const getDifficultyName = (l: number) => {
    if (l === 1) return 'Einfach';
    if (l === 2) return 'Mittel';
    return 'Schwer';
};

    return (
        <div className="game-view unscramble-game">
            <div className="game-header">
                <button className="back-button" onClick={() => navigate('/')}>←</button>
                <button className="level-indicator-btn" onClick={() => setShowLevelPicks(true)}>{getDifficultyName(level)}</button>
                <div className="round-counter">Wort {rounds}/10</div>
            </div>

            <AnimatePresence>
                {showLevelPicks && (
                    <LevelSelectionOverlay 
                        gameId="unscramble"
                        currentLevel={level}
                        onSelectLevel={handleSelectLevel}
                        onClose={() => currentWord ? setShowLevelPicks(false) : navigate('/')}
                        icon="🥗"
                        title="Wort-Salat"
                    />
                )}
            </AnimatePresence>

            {!showLevelPicks && currentWord && (
                <div className="unscramble-content">
                    <h2 className="section-header center">Bringe die Buchstaben in Ordnung!</h2>
                    
                    <div className="hint-circle glass-card">
                        <span className="hint-emoji">{currentWord.emoji}</span>
                    </div>

                    <div className="assembled-slots">
                        {currentWord.word.split('').map((_: string, i: number) => (
                            <div key={`slot-${i}`} className={`slot ${assembled[i] ? 'filled' : ''}`}>
                                {assembled[i] || ''}
                            </div>
                        ))}
                    </div>

                    <div className="letter-options">
                        {options.map((l, i) => (
                            <motion.button
                                key={`${l}-${i}`}
                                className="letter-btn"
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handlePick(l, i)}
                            >
                                {l}
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
                .unscramble-game { padding: 20px; }
                .level-indicator-btn {
                    padding: 8px 16px; border-radius: 20px; background: #e67e22;
                    color: white; border: none; font-weight: 800; cursor: pointer;
                }
                .unscramble-content { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 40px; }
                .hint-circle { width: 140px; height: 140px; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: white; box-shadow: var(--shadow-lg); border: 6px solid #e67e22; }
                .hint-emoji { font-size: 5rem; }

                .assembled-slots { display: flex; gap: 10px; margin: 20px 0; flex-wrap: wrap; justify-content: center; }
                .slot {
                    width: 55px; height: 75px; background: #f1f5f9; border-bottom: 6px solid #cbd5e1; border-radius: 12px;
                    display: flex; align-items: center; justify-content: center; font-size: 2.2rem; font-weight: 800; color: #1e3a8a;
                }
                .slot.filled { background: white; border-color: #e67e22; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }

                .letter-options { display: flex; flex-wrap: wrap; gap: 12px; justify-content: center; padding-bottom: 40px; }
                .letter-btn {
                    width: 65px; height: 65px; background: #e67e22; color: white; border-radius: 18px; border: none; font-size: 1.8rem; font-weight: 800; cursor: pointer; box-shadow: 0 5px 15px rgba(230, 126, 34, 0.3);
                }

                @media (max-width: 480px) {
                    .slot { width: 40px; height: 55px; font-size: 1.5rem; }
                    .letter-btn { width: 50px; height: 50px; font-size: 1.3rem; }
                }
            `}</style>
        </div>
    );
};

export default UnscrambleGameView;
