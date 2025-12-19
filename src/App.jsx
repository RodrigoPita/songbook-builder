import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import SongbookView from './components/SongbookView';
import ChartEditor from './components/ChartEditor';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/vozes-de-hipona" element={<SongbookView category="vozes-de-hipona" />} />
                <Route path="/repertoire" element={<SongbookView category="repertoire" />} />
                <Route path="/editor" element={<ChartEditor />} />
            </Routes>
        </Router>
    );
};

export default App;
