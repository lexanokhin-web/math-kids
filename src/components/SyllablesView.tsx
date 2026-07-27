import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { generateSyllables, shuffleArray, speakGerman } from '../utils/syllablesData';
import FontSizeSettings from './FontSizeSettings';

const SyllablesView = () => {
    const navigate = useNavigate();
    const [fontSize, setFontSize] = useState(() => 
        parseFloat(localStorage.getItem('mathkids_reading_font_size') || '4.0')
    );
    const [syllables, setSyllables] = useState(() => shuffleArray(generateSyllables()));
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPressed, setIsPressed] = useState(false);

    const updateFontSize = (size: number) => {
        setFontSize(size);
        localStorage.setItem('mathkids_reading_font_size', size.toString());
    };

    const currentSyllable = syllables[currentIndex % syllables.length];

    const handleTap = useCallback(async () => {
        await speakGerman(currentSyllable);
        setCurrentIndex(i => (i + 1) % syllables.length);
    }, [currentSyllable, syllables.length]);

    const handleShuffle = () => {
        setSyllables(shuffleArray(generateSyllables()));
        setCurrentIndex(0);
    };

    const handleRepeat = () => {
        speakGerman(currentSyllable);
    };

    return (
        <div className="reading-view">
            <div className="reading-header">
                <button className="back-button" onClick={() => navigate('/')}>
                    ←
                </button>
                <h1 className="reading-title">Silben</h1>
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
                <span className="word" style={{ fontSize: `${fontSize}rem` }}>{currentSyllable}</span>
            </motion.div>

            <p style={{ textAlign: 'center', color: '#666', marginTop: 16 }}>
                Tippe auf die Karte, um zuzuhören
            </p>
        </div>
    );
};

export default SyllablesView;
