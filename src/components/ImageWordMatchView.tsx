import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { expandedWordListData } from '../utils/bigDataStore';
import { trackGeneralGame, loadProgress, setGameLevel } from '../utils/progressManager';
import { soundManager } from '../utils/soundManager';
import RewardCelebration, { type Reward } from './RewardCelebration';
import LevelSelectionOverlay from './LevelSelectionOverlay';

interface Card {
    id: string; // "img-id" or "word-id"
    matchId: string;
    content: string;
    type: 'img' | 'word';
}

const ImageWordMatchView = () => {
    const navigate = useNavigate();
    const [cards, setCards] = useState<Card[]>([]);
    const [selected, setSelected] = useState<number[]>([]);
    const [matched, setMatched] = useState<string[]>([]);
    const [reward, setReward] = useState<Reward | null>(null);
    const [showReward, setShowReward] = useState(false);
    
    const [playerProgress, setPlayerProgress] = useState(loadProgress());
    const [level, setLevel] = useState(playerProgress.imageMatchLevel || 1);
    const [showLevelPicks, setShowLevelPicks] = useState(false);
    
    const initGame = useCallback((currentLevel: number = level) => {
        // Difficulty mapping
        const numPairs = currentLevel === 1 ? 4 : currentLevel === 2 ? 6 : 9;
        const poolSize = currentLevel === 1 ? 15 : currentLevel === 2 ? 50 : expandedWordListData.length;
        
        const pool = [...expandedWordListData]
            .slice(0, poolSize)
            .sort(() => 0.5 - Math.random())
            .slice(0, numPairs);
        
        const flat: Card[] = [];
        pool.forEach((p, idx) => {
            flat.push({ id: `i-${idx}`, matchId: p.word, content: p.emoji, type: 'img' });
            flat.push({ id: `w-${idx}`, matchId: p.word, content: p.word, type: 'word' });
        });
        
        setCards(flat.sort(() => 0.5 - Math.random()));
        setMatched([]);
        setSelected([]);
        setShowLevelPicks(false);
    }, [level]);

    const hasInitialized = useRef(false);
    useEffect(() => {
        if (!hasInitialized.current) {
            hasInitialized.current = true;
            setTimeout(() => {
                initGame(level);
            }, 0);
        }
    }, [initGame, level]);

    const handleSelectLevel = (l: number) => {
        setLevel(l);
        setShowReward(false);
        
        // Save level to progress
        const newProgress = setGameLevel('imageMatch', l);
        setPlayerProgress(newProgress);
        
        initGame(l);
    };

    const handleCardClick = (idx: number) => {
        if (selected.length === 2 || matched.includes(cards[idx].matchId) || selected.includes(idx) || showReward) return;

        const newSelected = [...selected, idx];
        setSelected(newSelected);
        soundManager.playClick();

        if (newSelected.length === 2) {
            const [f, s] = newSelected;
            if (cards[f].matchId === cards[s].matchId && cards[f].type !== cards[s].type) {
                soundManager.playCorrect();
                const newMatched = [...matched, cards[f].matchId];
                setMatched(newMatched);
                setSelected([]);
                
                if (newMatched.length === (cards.length / 2)) {
                    const res = trackGeneralGame('imageMatch', 25, true);
                    setReward({ sticker: res.unlockedSticker, achievement: res.unlockedAchievement, leveledUp: res.leveledUp, xp: 25 });
                    setTimeout(() => setShowReward(true), 800);
                    setPlayerProgress(res.progress);
                }
            } else {
                soundManager.playIncorrect();
                setTimeout(() => setSelected([]), 800);
            }
        }
    };

const getDifficultyName = (l: number) => {
    if (l === 1) return 'Einfach';
    if (l === 2) return 'Mittel';
    return 'Schwer';
};

    return (
        <div className="game-view image-match-game">
            <div className="game-header">
                <button className="back-button" onClick={() => navigate('/')}>←</button>
                <button className="level-indicator-btn" onClick={() => setShowLevelPicks(true)}>{getDifficultyName(level)}</button>
                <div className="score-display">⭐ {matched.length}/{cards.length / 2}</div>
            </div>

            <AnimatePresence>
                {showLevelPicks && (
                    <LevelSelectionOverlay 
                        gameId="imageMatch"
                        currentLevel={level}
                        onSelectLevel={handleSelectLevel}
                        onClose={() => cards.length > 0 ? setShowLevelPicks(false) : navigate('/')}
                        icon="🖼️"
                        title="Bild + Wort"
                    />
                )}
            </AnimatePresence>

            {!showLevelPicks && cards.length > 0 && (
                <div className="match-content">
                    <h2 className="section-header center">Finde die passenden Paare!</h2>
                    
                    <div className="match-grid">
                        {cards.map((card, idx) => (
                            <motion.div
                                key={card.id}
                                className={`match-card glass-card ${selected.includes(idx) ? 'selected' : ''} ${matched.includes(card.matchId) ? 'matched' : ''}`}
                                onClick={() => handleCardClick(idx)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span className={`card-content ${card.type === 'img' ? 'emoji' : 'word'}`}>{card.content}</span>
                                {matched.includes(card.matchId) && <div className="done-overlay">✨</div>}
                            </motion.div>
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
                .image-match-game { padding: 20px; }
                .level-indicator-btn {
                    padding: 8px 16px; border-radius: 20px; background: #0fbcf9;
                    color: white; border: none; font-weight: 800; cursor: pointer;
                }
                .match-grid {
                    display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; 
                    width: 100%; max-width: 800px; margin-top: 40px;
                }
                .match-card {
                    height: 140px; background: white; border-radius: 30px;
                    display: flex; align-items: center; justify-content: center;
                    cursor: pointer; position: relative; border: 6px solid #e2e8f0;
                    box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
                }
                .match-card.selected { border-color: #0fbcf9; background: #f0fbff; box-shadow: 0 0 20px rgba(15, 188, 249, 0.3); }
                .match-card.matched { border-color: #05c46b; background: #f0fff4; opacity: 0.6; pointer-events: none; }
                
                .card-content.emoji { font-size: 4rem; }
                .card-content.word { font-size: 1.5rem; font-weight: 800; color: #1e3799; word-break: break-all; padding: 10px; text-align: center; }
                
                .done-overlay { position: absolute; top: 10px; right: 10px; font-size: 1.5rem; }

                @media (max-width: 600px) {
                    .match-grid { grid-template-columns: repeat(3, 1fr); gap: 10px; }
                    .match-card { height: 110px; border-radius: 20px; }
                    .card-content.emoji { font-size: 2.5rem; }
                    .card-content.word { font-size: 0.9rem; }
                }
            `}</style>
        </div>
    );
};

export default ImageWordMatchView;
