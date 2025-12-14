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
    const [difficulty, setDifficulty] = useState(() => {
        const stored = localStorage.getItem('mathkids_difficulty');
        return stored ? parseInt(stored) : 10;
    });

    useEffect(() => {
        localStorage.setItem('mathkids_difficulty', String(difficulty));
    }, [difficulty]);

    const handleSoundToggle = () => {
        const newValue = !soundEnabled;
        setSoundEnabled(newValue);
        soundManager.setEnabled(newValue);
    };

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
                        <label>Max Number</label>
                        <div className="difficulty-control">
                            <input
                                type="range"
                                min="5"
                                max="99"
                                value={difficulty}
                                onChange={e => setDifficulty(parseInt(e.target.value))}
                            />
                            <span className="value">{difficulty}</span>
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
