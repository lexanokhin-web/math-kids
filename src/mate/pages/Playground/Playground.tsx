import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock } from 'lucide-react';
import { getGradeConfig } from '../../data/topics';
import { useGameStore } from '../../store/useGameStore';
import type { AnyExercise, LocalizedString } from '../../data/types';
import MultipleChoice from '../../components/exercises/MultipleChoice';
import FillInBlank from '../../components/exercises/FillInBlank';
import TrueFalse from '../../components/exercises/TrueFalse';
import MatchPairs from '../../components/exercises/MatchPairs';
import DragAndDrop from '../../components/exercises/DragAndDrop';
import ResultScreen from '../../components/ui/ResultScreen';
import { useLocalization, translate } from '../../hooks/useLocalization';
import './Playground.css';

/**
 * Localizes an exercise object based on the current language.
 */
function localizeExercise(ex: AnyExercise, lang: 'ru' | 'de'): AnyExercise {
    if (lang === 'ru') return ex;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newEx = { ...ex } as any;
    newEx.question = translate(ex.question, lang);
    if (ex.hint) newEx.hint = translate(ex.hint, lang);

    if (ex.type === 'multiple-choice') {
        newEx.options = ex.options.map((o: LocalizedString) => translate(o, lang));
    } else if (ex.type === 'true-false') {
        newEx.statement = translate(ex.statement, lang);
    } else if (ex.type === 'match-pairs') {
        newEx.pairs = ex.pairs.map((p) => ({
            left: translate(p.left, lang),
            right: translate(p.right, lang)
        }));
    } else if (ex.type === 'fill-blank') {
        newEx.template = translate(ex.template, lang);
        newEx.correctAnswer = translate(ex.correctAnswer, lang);
    } else if (ex.type === 'drag-drop') {
        newEx.items = ex.items.map((i: LocalizedString) => translate(i, lang));
        newEx.correctOrder = ex.correctOrder.map((i: LocalizedString) => translate(i, lang));
        if (ex.zones) newEx.zones = ex.zones.map((z: LocalizedString) => translate(z, lang));
    }
    return newEx;
}

export default function Playground() {
    const { gradeId, topicId, levelId } = useParams();
    const navigate = useNavigate();
    const grade = parseInt(gradeId || '1');
    const config = getGradeConfig(grade);
    const topic = config?.topics.find((t) => t.id === topicId);
    const level = topic?.levels.find((l) => l.id === levelId);

    const addXP = useGameStore((s) => s.addXP);
    const updateProgress = useGameStore((s) => s.updateLevelProgress);
    const incrementStreak = useGameStore((s) => s.incrementStreak);
    const { lang } = useLocalization();

    const [currentIdx, setCurrentIdx] = useState(0);
    const [exercises, setExercises] = useState<AnyExercise[]>([]);

    useEffect(() => {
        if (level?.exercises) {
            const shuffled = [...level.exercises].sort(() => Math.random() - 0.5);
            setExercises(shuffled);
        }
    }, [level?.id, level?.exercises]);

    const [score, setScore] = useState(0);
    const [correctCount, setCorrectCount] = useState(0);
    const [lives, setLives] = useState(3);
    const [timer, setTimer] = useState(0);
    const [totalTime, setTotalTime] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [pointsPopup, setPointsPopup] = useState<{ text: string; correct: boolean } | null>(null);
    const timerRef = useRef<number | null>(null);

    const currentRawExercise = exercises[currentIdx] as AnyExercise | undefined;
    const currentExercise = currentRawExercise ? localizeExercise(currentRawExercise, lang) : undefined;

    // Timer
    useEffect(() => {
        if (showResult || !currentExercise) return;
        setTimer(currentExercise.timeLimit);
        timerRef.current = window.setInterval(() => {
            setTimer((t) => {
                if (t <= 1) {
                    // Time's up — count as wrong
                    handleAnswer(false);
                    return 0;
                }
                return t - 1;
            });
        }, 1000);
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentIdx, showResult]);

    // Total time counter
    useEffect(() => {
        if (showResult) return;
        const id = setInterval(() => setTotalTime((t) => t + 1), 1000);
        return () => clearInterval(id);
    }, [showResult]);

    const handleAnswer = useCallback((correct: boolean) => {
        if (timerRef.current) clearInterval(timerRef.current);

        if (correct) {
            const pts = currentExercise?.points || 10;
            setScore((s) => s + pts);
            setCorrectCount((c) => c + 1);
            setPointsPopup({ text: `+${pts}`, correct: true });
        } else {
            setLives((l) => Math.max(0, l - 1));
            setPointsPopup({ text: '−1 ❤️', correct: false });
        }

        setTimeout(() => setPointsPopup(null), 800);

        setTimeout(() => {
            if (currentIdx >= exercises.length - 1 || (!correct && lives <= 1)) {
                finishLevel(correct);
            } else {
                setCurrentIdx((i) => i + 1);
            }
        }, 300);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentIdx, exercises.length, lives, currentExercise]);

    const finishLevel = (lastCorrect: boolean) => {
        const finalCorrect = correctCount + (lastCorrect ? 1 : 0);
        const pct = (finalCorrect / exercises.length) * 100;
        const thresholds = level?.starThresholds || [50, 75, 95];
        let stars = 0;
        if (pct >= thresholds[0]) stars = 1;
        if (pct >= thresholds[1]) stars = 2;
        if (pct >= thresholds[2]) stars = 3;

        updateProgress(levelId!, {
            completed: stars > 0,
            stars,
            bestScore: score,
            bestTime: totalTime,
            attempts: 1,
        });

        if (stars > 0) {
            addXP(score);
            incrementStreak();
        }

        setShowResult(true);
    };

    if (!level) {
        return <div className="playground"><p>{lang === 'ru' ? 'Уровень не найден' : 'Level nicht gefunden'}</p></div>;
    }

    if (showResult) {
        return (
            <ResultScreen
                score={score}
                correctCount={correctCount}
                totalExercises={exercises.length}
                time={totalTime}
                stars={(() => {
                    const pct = (correctCount / exercises.length) * 100;
                    const t = level.starThresholds;
                    let s = 0;
                    if (pct >= t[0]) s = 1;
                    if (pct >= t[1]) s = 2;
                    if (pct >= t[2]) s = 3;
                    return s;
                })()}
                onRetry={() => {
                    setCurrentIdx(0);
                    setScore(0);
                    setCorrectCount(0);
                    setLives(3);
                    setTotalTime(0);
                    setShowResult(false);
                }}
                onBack={() => navigate(`/mate/grade/${gradeId}`)}
            />
        );
    }

    return (
        <div className="playground">
            {/* Header with progress */}
            <div className="playground__header">
                <div className="playground__progress-bar">
                    <div
                        className="playground__progress-fill"
                        style={{ width: `${((currentIdx) / exercises.length) * 100}%` }}
                    />
                </div>
                <span className="playground__counter">{currentIdx + 1}/{exercises.length}</span>

                {currentExercise && currentExercise.timeLimit > 0 && (
                    <div className={`playground__timer ${timer <= 5 ? 'playground__timer--warning' : ''}`}>
                        <Clock size={14} />
                        {timer}{lang === 'ru' ? 'с' : 's'}
                    </div>
                )}

                <div className="playground__hearts">
                    {[...Array(3)].map((_, i) => (
                        <span key={i}>{i < lives ? '❤️' : '🖤'}</span>
                    ))}
                </div>
            </div>

            {/* Exercise */}
            <div className="playground__exercise">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentExercise?.id}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.3 }}
                        style={{ width: '100%' }}
                    >
                        {currentExercise?.type === 'multiple-choice' && (
                            <MultipleChoice exercise={currentExercise} onAnswer={handleAnswer} />
                        )}
                        {currentExercise?.type === 'fill-blank' && (
                            <FillInBlank exercise={currentExercise} onAnswer={handleAnswer} />
                        )}
                        {currentExercise?.type === 'true-false' && (
                            <TrueFalse exercise={currentExercise} onAnswer={handleAnswer} />
                        )}
                        {currentExercise?.type === 'match-pairs' && (
                            <MatchPairs exercise={currentExercise} onAnswer={handleAnswer} />
                        )}
                        {currentExercise?.type === 'drag-drop' && (
                            <DragAndDrop exercise={currentExercise} onAnswer={handleAnswer} />
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Points popup */}
            <AnimatePresence>
                {pointsPopup && (
                    <motion.div
                        className={`playground__points-popup ${pointsPopup.correct ? 'playground__points-popup--correct' : 'playground__points-popup--wrong'}`}
                        initial={{ opacity: 0, scale: 0.5, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: -30 }}
                        exit={{ opacity: 0, scale: 0.5, y: -60 }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                    >
                        {pointsPopup.text}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
