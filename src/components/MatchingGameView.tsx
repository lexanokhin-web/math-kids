import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { antonymsData } from '../utils/antonymsData';
import { synonymsData } from '../utils/synonymsData';
import { soundManager } from '../utils/soundManager';
import { trackMatchingGame } from '../utils/progressManager';
import RewardCelebration, { type Reward } from './RewardCelebration';

interface Card {
    id: string;
    word: string;
    pairId: number;
}

const MatchingGameView = () => {
    const { type } = useParams<{ type: string }>();
    const navigate = useNavigate();
    const [cards, setCards] = useState<Card[]>([]);
    const [selected, setSelected] = useState<number[]>([]);
    const [matched, setMatched] = useState<number[]>([]);
    const [score, setScore] = useState(0);
    const [isProcessing, setIsProcessing] = useState(false);
    const [reward, setReward] = useState<Reward | null>(null);
    const [showReward, setShowReward] = useState(false);

    const isSynonyms = type === 'synonyms';
    const gameData = isSynonyms ? synonymsData : antonymsData;
    const title = isSynonyms ? "Gleiche Wörter finden" : "Gegenteile finden";
    const subtitle = isSynonyms ? "Finde Wörter mit der gleichen Bedeutung!" : "Finde die passenden Wortpaare!";

    const initGame = useCallback(() => {
        const shuffled = [...gameData].sort(() => 0.5 - Math.random());
        const selectedPairs = shuffled.slice(0, 5);

        const flatCards: Card[] = [];
        selectedPairs.forEach((pair, index) => {
            flatCards.push({ id: `c1-${index}`, word: pair.word1, pairId: index });
            flatCards.push({ id: `c2-${index}`, word: pair.word2, pairId: index });
        });

        setCards(flatCards.sort(() => 0.5 - Math.random()));
        setMatched([]);
        setSelected([]);
        setScore(0);
        setIsProcessing(false);
        setReward(null);
        setShowReward(false);
    }, [gameData]);

    useEffect(() => {
        const timer = setTimeout(() => {
            initGame();
        }, 0);
        return () => clearTimeout(timer);
    }, [initGame]);


    const handleCardClick = (index: number) => {
        if (isProcessing || matched.includes(cards[index].pairId) || selected.includes(index) || showReward) {
            return;
        }

        const newSelected = [...selected, index];
        setSelected(newSelected);
        soundManager.playClick();

        if (newSelected.length === 2) {
            setIsProcessing(true);
            const [firstIdx, secondIdx] = newSelected;

            if (cards[firstIdx].pairId === cards[secondIdx].pairId) {
                setMatched(prev => [...prev, cards[firstIdx].pairId]);
                setSelected([]);
                setScore(s => s + 1);
                soundManager.playCorrect();
                setIsProcessing(false);

                if (matched.length + 1 === 5) {
                    const result = trackMatchingGame(type as 'antonyms' | 'synonyms');
                    setReward({
                        sticker: result.unlockedSticker,
                        achievement: result.unlockedAchievement,
                        leveledUp: result.leveledUp
                    });
                    setTimeout(() => setShowReward(true), 500);
                }
            } else {
                soundManager.playIncorrect();
                setTimeout(() => {
                    setSelected([]);
                    setIsProcessing(false);
                }, 800);
            }
        }
    };

    return (
        <div className="game-view matching-game">
            <div className="game-header">
                <button className="back-button" onClick={() => navigate('/')}>
                    ←
                </button>

                <div className="score-display">
                    <span className="star">⭐</span>
                    <span>Score: {score}/5</span>
                </div>

                <button className="reset-button" onClick={initGame}>
                    🔄
                </button>
            </div>

            <h2 className="section-header center">{title}</h2>
            <p className="game-subtitle">{subtitle}</p>

            <div className="matching-grid">
                {cards.map((card, index) => {
                    const isSelected = selected.includes(index);
                    const isMatched = matched.includes(card.pairId);

                    return (
                        <motion.div
                            key={card.id}
                            className={`matching-card ${isSelected ? 'selected' : ''} ${isMatched ? 'matched' : ''}`}
                            onClick={() => handleCardClick(index)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className="card-word">{card.word}</span>
                        </motion.div>
                    );
                })}
            </div>

            <RewardCelebration 
                show={showReward}
                onClose={initGame}
                reward={reward}
            />
        </div>
    );
};

export default MatchingGameView;
