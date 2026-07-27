import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import { getGradeConfig } from '../../data/topics';
import { useGameStore } from '../../store/useGameStore';
import type { Level, Topic } from '../../data/types';
import { useEffect } from 'react';
import { useLocalization, translate } from '../../hooks/useLocalization';
import './TopicList.css';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
} as const;

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } },
} as const;

export default function TopicList() {
    const { gradeId } = useParams<{ gradeId: string }>();
    const navigate = useNavigate();
    const grade = parseInt(gradeId || '1');
    const config = getGradeConfig(grade);
    const setGrade = useGameStore((s) => s.setGrade);
    const progress = useGameStore((s) => s.profile.progress);
    const { t, lang } = useLocalization();

    useEffect(() => {
        setGrade(grade);
    }, [grade, setGrade]);

    if (!config) {
        return <div className="topic-list"><p>{lang === 'ru' ? 'Класс не найден' : 'Klasse nicht gefunden'}</p></div>;
    }

    const localizedTitle = translate(config.label, lang);
    const localizedDesc = translate(config.description, lang);

    const isLevelUnlocked = (level: Level): boolean => {
        if (!level.requiredLevel) return true;
        const req = progress[level.requiredLevel];
        return req?.completed === true;
    };

    const getStars = (levelId: string): number => {
        return progress[levelId]?.stars || 0;
    };

    const handleLevelClick = (topicId: string, level: Level) => {
        if (!isLevelUnlocked(level)) return;
        navigate(`/mate/grade/${grade}/topic/${topicId}/level/${level.id}`);
    };

    return (
        <div className="topic-list">
            <motion.header
                className="topic-list__header"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 className="topic-list__title">
                    {config.emoji} {localizedTitle}
                </h1>
                <p className="topic-list__desc">{localizedDesc}</p>
            </motion.header>

            <motion.div
                className="topic-list__topics"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {config.topics.map((topic: Topic) => (
                    <motion.section key={topic.id} className="topic-section" variants={itemVariants}>
                        <div className="topic-section__header">
                            <div
                                className="topic-section__icon"
                                style={{ background: `${topic.color}20` }}
                            >
                                {topic.icon}
                            </div>
                            <div className="topic-section__info">
                                <h2 className="topic-section__title">{translate(topic.title, lang)}</h2>
                                <p className="topic-section__desc">{translate(topic.description, lang)}</p>
                            </div>
                        </div>

                        <div className="topic-section__levels">
                            {topic.levels.map((level: Level) => {
                                const unlocked = isLevelUnlocked(level);
                                const stars = getStars(level.id);
                                const completed = progress[level.id]?.completed;

                                return (
                                    <motion.div
                                        key={level.id}
                                        className={`level-card ${!unlocked ? 'level-card--locked' : ''} ${completed ? 'level-card--completed' : ''}`}
                                        variants={itemVariants}
                                        whileHover={unlocked ? { scale: 1.02 } : {}}
                                        whileTap={unlocked ? { scale: 0.98 } : {}}
                                        onClick={() => handleLevelClick(topic.id, level)}
                                    >
                                        <div className="level-card__header">
                                            <span className={`level-card__difficulty level-card__difficulty--${level.difficulty}`}>
                                                {t(level.difficulty) || t('olympiad')}
                                            </span>
                                            {!unlocked && <Lock size={16} className="level-card__lock" />}
                                        </div>
                                        <h3 className="level-card__title">{translate(level.title, lang)}</h3>
                                        <p className="level-card__desc">{translate(level.description, lang)}</p>
                                        <div className="level-card__footer">
                                            <div className="level-card__stars">
                                                {[1, 2, 3].map((s) => (
                                                    <span key={s} className="level-card__star">
                                                        {s <= stars ? '⭐' : '☆'}
                                                    </span>
                                                ))}
                                            </div>
                                            <span className="level-card__exercises">
                                                {level.exercises.length} {t('exercises')}
                                            </span>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.section>
                ))}
            </motion.div>
        </div>
    );
}
