import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { expandedSyllableData, type SyllableItem } from '../utils/bigDataStore';
import { trackGeneralGame, loadProgress, setGameLevel } from '../utils/progressManager';
import { soundManager } from '../utils/soundManager';
import RewardCelebration, { type Reward } from './RewardCelebration';
import LevelSelectionOverlay from './LevelSelectionOverlay';

const SyllableTrainView = () => {
    const navigate = useNavigate();
    const [currentWord, setCurrentWord] = useState<SyllableItem | null>(null);
    const [activeItems, setActiveItems] = useState<SyllableItem[]>([]);
    const [rounds, setRounds] = useState(1);
    const [assembled, setAssembled] = useState<string[]>([]);
    const [options, setOptions] = useState<string[]>([]);
    const [reward, setReward] = useState<Reward | null>(null);
    const [showReward, setShowReward] = useState(false);
    
    // Level State
    const [playerProgress, setPlayerProgress] = useState(loadProgress());
    const [level, setLevel] = useState(playerProgress.syllableLevel || 1);
    const [showLevelPicks, setShowLevelPicks] = useState(false);

    const generateRound = useCallback((index: number, currentActive: SyllableItem[] = activeItems) => {
        if (index >= currentActive.length) return;
        const next = currentActive[index];
        setCurrentWord(next);
        setAssembled([]);
        setOptions([...next.syllables].sort(() => 0.5 - Math.random()));
        setShowLevelPicks(false);
    }, [activeItems]);

    const startNextRound = useCallback(() => {
        if (rounds >= 10) {
            const result = trackGeneralGame('syllable', 25, true);
            setReward({
                sticker: result.unlockedSticker,
                achievement: result.unlockedAchievement,
                leveledUp: result.leveledUp,
                xp: 25
            });
            setShowReward(true);
            setPlayerProgress(result.progress);
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
        const newProgress = setGameLevel('syllable', l);
        setPlayerProgress(newProgress);
        
        // Strict syllable count range per level
        const minS = l === 1 ? 1 : l === 2 ? 2 : 3;
        const maxS = l === 1 ? 2 : l === 2 ? 3 : 5;

        const filtered = expandedSyllableData.filter(w => 
            w.syllables.length >= minS && w.syllables.length <= maxS
        );

        const shuffled = [...filtered].sort(() => 0.5 - Math.random());
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

    const handleSyllableClick = (syl: string, idx: number) => {
        if (!currentWord || showReward) return;
        
        const nextTarget = currentWord.syllables[assembled.length];
        
        if (syl === nextTarget) {
            soundManager.playCorrect();
            const newAssembled = [...assembled, syl];
            setAssembled(newAssembled);
            setOptions(prev => prev.filter((_, i) => i !== idx));

            if (newAssembled.length === currentWord.syllables.length) {
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
        <div className="game-view syllable-train">
            <div className="game-header">
                <button className="back-button" onClick={() => navigate('/')}>←</button>
                <button className="level-indicator-btn" onClick={() => setShowLevelPicks(true)}>{getDifficultyName(level)}</button>
                <div className="round-counter">Wort {rounds}/10</div>
            </div>

            <AnimatePresence>
                {showLevelPicks && (
                    <LevelSelectionOverlay 
                        gameId="syllable"
                        currentLevel={level}
                        onSelectLevel={handleSelectLevel}
                        onClose={() => currentWord ? setShowLevelPicks(false) : navigate('/')}
                        icon="🚂"
                        title="Silben-Zug"
                    />
                )}
            </AnimatePresence>

            {!showLevelPicks && currentWord && (
                <div className="train-game-content">
                    <motion.div 
                        className="image-hint glass-card"
                        animate={assembled.length === currentWord.syllables.length ? { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] } : {}}
                    >
                        <span className="big-emoji">{currentWord.emoji}</span>
                        <span className="word-hint">{assembled.length === currentWord.syllables.length ? currentWord.word : '???'}</span>
                    </motion.div>

                    <div className="train-track">
                        <div className="locomotive">🚂</div>
                        <div className="wagons-container">
                            <AnimatePresence>
                                {assembled.map((s, i) => (
                                    <motion.div
                                        key={`wagon-${i}-${s}`}
                                        className="wagon"
                                        initial={{ x: 100, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                                    >
                                        <span className="syl-text">{s}</span>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                            {Array.from({ length: currentWord.syllables.length - assembled.length }).map((_, i) => (
                                <div key={`empty-${i}`} className="wagon empty">?</div>
                            ))}
                        </div>
                    </div>

                    {assembled.length < currentWord.syllables.length && (
                        <div className="syllable-options">
                            {options.map((s, i) => (
                                <motion.button
                                    key={`opt-${i}-${s}`}
                                    className="syl-btn"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => handleSyllableClick(s, i)}
                                >
                                    {s}
                                </motion.button>
                            ))}
                        </div>
                    )}
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
                .syllable-train { padding: 20px; }
                .level-indicator-btn {
                    padding: 8px 16px; border-radius: 20px; background: #f39c12;
                    color: white; border: none; font-weight: 800; cursor: pointer;
                }
                .train-game-content { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 30px; }
                .image-hint { padding: 30px; border-radius: 40px; text-align: center; min-width: 200px; }
                .big-emoji { font-size: 5rem; display: block; }
                .word-hint { font-size: 1.5rem; font-weight: 800; margin-top: 10px; }
                .train-track {
                    display: flex; align-items: flex-end; gap: 5px; padding: 20px;
                    background: #f8fafc; border-radius: 30px; border-bottom: 8px solid #cbd5e1;
                    width: 100%; overflow-x: auto; max-width: 800px;
                }
                .locomotive { font-size: 4rem; margin-right: 10px; }
                .wagons-container { display: flex; gap: 8px; }
                .wagon {
                    width: 80px; height: 60px; background: #3b82f6; border-radius: 12px;
                    display: flex; align-items: center; justify-content: center;
                    color: white; font-weight: 800; font-size: 1.2rem; position: relative;
                    border-bottom: 4px solid #1d4ed8;
                }
                .wagon.empty { background: #e2e8f0; border-bottom-color: #cbd5e1; color: #94a3b8; }
                .syllable-options { display: flex; flex-wrap: wrap; gap: 15px; justify-content: center; }
                .syl-btn {
                    padding: 15px 30px; background: white; border: 4px solid #3b82f6;
                    border-radius: 20px; font-weight: 800; font-size: 1.5rem;
                    cursor: pointer; color: #1e3a8a;
                }
            `}</style>
        </div>
    );
};

export default SyllableTrainView;
