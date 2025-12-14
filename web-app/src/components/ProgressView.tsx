import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import type { Progress } from '../utils/progressManager';
import { loadProgress, resetProgress } from '../utils/progressManager';

const ProgressView = () => {
    const navigate = useNavigate();
    const [progress, setProgress] = useState<Progress>(() => loadProgress());
    const [showResetModal, setShowResetModal] = useState(false);

    const handleReset = () => {
        const newProgress = resetProgress();
        setProgress(newProgress);
        setShowResetModal(false);
    };

    return (
        <div className="progress-view">
            <div className="reading-header">
                <button className="back-button" onClick={() => navigate('/')}>
                    ←
                </button>
                <h1 className="page-title">My Progress</h1>
                <div style={{ width: 48 }} />
            </div>

            <div className="progress-content">
                {/* Stats Card */}
                <div className="stats-card">
                    <div className="stats-grid">
                        <div className="stat-item">
                            <div className="icon">✅</div>
                            <div className="value">{progress.totalCorrectAnswers}</div>
                            <div className="label">Total Correct</div>
                        </div>
                        <div className="stat-item">
                            <div className="icon">⭐</div>
                            <div className="value">{progress.highScore}</div>
                            <div className="label">High Score</div>
                        </div>
                        <div className="stat-item">
                            <div className="icon">🎮</div>
                            <div className="value">{progress.gamesPlayed}</div>
                            <div className="label">Games Played</div>
                        </div>
                    </div>
                </div>

                {/* Achievements */}
                <div className="achievements-section">
                    <h2>Achievements</h2>
                    <div className="achievements-list">
                        {progress.achievements.map(achievement => (
                            <motion.div
                                key={achievement.id}
                                className="achievement-card"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <div className={`icon ${achievement.isUnlocked ? 'unlocked' : 'locked'}`}>
                                    {achievement.isUnlocked ? '🏆' : '🔒'}
                                </div>
                                <div className="info">
                                    <h3>{achievement.title}</h3>
                                    <p>{achievement.description}</p>
                                </div>
                                {achievement.isUnlocked && (
                                    <div className="check">✓</div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Reset Button */}
                <button
                    className="reset-progress-button"
                    onClick={() => setShowResetModal(true)}
                >
                    Reset Progress
                </button>
            </div>

            {/* Reset Confirmation Modal */}
            <AnimatePresence>
                {showResetModal && (
                    <motion.div
                        className="modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowResetModal(false)}
                    >
                        <motion.div
                            className="modal-content"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            onClick={e => e.stopPropagation()}
                        >
                            <h2>Reset Progress</h2>
                            <p>Are you sure you want to reset all progress? This action cannot be undone.</p>
                            <div className="modal-buttons">
                                <button className="cancel" onClick={() => setShowResetModal(false)}>
                                    Cancel
                                </button>
                                <button className="confirm" onClick={handleReset}>
                                    Reset
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProgressView;
