import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getAgeGroup } from '../../styles/themes';
import type { AgeGroup } from '../../styles/themes';
import './GradeSelect.css';
import { useGameStore } from '../../store/useGameStore';
import { useLocalization, translate } from '../../hooks/useLocalization';
import { allGrades } from '../../data/topics';
import { ArrowLeft } from 'lucide-react';

/* ============ Animation Variants ============ */

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.06, delayChildren: 0.2 },
    },
} as const;

const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.9 },
    visible: {
        opacity: 1, y: 0, scale: 1,
        transition: { type: 'spring' as const, stiffness: 260, damping: 20 },
    },
} as const;

/* ============ Component ============ */

export default function GradeSelect() {
    const navigate = useNavigate();
    const { setLanguage } = useGameStore();
    const { t, lang } = useLocalization();

    const handleSelect = (grade: number) => {
        navigate(`/mate/grade/${grade}`);
    };

    const ageGroups: { group: AgeGroup; label: string; emoji: string; subtitle: string; range: [number, number] }[] = [
        { group: 'kids', label: t('primarySchool'), emoji: '🌈', subtitle: `${t('grade')} 1–4`, range: [1, 4] },
        { group: 'teen', label: t('middleSchool'), emoji: '🚀', subtitle: `${t('grade')} 5–8`, range: [5, 8] },
        { group: 'senior', label: t('highSchool'), emoji: '🧠', subtitle: `${t('grade')} 9–12`, range: [9, 12] },
    ];

    return (
        <div className="grade-select">
            {/* Back button to Main Menu */}
            <button className="grade-select__exit" onClick={() => navigate('/')}>
                <ArrowLeft size={18} />
                <span>{t('backToMenu')}</span>
            </button>
            {/* Background shapes */}
            <div className="grade-select__bg-shapes">
                <div className="bg-shape bg-shape--1" />
                <div className="bg-shape bg-shape--2" />
                <div className="bg-shape bg-shape--3" />
            </div>

            {/* Language Switcher */}
            <div className="grade-select__lang">
                <button 
                    className={`lang-btn ${lang === 'ru' ? 'active' : ''}`}
                    onClick={() => setLanguage('ru')}
                >
                    🇷🇺 RU
                </button>
                <button 
                    className={`lang-btn ${lang === 'de' ? 'active' : ''}`}
                    onClick={() => setLanguage('de')}
                >
                    🇩🇪 DE
                </button>
            </div>

            {/* Header */}
            <motion.header
                className="grade-select__header"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
            >
                <h1 className="grade-select__logo">
                    <span className="gradient-text">MathOlympiad</span>
                </h1>
                <p className="grade-select__subtitle">
                    {t('selectGrade')}
                </p>
            </motion.header>

            {/* Grade Groups */}
            <div className="grade-select__groups">
                {ageGroups.map(({ group, label, emoji, subtitle, range }) => (
                    <motion.section
                        key={group}
                        className="grade-group"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <div className="grade-group__header">
                            <span className="grade-group__emoji">{emoji}</span>
                            <h2 className="grade-group__title">{label}</h2>
                            <span className="grade-group__subtitle">{subtitle}</span>
                        </div>

                        <div className="grade-group__grid">
                            {allGrades
                                .filter((g) => g.id >= range[0] && g.id <= range[1])
                                .map((g) => (
                                    <motion.div
                                        key={g.id}
                                        className={`grade-card grade-card--${getAgeGroup(g.id)}`}
                                        variants={cardVariants}
                                        whileHover={{ scale: 1.04 }}
                                        whileTap={{ scale: 0.97 }}
                                        onClick={() => handleSelect(g.id)}
                                    >
                                        <span className="grade-card__emoji">{g.emoji}</span>
                                        <div className="grade-card__number gradient-text">{g.id}{lang === 'de' ? '.' : ''}</div>
                                        <div className="grade-card__label">{t('grade')}</div>
                                        <div className="grade-card__desc">{translate(g.description, lang)}</div>
                                        <div className="grade-card__progress">
                                            <div className="grade-card__progress-fill" style={{ width: '0%' }} />
                                        </div>
                                    </motion.div>
                                ))}
                        </div>
                    </motion.section>
                ))}
            </div>

            <style>{`
                .grade-select__lang {
                    position: fixed;
                    top: 1.5rem;
                    right: 1.5rem;
                    display: flex;
                    gap: 0.5rem;
                    z-index: 100;
                    background: var(--bg-overlay);
                    padding: 0.5rem;
                    border-radius: var(--radius-full);
                    border: 1px solid var(--border-color);
                    backdrop-filter: blur(8px);
                }
                .lang-btn {
                    padding: 0.5rem 1rem;
                    border-radius: var(--radius-full);
                    font-size: 0.875rem;
                    font-weight: 700;
                    color: var(--text-secondary);
                    transition: all 0.3s;
                }
                .lang-btn.active {
                    background: var(--accent-gradient);
                    color: white;
                    box-shadow: var(--shadow-sm);
                }
                .lang-btn:hover:not(.active) {
                    background: var(--bg-secondary);
                }
                .grade-select__exit {
                    position: fixed;
                    top: 1.5rem;
                    left: 1.5rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    z-index: 100;
                    background: var(--bg-overlay);
                    padding: 0.5rem 1rem;
                    border-radius: var(--radius-full);
                    border: 1px solid var(--border-color);
                    backdrop-filter: blur(8px);
                    color: var(--text-secondary);
                    font-weight: 700;
                    font-size: 0.875rem;
                    transition: all 0.3s;
                }
                .grade-select__exit:hover {
                    color: var(--accent-primary);
                    background: var(--bg-card);
                }
            `}</style>
        </div>
    );
}
