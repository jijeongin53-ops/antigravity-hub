import React from 'react';
import type { AppData } from '../types';
import './AppCard.css';

interface AppCardProps {
  app: AppData;
}

export const AppCard: React.FC<AppCardProps> = ({ app }) => {
  return (
    <div className="glass-panel app-card">
      <div className="card-header">
        <div className="status-indicator active"></div>
        <h3>{app.name}</h3>
      </div>
      
      <div className="card-body">
        <div className="metric-box">
          <span className="metric-label">{app.metric || '지정 안됨'}</span>
          <span className="metric-value">{app.metricValue ? app.metricValue : '데이터 없음'}</span>
        </div>
      </div>
      
      <div className="card-footer">
        <a 
          href={app.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="button-primary link-btn"
        >
          앱 열기 &rarr;
        </a>
      </div>
    </div>
  );
};
