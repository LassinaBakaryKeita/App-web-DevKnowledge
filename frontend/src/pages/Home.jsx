import { useState, useEffect } from 'react';
import Header from '../components/Header';
import HeroSection from '../sections/HeroSection';
import About from '../sections/About';
import HowItWork from '../sections/HowItWork';
import Features from '../sections/Features';
import LatestArticles from '../sections/LatestArticles';
import ReadyToWorkSmarter from '../sections/ReadyToWorkSmarter';
import Footer from '../components/Footer';
import { API_BASE } from '../config/api';

function Home() {
  const [latestArticles, setLatestArticles] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/api/article/all`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setLatestArticles(data.slice(0, 3)); // 3 most recent articles
        }
      })
      .catch((err) => console.error('Failed to fetch home articles:', err));
  }, []);

  return (
    <div className="home-page-root">
      <Header />
      <main>
        <HeroSection />
        <About />
        <HowItWork />
        <Features />
        <LatestArticles articles={latestArticles} />
        <ReadyToWorkSmarter />
      </main>
      <Footer />
    </div>
  );
}

export default Home;