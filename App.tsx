
import React from 'react';
import { HashRouter, Routes, Route, Outlet } from 'react-router-dom';
import { DownloadLinksProvider } from './hooks/useDownloadLinks';

import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import DownloadPage from './pages/DownloadPage';
import AdminPage from './pages/AdminPage';
import ParticleBackground from './components/ParticleBackground';

const Layout: React.FC = () => (
  <div className="flex flex-col min-h-screen relative z-10">
    <Header />
    <main className="flex-grow">
      <Outlet />
    </main>
    <Footer />
  </div>
);

const App: React.FC = () => {
  return (
    <DownloadLinksProvider>
      <ParticleBackground />
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="download" element={<DownloadPage />} />
          </Route>
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </HashRouter>
    </DownloadLinksProvider>
  );
};

export default App;