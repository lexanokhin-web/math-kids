import React from 'react';

interface FontSizeSettingsProps {
    fontSize: number;
    setFontSize: (size: number) => void;
    min?: number;
    max?: number;
}

const FontSizeSettings: React.FC<FontSizeSettingsProps> = ({ 
    fontSize, 
    setFontSize, 
    min = 1, 
    max = 6 
}) => {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            padding: '8px 12px',
            borderRadius: '12px',
            margin: '10px 0',
            width: '100%',
            maxWidth: '500px'
        }}>
            <span style={{ fontSize: '1.2rem' }}>🔤</span>
            <input 
                type="range" 
                min={min} 
                max={max} 
                step="0.1" 
                value={fontSize} 
                onChange={(e) => setFontSize(parseFloat(e.target.value))}
                style={{ 
                    flex: 1,
                    cursor: 'pointer',
                    accentColor: 'var(--button-color-4)'
                }}
            />
            <span style={{ fontSize: '0.9rem', width: '40px', textAlign: 'right' }}>{fontSize.toFixed(1)}rem</span>
        </div>
    );
};

export default FontSizeSettings;
