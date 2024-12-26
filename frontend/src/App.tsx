import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Header } from './components/header/Header';
import { Video } from './pages/Video';
import './App.css';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/video/:id" element={<Video />} />
      </Routes>
    </>
  );
}

export default App;
