import React from 'react';
import { motion } from 'framer-motion';

interface LevelSelectionOverlayProps {
    gameId: string;
    currentLevel: number;
    maxAvailableLevel?: number; // usually 50
    onSelectLevel: (level: number) => void;
    onClose: () => void;
    icon: string;
    title: string;
}

const LevelSelectionOverlay: React.FC<LevelSelectionOverlayProps> = ({
    currentLevel,
    onSelectLevel,
    onClose,
    icon,
    title
}) => {
    const tiers = [
        { id: 1, name: 'Einfach', desc: 'Ideal zum Lernen und Üben', icon: '🌱' },
        { id: 2, name: 'Mittel', desc: 'Für Fortgeschrittene', icon: '🚀' },
        { id: 3, name: 'Schwer', desc: 'Die ultimative Herausforderung', icon: '👑' }
    ];

    return (
        <motion.div 
            className="level-overlay-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div 
                className="level-card-container glass-card"
                initial={{ y: 50, scale: 0.9 }}
                animate={{ y: 0, scale: 1 }}
            >
                <div className="level-card-header">
                    <span className="game-icon-large">{icon}</span>
                    <div className="title-stack">
                        <h2>{title}</h2>
                        <p>Wähle einen Schwierigkeitsgrad</p>
                    </div>
                    <button className="close-btn-round" onClick={onClose}>✕</button>
                </div>

                <div className="levels-scroll-area">
                    <div className="tiers-grid">
                        {tiers.map((t) => {
                            const isLocked = false; // Levels are no longer locked by progression
                            const isCurrent = t.id === (currentLevel || 1);
                            
                            return (
                                <motion.button
                                    key={t.id}
                                    className={`tier-card ${isLocked ? 'locked' : ''} ${isCurrent ? 'current' : ''}`}
                                    whileHover={!isLocked ? { scale: 1.05, y: -5 } : {}}
                                    whileTap={!isLocked ? { scale: 0.95 } : {}}
                                    onClick={() => !isLocked && onSelectLevel(t.id)}
                                    disabled={isLocked}
                                >
                                    <span className="tier-icon">{t.icon}</span>
                                    <div className="tier-info">
                                        <h3>{t.name}</h3>
                                        <p>{t.desc}</p>
                                    </div>
                                    {isLocked && <span className="tier-lock">🔒</span>}
                                    {isCurrent && <div className="active-tag">Aktiv</div>}
                                </motion.button>
                            );
                        })}
                    </div>
                </div>
            </motion.div>

            <style>{`
                .level-overlay-backdrop {
                    position: fixed;
                    inset: 0;
                    background: rgba(15, 23, 42, 0.8);
                    backdrop-filter: blur(8px);
                    z-index: 1000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 20px;
                }
                .level-card-container {
                    width: 100%;
                    max-width: 800px;
                    max-height: 90vh;
                    background: white;
                    border-radius: 40px;
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
                }
                .level-card-header {
                    padding: 30px 40px;
                    display: flex;
                    align-items: center;
                    gap: 20px;
                    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
                    border-bottom: 2px solid #e2e8f0;
                }
                .game-icon-large { font-size: 3.5rem; }
                .title-stack h2 { margin: 0; font-size: 2rem; font-weight: 800; color: #1e293b; }
                .title-stack p { margin: 0; color: #64748b; font-weight: 600; }
                
                .close-btn-round {
                    margin-left: auto;
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    border: none;
                    background: #f1f5f9;
                    font-size: 1.2rem;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.2s;
                }
                .close-btn-round:hover { background: #e2e8f0; transform: rotate(90deg); }

                .levels-scroll-area {
                    flex: 1;
                    overflow-y: auto;
                    padding: 40px;
                    background: #fdfdfd;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .tiers-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
                    gap: 25px;
                    width: 100%;
                    max-width: 900px;
                }
                .tier-card {
                    padding: 30px;
                    border: 3px solid transparent;
                    border-radius: 32px;
                    background: #f8fafc;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                    cursor: pointer;
                    position: relative;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
                }
                .tier-card.locked {
                    opacity: 0.6;
                    cursor: not-allowed;
                    filter: grayscale(0.5);
                }
                .tier-card.current {
                    background: white;
                    border-color: #3b82f6;
                    box-shadow: 0 20px 40px -12px rgba(59, 130, 246, 0.2);
                }
                .tier-icon {
                    font-size: 3.5rem;
                    margin-bottom: 20px;
                }
                .tier-info h3 {
                    margin: 0 0 10px 0;
                    font-size: 1.5rem;
                    font-weight: 800;
                    color: #1e293b;
                }
                .tier-info p {
                    margin: 0;
                    font-size: 0.95rem;
                    color: #64748b;
                    line-height: 1.5;
                }
                .tier-lock {
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    font-size: 1.2rem;
                }
                .active-tag {
                    margin-top: 20px;
                    padding: 6px 16px;
                    background: #3b82f6;
                    color: white;
                    border-radius: 20px;
                    font-weight: 700;
                    font-size: 0.8rem;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }

                @media (max-width: 640px) {
                    .level-overlay-backdrop { padding: 10px; }
                    .level-card-container { 
                        border-radius: 32px; 
                        max-height: 90vh; 
                        width: 98%;
                        box-shadow: 0 20px 40px -10px rgba(0,0,0,0.4);
                    }
                    .level-card-header { 
                        padding: 20px; 
                        gap: 15px;
                    }
                    .game-icon-large { font-size: 2.2rem; }
                    .title-stack h2 { font-size: 1.4rem; line-height: 1.2; }
                    .title-stack p { font-size: 0.9rem; opacity: 0.8; }
                    .close-btn-round { width: 40px; height: 40px; font-size: 1rem; }
                    
                    .levels-scroll-area { 
                        padding: 20px; 
                        align-items: flex-start;
                        justify-content: flex-start;
                    }
                    .tiers-grid { 
                        display: flex;
                        flex-direction: column;
                        gap: 15px; 
                        width: 100%;
                    }
                    .tier-card {
                        padding: 16px 20px;
                        border-radius: 24px;
                        flex-direction: row;
                        align-items: center;
                        text-align: left;
                        gap: 18px;
                        border-width: 2px;
                        min-height: 100px;
                    }
                    .tier-card.current {
                        background: linear-gradient(135deg, #ffffff 0%, #eff6ff 100%);
                        border-color: #3b82f6;
                        box-shadow: 0 10px 20px -5px rgba(59, 130, 246, 0.15);
                    }
                    .tier-icon {
                        font-size: 2.2rem;
                        margin-bottom: 0;
                        min-width: 50px;
                        height: 50px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    .tier-info {
                        flex: 1;
                    }
                    .tier-info h3 {
                        font-size: 1.2rem;
                        margin-bottom: 2px;
                        color: #1e293b;
                    }
                    .tier-info p {
                        font-size: 0.85rem;
                        line-height: 1.3;
                        color: #64748b;
                    }
                    .active-tag {
                        position: absolute;
                        top: 10px;
                        right: 20px;
                        margin-top: 0;
                        padding: 2px 8px;
                        font-size: 0.6rem;
                        letter-spacing: 0.02em;
                    }
                }
            `}</style>
        </motion.div>
    );
};

export default LevelSelectionOverlay;
