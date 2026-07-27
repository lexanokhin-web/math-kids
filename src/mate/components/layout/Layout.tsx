import { Outlet, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './Navbar';
import { applyTheme } from '../../styles/themes';
import { useGameStore } from '../../store/useGameStore';

export default function Layout() {
    const { gradeId } = useParams<{ gradeId: string }>();
    const currentGrade = useGameStore((s) => s.profile.currentGrade);
    const grade = gradeId ? parseInt(gradeId) : currentGrade;

    useEffect(() => {
        applyTheme(grade);
        return () => {
            document.documentElement.removeAttribute('data-theme');
        };
    }, [grade]);

    return (
        <div className="layout">
            <Navbar grade={grade} />
            <main className="layout__content">
                <Outlet />
            </main>

            <style>{`
        .layout {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
        .layout__content {
          flex: 1;
          padding: 2rem 1.5rem;
          max-width: var(--content-max-width);
          margin: 0 auto;
          width: 100%;
        }
      `}</style>
        </div>
    );
}
