import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const LEVELS = [
  {
    id: 1,
    titleDe: 'Stufe 1: Grundlagen (1–5)',
    badge: '🟢 Einfach',
    descDe: 'Einfache Aufgaben aus dem Einmaleins 1 bis 5 (z. B. 3 × 4 = ?).',
    color: 'var(--c-mint, #22c55e)'
  },
  {
    id: 2,
    titleDe: 'Stufe 2: Einmaleins (1–10)',
    badge: '🟡 Mittel',
    descDe: 'Alle Aufgaben der Einmaleins-Tabelle 1 bis 10 (z. B. 7 × 8 = ?).',
    color: 'var(--c-amber, #f59e0b)'
  },
  {
    id: 3,
    titleDe: 'Stufe 3: Profi (Zehner & Ketten)',
    badge: '🔴 Schwer',
    descDe: 'Fortgeschrittene Aufgaben mit Zehnern und Ketten (z. B. 20 × 4 = ? oder 2 × 3 × 4 = ?).',
    color: 'var(--c-rose, #f43f5e)'
  }
];

const MultiplicationLevelSelect: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="game-container" style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <button
        onClick={() => navigate('/')}
        className="btn-secondary"
        style={{ marginBottom: '20px', padding: '10px 18px', borderRadius: '12px', cursor: 'pointer' }}
      >
        ← Hauptmenü
      </button>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: 'center', marginBottom: '30px' }}
      >
        <h1 style={{ fontSize: '2.5rem', margin: '0 0 10px 0', color: '#1e293b' }}>
          × Malrechnen (Multiplikation)
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#64748b' }}>
          Wähle deine Schwierigkeitsstufe für das Üben
        </p>
      </motion.div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {LEVELS.map((level, index) => (
          <motion.div
            key={level.id}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(`/game/multiplication/level/${level.id}`)}
            className="glass-card"
            style={{
              padding: '24px',
              borderRadius: '20px',
              cursor: 'pointer',
              borderLeft: `8px solid ${level.color}`,
              background: 'rgba(255, 255, 255, 0.95)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <span
                  style={{
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    padding: '4px 10px',
                    borderRadius: '12px',
                    background: level.color,
                    color: '#fff'
                  }}
                >
                  {level.badge}
                </span>
                <h3 style={{ margin: 0, fontSize: '1.3rem', color: '#0f172a' }}>{level.titleDe}</h3>
              </div>
              <p style={{ margin: 0, fontSize: '0.95rem', color: '#475569' }}>{level.descDe}</p>
            </div>
            <div style={{ fontSize: '1.8rem', color: level.color, fontWeight: 'bold' }}>
              →
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MultiplicationLevelSelect;
