import { useNavigate, useLocation } from 'react-router-dom';
import { useGameStore } from '../../store/useGameStore';
import { Trophy, Flame, Star, ArrowLeft } from 'lucide-react';
import { useLocalization } from '../../hooks/useLocalization';

interface NavbarProps {
  grade: number;
}

export default function Navbar({ grade }: NavbarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const profile = useGameStore((s) => s.profile);
  const xpForNext = useGameStore((s) => s.getXPForNext());
  const totalStars = useGameStore((s) => s.getTotalStars());
  const setLanguage = useGameStore((s) => s.setLanguage);
  const { t, lang } = useLocalization();

  const xpPercent = ((500 - xpForNext) / 500) * 100;

  return (
    <nav className="navbar glass">
      <div className="navbar__left">
        <button 
          className="navbar__back" 
          onClick={() => {
            if (location.pathname.includes('/level/')) {
              // From Playground go back to TopicList
              navigate(`/mate/grade/${grade}`);
            } else {
              // From TopicList go back to GradeSelect
              navigate('/mate');
            }
          }}
        >
          <ArrowLeft size={20} />
        </button>
        <div className="navbar__grade-badge">
          <span className="navbar__grade-num">{grade}</span>
          <span className="navbar__grade-label">{t('grade')}</span>
        </div>
      </div>

      <div className="navbar__center">
        <div className="navbar__xp-bar">
          <div className="navbar__xp-fill" style={{ width: `${xpPercent}%` }} />
          <span className="navbar__xp-text">
            {t('level')} {profile.level} · {500 - xpForNext}/{500} XP
          </span>
        </div>
      </div>

      <div className="navbar__right">
        <div className="navbar__stat" title="Серия дней">
          <Flame size={18} className="navbar__icon navbar__icon--streak" />
          <span>{profile.streak}</span>
        </div>
        <div className="navbar__stat" title="Звёзды">
          <Star size={18} className="navbar__icon navbar__icon--stars" />
          <span>{totalStars}</span>
        </div>
        <div className="navbar__stat" title="Achievements">
          <Trophy size={18} className="navbar__icon navbar__icon--trophy" />
          <span>{profile.achievements.length}</span>
        </div>
        <div className="navbar__lang-toggle">
            <button className={`nav-lang-btn ${lang === 'ru' ? 'active' : ''}`} onClick={() => setLanguage('ru')}>RU</button>
            <button className={`nav-lang-btn ${lang === 'de' ? 'active' : ''}`} onClick={() => setLanguage('de')}>DE</button>
        </div>
        <div className="navbar__avatar">{profile.avatar}</div>
      </div>

      <style>{`
        .navbar {
          position: sticky;
          top: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 1.5rem;
          height: var(--navbar-height);
          gap: 1rem;
        }
        .navbar__left {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .navbar__back {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: var(--radius-full);
          color: var(--text-secondary);
          transition: var(--transition-fast);
        }
        .navbar__back:hover {
          background: var(--bg-card);
          color: var(--accent-primary);
        }
        .navbar__grade-badge {
          display: flex;
          align-items: baseline;
          gap: 4px;
          background: var(--accent-gradient);
          color: var(--text-on-accent);
          padding: 4px 14px;
          border-radius: var(--radius-full);
          font-weight: 700;
          font-size: var(--fs-sm);
        }
        .navbar__grade-num {
          font-size: var(--fs-lg);
        }
        .navbar__grade-label {
          font-size: var(--fs-xs);
          opacity: 0.85;
        }
        .navbar__center {
          flex: 1;
          max-width: 300px;
        }
        .navbar__xp-bar {
          position: relative;
          height: 22px;
          background: var(--bg-card);
          border-radius: var(--radius-full);
          overflow: hidden;
          border: 1px solid var(--border-color);
        }
        .navbar__xp-fill {
          height: 100%;
          background: var(--accent-gradient);
          border-radius: var(--radius-full);
          transition: width 0.6s var(--ease-bounce);
        }
        .navbar__xp-text {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: var(--fs-xs);
          font-weight: 600;
          color: var(--text-primary);
          mix-blend-mode: difference;
        }
        .navbar__right {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .navbar__stat {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: var(--fs-sm);
          font-weight: 600;
          color: var(--text-secondary);
        }
        .navbar__icon--streak { color: #f97316; }
        .navbar__icon--stars { color: #fbbf24; }
        .navbar__icon--trophy { color: var(--accent-primary); }
        .navbar__avatar {
          width: 38px;
          height: 38px;
          border-radius: var(--radius-full);
          background: var(--bg-card);
          border: 2px solid var(--accent-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
        }
        .navbar__lang-toggle {
          display: flex;
          gap: 2px;
          background: var(--bg-card);
          padding: 2px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-color);
        }
        .nav-lang-btn {
          font-size: 10px;
          padding: 2px 4px;
          border-radius: 2px;
          font-weight: 800;
          color: var(--text-muted);
        }
        .nav-lang-btn.active {
          background: var(--accent-gradient);
          color: white;
        }
        @media (max-width: 640px) {
          .navbar__center { display: none; }
          .navbar__stat span { display: none; }
          .navbar__lang-toggle { display: none; }
        }
      `}</style>
    </nav>
  );
}
