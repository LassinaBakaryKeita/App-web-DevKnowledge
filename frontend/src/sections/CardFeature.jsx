import React from 'react';
import './CardFeature.css';

export default function CardFeature({ title, subtitle, icon, tag }) {
  return (
    <div className="framer-card card-feature-item">
      {tag && <span className="card-feature-tag">{tag}</span>}
      {icon && <div className="card-feature-icon-box">{icon}</div>}
      <h3 className="card-feature-title">{title}</h3>
      <p className="card-feature-sub">{subtitle}</p>
    </div>
  );
}
