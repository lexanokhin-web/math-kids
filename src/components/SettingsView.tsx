import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { colorSchemes } from '../utils/theme';
import { soundManager } from '../utils/soundManager';

interface SettingsViewProps {
    themeId: string;
    onThemeChange: (id: string) => void;
}

const SettingsView = ({ themeId, onThemeChange }: SettingsViewProps) => {
    const navigate = useNavigate();
    const [soundEnabled, setSoundEnabled] = useState(soundManager.isEnabled());
    const [inputMode, setInputModeState] = useState<'choice' | 'manual'>(() => {
        return (localStorage.getItem('mathkids_input_mode') as 'choice' | 'manual') || 'choice';
    });
    const [difficulty, setDifficulty] = useState<number>(() => {
        const stored = localStorage.getItem('mathkids_difficulty');
        return stored ? parseInt(stored, 10) : 10;
    });
    const [inputValue, setInputValue] = useState<string>(String(difficulty));

    useEffect(() => {
        localStorage.setItem('mathkids_difficulty', String(difficulty));
    }, [difficulty]);

    const handleSoundToggle = () => {
        const newValue = !soundEnabled;
        setSoundEnabled(newValue);
        soundManager.setEnabled(newValue);
    };

    const handleInputModeChange = (mode: 'choice' | 'manual') => {
        setInputModeState(mode);
        localStorage.setItem('mathkids_input_mode', mode);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setInputValue(val);
        const parsed = parseInt(val, 10);
        if (!isNaN(parsed) && parsed >= 5 && parsed <= 1000) {
            setDifficulty(parsed);
        }
    };

    const handleInputBlur = () => {
        const parsed = parseInt(inputValue, 10);
        if (isNaN(parsed) || parsed < 5) {
            setDifficulty(5);
            setInputValue('5');
        } else if (parsed > 1000) {
            setDifficulty(1000);
            setInputValue('1000');
        } else {
            setDifficulty(parsed);
            setInputValue(String(parsed));
        }
    };

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseInt(e.target.value, 10);
        setDifficulty(val);
        setInputValue(String(val));
    };

    const handlePresetClick = (val: number) => {
        setDifficulty(val);
        setInputValue(String(val));
    };

    const quickPresets = [10, 20, 50, 100, 1000];

    return (
        <div className="settings-view">
            <div className="reading-header">
                <button className="back-button" onClick={() => navigate('/')}>
                    ←
                </button>
                <h1 className="page-title">Settings</h1>
                <div style={{ width: 48 }} />
            </div>

            <div className="settings-content">
                {/* Game Settings */}
                <div className="settings-section">
                    <h3>Game Settings</h3>

                    <div className="setting-row">
                        <label>Sound Effects</label>
                        <label className="toggle-switch">
                            <input
                                type="checkbox"
                                checked={soundEnabled}
                                onChange={handleSoundToggle}
                            />
                            <span className="toggle-slider" />
                        </label>
                    </div>

                    <div className="setting-row">
                        <label>Eingabemodus</label>
                        <div className="mode-segmented-control">
                            <button
                                type="button"
                                className={`control-btn ${inputMode === 'choice' ? 'active' : ''}`}
                                onClick={() => handleInputModeChange('choice')}
                            >
                                🔲 4 Optionen
                            </button>
                            <button
                                type="button"
                                className={`control-btn ${inputMode === 'manual' ? 'active' : ''}`}
                                onClick={() => handleInputModeChange('manual')}
                            >
                                ✍️ Selber tippen
                            </button>
                        </div>
                    </div>

                    <div className="setting-row setting-row-difficulty">
                        <div className="setting-row-header">
                            <label htmlFor="max-number-input">Max Number</label>
                            <input
                                id="max-number-input"
                                type="number"
                                className="difficulty-number-input"
                                min="5"
                                max="1000"
                                value={inputValue}
                                onChange={handleInputChange}
                                onBlur={handleInputBlur}
                                aria-label="Max Number"
                            />
                        </div>
                        <div className="difficulty-control">
                            <input
                                type="range"
                                min="5"
                                max="1000"
                                value={difficulty}
                                onChange={handleSliderChange}
                                aria-label="Max Number Slider"
                            />
                        </div>
                        <div className="difficulty-presets">
                            {quickPresets.map(preset => (
                                <button
                                    key={preset}
                                    type="button"
                                    className={`preset-chip ${difficulty === preset ? 'active' : ''}`}
                                    onClick={() => handlePresetClick(preset)}
                                >
                                    {preset}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="setting-row" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                        <label style={{ marginBottom: 12 }}>App Color Theme</label>
                        <div className="theme-picker">
                            {colorSchemes.map(scheme => (
                                <div
                                    key={scheme.id}
                                    className={`theme-option ${themeId === scheme.id ? 'active' : ''}`}
                                    onClick={() => onThemeChange(scheme.id)}
                                >
                                    <div
                                        className="color-circle"
                                        style={{
                                            background: `linear-gradient(135deg, ${scheme.gradient[0]}, ${scheme.gradient[1]})`
                                        }}
                                    />
                                    <span className="name">{scheme.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* About */}
                <div className="settings-section">
                    <h3>About</h3>
                    <p className="about-text">Math Kids v1.0</p>
                    <p className="about-text">Learn math through play!</p>
                </div>
            </div>
        </div>
    );
};

export default SettingsView;
