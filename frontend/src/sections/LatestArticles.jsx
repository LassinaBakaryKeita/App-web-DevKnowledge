import './LatestArticles.css';
import Article from '../components/Article';

// Articles affichés en fallback si aucune donnée n'est encore disponible
const SAMPLE_ARTICLES = [
  {
    id: 1,
    title: 'Understanding React Server Components in 2024',
    excerpt: 'RSCs blur the line between server and client. In this deep dive, I explain the mental model you need to use them effectively without foot-guns.',
    author: 'Maya Chen',
    date: 'Mar 18, 2025',
    tag: 'React',
    likes: 312,
    comments: 54,
  },
  {
    id: 2,
    title: 'Why Your Docker Builds Are Slow (and How to Fix Them)',
    excerpt: 'Layer caching misconfigurations are the silent killer of CI/CD pipelines. Here is how to cut build time by 60% with a few strategic changes.',
    author: 'Carlos Mena',
    date: 'Mar 14, 2025',
    tag: 'DevOps',
    likes: 228,
    comments: 38,
  },
  {
    id: 3,
    title: 'The Hidden Cost of Over-Engineering Your API',
    excerpt: 'Premature abstraction in API design creates technical debt faster than almost anything else. A pragmatic look at when to keep it simple.',
    author: 'Jordan Park',
    date: 'Mar 10, 2025',
    tag: 'Architecture',
    likes: 187,
    comments: 29,
  },
];

function LatestArticles({ articles }) {
  const displayArticles = articles && articles.length > 0 ? articles : SAMPLE_ARTICLES;

  return (
    <section className="latest-articles">
      <div className="latest-articles-inner">
        <div className="latest-articles-header">
          <div className="latest-articles-heading">
            <span className="latest-articles-label">📰 Latest articles</span>
            <h2 className="latest-articles-title">Community news</h2>
            <p className="latest-articles-desc">
              Discover what developers are publishing right now.
            </p>
          </div>
          <a href="/Blog" className="latest-articles-view-all">
            See all articles →
          </a>
        </div>

        <div className="articles-grid">
          {displayArticles.map((article) => (
            <Article key={article.id || article._id} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default LatestArticles;