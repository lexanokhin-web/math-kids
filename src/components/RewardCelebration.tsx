import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useEffect } from 'react';
import type { Achievement } from '../utils/progressManager';
import type { Sticker } from '../utils/stickerData';
import getTranslation from '../utils/translationData';

export interface Reward {
    xp?: number;
    leveledUp?: boolean;
    achievement?: Achievement | null;
    sticker?: Sticker | null;
}

interface RewardCelebrationProps {
    show: boolean;
    onClose: () => void;
    reward: Reward | null;
}

const RewardCelebration = ({ show, onClose, reward }: RewardCelebrationProps) => {
    useEffect(() => {
        if (show) {
            // Initial burst
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#4f46e5', '#ec4899', '#f59e0b', '#2dd4bf']
            });

            // Delayed fireworks if leveled up
            if (reward?.leveledUp) {
                const duration = 3 * 1000;
                const end = Date.now() + duration;

                const frame = () => {
                    confetti({
                        particleCount: 2,
                        angle: 60,
                        spread: 55,
                        origin: { x: 0 },
                        colors: ['#ec4899', '#f59e0b']
                    });
                    confetti({
                        particleCount: 2,
                        angle: 120,
                        spread: 55,
                        origin: { x: 1 },
                        colors: ['#4f46e5', '#2dd4bf']
                    });

                    if (Date.now() < end) {
                        requestAnimationFrame(frame);
                    }
                };
                frame();
            }
        }
    }, [show, reward]);

    if (!reward) return null;

    const { xp = 10, leveledUp, achievement, sticker } = reward;

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    className="feedback-overlay celebrate-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.div
                        className="feedback-content celebrate-content reward-content"
                        initial={{ scale: 0, rotate: -10 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 10 }}
                        onClick={e => e.stopPropagation()}
                    >
                        <h2 className="reward-title">✨ Fantastisch! ✨</h2>
                        
                        <div className="reward-details">
                            <div className="reward-item xp">
                                <span className="icon">⭐</span>
                                <span>+{xp} XP gesammelt</span>
                            </div>

                            {leveledUp && (
                                <motion.div 
                                    className="reward-item level-up celebrate-pulse"
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <span className="icon">🏆</span>
                                    <span>LEVEL UP!</span>
                                </motion.div>
                            )}

                            {achievement && (
                                <motion.div 
                                    className="reward-item achievement"
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    <span className="icon">🎖️</span>
                                    <span>{achievement.title}</span>
                                </motion.div>
                            )}
                        </div>

                        {sticker && (
                            <motion.div 
                                className="sticker-reveal"
                                initial={{ scale: 0, y: 50 }}
                                animate={{ scale: 1, y: 0 }}
                                transition={{ type: 'spring', damping: 12, delay: 0.6 }}
                            >
                                <div className="sticker-glow" />
                                <span className="sticker-emoji">{sticker.emoji}</span>
                                <p className="sticker-name">{getTranslation('Neuer Sticker') || 'Neuer Sticker'}: {getTranslation(sticker.name) || sticker.name}</p>
                            </motion.div>
                        )}

                        <button className="control-button shimmer-btn" onClick={onClose} style={{ marginTop: 30 }}>
                            Weiter so! 🚀
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default RewardCelebration;
