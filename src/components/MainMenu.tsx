import { Link } from 'react-router-dom';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { loadProgress } from '../utils/progressManager';
import React, { useState } from 'react';

const MainMenu = () => {
    const progress = loadProgress();
    const xpPercent = progress.xp % 100;

    const [expanded, setExpanded] = useState<Record<string, boolean>>({
        math: true,
        games: false,
        reading: false
    });

    const toggleSection = (section: string) => {
        setExpanded(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <motion.div
            className="main-menu"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ maxWidth: '900px', margin: '0 auto', padding: '16px' }}
        >
            {/* Status Bar */}
            <motion.div className="menu-status-bar glass-card" variants={itemVariants} style={{ borderRadius: '20px', padding: '12px 20px', marginBottom: '20px' }}>
                <div className="status-item">
                    <span className="label" style={{ fontWeight: 800 }}>LEVEL</span>
                    <span className="value" style={{ fontWeight: 900, color: '#3b82f6' }}>{progress.level}</span>
                </div>
                <div className="status-xp-container" style={{ borderRadius: '12px', overflow: 'hidden' }}>
                    <div className="status-xp-bar" style={{ width: `${xpPercent}%`, background: 'linear-gradient(90deg, #f59e0b, #10b981)' }} />
                </div>
                {progress.streakCount > 0 && (
                    <div className="status-item streak">
                        <span className="icon">🔥</span>
                        <span className="value">{progress.streakCount}</span>
                    </div>
                )}
            </motion.div>

            {/* Child-Friendly Hero Section with Mascot */}
            <motion.div
                className="hero-header glass-card"
                variants={itemVariants}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '24px 30px',
                    borderRadius: '28px',
                    background: 'linear-gradient(135deg, #eff6ff 0%, #fef3c7 100%)',
                    boxShadow: '0 12px 32px rgba(0,0,0,0.06)',
                    marginBottom: '28px',
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                <div>
                    <h1 className="main-title" style={{ fontSize: '2.4rem', color: '#1e293b', margin: '0 0 10px 0', fontWeight: 900 }}>
                        Mathe & Lernen 🚀
                    </h1>
                    <div
                        style={{
                            background: '#ffffff',
                            padding: '12px 20px',
                            borderRadius: '18px',
                            boxShadow: '0 4px 14px rgba(0,0,0,0.05)',
                            display: 'inline-block',
                            color: '#334155',
                            fontWeight: 700,
                            fontSize: '1.05rem'
                        }}
                    >
                        Hallo! Lass uns zusammen lernen! ⭐
                    </div>
                </div>

                <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                    style={{ flexShrink: 0 }}
                >
                    <img
                        src="/images/mascot_fox.jpg"
                        alt="Mascot"
                        style={{
                            width: '120px',
                            height: '120px',
                            borderRadius: '24px',
                            objectFit: 'cover',
                            boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                            border: '4px solid #ffffff'
                        }}
                    />
                </motion.div>
            </motion.div>

            {/* Mathematics Section */}
            <CollapsibleSection
                title="🧮 Mathematik"
                coverImage="/images/math_cover.jpg"
                isOpen={expanded.math}
                onToggle={() => toggleSection('math')}
                variants={itemVariants}
            >
                <div className="section-grid">
                    <MenuCard to="/game/manualAddition" icon="✍️➕" title="Plus tippen" color="#10b981" />
                    <MenuCard to="/game/manualSubtraction" icon="✍️➖" title="Minus tippen" color="#f43f5e" />
                    <MenuCard to="/game/manual" icon="✍️🔀" title="Mix tippen" color="#6366f1" />
                    <MenuCard to="/clock" icon="⏰" title="Uhrzeit tippen" color="#3b82f6" level={progress.clockLevel} />
                    <MenuCard to="/clock-words" icon="⏰🗣️" title="Uhrzeit in Worten" color="#06b6d4" level={progress.clockWordsLevel} />
                    <MenuCard to="/game/addition" icon="➕" title="Plus (4 Optionen)" color="#10b981" />
                    <MenuCard to="/game/subtraction" icon="➖" title="Minus (4 Optionen)" color="#f43f5e" />
                    <MenuCard to="/game/multiplication" icon="×" title="Malrechnen" color="#f59e0b" />
                    <MenuCard to="/game/verticalAddition" icon="⬇️" title="Schriftlich Plus" color="#06b6d4" />
                    <MenuCard to="/game/verticalSubtraction" icon="⬇️" title="Schriftlich Minus" color="#8b5cf6" />
                </div>
            </CollapsibleSection>

            {/* Games Section */}
            <CollapsibleSection
                title="🎮 Spiele"
                isOpen={expanded.games}
                onToggle={() => toggleSection('games')}
                variants={itemVariants}
            >
                <div className="section-grid">
                    <MenuCard to="/clock" icon="⏰" title="Uhren-Meister" color="var(--c-sky)" level={progress.clockLevel} />
                    <MenuCard to="/clock-words" icon="⏰🗣️" title="Uhren-Worte" color="var(--c-teal)" level={progress.clockWordsLevel} />
                    <MenuCard to="/matching/antonyms" icon="🎭" title="Gegenteile" color="var(--c-violet)" />
                    <MenuCard to="/matching/synonyms" icon="📜" title="Synonyme" color="var(--c-sky)" />
                    <MenuCard to="/artikel" icon="👑" title="Artikel-König" color="var(--c-amber)" level={progress.artikelLevel} />
                    <MenuCard to="/syllables-train" icon="🚂" title="Silben-Zug" color="var(--c-rose)" level={progress.syllableLevel} />
                    <MenuCard to="/sequence" icon="🐍" title="Zahlen-Schlange" color="var(--c-orange)" level={progress.sequenceLevel} />
                    <MenuCard to="/rhyme" icon="🕵️" title="Reim-Detektiv" color="var(--c-indigo)" level={progress.rhymeLevel} />
                    <MenuCard to="/gap" icon="✍️" title="Lücken-Füller" color="var(--c-teal)" level={progress.gapLevel} />
                    <MenuCard to="/bridge" icon="🌉" title="Rechen-Brücke" color="var(--c-violet)" level={progress.bridgeLevel} />
                    <MenuCard to="/image-match" icon="🖼️" title="Bild-Wort" color="var(--c-rose)" level={progress.imageMatchLevel} />
                    <MenuCard to="/unscramble" icon="🥗" title="Wort-Salat" color="var(--c-fuchsia)" level={progress.unscrambleLevel} />
                    <MenuCard to="/comparison" icon="🐊" title="Größer/Kleiner" color="var(--c-emerald)" level={progress.comparisonLevel} />
                    <MenuCard to="/sequence-memory" icon="🧠" title="Sequenz-Meister" color="var(--c-indigo)" level={progress.sequenceMemoryLevel} />
                </div>
            </CollapsibleSection>

            {/* Reading Section */}
            <CollapsibleSection
                title="📚 Lesen & Geschichten"
                coverImage="/images/reading_cover.jpg"
                isOpen={expanded.reading}
                onToggle={() => toggleSection('reading')}
                variants={itemVariants}
            >
                <div className="section-grid">
                    <MenuCard to="/syllables" icon="🔡" title="Silben" color="var(--c-sky)" />
                    <MenuCard to="/words" icon="📝" title="Wörter" color="var(--c-sky)" />
                    <MenuCard to="/phrases" icon="🗣️" title="Phrasen" color="var(--c-sky)" />
                    <MenuCard to="/extended-sentences" icon="🌱" title="Stufe 1" color="var(--c-amber)" />
                    <MenuCard to="/sentences" icon="🚀" title="Stufe 2" color="var(--c-amber)" />
                    <MenuCard to="/lola-level-2" icon="🌟" title="Stufe 3" color="var(--c-amber)" />
                    <MenuCard to="/lola-level-3" icon="📜" title="Stufe 4" color="var(--c-violet)" />
                    <MenuCard to="/lola-level-4" icon="📖" title="Stufe 5" color="var(--c-violet)" />
                    <MenuCard to="/elsa-anna" icon="❄️" title="Eiskönigin Special" color="var(--c-sky)" />
                </div>
            </CollapsibleSection>

            {/* Olympiad Card with 3D Trophy Banner */}
            <motion.section variants={itemVariants} className="olympiad-section" style={{ marginTop: 28 }}>
                <Link
                    to="/mate"
                    className="glass-card"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '24px 30px',
                        borderRadius: '28px',
                        background: 'linear-gradient(135deg, #fffbe0 0%, #fef3c7 100%)',
                        border: '3px solid #f59e0b',
                        textDecoration: 'none',
                        boxShadow: '0 12px 28px rgba(245, 158, 11, 0.15)'
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <img
                            src="/images/banner_olympiad.jpg"
                            alt="Olympiad Trophy"
                            style={{
                                width: '100px',
                                height: '70px',
                                borderRadius: '16px',
                                objectFit: 'cover',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                            }}
                        />
                        <div>
                            <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#92400e' }}>
                                Mathe-Olympiade 🏆
                            </div>
                            <div style={{ fontSize: '0.95rem', color: '#78350f', fontWeight: 600, marginTop: '4px' }}>
                                Подготовка к олимпиадам для всех классов
                            </div>
                        </div>
                    </div>
                    <div style={{ fontSize: '2rem', color: '#d97706', fontWeight: 900 }}>→</div>
                </Link>
            </motion.section>

            {/* Bottom Controls */}
            <motion.section variants={itemVariants} style={{ marginTop: 24, paddingBottom: 40 }}>
                <div className="section-grid">
                    <Link to="/sticker-book" className="menu-card-premium" style={{ '--accent-color': '#f59e0b' } as React.CSSProperties}>
                        <div className="card-icon">📒</div>
                        <div className="card-info">
                            <span className="card-title">Stickerbuch</span>
                        </div>
                        <div className="card-arrow">→</div>
                    </Link>
                    <Link to="/progress" className="menu-card-premium" style={{ '--accent-color': '#ec4899' } as React.CSSProperties}>
                        <div className="card-icon">🏆</div>
                        <div className="card-info">
                            <span className="card-title">Erfolge</span>
                        </div>
                        <div className="card-arrow">→</div>
                    </Link>
                    <MenuCard to="/settings" icon="⚙️" title="Optionen" color="#94a3b8" />
                </div>
            </motion.section>
        </motion.div>
    );
};

interface CollapsibleSectionProps {
    title: string;
    coverImage?: string;
    isOpen: boolean;
    onToggle: () => void;
    children: React.ReactNode;
    variants: Variants;
}

const CollapsibleSection = ({ title, coverImage, isOpen, onToggle, children, variants }: CollapsibleSectionProps) => (
    <motion.section variants={variants} className="collapsible-section" style={{ marginBottom: '18px' }}>
        <button
            className="section-toggle glass-card"
            onClick={onToggle}
            style={{
                width: '100%',
                padding: '16px 24px',
                borderRadius: '22px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                background: '#ffffff',
                border: '2px solid #f1f5f9',
                boxShadow: '0 6px 18px rgba(0,0,0,0.04)'
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                {coverImage && (
                    <img
                        src={coverImage}
                        alt="Section Cover"
                        style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '14px',
                            objectFit: 'cover'
                        }}
                    />
                )}
                <h2 className="section-header" style={{ margin: 0, fontSize: '1.4rem', fontWeight: 800, color: '#1e293b' }}>{title}</h2>
            </div>
            <motion.span
                className="toggle-icon"
                animate={{ rotate: isOpen ? 180 : 0 }}
                style={{ fontSize: '1.2rem', color: '#64748b', fontWeight: 'bold' }}
            >
                ▼
            </motion.span>
        </button>
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    style={{ overflow: 'hidden' }}
                >
                    <div style={{ padding: '16px 0 10px 0' }}>
                        {children}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </motion.section>
);

const getDifficultyName = (l: number) => {
    if (l === 1) return 'Einfach';
    if (l === 2) return 'Mittel';
    if (l === 3) return 'Schwer';
    return `Lvl ${l}`;
};

const MenuCard = ({ to, icon, title, color, level, isLarge = false }: { to: string, icon: string, title: string, color: string, level?: number, isLarge?: boolean }) => (
    <Link to={to} className={`menu-card-premium ${isLarge ? 'large' : ''}`} style={{ '--accent-color': color } as React.CSSProperties}>
        <div className="card-icon">{icon}</div>
        <div className="card-info">
            <span className="card-title">{title}</span>
            {level !== undefined && (
                <span className="card-level-badge">{getDifficultyName(level)}</span>
            )}
        </div>
        <div className="card-arrow">→</div>
    </Link>
);

export default MainMenu;
