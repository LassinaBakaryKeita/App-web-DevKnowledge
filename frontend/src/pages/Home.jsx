import { useState, useEffect } from 'react';
import Header from '../components/Header';
import HeroSection from '../sections/HeroSection';
import About from '../sections/About';
import CardFeature from '../sections/CardFeature';
import Features from '../sections/Features';
import LatestArticles from '../sections/LatestArticles';
import Footer from '../components/Footer';

function Home() {
    const [latestArticles, setLatestArticles] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/article/all")
            .then(res => res.json())
            .then(data => setLatestArticles(data.slice(0, 3))) // On ne prend que les 3 derniers
            .catch(err => console.error(err));
    }, []);

    return (
        <>
            <Header />
            <HeroSection />
            <About />
            <Features />
            <LatestArticles articles={latestArticles} />
            <Footer />
        </>
    );
}



export default Home;