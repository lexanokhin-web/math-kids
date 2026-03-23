import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { lolaSentences, shuffleArray, speakGerman } from '../utils/syllablesData';

const SentencesView = () => {
    const navigate = useNavigate();
    const [sentences, setSentences] = useState(() => shuffleArray([...lolaSentences]));
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPressed, setIsPressed] = useState(false);

    const currentSentence = sentences[currentIndex % sentences.length];

    const handleTap = useCallback(async () => {
        await speakGerman(currentSentence);
        setCurrentIndex(i => (i + 1) % sentences.length);
    }, [currentSentence, sentences.length]);

    const handleShuffle = () => {
        setSentences(shuffleArray([...lolaSentences]));
        setCurrentIndex(0);
    };

    const handleRepeat = () => {
        speakGerman(currentSentence);
    };

    return (
        <div className="reading-view">
            <div className="reading-header">
                <button className="back-button" onClick={() => navigate('/')}>
                    ←
                </button>
                <h1 className="reading-title">Sentences (Lola)</h1>
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
                <span className="phrase-text">{currentSentence}</span>
            </motion.div>

            <p style={{ textAlign: 'center', color: '#666', marginTop: 16 }}>
                Tap the card to hear and advance
            </p>
        </div>
    );
};

export default SentencesView;
