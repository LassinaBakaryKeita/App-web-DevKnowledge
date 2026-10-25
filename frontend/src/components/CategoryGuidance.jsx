import { useState } from 'react';
import './CategoryGuidance.css';
import {
  Compass,
  X,
  Check,
  CheckCircle2,
  HelpCircle,
  EyeOff,
  Sparkles,
  ArrowRight,
  Layers,
  Code2,
  Brain,
  ShieldCheck,
  Cloud,
  Network,
  Cpu,
  Database,
  Binary,
  Palette,
} from 'lucide-react';
import { ARTICLE_CATEGORIES, CATEGORY_DISTINCTIONS } from '../config/categories';

// Category icons map
const categoryIcons = {
  'Software Engineering': Code2,
  'Artificial Intelligence': Brain,
  'Cybersecurity': ShieldCheck,
  'DevOps & Cloud': Cloud,
  'Architecture & Design': Layers,
  'Data & Databases': Database,
  'Networks & Distributed Systems': Network,
  'Systems & Infrastructure': Cpu,
  'Algorithms & Computer Science': Binary,
  'UI/UX & Product Design': Palette,
};

export default function CategoryGuidance({
  selectedCategory,
  onSelectCategory,
  onClose,
  onDismissPermanently,
}) {
  const [activeTab, setActiveTab] = useState('categories'); // 'categories' | 'distinctions'

  return (
    <div
      className="category-guidance-panel framer-card"
      role="region"
      aria-label="Category Selection Guidance"
    >
      {/* Header */}
      <div className="guidance-header">
        <div className="guidance-title-wrap">
          <div className="guidance-icon-badge">
            <Compass size={18} />
          </div>
          <div>
            <div className="guidance-title-row">
              <h3 className="guidance-title">Topic & Category Guidance</h3>
              <span className="guidance-pill-badge">10 Categories</span>
            </div>
            <p className="guidance-subtitle">
              Select the best match for your technical deep dive. Click any category to apply it directly.
            </p>
          </div>
        </div>

        <div className="guidance-header-actions">
          <button
            type="button"
            className="guidance-dismiss-btn"
            onClick={onDismissPermanently}
            title="Permanently hide automatic guidance"
          >
            <EyeOff size={14} />
            <span>Don't show this again</span>
          </button>

          <button
            type="button"
            className="guidance-close-btn"
            onClick={onClose}
            aria-label="Close guidance"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Tabs / Switcher */}
      <div className="guidance-tabs">
        <button
          type="button"
          className={`guidance-tab ${activeTab === 'categories' ? 'guidance-tab--active' : ''}`}
          onClick={() => setActiveTab('categories')}
        >
          <Sparkles size={14} />
          <span>All 10 Categories</span>
        </button>
        <button
          type="button"
          className={`guidance-tab ${activeTab === 'distinctions' ? 'guidance-tab--active' : ''}`}
          onClick={() => setActiveTab('distinctions')}
        >
          <HelpCircle size={14} />
          <span>Key Distinctions & Comparisons</span>
        </button>
      </div>

      {/* Tab 1: Categories List */}
      {activeTab === 'categories' && (
        <div className="guidance-categories-grid">
          {ARTICLE_CATEGORIES.map((cat) => {
            const Icon = categoryIcons[cat.name] || Compass;
            const isSelected = selectedCategory === cat.name;

            return (
              <div
                key={cat.id}
                className={`guidance-category-card ${isSelected ? 'guidance-category-card--selected' : ''}`}
                onClick={() => onSelectCategory && onSelectCategory(cat.name)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectCategory && onSelectCategory(cat.name);
                  }
                }}
              >
                <div className="guidance-card-top">
                  <div className="guidance-card-icon">
                    <Icon size={16} />
                  </div>
                  <span className="guidance-card-name">{cat.name}</span>
                  {isSelected && (
                    <span className="guidance-selected-badge">
                      <Check size={12} />
                      <span>Selected</span>
                    </span>
                  )}
                </div>

                <p className="guidance-card-desc">{cat.description}</p>

                <div className="guidance-card-examples">
                  <span className="guidance-examples-label">Topics:</span>
                  <span className="guidance-examples-text">{cat.examples}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tab 2: Key Distinctions */}
      {activeTab === 'distinctions' && (
        <div className="guidance-distinctions-list">
          <div className="guidance-distinctions-intro">
            <span>
              Unsure between two related topics? Here is how to choose the most accurate category:
            </span>
          </div>

          {CATEGORY_DISTINCTIONS.map((item, index) => (
            <div key={index} className="guidance-distinction-card">
              <div className="guidance-distinction-pair">
                <CheckCircle2 size={16} className="guidance-distinction-icon" />
                <h4>{item.pair}</h4>
              </div>
              <p className="guidance-distinction-text">{item.comparison}</p>
            </div>
          ))}
        </div>
      )}

      {/* Footer controls */}
      <div className="guidance-footer">
        <div className="guidance-footer-tip">
          <span>Tip: You can re-open this guide at any time by clicking "Category Guide".</span>
        </div>
        <div className="guidance-footer-buttons">
          <button
            type="button"
            className="guidance-dont-show-btn"
            onClick={onDismissPermanently}
          >
            <EyeOff size={14} />
            <span>Don't show this again</span>
          </button>
          <button
            type="button"
            className="btn-gradient-v2 guidance-got-it-btn"
            onClick={onClose}
          >
            <span>Got it</span>
          </button>
        </div>
      </div>
    </div>
  );
}
