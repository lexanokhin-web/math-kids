import { motion } from 'framer-motion';

export default function LoadingScreen() {
    return (
        <div className="loading-screen">
            <motion.div
                className="loading-spinner"
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            >
                <div className="loading-ring" />
            </motion.div>
            <motion.p
                className="loading-text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                Загрузка...
            </motion.p>

            <style>{`
        .loading-screen {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: var(--bg-primary);
          gap: 1.5rem;
        }
        .loading-spinner {
          width: 60px;
          height: 60px;
        }
        .loading-ring {
          width: 100%;
          height: 100%;
          border: 4px solid var(--border-color);
          border-top-color: var(--accent-primary);
          border-radius: 50%;
        }
        .loading-text {
          font-size: var(--fs-lg);
          color: var(--text-secondary);
          font-weight: 500;
        }
      `}</style>
        </div>
    );
}
