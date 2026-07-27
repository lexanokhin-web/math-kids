import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { loadProgress } from '../utils/progressManager';
import { STICKER_COLLECTIONS, RARITY_CONFIG } from '../utils/stickerData';
import type { Sticker } from '../utils/stickerData';
import getTranslation from '../utils/translationData';

const StickerBookView = () => {
    const navigate = useNavigate();
    const [progress] = useState(() => loadProgress());
    const [selectedSticker, setSelectedSticker] = useState<Sticker | null>(null);

    const totalStickers = STICKER_COLLECTIONS.reduce((acc, c) => acc + c.stickers.length, 0);
    const unlockedCount = progress.unlockedStickers.length;

    return (
        <div className="sticker-book-view">
            <div className="reading-header glass-card" style={{ maxWidth: '800px', margin: '0 auto 20px', padding: '15px 25px' }}>
                <button className="back-button" onClick={() => navigate('/')}>
                    ←
                </button>
                <div style={{ textAlign: 'center', flex: 1 }}>
                    <h1 className="page-title" style={{ margin: 0, fontSize: '1.8rem' }}>{getTranslation('Mein Stickerbuch') || 'Mein Stickerbuch'} 📖</h1>
                    <div className="sticker-stats-summary">
                        {getTranslation('Gesammelt') || 'Gesammelt'}: <strong>{unlockedCount} / {totalStickers}</strong>
                        <div className="progress-bar-mini">
                            <div className="fill" style={{ width: `${(unlockedCount / totalStickers) * 100}%` }} />
                        </div>
                    </div>
                </div>
                <div style={{ width: 48 }} />
            </div>

            <div className="sticker-book-content" style={{ maxWidth: '900px', margin: '0 auto' }}>
                {STICKER_COLLECTIONS.map(collection => {
                    const collectionUnlockedCount = collection.stickers.filter(s => progress.unlockedStickers.includes(s.id)).length;
                    const isComplete = collectionUnlockedCount === collection.stickers.length;

                    return (
                        <section key={collection.id} className={`collection-section glass-card ${isComplete ? 'complete' : ''}`}>
                            <div className="collection-header">
                                <span className="icon">{collection.icon}</span>
                                <div className="info">
                                    <h3>{getTranslation(collection.name) || collection.name}</h3>
                                    <p className="bonus">{getTranslation('Bonus') || 'Bonus'}: {getTranslation(collection.bonusTitle) || collection.bonusTitle}</p>
                                </div>
                                <div className="count">
                                    {collectionUnlockedCount} / {collection.stickers.length}
                                </div>
                            </div>

                            <div className="stickers-grid">
                                {collection.stickers.map(sticker => {
                                    const isUnlocked = progress.unlockedStickers.includes(sticker.id);
                                    const rarity = RARITY_CONFIG[sticker.rarity];
                                    const isEpic = sticker.rarity === 'epic';
                                    const isLegendary = sticker.rarity === 'legendary';

                                    return (
                                        <motion.div
                                            key={sticker.id}
                                            className={`sticker-card ${isUnlocked ? 'unlocked' : 'locked'} rarity-${sticker.rarity}`}
                                            whileHover={{ scale: 1.05 }}
                                            onClick={() => isUnlocked && setSelectedSticker(sticker)}
                                            style={{ '--rarity-color': rarity.color } as React.CSSProperties}
                                        >
                                            <div className="sticker-wrapper">
                                                <motion.span 
                                                    className="emoji"
                                                    animate={
                                                        isLegendary && isUnlocked ? { 
                                                            rotate: [0, 10, -10, 0],
                                                            scale: [1, 1.15, 1],
                                                            filter: ['drop-shadow(0 0 5px gold)', 'drop-shadow(0 0 20px gold)', 'drop-shadow(0 0 5px gold)']
                                                        } : isEpic && isUnlocked ? {
                                                            y: [0, -5, 0],
                                                            scale: [1, 1.05, 1]
                                                        } : {}
                                                    }
                                                    transition={{ repeat: Infinity, duration: isLegendary ? 3 : 2 }}
                                                >
                                                    {sticker.emoji}
                                                </motion.span>
                                                {!isUnlocked && <div className="lock-overlay">🔒</div>}
                                            </div>
                                            {isUnlocked && <span className="sticker-name">{getTranslation(sticker.name) || sticker.name}</span>}
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </section>
                    );
                })}
            </div>

            <AnimatePresence>
                {selectedSticker && (
                    <motion.div 
                        className="modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedSticker(null)}
                        style={{ zIndex: 1000 }}
                    >
                        <motion.div 
                            className="sticker-detail-card"
                            initial={{ scale: 0.5, y: 50 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.5, y: 50 }}
                            onClick={e => e.stopPropagation()}
                            style={{ 
                                border: `8px solid ${RARITY_CONFIG[selectedSticker.rarity].color}`,
                                boxShadow: `0 0 50px ${RARITY_CONFIG[selectedSticker.rarity].color}44`
                            }}
                        >
                             <div className="rarity-badge" style={{ background: RARITY_CONFIG[selectedSticker.rarity].color }}>
                                {(getTranslation(RARITY_CONFIG[selectedSticker.rarity].name) || RARITY_CONFIG[selectedSticker.rarity].name).toUpperCase()}
                            </div>
                            <span className="big-emoji">{selectedSticker.emoji}</span>
                            <h2>{getTranslation(selectedSticker.name) || selectedSticker.name}</h2>
                            <p>{getTranslation('Teil der') || 'Teil der'} <strong>{getTranslation(STICKER_COLLECTIONS.find(c => c.id === selectedSticker.collectionId)?.name || '') || STICKER_COLLECTIONS.find(c => c.id === selectedSticker.collectionId)?.name}</strong> {getTranslation('Kollektion') || 'Kollektion'}</p>
                            <button onClick={() => setSelectedSticker(null)}>{getTranslation('Toll!') || 'Toll!'} ✨</button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
                .sticker-book-view {
                    padding: 20px;
                    min-height: 100vh;
                }
                .sticker-stats-summary {
                    font-size: 0.9rem;
                    color: #64748b;
                }
                .progress-bar-mini {
                    width: 100%;
                    height: 6px;
                    background: #e2e8f0;
                    border-radius: 3px;
                    overflow: hidden;
                    margin-top: 4px;
                }
                .progress-bar-mini .fill {
                    height: 100%;
                    background: var(--color-success);
                }
                .collection-section {
                    margin-bottom: 30px;
                    padding: 25px;
                    border-radius: 30px;
                }
                .collection-section.complete {
                    border: 3px solid #fbbf24;
                }
                .collection-header {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    margin-bottom: 20px;
                }
                .collection-header .icon { font-size: 2.5rem; }
                .collection-header h3 { margin: 0; font-size: 1.5rem; font-weight: 800; }
                .collection-header .bonus { margin: 0; color: #e67e22; font-weight: 600; font-size: 0.9rem; }
                .collection-header .count { margin-left: auto; font-weight: 800; background: #f1f5f9; padding: 5px 15px; border-radius: 20px; }
                
                .stickers-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
                    gap: 15px;
                }
                
                .sticker-card {
                    background: white;
                    border-radius: 20px;
                    padding: 15px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 10px;
                    cursor: pointer;
                    position: relative;
                    border: 3px solid #f1f5f9;
                    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
                }
                
                .sticker-card.locked {
                    filter: grayscale(1);
                    opacity: 0.6;
                    background: #f8fafc;
                }
                
                .sticker-card.unlocked {
                    border-color: var(--rarity-color);
                }
                
                .sticker-wrapper {
                   position: relative;
                   font-size: 3.5rem;
                   height: 60px;
                   display: flex;
                   align-items: center;
                   justify-content: center;
                }
                
                .lock-overlay {
                    position: absolute;
                    inset: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.2rem;
                    background: rgba(255,255,255,0.2);
                    border-radius: 50%;
                }
                
                .sticker-name {
                    font-size: 0.8rem;
                    font-weight: 800;
                    text-align: center;
                    color: #475569;
                }
                
                .sticker-detail-card {
                    background: white;
                    padding: 40px;
                    border-radius: 40px;
                    text-align: center;
                    max-width: 400px;
                    width: 100%;
                    position: relative;
                }
                
                .big-emoji { font-size: 8rem; margin: 20px 0; display: block; }
                .rarity-badge {
                    position: absolute;
                    top: 20px;
                    left: 20px;
                    padding: 5px 15px;
                    border-radius: 20px;
                    color: white;
                    font-weight: 800;
                    font-size: 0.8rem;
                }
                
                .sticker-detail-card button {
                    margin-top: 30px;
                    padding: 12px 30px;
                    border-radius: 15px;
                    border: none;
                    background: #3b82f6;
                    color: white;
                    font-weight: 800;
                    cursor: pointer;
                }

                @media (max-width: 480px) {
                    .stickers-grid {
                        grid-template-columns: repeat(3, 1fr);
                        gap: 8px;
                    }
                    .sticker-card { padding: 10px 5px; }
                    .sticker-wrapper { font-size: 2rem; height: 40px; }
                    .sticker-name { font-size: 0.65rem; }
                }
            `}</style>
        </div>
    );
};

export default StickerBookView;
