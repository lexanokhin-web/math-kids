import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { twoSyllableWords, shuffleArray, speakGerman } from '../utils/syllablesData';

const TwoSyllableWordsView = () => {
    const navigate = useNavigate();
    const [words, setWords] = useState(() => shuffleArray([...twoSyllableWords]));
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPressed, setIsPressed] = useState(false);

    const currentWord = words[currentIndex % words.length];

    const handleTap = useCallback(async () => {
        await speakGerman(currentWord);
        setCurrentIndex(i => (i + 1) % words.length);
    }, [currentWord, words.length]);

    const handleShuffle = () => {
        setWords(shuffleArray([...twoSyllableWords]));
        setCurrentIndex(0);
    };

    const handleRepeat = () => {
        speakGerman(currentWord);
    };

    return (
        <div className="reading-view">
            <div className="reading-header">
                <button className="back-button" onClick={() => navigate('/')}>
                    ←
                </button>
                <h1 className="reading-title">Two-syllable Words</h1>
                <div style={{ width: 48 }} />
            </div>

            <div className="reading-controls">
                <button className="control-button" onClick={handleShuffle}>
                    🔀 Shuffle
                </button>
                <div style={{ flex: 1 }} />
                <button className="control-button" onClick={handleRepeat}>
                    🔁 Repeat
                </button>
            </div>

            <motion.div
                className="word-card"
                onClick={handleTap}
                onMouseDown={() => setIsPressed(true)}
                onMouseUp={() => setIsPressed(false)}
                onMouseLeave={() => setIsPressed(false)}
                animate={{
                    scale: isPressed ? 0.96 : 1,
                    y: isPressed ? 2 : 0
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
                <span className="word">{currentWord}</span>
            </motion.div>

            <p style={{ textAlign: 'center', color: '#666', marginTop: 16 }}>
                Tap the card to hear and advance
            </p>
        </div>
    );
};

export default TwoSyllableWordsView;
