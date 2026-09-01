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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`${API_BASE}/api/article/all`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Server returned status ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setLatestArticles(data.slice(0, 3)); // 3 most recent articles
        } else {
          throw new Error('Invalid data format');
        }
      })
      .catch((err) => {
        console.error('Failed to fetch home articles:', err);
        setError(err.message || 'Failed to load latest articles');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="home-page-root">
      <Header />
      <main>
        <HeroSection />
        <About />
        <HowItWork />
        <Features />
        <LatestArticles articles={latestArticles} loading={loading} error={error} />
        <ReadyToWorkSmarter />
      </main>
      <Footer />
    </div>
  );
}

export default Home;