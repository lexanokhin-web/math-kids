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
            {/* Status Bar for quick view */}
            <div className="menu-status-bar glass-card" style={{ margin: '0 auto 20px', maxWidth: '600px' }}>
                <div className="status-item">
                    <span className="label">LVL</span>
                    <span className="value">{progress.level}</span>
                </div>
                <div className="status-xp-container">
                    <div className="status-xp-bar" style={{ width: `${progress.xp % 100}%` }} />
                </div>
                {progress.streakCount > 0 && (
                    <div className="status-item streak">
                        <span className="icon">🔥</span>
                        <span className="value">{progress.streakCount}</span>
                    </div>
                )}
            </div>

            <div className="reading-header" style={{ maxWidth: '600px', margin: '0 auto 20px' }}>
                <button className="back-button" onClick={() => navigate('/')}>
                    ←
                </button>
                <h1 className="page-title">Mein Fortschritt</h1>
                <div style={{ width: 48 }} />
            </div>

            <div className="progress-content">
                {/* Level and XP Section */}
                <div className="level-stats glass-card">
                    <div className="level-header">
                        <h2>Level {progress.level}</h2>
                        <span className="level-badge">Lern-Star ⭐</span>
                    </div>
                    <div className="xp-bar-container">
                        <div 
                            className="xp-bar-fill" 
                            style={{ width: `${(progress.xp % 100)}%` }}
                        />
                    </div>
                    <div className="xp-text">{progress.xp % 100} / 100 XP bis zum nächsten Level</div>
                </div>

                {/* Stats Card */}
                <div className="stats-card">
                    <div className="stats-grid">
                        <div className="stat-item">
                            <div className="icon">✅</div>
                            <div className="value">{progress.totalCorrectAnswers}</div>
                            <div className="label">Richtig</div>
                        </div>
                        <div className="stat-item">
                            <div className="icon">📖</div>
                            <div className="value">{progress.readingCardsCount}</div>
                            <div className="label">Gelesen</div>
                        </div>
                        <div className="stat-item">
                            <div className="icon">🎮</div>
                            <div className="value">{progress.gamesPlayed}</div>
                            <div className="label">Spiele</div>
                        </div>
                    </div>
                </div>

                {/* Sticker Book Shortcut */}
                <motion.div 
                    className="collage-shortcut glass-card"
                    whileHover={{ scale: 1.02 }}
                    onClick={() => navigate('/sticker-book')}
                    style={{ 
                        margin: '30px 0', 
                        padding: '20px', 
                        cursor: 'pointer', 
                        background: 'linear-gradient(135deg, #fef3c7 0%, #fff 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '15px'
                    }}
                >
                    <div style={{ fontSize: '3rem' }}>📒</div>
                    <div style={{ flex: 1 }}>
                        <h3 style={{ margin: 0 }}>Mein Stickerbuch</h3>
                        <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
                            Du hast {progress.unlockedStickers.length} Sticker gesammelt! Tippe hier, um sie alle zu sehen.
                        </p>
                    </div>
                    <div style={{ fontSize: '1.5rem', color: '#f59e0b' }}>→</div>
                </motion.div>

                {/* Game Levels Progress */}
                <div className="achievements-section" style={{ marginTop: '40px' }}>
                    <h2>Spiele-Levels</h2>
                    <div className="game-levels-grid">
                        {[
                            { id: 'artikel', name: 'Artikel-König', icon: '👑', color: '#f59e0b', lvl: progress.artikelLevel },
                            { id: 'syllable', name: 'Silben-Zug', icon: '🚂', color: '#ec4899', lvl: progress.syllableLevel },
                            { id: 'sequence', name: 'Zahlen-Schlange', icon: '🐍', color: '#f97316', lvl: progress.sequenceLevel },
                            { id: 'rhyme', name: 'Reim-Detektiv', icon: '🕵️', color: '#6366f1', lvl: progress.rhymeLevel },
                            { id: 'gap', name: 'Lücken-Füller', icon: '✍️', color: '#14b8a6', lvl: progress.gapLevel },
                            { id: 'bridge', name: 'Rechen-Brücke', icon: '🌉', color: '#8b5cf6', lvl: progress.bridgeLevel },
                            { id: 'image_match', name: 'Bild-Wort', icon: '🖼️', color: '#f43f5e', lvl: progress.imageMatchLevel },
                            { id: 'unscramble', name: 'Wort-Salat', icon: '🥗', color: '#d946ef', lvl: progress.unscrambleLevel },
                            { id: 'comparison', name: 'Größer/Kleiner', icon: '🐊', color: '#10b981', lvl: progress.comparisonLevel },
                            { id: 'sequence_memory', name: 'Sequenz-Meister', icon: '🧠', color: '#6366f1', lvl: progress.sequenceMemoryLevel },
                        ].map(game => (
                            <div key={game.id} className="game-progress-card glass-card">
                                <div className="game-icon-small" style={{ background: game.color }}>{game.icon}</div>
                                <div className="game-info">
                                    <div className="game-name">{game.name}</div>
                                    <div className="game-lvl-text">Level {game.lvl || 1} / 50</div>
                                    <div className="game-progress-mini">
                                        <div className="bar-fill" style={{ width: `${((game.lvl || 1) / 50) * 100}%`, background: game.color }} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Achievements */}
                <div className="achievements-section">
                    <h2>Meine Erfolge</h2>
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
                    Fortschritt zurücksetzen
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
                            <h2>Fortschritt zurücksetzen</h2>
                            <p>Bist du sicher, dass du den gesamten Fortschritt zurücksetzen willst? Dies kann nicht rückgängig gemacht werden.</p>
                            <div className="modal-buttons">
                                <button className="cancel" onClick={() => setShowResetModal(false)}>
                                    Abbrechen
                                </button>
                                <button className="confirm" onClick={handleReset}>
                                    Zurücksetzen
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
