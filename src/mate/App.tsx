import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Layout from './components/layout/Layout';
import LoadingScreen from './components/ui/LoadingScreen';
import './index.css';

const GradeSelect = lazy(() => import('./pages/GradeSelect/GradeSelect'));
const TopicList = lazy(() => import('./pages/TopicList/TopicList'));
const Playground = lazy(() => import('./pages/Playground/Playground'));

function App() {
    return (
        <div className="mate-app-root">
            <Suspense fallback={<LoadingScreen />}>
                <Routes>
                    <Route index element={<GradeSelect />} />
                    <Route element={<Layout />}>
                        <Route path="grade/:gradeId" element={<TopicList />} />
                        <Route path="grade/:gradeId/topic/:topicId/level/:levelId" element={<Playground />} />
                    </Route>
                </Routes>
            </Suspense>
        </div>
    );
}

export default App;
