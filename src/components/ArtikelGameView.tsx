import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    artikelKlasse2List, 
    type ArtikelKlasse2Item, 
    type Gender, 
    type WortKategorie 
} from '../data/grundwortschatzKlasse2';
import { trackGeneralGame, loadProgress, setGameLevel } from '../utils/progressManager';
import { soundManager } from '../utils/soundManager';
import { speakGerman } from '../utils/germanSpeech';
import RewardCelebration, { type Reward } from './RewardCelebration';
import LevelSelectionOverlay from './LevelSelectionOverlay';

type GameMode = 'quiz' | 'baskets';

const CATEGORIES: { id: 'all' | WortKategorie; label: string; icon: string }[] = [
    { id: 'all', label: 'Alle Wörter', icon: '⭐' },
    { id: 'schule', label: 'Schule', icon: '🏫' },
    { id: 'tiere', label: 'Tiere', icon: '🐾' },
    { id: 'haus', label: 'Haus & Familie', icon: '🏡' },
    { id: 'essen', label: 'Essen & Trinken', icon: '🍎' },
    { id: 'koerper', label: 'Körper & Kleidung', icon: '👕' },
    { id: 'natur', label: 'Natur & Wetter', icon: '🌳' },
];

const ArtikelGameView: React.FC = () => {
    const navigate = useNavigate();

    // Player Progress & Level
    const [playerProgress, setPlayerProgress] = useState(loadProgress());
    const [level, setLevel] = useState<number>(playerProgress.artikelLevel || 1);
    const [showLevelPicks, setShowLevelPicks] = useState(false);
    const [showTipsModal, setShowTipsModal] = useState(false);

    // Filter & Mode
    const [selectedCategory, setSelectedCategory] = useState<'all' | WortKategorie>('all');
    const [mode, setMode] = useState<GameMode>('quiz');

    // Round items
    const [currentItems, setCurrentItems] = useState<ArtikelKlasse2Item[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isWrong, setIsWrong] = useState(false);
    const [solvedFeedback, setSolvedFeedback] = useState<{
        word: string;
        gender: Gender;
        plural: string;
        tip?: string;
    } | null>(null);

    // Basket mode collected words
    const [basketItems, setBasketItems] = useState<{
        der: ArtikelKlasse2Item[];
        die: ArtikelKlasse2Item[];
        das: ArtikelKlasse2Item[];
    }>({ der: [], die: [], das: [] });

    // Rewards
    const [reward, setReward] = useState<Reward | null>(null);
    const [showReward, setShowReward] = useState(false);
    const [, setScore] = useState(0);
    const [streak, setStreak] = useState(0);

    // Initialize round
    const initGame = useCallback((lvl: number = level, cat: 'all' | WortKategorie = selectedCategory) => {
        let pool = artikelKlasse2List;

        if (cat !== 'all') {
            pool = pool.filter(item => item.category === cat);
        }

        if (lvl === 1) {
            pool = pool.filter(item => item.level === 1);
        } else if (lvl === 2) {
            pool = pool.filter(item => item.level <= 2);
        }

        // Fallback if pool is small for a specific category
        if (pool.length === 0) {
            pool = artikelKlasse2List;
        }

        const shuffled = [...pool].sort(() => 0.5 - Math.random());
        const session = shuffled.slice(0, 10);

        setCurrentItems(session);
        setCurrentIndex(0);
        setIsWrong(false);
        setSolvedFeedback(null);
        setBasketItems({ der: [], die: [], das: [] });
        setReward(null);
        setShowReward(false);
        setShowLevelPicks(false);
        setScore(0);
        setStreak(0);
    }, [level, selectedCategory]);

    const hasInitialized = useRef(false);
    useEffect(() => {
        if (!hasInitialized.current) {
            hasInitialized.current = true;
            initGame(level, selectedCategory);
        }
    }, [initGame, level, selectedCategory]);

    const handleSelectLevel = useCallback((l: number) => {
        setLevel(l);
        setShowReward(false);
        const newProgress = setGameLevel('artikel', l);
        setPlayerProgress(newProgress);
        initGame(l, selectedCategory);
    }, [initGame, selectedCategory]);

    const handleCategoryChange = (cat: 'all' | WortKategorie) => {
        setSelectedCategory(cat);
        initGame(level, cat);
    };

    // Pronounce the word
    const handleSpeakCurrent = (customText?: string) => {
        const textToSpeak = customText || currentItems[currentIndex]?.word;
        if (!textToSpeak) return;
        speakGerman(textToSpeak);
    };

    const handleSelect = (gender: Gender) => {
        if (solvedFeedback) return; // Prevent double taps during transition
        const current = currentItems[currentIndex];
        if (!current) return;

        if (gender === current.gender) {
            soundManager.playCorrect();
            setScore(prev => prev + 10);
            setStreak(prev => prev + 1);

            // Add to basket in basket mode
            setBasketItems(prev => ({
                ...prev,
                [gender]: [...prev[gender], current]
            }));

            // Show feedback with plural form
            setSolvedFeedback({
                word: current.word,
                gender: current.gender,
                plural: current.plural,
                tip: current.tip
            });

            // Read the correct article + word + plural aloud
            speakGerman(`${current.gender} ${current.word}. Mehrzahl: ${current.plural}`);

            setTimeout(() => {
                if (currentIndex + 1 < currentItems.length) {
                    setCurrentIndex(prev => prev + 1);
                    setIsWrong(false);
                    setSolvedFeedback(null);
                } else {
                    // Win!
                    const result = trackGeneralGame('artikel', 25, true);
                    setReward({
                        sticker: result.unlockedSticker,
                        achievement: result.unlockedAchievement,
                        leveledUp: result.leveledUp,
                        xp: 25
                    });
                    setShowReward(true);
                    setPlayerProgress(result.progress);
                    setSolvedFeedback(null);
                }
            }, 1200);
        } else {
            soundManager.playIncorrect();
            setIsWrong(true);
            setStreak(0);
            speakGerman(`Nicht ${gender}, versuche es noch einmal!`);
            setTimeout(() => setIsWrong(false), 600);
        }
    };

    const currentItem = currentItems[currentIndex];

    const getDifficultyName = (l: number) => {
        if (l === 1) return 'Stufe 1: Basis';
        if (l === 2) return 'Stufe 2: Entdecker';
        return 'Stufe 3: Profi';
    };

    return (
        <div className="game-view artikel-game-view">
            {/* Header */}
            <div className="artikel-nav-header glass-card">
                <button className="back-button" onClick={() => navigate('/')} title="Hauptmenü">
                    ←
                </button>

                <div className="artikel-header-center">
                    <div className="artikel-title-badge">
                        <span className="badge-icon">👑</span>
                        <span className="badge-text">2. Klasse Deutsch</span>
                    </div>
                    <button className="level-pill-btn" onClick={() => setShowLevelPicks(true)}>
                        {getDifficultyName(level)} ▼
                    </button>
                </div>

                <div className="artikel-header-actions">
                    <button 
                        className="rule-tips-btn" 
                        onClick={() => setShowTipsModal(true)}
                        title="Artikel-Regeln ansehen"
                    >
                        💡 Tipps
                    </button>
                    <button 
                        className="mode-toggle-btn"
                        onClick={() => setMode(m => m === 'quiz' ? 'baskets' : 'quiz')}
                        title="Modus wechseln"
                    >
                        {mode === 'quiz' ? '🧺 Körbe' : '⚡ Quiz'}
                    </button>
                </div>
            </div>

            {/* Category Filter Pills */}
            <div className="category-scroll-bar">
                {CATEGORIES.map(cat => (
                    <button
                        key={cat.id}
                        className={`cat-pill ${selectedCategory === cat.id ? 'active' : ''}`}
                        onClick={() => handleCategoryChange(cat.id)}
                    >
                        <span>{cat.icon}</span>
                        <span>{cat.label}</span>
                    </button>
                ))}
            </div>

            {/* Progress & Streak Bar */}
            <div className="artikel-stats-bar">
                <div className="progress-pills-row">
                    {currentItems.map((_, i) => (
                        <div
                            key={i}
                            className={`pill ${i < currentIndex ? 'done' : i === currentIndex ? 'active' : ''}`}
                        />
                    ))}
                </div>
                {streak > 1 && (
                    <motion.div 
                        className="streak-badge"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: [1, 1.15, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                    >
                        🔥 {streak}x Serie!
                    </motion.div>
                )}
            </div>

            {/* Level selection overlay */}
            <AnimatePresence>
                {showLevelPicks && (
                    <LevelSelectionOverlay
                        gameId="artikel"
                        currentLevel={level}
                        onSelectLevel={handleSelectLevel}
                        onClose={() => setShowLevelPicks(false)}
                        icon="👑"
                        title="Artikel-König (Klasse 2)"
                    />
                )}
            </AnimatePresence>

            {/* Learning Tips Modal */}
            <AnimatePresence>
                {showTipsModal && (
                    <motion.div 
                        className="modal-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowTipsModal(false)}
                    >
                        <motion.div 
                            className="tips-modal-card glass-card"
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="tips-modal-header">
                                <h3>💡 Artikel-Geheimtipps für die 2. Klasse</h3>
                                <button className="close-btn" onClick={() => setShowTipsModal(false)}>✕</button>
                            </div>
                            <div className="tips-modal-body">
                                <div className="tip-box der">
                                    <div className="tip-header">🔵 DER (männlich)</div>
                                    <p>Männliche Personen & Tiere (der Vater, der Löwe, der Hund), Tage & Monate (der Montag, der Mai).</p>
                                </div>
                                <div className="tip-box die">
                                    <div className="tip-header">🔴 DIE (weiblich)</div>
                                    <p>Weibliche Personen & Tiere (die Mutter, die Katze). Wörter mit den Endungen <strong>-ung</strong>, <strong>-heit</strong>, <strong>-keit</strong> (die Wohnung, die Freiheit).</p>
                                </div>
                                <div className="tip-box das">
                                    <div className="tip-header">🟢 DAS (sächlich)</div>
                                    <p>Sächliche Dinge (das Buch, das Kind). Alle Verkleinerungen mit <strong>-chen</strong> und <strong>-lein</strong> (das Brötchen, das Mädchen)!</p>
                                </div>
                                <div className="tip-box golden">
                                    <div className="tip-header">⭐ DIE GOLDENE MEHRZAHL-REGEL</div>
                                    <p>In der Mehrzahl (Plural) heißt der Begleiter immer <strong>DIE</strong>! (der Hund → <strong>die</strong> Hunde, das Buch → <strong>die</strong> Bücher).</p>
                                </div>
                            </div>
                            <button className="confirm-btn" onClick={() => setShowTipsModal(false)}>
                                Alles klar! Weiterüben 🚀
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Interactive Game Content */}
            {!showLevelPicks && currentItem && (
                <div className="artikel-play-area">
                    {/* Active Word Card */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentItem.word + currentIndex}
                            className={`main-noun-card glass-card ${isWrong ? 'shake' : ''} ${solvedFeedback ? 'solved' : ''}`}
                            initial={{ scale: 0.85, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.85, opacity: 0, y: -20 }}
                            transition={{ type: 'spring', damping: 14 }}
                        >
                            <div className="card-top-actions">
                                <span className="category-tag">
                                    {CATEGORIES.find(c => c.id === currentItem.category)?.icon || '📚'}{' '}
                                    {CATEGORIES.find(c => c.id === currentItem.category)?.label || 'Grundwortschatz'}
                                </span>
                                <button
                                    className="speaker-btn"
                                    onClick={() => handleSpeakCurrent()}
                                    title="Wort vorlesen"
                                >
                                    🔊
                                </button>
                            </div>

                            <div className="noun-visual-wrap">
                                <span className="noun-emoji-huge">{currentItem.emoji}</span>
                            </div>

                            <div className="noun-word-display">
                                {solvedFeedback ? (
                                    <div className="solved-word-container">
                                        <span className={`article-prefix ${solvedFeedback.gender}`}>
                                            {solvedFeedback.gender.toUpperCase()}
                                        </span>
                                        <span className="word-text">{solvedFeedback.word}</span>
                                    </div>
                                ) : (
                                    <span className="word-text unrevealed">{currentItem.word}</span>
                                )}
                            </div>

                            {/* Plural Learning Hint on Solve */}
                            {solvedFeedback && (
                                <motion.div 
                                    className="plural-feedback-pill"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    <span className="plural-label">Mehrzahl:</span>
                                    <span className="plural-text">die {solvedFeedback.plural.replace(/^die\s+/i, '')}</span>
                                    <span className="plural-sparkle">✨</span>
                                </motion.div>
                            )}

                            {/* Friendly Hint if present */}
                            {!solvedFeedback && currentItem.tip && (
                                <div className="noun-hint-subtle">
                                    💡 {currentItem.tip}
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>

                    {/* Mode 1: Quick Quiz Buttons */}
                    {mode === 'quiz' && (
                        <div className="gender-buttons-grid">
                            <motion.button
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.95 }}
                                className="gender-btn der"
                                onClick={() => handleSelect('der')}
                            >
                                <span className="btn-color-dot">🔵</span>
                                <span className="btn-label">DER</span>
                                <span className="btn-sub">männlich</span>
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.95 }}
                                className="gender-btn die"
                                onClick={() => handleSelect('die')}
                            >
                                <span className="btn-color-dot">🔴</span>
                                <span className="btn-label">DIE</span>
                                <span className="btn-sub">weiblich</span>
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.95 }}
                                className="gender-btn das"
                                onClick={() => handleSelect('das')}
                            >
                                <span className="btn-color-dot">🟢</span>
                                <span className="btn-label">DAS</span>
                                <span className="btn-sub">sächlich</span>
                            </motion.button>
                        </div>
                    )}

                    {/* Mode 2: 3 Baskets Sorting */}
                    {mode === 'baskets' && (
                        <div className="baskets-container">
                            <div 
                                className="basket-column der"
                                onClick={() => handleSelect('der')}
                            >
                                <div className="basket-header">
                                    <span className="basket-icon">🧺</span>
                                    <span className="basket-title">der</span>
                                    <span className="basket-counter">{basketItems.der.length}</span>
                                </div>
                                <div className="basket-drop-btn">Hier ablegen 🔵</div>
                                <div className="basket-items-list">
                                    {basketItems.der.slice(-3).map((item, i) => (
                                        <div key={i} className="mini-collected-pill">
                                            {item.emoji} {item.word}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div 
                                className="basket-column die"
                                onClick={() => handleSelect('die')}
                            >
                                <div className="basket-header">
                                    <span className="basket-icon">🧺</span>
                                    <span className="basket-title">die</span>
                                    <span className="basket-counter">{basketItems.die.length}</span>
                                </div>
                                <div className="basket-drop-btn">Hier ablegen 🔴</div>
                                <div className="basket-items-list">
                                    {basketItems.die.slice(-3).map((item, i) => (
                                        <div key={i} className="mini-collected-pill">
                                            {item.emoji} {item.word}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div 
                                className="basket-column das"
                                onClick={() => handleSelect('das')}
                            >
                                <div className="basket-header">
                                    <span className="basket-icon">🧺</span>
                                    <span className="basket-title">das</span>
                                    <span className="basket-counter">{basketItems.das.length}</span>
                                </div>
                                <div className="basket-drop-btn">Hier ablegen 🟢</div>
                                <div className="basket-items-list">
                                    {basketItems.das.slice(-3).map((item, i) => (
                                        <div key={i} className="mini-collected-pill">
                                            {item.emoji} {item.word}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Reward Celebration */}
            <RewardCelebration
                show={showReward}
                onClose={() => {
                    setShowReward(false);
                    initGame(level, selectedCategory);
                }}
                reward={reward}
            />

            <style>{`
                .artikel-game-view {
                    max-width: 860px;
                    margin: 0 auto;
                    padding: 16px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    min-height: 100vh;
                }

                .artikel-nav-header {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 12px 18px;
                    border-radius: 24px;
                    margin-bottom: 12px;
                    gap: 12px;
                }

                .back-button {
                    font-size: 1.6rem;
                    background: #f1f5f9;
                    border: none;
                    width: 44px;
                    height: 44px;
                    border-radius: 14px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 800;
                    color: #334155;
                    transition: transform 0.15s;
                }
                .back-button:hover { transform: scale(1.08); }

                .artikel-header-center {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 4px;
                }

                .artikel-title-badge {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    font-weight: 800;
                    font-size: 1.1rem;
                    color: #1e293b;
                }

                .level-pill-btn {
                    padding: 4px 14px;
                    border-radius: 16px;
                    background: #eff6ff;
                    color: #2563eb;
                    border: 1px solid #bfdbfe;
                    font-weight: 700;
                    font-size: 0.85rem;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .level-pill-btn:hover {
                    background: #dbeafe;
                }

                .artikel-header-actions {
                    display: flex;
                    gap: 8px;
                }

                .rule-tips-btn, .mode-toggle-btn {
                    padding: 8px 12px;
                    border-radius: 14px;
                    border: none;
                    font-weight: 700;
                    font-size: 0.85rem;
                    cursor: pointer;
                    transition: transform 0.15s;
                }
                .rule-tips-btn {
                    background: #fef3c7;
                    color: #b45309;
                }
                .mode-toggle-btn {
                    background: #e0e7ff;
                    color: #4338ca;
                }
                .rule-tips-btn:hover, .mode-toggle-btn:hover {
                    transform: scale(1.05);
                }

                .category-scroll-bar {
                    display: flex;
                    gap: 8px;
                    overflow-x: auto;
                    width: 100%;
                    padding: 6px 2px 12px;
                    scrollbar-width: none;
                }
                .category-scroll-bar::-webkit-scrollbar { display: none; }

                .cat-pill {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    padding: 6px 14px;
                    border-radius: 20px;
                    border: 1px solid #cbd5e1;
                    background: white;
                    color: #475569;
                    font-weight: 700;
                    font-size: 0.85rem;
                    white-space: nowrap;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .cat-pill.active {
                    background: #3b82f6;
                    color: white;
                    border-color: #3b82f6;
                    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
                }

                .artikel-stats-bar {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    width: 100%;
                    margin-bottom: 20px;
                    padding: 0 4px;
                }

                .progress-pills-row {
                    display: flex;
                    gap: 6px;
                    flex-wrap: wrap;
                }
                .pill {
                    width: 14px;
                    height: 14px;
                    border-radius: 50%;
                    background: #e2e8f0;
                    transition: all 0.3s;
                }
                .pill.done {
                    background: #22c55e;
                }
                .pill.active {
                    background: #3b82f6;
                    transform: scale(1.35);
                    box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
                }

                .streak-badge {
                    font-weight: 900;
                    color: #ea580c;
                    background: #ffedd5;
                    padding: 4px 12px;
                    border-radius: 14px;
                    font-size: 0.85rem;
                }

                .artikel-play-area {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 24px;
                }

                .main-noun-card {
                    width: 100%;
                    max-width: 440px;
                    min-height: 290px;
                    border-radius: 36px;
                    border: 6px solid #ffffff;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: space-between;
                    padding: 24px 20px;
                    position: relative;
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
                    transition: border-color 0.3s;
                }
                .main-noun-card.solved {
                    border-color: #86efac;
                }

                .card-top-actions {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                .category-tag {
                    font-size: 0.85rem;
                    font-weight: 700;
                    color: #64748b;
                    background: #f1f5f9;
                    padding: 4px 12px;
                    border-radius: 12px;
                }

                .speaker-btn {
                    background: #f8fafc;
                    border: 1px solid #e2e8f0;
                    width: 38px;
                    height: 38px;
                    border-radius: 50%;
                    font-size: 1.1rem;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: transform 0.15s;
                }
                .speaker-btn:hover { transform: scale(1.15); }

                .noun-visual-wrap {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 10px 0;
                }

                .noun-emoji-huge {
                    font-size: 6.2rem;
                    filter: drop-shadow(0 10px 14px rgba(0,0,0,0.12));
                    animation: floatAnimation 3s ease-in-out infinite;
                }

                @keyframes floatAnimation {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-8px); }
                }

                .noun-word-display {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 6px;
                }

                .word-text {
                    font-size: 2.5rem;
                    font-weight: 900;
                    letter-spacing: -0.01em;
                    color: #1e293b;
                }
                .word-text.unrevealed {
                    color: #0f172a;
                }

                .solved-word-container {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .article-prefix {
                    font-size: 2.4rem;
                    font-weight: 900;
                    padding: 2px 14px;
                    border-radius: 16px;
                    color: white;
                }
                .article-prefix.der { background: #3b82f6; }
                .article-prefix.die { background: #ef4444; }
                .article-prefix.das { background: #10b981; }

                .plural-feedback-pill {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    background: #f0fdf4;
                    border: 2px solid #86efac;
                    padding: 8px 18px;
                    border-radius: 20px;
                    color: #166534;
                    font-weight: 800;
                    font-size: 1.05rem;
                }
                .plural-label {
                    color: #15803d;
                    font-size: 0.85rem;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }

                .noun-hint-subtle {
                    font-size: 0.85rem;
                    color: #64748b;
                    font-weight: 600;
                    text-align: center;
                }

                /* Quick Quiz Gender Buttons */
                .gender-buttons-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 14px;
                    width: 100%;
                    max-width: 480px;
                }

                .gender-btn {
                    border: none;
                    border-radius: 24px;
                    padding: 18px 8px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    color: white;
                    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
                    transition: transform 0.15s, box-shadow 0.15s;
                }
                .gender-btn.der {
                    background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
                    box-shadow: 0 8px 24px rgba(37, 99, 235, 0.35);
                }
                .gender-btn.die {
                    background: linear-gradient(135deg, #ef4444 0%, #b91c1c 100%);
                    box-shadow: 0 8px 24px rgba(239, 68, 68, 0.35);
                }
                .gender-btn.das {
                    background: linear-gradient(135deg, #10b981 0%, #047857 100%);
                    box-shadow: 0 8px 24px rgba(16, 185, 129, 0.35);
                }

                .btn-color-dot { font-size: 1.2rem; margin-bottom: 2px; }
                .btn-label { font-size: 1.8rem; font-weight: 900; letter-spacing: 0.03em; }
                .btn-sub { font-size: 0.8rem; font-weight: 700; opacity: 0.9; }

                /* Baskets Mode */
                .baskets-container {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 12px;
                    width: 100%;
                    max-width: 720px;
                }

                .basket-column {
                    border-radius: 26px;
                    padding: 16px 12px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    cursor: pointer;
                    transition: transform 0.2s, box-shadow 0.2s;
                    min-height: 190px;
                    border: 3px solid;
                }
                .basket-column:hover {
                    transform: translateY(-4px);
                }
                .basket-column.der {
                    background: #eff6ff;
                    border-color: #3b82f6;
                }
                .basket-column.die {
                    background: #fef2f2;
                    border-color: #ef4444;
                }
                .basket-column.das {
                    background: #ecfdf5;
                    border-color: #10b981;
                }

                .basket-header {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    margin-bottom: 8px;
                }
                .basket-icon { font-size: 1.6rem; }
                .basket-title {
                    font-size: 1.6rem;
                    font-weight: 900;
                    text-transform: uppercase;
                }
                .basket-counter {
                    background: white;
                    border-radius: 50%;
                    width: 24px;
                    height: 24px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.8rem;
                    font-weight: 800;
                }

                .basket-drop-btn {
                    background: white;
                    padding: 6px 12px;
                    border-radius: 12px;
                    font-size: 0.8rem;
                    font-weight: 700;
                    color: #475569;
                    margin-bottom: 12px;
                    box-shadow: 0 2px 6px rgba(0,0,0,0.06);
                }

                .basket-items-list {
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                    width: 100%;
                }

                .mini-collected-pill {
                    background: white;
                    padding: 4px 8px;
                    border-radius: 10px;
                    font-size: 0.8rem;
                    font-weight: 700;
                    text-align: center;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.04);
                }

                /* Modals */
                .modal-backdrop {
                    position: fixed;
                    inset: 0;
                    background: rgba(15, 23, 42, 0.6);
                    backdrop-filter: blur(4px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 100;
                    padding: 16px;
                }

                .tips-modal-card {
                    max-width: 500px;
                    width: 100%;
                    border-radius: 28px;
                    padding: 24px;
                    background: white;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
                }

                .tips-modal-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 16px;
                }
                .tips-modal-header h3 {
                    font-size: 1.25rem;
                    font-weight: 800;
                    color: #1e293b;
                    margin: 0;
                }
                .close-btn {
                    background: #f1f5f9;
                    border: none;
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    font-weight: 800;
                    cursor: pointer;
                }

                .tips-modal-body {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    margin-bottom: 20px;
                }

                .tip-box {
                    padding: 12px 14px;
                    border-radius: 16px;
                    border-left: 6px solid;
                }
                .tip-box.der { background: #eff6ff; border-color: #3b82f6; }
                .tip-box.die { background: #fef2f2; border-color: #ef4444; }
                .tip-box.das { background: #ecfdf5; border-color: #10b981; }
                .tip-box.golden { background: #fffbeb; border-color: #f59e0b; }

                .tip-header {
                    font-weight: 800;
                    font-size: 0.95rem;
                    margin-bottom: 4px;
                }
                .tip-box p {
                    font-size: 0.88rem;
                    line-height: 1.35;
                    color: #334155;
                    margin: 0;
                }

                .confirm-btn {
                    width: 100%;
                    padding: 14px;
                    background: linear-gradient(135deg, #3b82f6, #2563eb);
                    color: white;
                    border: none;
                    border-radius: 18px;
                    font-weight: 800;
                    font-size: 1.05rem;
                    cursor: pointer;
                }

                .shake { animation: shakeAnim 0.5s ease-in-out; }
                @keyframes shakeAnim {
                    0%, 100% { transform: translateX(0); }
                    20%, 60% { transform: translateX(-12px); }
                    40%, 80% { transform: translateX(12px); }
                }

                @media (max-width: 540px) {
                    .word-text { font-size: 2rem; }
                    .noun-emoji-huge { font-size: 4.8rem; }
                    .main-noun-card { min-height: 250px; padding: 16px; }
                    .gender-btn { padding: 14px 6px; }
                    .btn-label { font-size: 1.5rem; }
                    .baskets-container { gap: 6px; }
                    .basket-column { padding: 10px 6px; }
                    .basket-title { font-size: 1.25rem; }
                }
            `}</style>
        </div>
    );
};

export default ArtikelGameView;
