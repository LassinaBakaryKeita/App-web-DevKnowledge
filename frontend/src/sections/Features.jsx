import './Features.css';
import { Zap, Edit3, Search, MessageSquareCode, BarChart3, BookmarkCheck, Bot } from 'lucide-react';

const features = [
  {
    icon: <Edit3 size={22} />,
    iconClass: 'feature-icon-blue',
    name: 'Distraction-Free Writing',
    desc: 'A clean, focused editor that supports Markdown and code blocks so you can concentrate on your ideas, not the tooling.'
  },
  {
    icon: <Search size={22} />,
    iconClass: 'feature-icon-purple',
    name: 'Smart Article Discovery',
    desc: 'Tag-based filtering and intelligent search help readers find exactly the technical depth they need, faster.'
  },
  {
    icon: <MessageSquareCode size={22} />,
    iconClass: 'feature-icon-green',
    name: 'Contextual Code Comments',
    desc: 'Comment directly on specific paragraphs or code snippets. Feedback gets specific, conversations stay useful.'
  },
  {
    icon: <BarChart3 size={22} />,
    iconClass: 'feature-icon-orange',
    name: 'Author Analytics Dashboard',
    desc: 'Track reads, reactions, and engagement over time. Understand what resonates with your audience and write more of it.'
  },
  {
    icon: <BookmarkCheck size={22} />,
    iconClass: 'feature-icon-pink',
    name: 'Personal Reading List',
    desc: 'Bookmark articles to a curated reading list and pick up where you left off across any device, any time.'
  },
  {
    icon: <Bot size={22} />,
    iconClass: 'feature-icon-teal',
    name: 'AI Writing Assistant',
    desc: 'Get smart suggestions for structure, code explanations, and clarity improvements without losing your authentic voice.'
  },
];

function Features() {
  return (
    <section className="features">
      <div className="features-inner">

        <div className="features-header">
          <span className="features-label">
            <Zap size={14} />
            <span>Platform Features</span>
          </span>
          <h2 className="features-title">Everything you need to write & grow</h2>
          <p className="features-subtitle">
            From writing to discovery to community engagement DevKnowledge has every tool a technical author needs.
          </p>
        </div>

        <div className="features-grid">
          {features.map((f, i) => (
            <div className="feature-card" key={i}>
              <div className={`feature-icon-wrap ${f.iconClass}`}>
                {f.icon}
              </div>
              <div className="feature-name">{f.name}</div>
              <div className="feature-desc">{f.desc}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Features;