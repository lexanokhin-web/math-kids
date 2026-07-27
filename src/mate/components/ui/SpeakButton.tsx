import { motion } from 'framer-motion';
import { Volume2 } from 'lucide-react';

interface Props {
    onClick: () => void;
    size?: 'sm' | 'md' | 'lg';
}

export default function SpeakButton({ onClick, size = 'md' }: Props) {
    const sizes = {
        sm: { btn: 32, icon: 14 },
        md: { btn: 42, icon: 18 },
        lg: { btn: 56, icon: 24 },
    };

    const s = sizes[size];

    return (
        <motion.button
            className="speak-btn"
            onClick={onClick}
            initial={{ 
                background: 'linear-gradient(135deg, #f472b6 0%, #ec4899 100%)',
            }}
            whileHover={{ 
                scale: 1.15,
                rotate: 5,
                background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
            }}
            whileTap={{ scale: 0.95 }}
            title="Прослушать задание"
            style={{
                width: s.btn,
                height: s.btn,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '9999px',
                border: '2px solid rgba(255, 255, 255, 0.4)',
                boxShadow: '0 4px 12px rgba(236, 72, 153, 0.4)',
                cursor: 'pointer',
                flexShrink: 0,
                color: 'white',
            }}
        >
            <Volume2 size={s.icon} />

            <style>{`
        .speak-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-full);
          background: linear-gradient(135deg, #f472b6 0%, #ec4899 100%);
          color: white;
          box-shadow: 0 4px 12px rgba(236, 72, 153, 0.4);
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          flex-shrink: 0;
          border: 2px solid rgba(255, 255, 255, 0.3);
          cursor: pointer;
        }
        .speak-btn:hover {
          transform: scale(1.15) rotate(5deg);
          box-shadow: 0 8px 25px rgba(124, 58, 237, 0.6);
          background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
        }
        .speak-btn:active {
          transform: scale(0.95);
        }
      `}</style>
        </motion.button>
    );
}
