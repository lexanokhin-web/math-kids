import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { expandedArtikelData } from '../utils/bigDataStore';
import type { Gender, NounItem } from '../utils/artikelData';
import { trackGeneralGame, loadProgress, setGameLevel } from '../utils/progressManager';
import { soundManager } from '../utils/soundManager';
import RewardCelebration, { type Reward } from './RewardCelebration';
import LevelSelectionOverlay from './LevelSelectionOverlay';

const ArtikelGameView = () => {
    const navigate = useNavigate();
    const [currentItems, setCurrentItems] = useState<NounItem[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isWrong, setIsWrong] = useState(false);
    const [reward, setReward] = useState<Reward | null>(null);
    const [showReward, setShowReward] = useState(false);
    
    // Level State
    const [playerProgress, setPlayerProgress] = useState(loadProgress());
    const [level, setLevel] = useState<number>(playerProgress.artikelLevel || 1);
    const [showLevelPicks, setShowLevelPicks] = useState(false);

    const initGame = useCallback((selectedLevel: number = level) => {
        // Difficulty Logic: Map 3 tiers to content pool size
        const poolSize = selectedLevel === 1 ? 35 : selectedLevel === 2 ? 90 : expandedArtikelData.length;
        const pool = expandedArtikelData.slice(0, poolSize);
        
        const shuffled = [...pool].sort(() => 0.5 - Math.random());
        const session = shuffled.slice(0, 10);
        setCurrentItems(session); // Still 10 rounds per game
        setCurrentIndex(0);
        setIsWrong(false);
        setReward(null);
        setShowReward(false);
        setShowLevelPicks(false);
    }, [level]);

    const handleSelectLevel = useCallback((l: number) => {
        setLevel(l);
        setShowReward(false);
        
        // Save level to progress
        const newProgress = setGameLevel('artikel', l);
        setPlayerProgress(newProgress);
        
        initGame(l);
    }, [initGame]);

    const hasInitialized = useRef(false);
    useEffect(() => {
        if (!hasInitialized.current) {
            hasInitialized.current = true;
            setTimeout(() => {
                initGame(level);
            }, 0);
        }
    }, [initGame, level]);

    const handleSelect = (gender: Gender) => {
        const current = currentItems[currentIndex];
        if (gender === current.gender) {
            soundManager.playCorrect();
            if (currentIndex + 1 < currentItems.length) {
                setCurrentIndex(prev => prev + 1);
                setIsWrong(false);
            } else {
                // Win!
                const result = trackGeneralGame('artikel', 20, true);
                setReward({
                    sticker: result.unlockedSticker,
                    achievement: result.unlockedAchievement,
                    leveledUp: result.leveledUp,
                    xp: 20
                });
                setShowReward(true);
                setPlayerProgress(result.progress);
            }
        } else {
            soundManager.playIncorrect();
            setIsWrong(true);
            setTimeout(() => setIsWrong(false), 500);
        }
    };

const getDifficultyName = (l: number) => {
    if (l === 1) return 'Einfach';
    if (l === 2) return 'Mittel';
    return 'Schwer';
};

    return (
        <div className="game-view artikel-game">
            <div className="game-header">
                <button className="back-button" onClick={() => navigate('/')}>←</button>
                <button className="level-indicator-btn" onClick={() => setShowLevelPicks(true)}>
                    {getDifficultyName(level)}
                </button>
                <div className="progress-pills">
                    {currentItems.map((_, i) => (
                        <div key={i} className={`pill ${i < currentIndex ? 'done' : i === currentIndex ? 'active' : ''}`} />
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {showLevelPicks && (
                    <LevelSelectionOverlay 
                        gameId="artikel"
                        currentLevel={level}
                        onSelectLevel={handleSelectLevel}
                        onClose={() => currentItems.length > 0 ? setShowLevelPicks(false) : navigate('/')}
                        icon="👑"
                        title="Artikel-König"
                    />
                )}
            </AnimatePresence>

            {!showLevelPicks && currentItems.length > 0 && (
                <div className="artikel-content">
                    <h2 className="section-header center">Der, Die oder Das?</h2>
                    
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentItems[currentIndex].word}
                            className={`noun-card glass-card ${isWrong ? 'shake' : ''}`}
                            initial={{ x: 300, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -300, opacity: 0 }}
                            transition={{ type: 'spring', damping: 15 }}
                        >
                            <span className="noun-emoji">{currentItems[currentIndex].emoji}</span>
                            <span className="noun-word">{currentItems[currentIndex].word}</span>
                        </motion.div>
                    </AnimatePresence>

                    <div className="gender-buttons">
                        <button className="gender-btn der" onClick={() => handleSelect('der')}>DER</button>
                        <button className="gender-btn die" onClick={() => handleSelect('die')}>DIE</button>
                        <button className="gender-btn das" onClick={() => handleSelect('das')}>DAS</button>
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
                .artikel-game { padding: 20px; }
                .level-indicator-btn {
                    padding: 8px 16px;
                    border-radius: 20px;
                    background: #3b82f6;
                    color: white;
                    border: none;
                    font-weight: 800;
                    cursor: pointer;
                    box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.4);
                }
                .progress-pills { display: flex; gap: 6px; }
                .pill { width: 12px; height: 12px; border-radius: 50%; background: #e2e8f0; }
                .pill.done { background: #22c55e; }
                .pill.active { background: #3b82f6; transform: scale(1.3); }

                .artikel-content {
                    flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center;
                    gap: 40px; width: 100%; max-width: 500px; margin-top: 40px;
                }
                .noun-card {
                    width: 280px; height: 280px; display: flex; flex-direction: column; align-items: center; justify-content: center;
                    border-radius: 40px; box-shadow: var(--shadow-lg); border: 10px solid white;
                }
                .noun-emoji { font-size: 7rem; }
                .noun-word { font-size: 2.5rem; font-weight: 800; margin-top: 10px; text-transform: capitalize; }

                .gender-buttons { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; width: 100%; }
                .gender-btn {
                    padding: 24px 0; border: none; border-radius: 24px; font-family: var(--font-cartoon);
                    font-size: 1.8rem; font-weight: 800; color: white; cursor: pointer; box-shadow: var(--shadow-md);
                }
                .gender-btn.der { background: #3b82f6; }
                .gender-btn.die { background: #ec4899; }
                .gender-btn.das { background: #2dd4bf; }

                .shake { animation: shake 0.5s linear; }
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    20%, 60% { transform: translateX(-10px); }
                    40%, 80% { transform: translateX(10px); }
                }
            `}</style>
        </div>
    );
};

export default ArtikelGameView;

