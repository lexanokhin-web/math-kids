import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { germanPhrases, shuffleArray, speakGerman } from '../utils/syllablesData';
import FontSizeSettings from './FontSizeSettings';

const PhrasesView = () => {
    const navigate = useNavigate();
    const [fontSize, setFontSize] = useState(() => 
        parseFloat(localStorage.getItem('mathkids_reading_font_size') || '3.0')
    );
    const [phrases, setPhrases] = useState(() => shuffleArray([...germanPhrases]));
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPressed, setIsPressed] = useState(false);

    const updateFontSize = (size: number) => {
        setFontSize(size);
        localStorage.setItem('mathkids_reading_font_size', size.toString());
    };

    const currentPhrase = phrases[currentIndex % phrases.length];

    const handleTap = useCallback(async () => {
        await speakGerman(currentPhrase);
        setCurrentIndex(i => (i + 1) % phrases.length);
    }, [currentPhrase, phrases.length]);

    const handleShuffle = () => {
        setPhrases(shuffleArray([...germanPhrases]));
        setCurrentIndex(0);
    };

    const handleRepeat = () => {
        speakGerman(currentPhrase);
    };

    return (
        <div className="reading-view">
            <div className="reading-header">
                <button className="back-button" onClick={() => navigate('/')}>
                    ←
                </button>
                <h1 className="reading-title">Phrasen</h1>
                <div style={{ width: 48 }} />
            </div>

            <div className="reading-controls">
                <button className="control-button" onClick={handleShuffle}>
                    🔀 Mischen
                </button>
                <div style={{ flex: 1 }} />
                <button className="control-button" onClick={handleRepeat}>
                    🔁 Wiederholen
                </button>
            </div>

            <FontSizeSettings fontSize={fontSize} setFontSize={updateFontSize} />

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
                <span className="phrase-text" style={{ fontSize: `${fontSize}rem` }}>{currentPhrase}</span>
            </motion.div>

            <p style={{ textAlign: 'center', color: '#666', marginTop: 16 }}>
                Tippe auf die Karte, um zuzuhören
            </p>
        </div>
    );
};

export default PhrasesView;
