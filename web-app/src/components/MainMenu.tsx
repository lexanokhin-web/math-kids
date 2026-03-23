import { Link } from 'react-router-dom';

const MainMenu = () => {
    return (
        <div className="main-menu">
            <h1 className="main-title">Math Kids!</h1>

            {/* Mathematics Section */}
            <h2 className="section-header">🧮 Mathematics</h2>
            <div className="menu-group">
                <Link to="/game/addition" className="menu-button">
                    <span className="icon">➕</span>
                    <span>Addition - Horizontal</span>
                </Link>
                <Link to="/game/verticalAddition" className="menu-button">
                    <span className="icon">⬇️</span>
                    <span>Addition - Vertical</span>
                </Link>
                <Link to="/game/subtraction" className="menu-button">
                    <span className="icon">➖</span>
                    <span>Subtraction - Horizontal</span>
                </Link>
                <Link to="/game/verticalSubtraction" className="menu-button">
                    <span className="icon">⬇️</span>
                    <span>Subtraction - Vertical</span>
                </Link>
            </div>

            {/* Reading Section */}
            <h2 className="section-header">📖 Reading (DE)</h2>
            <div className="menu-group">
                <Link to="/syllables" className="menu-button">
                    <span className="icon">🔤</span>
                    <span>Syllables (DE)</span>
                </Link>
                <Link to="/words" className="menu-button">
                    <span className="icon">📝</span>
                    <span>Two-syllable Words (DE)</span>
                </Link>
                <Link to="/phrases" className="menu-button">
                    <span className="icon">🗣️</span>
                    <span>Phrases (DE)</span>
                </Link>
                <Link to="/sentences" className="menu-button">
                    <span className="icon">📚</span>
                    <span>100+ Sentences (Lola)</span>
                </Link>
                <Link to="/extended-sentences" className="menu-button">
                    <span className="icon">👶</span>
                    <span>Extended Sentences</span>
                </Link>
            </div>

            {/* Other */}
            <div className="menu-group">
                <Link to="/progress" className="menu-button">
                    <span className="icon">🏆</span>
                    <span>My Progress</span>
                </Link>
                <Link to="/settings" className="menu-button">
                    <span className="icon">⚙️</span>
                    <span>Settings</span>
                </Link>
            </div>
        </div>
    );
};

export default MainMenu;
