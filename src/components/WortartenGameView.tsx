import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    getWortartenWords, 
    type WortartKlasse2Item, 
    type Wortart 
} from '../data/grundwortschatzKlasse2';
import { trackGeneralGame, loadProgress, setGameLevel } from '../utils/progressManager';
import { soundManager } from '../utils/soundManager';
import { speakGerman } from '../utils/germanSpeech';
import RewardCelebration, { type Reward } from './RewardCelebration';
import LevelSelectionOverlay from './LevelSelectionOverlay';

interface SortedColumns {
    nomen: WortartKlasse2Item[];
    verb: WortartKlasse2Item[];
    adjektiv: WortartKlasse2Item[];
}

const COLUMNS_CONFIG: {
    type: Wortart;
    title: string;
    subtitle: string;
    color: string;
    icon: string;
    badge: string;
    probe: string;
    description: string;
}[] = [
    {
        type: 'nomen',
        title: 'Nomen',
        subtitle: 'Namenwörter',
        color: '#3b82f6',
        icon: '🏰',
        badge: 'GROSS',
        probe: 'Wer oder was? • der, die, das',
        description: 'Menschen, Tiere, Pflanzen & Dinge'
    },
    {
        type: 'verb',
        title: 'Verben',
        subtitle: 'Tunwörter',
        color: '#ef4444',
        icon: '🏃',
        badge: 'klein',
        probe: 'Was tut jemand? • ich spiele',
        description: 'Was man tun kann & Bewegung'
    },
    {
        type: 'adjektiv',
        title: 'Adjektive',
        subtitle: 'Wie-Wörter',
        color: '#f59e0b',
        icon: '🌟',
        badge: 'klein',
        probe: 'Wie ist etwas? • wie?',
        description: 'Eigenschaften & Farben'
    }
];

const WortartenGameView: React.FC = () => {
    const navigate = useNavigate();

    // Progress and Level
    const [playerProgress, setPlayerProgress] = useState(loadProgress());
    const [level, setLevel] = useState<number>(playerProgress.wortartenLevel || 1);
    const [showLevelPicks, setShowLevelPicks] = useState(false);
    const [showRulesModal, setShowRulesModal] = useState(false);

    // Game Session Items
    const [roundItems, setRoundItems] = useState<WortartKlasse2Item[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Sorted words per column
    const [sortedColumns, setSortedColumns] = useState<SortedColumns>({
        nomen: [],
        verb: [],
        adjektiv: []
    });

    // Feedback & UI State
    const [isWrong, setIsWrong] = useState(false);
    const [activeHint, setActiveHint] = useState<string | null>(null);
    const [feedbackMessage, setFeedbackMessage] = useState<{
        text: string;
        isSuccess: boolean;
    } | null>(null);
    const [dragOverColumn, setDragOverColumn] = useState<Wortart | null>(null);

    // Rewards & Streak
    const [streak, setStreak] = useState(0);
    const [reward, setReward] = useState<Reward | null>(null);
    const [showReward, setShowReward] = useState(false);
    const [roundComplete, setRoundComplete] = useState(false);

    // Mascot tip
    const [mascotMessage, setMascotMessage] = useState<string>(
        'Hallo! Sortiere die Wörter in die drei Zauberspalten: Nomen, Verben oder Adjektive!'
    );

    // Initialize round
    const initGame = useCallback((lvl: number = level) => {
        const pool = getWortartenWords(lvl);
        
        // Ensure balance across the 3 types (roughly 3-4 of each per 10-word round)
        const nomenPool = pool.filter(w => w.type === 'nomen').sort(() => 0.5 - Math.random());
        const verbPool = pool.filter(w => w.type === 'verb').sort(() => 0.5 - Math.random());
        const adjPool = pool.filter(w => w.type === 'adjektiv').sort(() => 0.5 - Math.random());

        const session = [
            ...nomenPool.slice(0, 3),
            ...verbPool.slice(0, 3),
            ...adjPool.slice(0, 3),
            // 1 extra random word
            ...(Math.random() < 0.33 ? nomenPool.slice(3, 4) : Math.random() < 0.66 ? verbPool.slice(3, 4) : adjPool.slice(3, 4))
        ].sort(() => 0.5 - Math.random());

        setRoundItems(session);
        setCurrentIndex(0);
        setSortedColumns({ nomen: [], verb: [], adjektiv: [] });
        setIsWrong(false);
        setActiveHint(null);
        setFeedbackMessage(null);
        setReward(null);
        setShowReward(false);
        setRoundComplete(false);
        setStreak(0);
        setMascotMessage('Wähle die passende Spalte für das Zauberwort!');
    }, [level]);

    const hasInitialized = useRef(false);
    useEffect(() => {
        if (!hasInitialized.current) {
            hasInitialized.current = true;
            initGame(level);
        }
    }, [initGame, level]);

    const handleSelectLevel = useCallback((l: number) => {
        setLevel(l);
        setShowReward(false);
        const newProgress = setGameLevel('wortarten', l);
        setPlayerProgress(newProgress);
        initGame(l);
    }, [initGame]);

    const currentWord = roundItems[currentIndex];

    // Read word aloud
    const handleSpeak = (wordText?: string) => {
        const text = wordText || currentWord?.word;
        if (!text) return;
        speakGerman(text);
    };

    // Sort word into target column
    const handleSort = (targetType: Wortart) => {
        if (!currentWord || feedbackMessage?.isSuccess) return;

        if (targetType === currentWord.type) {
            // Correct placement!
            soundManager.playCorrect();
            setStreak(prev => prev + 1);

            // Add word to sorted column
            setSortedColumns(prev => ({
                ...prev,
                [targetType]: [...prev[targetType], currentWord]
            }));

            // Feedback message
            const explanation = currentWord.explanation;
            setFeedbackMessage({
                text: `Klasse! ${explanation}`,
                isSuccess: true
            });
            setMascotMessage(`Super gemacht! "${currentWord.word}" gehört genau hierher.`);

            // Read the success explanation
            speakGerman(`Richtig! ${currentWord.word} ist ein ${
                targetType === 'nomen' ? 'Nomen' : targetType === 'verb' ? 'Verb' : 'Adjektiv'
            }.`);

            setTimeout(() => {
                setFeedbackMessage(null);
                setActiveHint(null);

                if (currentIndex + 1 < roundItems.length) {
                    setCurrentIndex(prev => prev + 1);
                } else {
                    // Completed full session of 10 words!
                    setRoundComplete(true);
                    const result = trackGeneralGame('wortarten', 25, true);
                    setReward({
                        sticker: result.unlockedSticker,
                        achievement: result.unlockedAchievement,
                        leveledUp: result.leveledUp,
                        xp: 25
                    });
                    setShowReward(true);
                    setPlayerProgress(result.progress);
                    setMascotMessage('Hurra! Du hast alle Wörter fehlerfrei sortiert! 🏆');
                }
            }, 1200);
        } else {
            // Wrong placement
            soundManager.playIncorrect();
            setIsWrong(true);
            setStreak(0);

            let hint = '';
            if (currentWord.type === 'nomen') {
                hint = `Tipp: "${currentWord.word}" wird GROSS geschrieben. Kannst du der/die/das davor setzen?`;
            } else if (currentWord.type === 'verb') {
                hint = `Tipp: "${currentWord.word}" ist etwas, das man tun kann (ich ${currentWord.word})!`;
            } else {
                hint = `Tipp: "${currentWord.word}" beschreibt, WIE etwas ist!`;
            }

            setFeedbackMessage({
                text: `Nochmal probieren! ${hint}`,
                isSuccess: false
            });
            setMascotMessage(hint);
            speakGerman('Nicht ganz, probiere eine andere Spalte!');

            setTimeout(() => {
                setIsWrong(false);
            }, 600);
        }
    };

    // Drag and Drop handlers
    const handleDragStart = (e: React.DragEvent) => {
        e.dataTransfer.setData('text/plain', currentWord?.word || '');
    };

    const handleDragOver = (e: React.DragEvent, colType: Wortart) => {
        e.preventDefault();
        setDragOverColumn(colType);
    };

    const handleDragLeave = () => {
        setDragOverColumn(null);
    };

    const handleDrop = (e: React.DragEvent, colType: Wortart) => {
        e.preventDefault();
        setDragOverColumn(null);
        handleSort(colType);
    };

    const getDifficultyName = (l: number) => {
        if (l === 1) return 'Stufe 1: Basis';
        if (l === 2) return 'Stufe 2: Entdecker';
        return 'Stufe 3: Profi';
    };

    return (
        <div className="game-view wortarten-game-view">
            {/* Navigation Header */}
            <div className="wortarten-nav glass-card">
                <button className="back-button" onClick={() => navigate('/')} title="Hauptmenü">
                    ←
                </button>

                <div className="wortarten-header-title">
                    <div className="title-row">
                        <span className="title-icon">🏷️</span>
                        <h1 className="title-text">Wortarten-Sortierer</h1>
                    </div>
                    <button className="level-badge-btn" onClick={() => setShowLevelPicks(true)}>
                        {getDifficultyName(level)} ▼
                    </button>
                </div>

                <button 
                    className="rules-btn" 
                    onClick={() => setShowRulesModal(true)}
                    title="Wortarten-Regeln"
                >
                    💡 Regeln
                </button>
            </div>

            {/* Mascot Banner */}
            <div className="mascot-bar glass-card">
                <div className="mascot-avatar-wrap">
                    <span className="mascot-avatar">🦉</span>
                </div>
                <div className="mascot-speech">
                    <span className="mascot-title">Professor Eule:</span>
                    <p className="mascot-text">{mascotMessage}</p>
                </div>
                {streak > 1 && (
                    <motion.div 
                        className="streak-badge-wortarten"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: [1, 1.15, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                    >
                        🔥 {streak}x Serie!
                    </motion.div>
                )}
            </div>

            {/* Progress Pills */}
            <div className="progress-container">
                <div className="progress-pills">
                    {roundItems.map((_, i) => (
                        <div
                            key={i}
                            className={`pill ${i < currentIndex ? 'done' : i === currentIndex ? 'active' : ''}`}
                        />
                    ))}
                </div>
                <div className="counter-text">
                    {Math.min(currentIndex + 1, roundItems.length)} / {roundItems.length}
                </div>
            </div>

            {/* Level Selection Modal */}
            <AnimatePresence>
                {showLevelPicks && (
                    <LevelSelectionOverlay
                        gameId="wortarten"
                        currentLevel={level}
                        onSelectLevel={handleSelectLevel}
                        onClose={() => setShowLevelPicks(false)}
                        icon="🏷️"
                        title="Wortarten (Klasse 2)"
                    />
                )}
            </AnimatePresence>

            {/* Learning Rules Modal */}
            <AnimatePresence>
                {showRulesModal && (
                    <motion.div 
                        className="modal-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowRulesModal(false)}
                    >
                        <motion.div 
                            className="rules-card glass-card"
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="rules-header">
                                <h3>📚 Das Wortarten-Wissen der 2. Klasse</h3>
                                <button className="close-btn" onClick={() => setShowRulesModal(false)}>✕</button>
                            </div>

                            <div className="rules-grid">
                                <div className="rule-box nomen">
                                    <div className="box-top">
                                        <span className="box-icon">🏰</span>
                                        <h4>Nomen (Namenwörter)</h4>
                                    </div>
                                    <ul>
                                        <li><strong>Werden immer GROSS geschrieben!</strong></li>
                                        <li>Namen für Menschen, Tiere, Pflanzen und Dinge.</li>
                                        <li><strong>Begleiter-Probe:</strong> der, die oder das passt davor (<em>der Hund, das Haus</em>).</li>
                                        <li>Frage: <em>Wer oder was ist das?</em></li>
                                    </ul>
                                </div>

                                <div className="rule-box verb">
                                    <div className="box-top">
                                        <span className="box-icon">🏃</span>
                                        <h4>Verben (Tunwörter)</h4>
                                    </div>
                                    <ul>
                                        <li><strong>Werden klein geschrieben!</strong></li>
                                        <li>Sagen, was jemand <strong>tut</strong> oder was passiert.</li>
                                        <li><strong>Wir-Probe:</strong> Wir können es tun! (<em>ich spiele, wir lachen</em>).</li>
                                        <li>Frage: <em>Was tut das Kind?</em></li>
                                    </ul>
                                </div>

                                <div className="rule-box adjektiv">
                                    <div className="box-top">
                                        <span className="box-icon">🌟</span>
                                        <h4>Adjektive (Wie-Wörter)</h4>
                                    </div>
                                    <ul>
                                        <li><strong>Werden klein geschrieben!</strong></li>
                                        <li>Beschreiben, <strong>wie</strong> etwas oder jemand ist.</li>
                                        <li>Farben, Formen, Gefühle (<em>bunt, rund, leise, lustig</em>).</li>
                                        <li>Frage: <em>Wie ist das Ding?</em></li>
                                    </ul>
                                </div>
                            </div>

                            <button className="confirm-btn" onClick={() => setShowRulesModal(false)}>
                                Super, verstanden! 🚀
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Active Word Area */}
            {!roundComplete && currentWord && (
                <div className="active-card-section">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentWord.id + currentIndex}
                            className={`active-word-card glass-card ${isWrong ? 'shake' : ''}`}
                            initial={{ scale: 0.85, opacity: 0, y: 15 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.85, opacity: 0, y: -15 }}
                            draggable
                            onDragStartCapture={handleDragStart}
                        >
                            <div className="card-controls-top">
                                <span className="drag-hint-pill">✋ Ziehen oder Tippen</span>
                                <div className="controls-right">
                                    <button 
                                        className="audio-btn" 
                                        onClick={() => handleSpeak()}
                                        title="Wort anhören"
                                    >
                                        🔊
                                    </button>
                                    <button 
                                        className="hint-btn" 
                                        onClick={() => setActiveHint(activeHint ? null : currentWord.exampleSentence)}
                                        title="Beispielsatz anzeigen"
                                    >
                                        💡
                                    </button>
                                </div>
                            </div>

                            <div className="word-emoji-container">
                                <span className="word-emoji">{currentWord.emoji}</span>
                            </div>

                            <div className="word-title-wrap">
                                <span className={`target-word ${currentWord.type === 'nomen' ? 'capitalized' : ''}`}>
                                    {currentWord.word}
                                </span>
                            </div>

                            {activeHint && (
                                <motion.div 
                                    className="example-sentence-pill"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                >
                                    „{activeHint}“
                                </motion.div>
                            )}

                            {/* Direct Quick Tap Buttons (Ideal for tablets & fast sorting) */}
                            <div className="quick-tap-buttons">
                                <button 
                                    className="quick-btn nomen"
                                    onClick={() => handleSort('nomen')}
                                >
                                    🔵 Nomen
                                </button>
                                <button 
                                    className="quick-btn verb"
                                    onClick={() => handleSort('verb')}
                                >
                                    🔴 Verb
                                </button>
                                <button 
                                    className="quick-btn adjektiv"
                                    onClick={() => handleSort('adjektiv')}
                                >
                                    🟡 Adjektiv
                                </button>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Instant Floating Feedback Pill */}
                    <AnimatePresence>
                        {feedbackMessage && (
                            <motion.div
                                className={`feedback-banner ${feedbackMessage.isSuccess ? 'success' : 'error'}`}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                            >
                                <span>{feedbackMessage.isSuccess ? '🎉' : '⚠️'}</span>
                                <span>{feedbackMessage.text}</span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            )}

            {/* The 3 Columns Grid */}
            <div className="three-columns-grid">
                {COLUMNS_CONFIG.map(col => {
                    const isOver = dragOverColumn === col.type;
                    const items = sortedColumns[col.type];

                    return (
                        <div
                            key={col.type}
                            className={`wortarten-column ${col.type} ${isOver ? 'drag-over' : ''}`}
                            onDragOver={e => handleDragOver(e, col.type)}
                            onDragLeave={handleDragLeave}
                            onDrop={e => handleDrop(e, col.type)}
                            onClick={() => handleSort(col.type)}
                        >
                            {/* Column Header */}
                            <div className="column-header-box">
                                <div className="column-icon-wrap">
                                    <span className="column-icon">{col.icon}</span>
                                    <span className="column-badge">{col.badge}</span>
                                </div>
                                <h3 className="column-title">{col.title}</h3>
                                <div className="column-subtitle">{col.subtitle}</div>
                                <div className="column-probe-tag">{col.probe}</div>
                            </div>

                            {/* Drop Target Helper */}
                            <div className="column-drop-zone">
                                <span className="drop-target-text">Hier ablegen 📥</span>
                                <span className="collected-count-pill">{items.length}</span>
                            </div>

                            {/* Sorted Cards inside the column */}
                            <div className="column-items-stack">
                                {items.map((item, idx) => (
                                    <motion.div
                                        key={item.id + idx}
                                        className="sorted-mini-card"
                                        initial={{ scale: 0.5, y: -20, opacity: 0 }}
                                        animate={{ scale: 1, y: 0, opacity: 1 }}
                                        transition={{ type: 'spring', damping: 15 }}
                                        onClick={e => {
                                            e.stopPropagation();
                                            handleSpeak(item.word);
                                        }}
                                        title={`${item.word} anhören`}
                                    >
                                        <span className="mini-emoji">{item.emoji}</span>
                                        <span className="mini-word">{item.word}</span>
                                        <span className="mini-sound">🔊</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Round Completed Summary Screen */}
            {roundComplete && (
                <motion.div 
                    className="round-complete-board glass-card"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                >
                    <div className="complete-header">
                        <h2>🎉 Großartige Leistung!</h2>
                        <p>Du hast alle 10 Wörter der 2. Klasse perfekt zugeordnet!</p>
                    </div>

                    <div className="complete-summary-grid">
                        <div className="summary-col nomen">
                            <h4>🔵 Nomen ({sortedColumns.nomen.length})</h4>
                            <div className="summary-chips">
                                {sortedColumns.nomen.map(w => (
                                    <span key={w.id} className="chip">{w.emoji} {w.word}</span>
                                ))}
                            </div>
                        </div>

                        <div className="summary-col verb">
                            <h4>🔴 Verben ({sortedColumns.verb.length})</h4>
                            <div className="summary-chips">
                                {sortedColumns.verb.map(w => (
                                    <span key={w.id} className="chip">{w.emoji} {w.word}</span>
                                ))}
                            </div>
                        </div>

                        <div className="summary-col adjektiv">
                            <h4>🟡 Adjektive ({sortedColumns.adjektiv.length})</h4>
                            <div className="summary-chips">
                                {sortedColumns.adjektiv.map(w => (
                                    <span key={w.id} className="chip">{w.emoji} {w.word}</span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="complete-actions">
                        <button className="play-again-btn" onClick={() => initGame(level)}>
                            🔄 Noch eine Runde spielen
                        </button>
                        <button className="back-menu-btn" onClick={() => navigate('/')}>
                            🏠 Zum Hauptmenü
                        </button>
                    </div>
                </motion.div>
            )}

            {/* Reward Celebration */}
            <RewardCelebration
                show={showReward}
                onClose={() => {
                    setShowReward(false);
                }}
                reward={reward}
            />

            <style>{`
                .wortarten-game-view {
                    max-width: 960px;
                    margin: 0 auto;
                    padding: 16px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    min-height: 100vh;
                    box-sizing: border-box;
                }

                /* Nav Header */
                .wortarten-nav {
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

                .wortarten-header-title {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 4px;
                }

                .title-row {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                .title-icon { font-size: 1.4rem; }
                .title-text {
                    font-size: 1.35rem;
                    font-weight: 900;
                    color: #1e293b;
                    margin: 0;
                }

                .level-badge-btn {
                    padding: 4px 14px;
                    border-radius: 16px;
                    background: #eff6ff;
                    color: #2563eb;
                    border: 1px solid #bfdbfe;
                    font-weight: 700;
                    font-size: 0.82rem;
                    cursor: pointer;
                }

                .rules-btn {
                    padding: 8px 14px;
                    border-radius: 14px;
                    background: #fef3c7;
                    color: #b45309;
                    border: none;
                    font-weight: 800;
                    font-size: 0.88rem;
                    cursor: pointer;
                    transition: transform 0.15s;
                }
                .rules-btn:hover { transform: scale(1.05); }

                /* Mascot Banner */
                .mascot-bar {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    padding: 12px 18px;
                    border-radius: 20px;
                    background: linear-gradient(135deg, #f0fdf4 0%, #ecfeff 100%);
                    border: 2px solid #a7f3d0;
                    margin-bottom: 12px;
                    gap: 14px;
                }

                .mascot-avatar {
                    font-size: 2.2rem;
                    display: block;
                    filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1));
                }

                .mascot-speech {
                    flex: 1;
                }
                .mascot-title {
                    font-size: 0.8rem;
                    font-weight: 900;
                    text-transform: uppercase;
                    color: #047857;
                    letter-spacing: 0.05em;
                }
                .mascot-text {
                    font-size: 0.95rem;
                    font-weight: 700;
                    color: #064e3b;
                    margin: 2px 0 0;
                    line-height: 1.3;
                }

                .streak-badge-wortarten {
                    font-weight: 900;
                    color: #ea580c;
                    background: #ffedd5;
                    padding: 6px 14px;
                    border-radius: 16px;
                    font-size: 0.9rem;
                    white-space: nowrap;
                }

                /* Progress Row */
                .progress-container {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 16px;
                    padding: 0 4px;
                }

                .progress-pills {
                    display: flex;
                    gap: 6px;
                }
                .pill {
                    width: 14px;
                    height: 14px;
                    border-radius: 50%;
                    background: #e2e8f0;
                    transition: all 0.3s;
                }
                .pill.done { background: #22c55e; }
                .pill.active {
                    background: #3b82f6;
                    transform: scale(1.35);
                    box-shadow: 0 0 10px rgba(59, 130, 246, 0.4);
                }

                .counter-text {
                    font-weight: 800;
                    color: #64748b;
                    font-size: 0.9rem;
                }

                /* Active Word Section */
                .active-card-section {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    margin-bottom: 20px;
                }

                .active-word-card {
                    width: 100%;
                    max-width: 440px;
                    border-radius: 32px;
                    border: 5px solid white;
                    padding: 18px 20px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    box-shadow: 0 16px 36px rgba(0, 0, 0, 0.08);
                    cursor: grab;
                    user-select: none;
                }
                .active-word-card:active { cursor: grabbing; }

                .card-controls-top {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                .drag-hint-pill {
                    font-size: 0.78rem;
                    font-weight: 700;
                    color: #64748b;
                    background: #f1f5f9;
                    padding: 4px 10px;
                    border-radius: 10px;
                }

                .controls-right {
                    display: flex;
                    gap: 6px;
                }

                .audio-btn, .hint-btn {
                    background: #f8fafc;
                    border: 1px solid #e2e8f0;
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    font-size: 1.05rem;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: transform 0.15s;
                }
                .audio-btn:hover, .hint-btn:hover { transform: scale(1.15); }

                .word-emoji-container {
                    margin: 8px 0;
                }
                .word-emoji {
                    font-size: 5rem;
                    filter: drop-shadow(0 8px 12px rgba(0,0,0,0.1));
                }

                .word-title-wrap {
                    margin-bottom: 12px;
                }
                .target-word {
                    font-size: 2.6rem;
                    font-weight: 900;
                    color: #0f172a;
                    letter-spacing: -0.01em;
                }

                .example-sentence-pill {
                    background: #fffbeb;
                    border: 1px solid #fef08a;
                    color: #92400e;
                    font-weight: 700;
                    font-size: 0.92rem;
                    padding: 6px 14px;
                    border-radius: 12px;
                    margin-bottom: 12px;
                    text-align: center;
                }

                .quick-tap-buttons {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 10px;
                    width: 100%;
                    margin-top: 6px;
                }

                .quick-btn {
                    border: none;
                    border-radius: 18px;
                    padding: 12px 4px;
                    font-weight: 800;
                    font-size: 1rem;
                    cursor: pointer;
                    color: white;
                    transition: transform 0.15s, box-shadow 0.15s;
                }
                .quick-btn:hover { transform: scale(1.04); }
                .quick-btn.nomen {
                    background: #3b82f6;
                    box-shadow: 0 4px 14px rgba(59, 130, 246, 0.4);
                }
                .quick-btn.verb {
                    background: #ef4444;
                    box-shadow: 0 4px 14px rgba(239, 68, 68, 0.4);
                }
                .quick-btn.adjektiv {
                    background: #f59e0b;
                    box-shadow: 0 4px 14px rgba(245, 158, 11, 0.4);
                }

                .feedback-banner {
                    margin-top: 12px;
                    padding: 10px 18px;
                    border-radius: 16px;
                    font-weight: 800;
                    font-size: 0.95rem;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    max-width: 500px;
                    text-align: center;
                }
                .feedback-banner.success {
                    background: #ecfdf5;
                    border: 2px solid #86efac;
                    color: #166534;
                }
                .feedback-banner.error {
                    background: #fef2f2;
                    border: 2px solid #fca5a5;
                    color: #991b1b;
                }

                /* 3 Columns Grid */
                .three-columns-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 16px;
                    width: 100%;
                    min-height: 280px;
                }

                .wortarten-column {
                    border-radius: 28px;
                    padding: 18px 14px;
                    display: flex;
                    flex-direction: column;
                    border: 3px solid;
                    cursor: pointer;
                    transition: all 0.25s;
                    position: relative;
                }
                .wortarten-column:hover {
                    transform: translateY(-3px);
                }

                .wortarten-column.nomen {
                    background: #eff6ff;
                    border-color: #3b82f6;
                }
                .wortarten-column.verb {
                    background: #fef2f2;
                    border-color: #ef4444;
                }
                .wortarten-column.adjektiv {
                    background: #fffbeb;
                    border-color: #f59e0b;
                }

                .wortarten-column.drag-over {
                    transform: scale(1.03);
                    box-shadow: 0 0 25px rgba(0, 0, 0, 0.15);
                    border-style: dashed;
                }

                .column-header-box {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                    margin-bottom: 12px;
                }

                .column-icon-wrap {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    margin-bottom: 2px;
                }
                .column-icon { font-size: 1.8rem; }
                .column-badge {
                    font-size: 0.72rem;
                    font-weight: 900;
                    padding: 2px 8px;
                    border-radius: 10px;
                    background: white;
                    color: #1e293b;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.06);
                }

                .column-title {
                    font-size: 1.45rem;
                    font-weight: 900;
                    margin: 0;
                    color: #0f172a;
                }

                .column-subtitle {
                    font-size: 0.88rem;
                    font-weight: 800;
                    color: #475569;
                }

                .column-probe-tag {
                    font-size: 0.74rem;
                    font-weight: 700;
                    color: #64748b;
                    background: rgba(255, 255, 255, 0.75);
                    padding: 3px 8px;
                    border-radius: 8px;
                    margin-top: 6px;
                }

                .column-drop-zone {
                    background: white;
                    border-radius: 14px;
                    padding: 6px 12px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 12px;
                    box-shadow: 0 2px 6px rgba(0,0,0,0.04);
                }

                .drop-target-text {
                    font-size: 0.8rem;
                    font-weight: 700;
                    color: #64748b;
                }

                .collected-count-pill {
                    background: #f1f5f9;
                    width: 22px;
                    height: 22px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.75rem;
                    font-weight: 900;
                    color: #1e293b;
                }

                .column-items-stack {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                    flex: 1;
                }

                .sorted-mini-card {
                    background: white;
                    border-radius: 14px;
                    padding: 8px 12px;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    box-shadow: 0 4px 8px rgba(0,0,0,0.04);
                    transition: transform 0.15s;
                    cursor: pointer;
                }
                .sorted-mini-card:hover { transform: scale(1.04); }

                .mini-emoji { font-size: 1.25rem; }
                .mini-word {
                    font-weight: 800;
                    font-size: 0.98rem;
                    flex: 1;
                    color: #1e293b;
                }
                .mini-sound {
                    font-size: 0.85rem;
                    opacity: 0.6;
                }

                /* Modals */
                .modal-backdrop {
                    position: fixed;
                    inset: 0;
                    background: rgba(15, 23, 42, 0.65);
                    backdrop-filter: blur(4px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 100;
                    padding: 16px;
                }

                .rules-card {
                    max-width: 640px;
                    width: 100%;
                    border-radius: 28px;
                    padding: 24px;
                    background: white;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
                }

                .rules-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 16px;
                }
                .rules-header h3 {
                    font-size: 1.25rem;
                    font-weight: 900;
                    margin: 0;
                    color: #1e293b;
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

                .rules-grid {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    margin-bottom: 20px;
                }

                .rule-box {
                    border-radius: 18px;
                    padding: 12px 16px;
                    border-left: 6px solid;
                }
                .rule-box.nomen { background: #eff6ff; border-color: #3b82f6; }
                .rule-box.verb { background: #fef2f2; border-color: #ef4444; }
                .rule-box.adjektiv { background: #fffbeb; border-color: #f59e0b; }

                .box-top {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    margin-bottom: 6px;
                }
                .box-icon { font-size: 1.3rem; }
                .box-top h4 {
                    margin: 0;
                    font-size: 1.05rem;
                    font-weight: 900;
                }

                .rule-box ul {
                    margin: 0;
                    padding-left: 20px;
                    font-size: 0.88rem;
                    color: #334155;
                    line-height: 1.4;
                }
                .rule-box li { margin-bottom: 2px; }

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

                /* Complete Board */
                .round-complete-board {
                    width: 100%;
                    max-width: 680px;
                    border-radius: 32px;
                    padding: 28px 24px;
                    background: white;
                    text-align: center;
                    box-shadow: 0 20px 45px rgba(0,0,0,0.1);
                    margin-top: 10px;
                }

                .complete-header h2 {
                    font-size: 2rem;
                    font-weight: 900;
                    color: #1e293b;
                    margin: 0 0 6px 0;
                }
                .complete-header p {
                    font-size: 1.05rem;
                    color: #475569;
                    font-weight: 700;
                    margin: 0 0 20px 0;
                }

                .complete-summary-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 12px;
                    margin-bottom: 24px;
                }

                .summary-col {
                    border-radius: 20px;
                    padding: 14px 10px;
                    text-align: left;
                }
                .summary-col.nomen { background: #eff6ff; }
                .summary-col.verb { background: #fef2f2; }
                .summary-col.adjektiv { background: #fffbeb; }

                .summary-col h4 {
                    font-size: 0.92rem;
                    font-weight: 900;
                    margin: 0 0 8px 0;
                }

                .summary-chips {
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                }

                .chip {
                    background: white;
                    padding: 4px 8px;
                    border-radius: 10px;
                    font-size: 0.82rem;
                    font-weight: 800;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.04);
                }

                .complete-actions {
                    display: flex;
                    gap: 12px;
                    justify-content: center;
                }

                .play-again-btn {
                    padding: 14px 24px;
                    border-radius: 18px;
                    background: linear-gradient(135deg, #10b981, #059669);
                    color: white;
                    border: none;
                    font-weight: 900;
                    font-size: 1.05rem;
                    cursor: pointer;
                    box-shadow: 0 8px 20px rgba(16, 185, 129, 0.35);
                }

                .back-menu-btn {
                    padding: 14px 20px;
                    border-radius: 18px;
                    background: #f1f5f9;
                    color: #334155;
                    border: none;
                    font-weight: 800;
                    font-size: 1rem;
                    cursor: pointer;
                }

                .shake { animation: shakeAnim 0.5s ease-in-out; }
                @keyframes shakeAnim {
                    0%, 100% { transform: translateX(0); }
                    20%, 60% { transform: translateX(-12px); }
                    40%, 80% { transform: translateX(12px); }
                }

                @media (max-width: 768px) {
                    .three-columns-grid {
                        grid-template-columns: 1fr;
                        gap: 12px;
                    }
                    .wortarten-column {
                        padding: 12px;
                        min-height: auto;
                    }
                    .target-word { font-size: 2.1rem; }
                    .word-emoji { font-size: 4rem; }
                    .complete-summary-grid {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </div>
    );
};

export default WortartenGameView;
