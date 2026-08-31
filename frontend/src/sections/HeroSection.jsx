import './HeroSection.css';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Code2, Terminal, Users, Cpu, FileCode2, Flame, MessageSquare } from 'lucide-react';

function HeroSection() {
  return (
    <section className="hero-section">
      {/* Background Ambience & Gradient Overlays */}
      <div className="hero-glow-blob" />
      <div className="hero-grid-pattern" />

      <div className="container hero-container">
        
        {/* Top Tagline Badge */}
        <div className="section-badge hero-badge">
          <span className="section-badge-dot" />
          <span>Community Technical Knowledge Base</span>
        </div>

        {/* Hero Headings */}
        <h1 className="hero-headline">
          Where engineers share what they <br />
          <span className="hero-headline-gradient">actually know and build</span>
        </h1>

        {/* Subtitle */}
        <p className="hero-subtext">
          DevKnowledge is a community-driven platform for software engineers to publish deep architectural insights, discover battle-tested techniques, and learn from real-world systems.
        </p>

        {/* Action Buttons */}
        <div className="hero-cta-group">
          <Link to="/blog" className="btn-gradient-v1 hero-btn-primary">
            <span>Explore Articles</span>
            <ArrowRight size={16} />
          </Link>
          <Link to="/createArticle" className="btn-gradient-v2 hero-btn-secondary">
            <Code2 size={16} />
            <span>Contribute Knowledge</span>
          </Link>
        </div>

        {/* Visual Showcase: Code Architecture Card with Floating Badges */}
        <div className="hero-showcase">
          
          {/* Floating Widget Left */}
          <div className="hero-float-card hero-float-left">
            <div className="hero-float-icon">
              <Flame size={16} color="#f97316" />
            </div>
            <div>
              <div className="hero-float-title">Trending Architecture</div>
              <div className="hero-float-sub">Distributed Systems & Rust</div>
            </div>
          </div>

          {/* Floating Widget Right */}
          <div className="hero-float-card hero-float-right">
            <div className="hero-float-icon">
              <MessageSquare size={16} color="#a855f7" />
            </div>
            <div>
              <div className="hero-float-title">Peer Code Reviews</div>
              <div className="hero-float-sub">Active technical discussions</div>
            </div>
          </div>

          {/* Main Showcase Terminal Card */}
          <div className="hero-terminal framer-card">
            <div className="hero-terminal-header">
              <div className="terminal-dots">
                <span className="terminal-dot dot-red" />
                <span className="terminal-dot dot-yellow" />
                <span className="terminal-dot dot-green" />
              </div>
              <div className="terminal-filename">
                <FileCode2 size={13} />
                <span>distributed-cache.ts</span>
              </div>
              <div className="terminal-badge">TypeScript 5.4</div>
            </div>

            <div className="hero-terminal-code">
              <div className="code-line"><span className="code-keyword">interface</span> <span className="code-type">CacheNode</span>&lt;<span className="code-type">T</span>&gt; &#123;</div>
              <div className="code-line indent-1"><span className="code-prop">key</span>: <span className="code-type">string</span>;</div>
              <div className="code-line indent-1"><span className="code-prop">ttl</span>: <span className="code-type">number</span>;</div>
              <div className="code-line indent-1"><span className="code-prop">replicate</span>: (<span className="code-param">cluster</span>: <span className="code-type">ClusterConfig</span>) =&gt; <span className="code-type">Promise</span>&lt;<span className="code-type">boolean</span>&gt;;</div>
              <div className="code-line">&#125;</div>
              <div className="code-line code-comment">// Optimized consistent hashing with virtual nodes</div>
              <div className="code-line"><span className="code-keyword">export const</span> <span className="code-func">routeQuery</span> = <span className="code-keyword">async</span> (<span className="code-param">hashRing</span>, <span className="code-param">key</span>) =&gt; &#123;</div>
              <div className="code-line indent-1"><span className="code-keyword">return await</span> hashRing.<span className="code-func">getOptimalNode</span>(key);</div>
              <div className="code-line">&#125;;</div>
            </div>

            <div className="hero-terminal-footer">
              <div className="terminal-stat">
                <Terminal size={14} />
                <span>Real-World Engineering Practices</span>
              </div>
              <div className="terminal-stat">
                <Cpu size={14} />
                <span>0% Generic AI Fluff</span>
              </div>
            </div>
          </div>

        </div>

        {/* Metrics Ticker Tying It Together */}
        <div className="hero-metrics-ticker">
          <div className="hero-metric-item">
            <div className="hero-metric-val">100%</div>
            <div className="hero-metric-lbl">Peer Contributed</div>
          </div>
          <div className="hero-metric-divider" />
          <div className="hero-metric-item">
            <div className="hero-metric-val">Open</div>
            <div className="hero-metric-lbl">Knowledge Platform</div>
          </div>
          <div className="hero-metric-divider" />
          <div className="hero-metric-item">
            <div className="hero-metric-val">Direct</div>
            <div className="hero-metric-lbl">Developer Insights</div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default HeroSection;