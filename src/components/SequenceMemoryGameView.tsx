import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { trackGeneralGame } from '../utils/progressManager';
import { soundManager } from '../utils/soundManager';
import RewardCelebration, { type Reward } from './RewardCelebration';

const EMOJIS = ['🍎', '🍌', '🍓', '🍇', '🍉', '🥝', '🫐', '🍒', '🍑', '🍋', '🐶', '🐱', '🐰', '🦊', '🐻', '🐼', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🦄', '🦋', '🐝', '🐞', '🦖', '🐙', '🐬', '🐳', '🚗', '🚀', '✈️', '🚂', '🚁', '🚤', '🚲', '🚜', '⚽', '🏀', '🎾', '🎸', '🎹', '🎨', '🧩', '🧸', '🍦', '🍩', '🍪', '🍭'];

type GameType = 'numbers' | 'images' | 'mixed';
type GameState = 'setup' | 'showing' | 'playing' | 'finished';

interface SequenceItem {
    id: number;
    type: 'number' | 'image';
    value: number | string;
    order: number;
}

const SequenceMemoryGameView = () => {
    const navigate = useNavigate();
    const [gameState, setGameState] = useState<GameState>('setup');
    const [itemCount, setItemCount] = useState(3);
    const [gameType, setGameType] = useState<GameType>('numbers');
    
    const [sequence, setSequence] = useState<SequenceItem[]>([]);
    const [shuffledOptions, setShuffledOptions] = useState<SequenceItem[]>([]);
    const [userPicks, setUserPicks] = useState<SequenceItem[]>([]);
    const [timeLeft, setTimeLeft] = useState(5);
    
    const [reward, setReward] = useState<Reward | null>(null);
    const [showReward, setShowReward] = useState(false);
    const [rounds, setRounds] = useState(0);

    const generateSequence = useCallback(() => {
        const newSeq: SequenceItem[] = [];
        const usedValues = new Set();
        
        for (let i = 0; i < itemCount; i++) {
            let type: 'number' | 'image' = 'number';
            if (gameType === 'images') type = 'image';
            else if (gameType === 'mixed') type = Math.random() > 0.5 ? 'number' : 'image';
            
            let value: string | number;
            if (type === 'number') {
                do {
                    value = Math.floor(Math.random() * 20) + 1;
                } while (usedValues.has(value));
            } else {
                do {
                    value = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
                } while (usedValues.has(value));
            }
            
            usedValues.add(value);
            newSeq.push({ id: i, type, value, order: i });
        }
        
        setSequence(newSeq);
        setShuffledOptions([...newSeq].sort(() => Math.random() - 0.5));
        setUserPicks([]);
        setTimeLeft(5);
        setGameState('showing');
    }, [itemCount, gameType]);

    useEffect(() => {
        let timer: ReturnType<typeof setInterval> | undefined;
        if (gameState === 'showing' && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        setGameState('playing');
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => {
            if (timer) clearInterval(timer);
        };
    }, [gameState, timeLeft]);

    const handleItemClick = (item: SequenceItem) => {
        if (gameState !== 'playing' || userPicks.some(p => p.id === item.id)) return;
        
        const nextOrder = userPicks.length;
        if (item.order === nextOrder) {
            soundManager.playCorrect();
            const newUserPicks = [...userPicks, item];
            setUserPicks(newUserPicks);
            
            if (newUserPicks.length === sequence.length) {
                setRounds(prev => prev + 1);
                if (rounds >= 4) { // Finish after 5 rounds
                    const res = trackGeneralGame('sequenceMemory', 30, true);
                    setReward({
                        sticker: res.unlockedSticker,
                        achievement: res.unlockedAchievement,
                        leveledUp: res.leveledUp,
                        xp: 30
                    });
                    setShowReward(true);
                    setGameState('finished');
                } else {
                    setTimeout(() => generateSequence(), 1000);
                }
            }
        } else {
            soundManager.playIncorrect();
            // Optional: visual feedback for wrong pick
        }
    };

    return (
        <div className="game-view sequence-memory-game">
            <div className="game-header">
                <button className="back-button" onClick={() => navigate('/')}>←</button>
                <div className="game-title-small">Sequenz-Meister</div>
                <div className="round-counter">Runde {rounds + 1}/5</div>
            </div>

            <AnimatePresence mode="wait">
                {gameState === 'setup' && (
                    <motion.div 
                        key="setup"
                        className="setup-screen glass-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        <h2>Spiel-Einstellungen ⚙️</h2>
                        
                        <div className="setting-group">
                            <label>Anzahl der Elemente: {itemCount}</label>
                            <input 
                                type="range" 
                                min="3" 
                                max="10" 
                                value={itemCount} 
                                onChange={(e) => setItemCount(parseInt(e.target.value))}
                                className="range-slider"
                            />
                        </div>

                        <div className="setting-group">
                            <label>Art der Elemente:</label>
                            <div className="type-toggle">
                                <button 
                                    className={gameType === 'numbers' ? 'active' : ''} 
                                    onClick={() => setGameType('numbers')}
                                >123</button>
                                <button 
                                    className={gameType === 'images' ? 'active' : ''} 
                                    onClick={() => setGameType('images')}
                                >🦁</button>
                                <button 
                                    className={gameType === 'mixed' ? 'active' : ''} 
                                    onClick={() => setGameType('mixed')}
                                >1🦁</button>
                            </div>
                        </div>

                        <button className="start-btn-huge" onClick={generateSequence}>
                            JETZT STARTEN! 🚀
                        </button>
                    </motion.div>
                )}

                {gameState === 'showing' && (
                    <motion.div 
                        key="showing"
                        className="game-content"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <div className="timer-display">
                            Merke dir die Reihenfolge! ⏳ {timeLeft}s
                        </div>
                        <div className="sequence-display">
                            {sequence.map((item, idx) => (
                                <motion.div 
                                    key={item.id}
                                    className="sequence-item glass-card"
                                    initial={{ scale: 0, rotate: -10 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                >
                                    <span className="item-value">{item.value}</span>
                                    <div className="item-order">{idx + 1}</div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {gameState === 'playing' && (
                    <motion.div 
                        key="playing"
                        className="game-content"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <div className="instruction-text">
                            In welcher Reihenfolge waren sie? 🤔
                        </div>
                        
                        <div className="pick-slots">
                            {sequence.map((_, idx) => (
                                <motion.div 
                                    key={idx} 
                                    className="pick-slot glass-card"
                                    initial={{ y: -50, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: idx * 0.1 }}
                                >
                                    {userPicks[idx] ? (
                                        <motion.span 
                                            initial={{ scale: 0, rotate: 20 }}
                                            animate={{ scale: 1, rotate: 0 }}
                                            className="picked-value"
                                        >
                                            {userPicks[idx].value}
                                        </motion.span>
                                    ) : (
                                        <span className="slot-number">{idx + 1}</span>
                                    )}
                                </motion.div>
                            ))}
                        </div>

                        <motion.div 
                            className="options-grid-seq"
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ type: 'spring', damping: 15 }}
                        >
                            {shuffledOptions.map((item) => (
                                <motion.button
                                    key={item.id}
                                    className={`option-btn glass-card ${userPicks.some(p => p.id === item.id) ? 'hidden' : ''}`}
                                    onClick={() => handleItemClick(item)}
                                    whileHover={{ scale: 1.1, zIndex: 10 }}
                                    whileTap={{ scale: 0.9 }}
                                    layout
                                >
                                    {item.value}
                                </motion.button>
                            ))}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <RewardCelebration 
                show={showReward}
                onClose={() => {
                    setShowReward(false);
                    setGameState('setup');
                    setRounds(0);
                }}
                reward={reward}
            />

            <style>{`
                .sequence-memory-game {
                    padding: 20px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    min-height: 100vh;
                    background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
                }

                .setup-screen {
                    width: 100%;
                    max-width: 500px;
                    padding: 40px;
                    display: flex;
                    flex-direction: column;
                    gap: 30px;
                    text-align: center;
                    margin-top: 50px;
                    border-radius: 30px;
                }

                .setting-group {
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                    text-align: left;
                }

                .setting-group label {
                    font-size: 1.2rem;
                    font-weight: 700;
                    color: #1e40af;
                }

                .range-slider {
                    width: 100%;
                    height: 12px;
                    -webkit-appearance: none;
                    background: #cbd5e1;
                    border-radius: 10px;
                    outline: none;
                }

                .range-slider::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    width: 25px;
                    height: 25px;
                    background: #3b82f6;
                    border-radius: 50%;
                    cursor: pointer;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                }

                .type-toggle {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 10px;
                }

                .type-toggle button {
                    padding: 15px;
                    border: 2px solid #e2e8f0;
                    background: white;
                    border-radius: 15px;
                    font-size: 1.5rem;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .type-toggle button.active {
                    background: #3b82f6;
                    border-color: #2563eb;
                    color: white;
                    transform: scale(1.05);
                }

                .start-btn-huge {
                    margin-top: 20px;
                    padding: 20px;
                    font-size: 1.5rem;
                    font-weight: 900;
                    background: linear-gradient(to right, #f59e0b, #fbbf24);
                    color: white;
                    border: none;
                    border-radius: 20px;
                    cursor: pointer;
                    box-shadow: 0 10px 20px rgba(245, 158, 11, 0.3);
                }

                .timer-display {
                    font-size: 1.5rem;
                    font-weight: 800;
                    color: #1e40af;
                    margin-bottom: 30px;
                    text-align: center;
                }

                .sequence-display {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    gap: 15px;
                    max-width: 800px;
                }

                .sequence-item {
                    width: 80px;
                    height: 100px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    background: white;
                    border-radius: 15px;
                    font-size: 2.5rem;
                    font-weight: 800;
                    border: 4px solid #3b82f6;
                }

                .item-order {
                    position: absolute;
                    bottom: -10px;
                    background: #3b82f6;
                    color: white;
                    font-size: 0.9rem;
                    padding: 2px 8px;
                    border-radius: 10px;
                }

                .instruction-text {
                    font-size: 1.5rem;
                    font-weight: 800;
                    color: #1e40af;
                    margin-bottom: 20px;
                    text-align: center;
                }

                .pick-slots {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    gap: 10px;
                    margin-bottom: 40px;
                }

                .pick-slot {
                    width: 70px;
                    height: 70px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: rgba(255, 255, 255, 0.5);
                    border: 2px dashed #3b82f6;
                    border-radius: 15px;
                }

                .slot-number {
                    color: #64748b;
                    font-weight: 700;
                }

                .picked-value {
                    font-size: 2rem;
                    font-weight: 800;
                    color: #1e40af;
                }

                .options-grid-seq {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    gap: 15px;
                    max-width: 600px;
                }

                .option-btn {
                    width: 80px;
                    height: 80px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: white;
                    border: 4px solid #e2e8f0;
                    border-radius: 20px;
                    font-size: 2.5rem;
                    font-weight: 800;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .option-btn.hidden {
                    opacity: 0;
                    pointer-events: none;
                    transform: scale(0.8);
                }

                .option-btn:hover {
                    border-color: #3b82f6;
                }
            `}</style>
        </div>
    );
};

export default SequenceMemoryGameView;
