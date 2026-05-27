import React, { useEffect, useState } from 'react';
import type { AppData } from '../types';
import './AppCard.css';

interface AppCardProps {
  app: AppData;
}

export const AppCard: React.FC<AppCardProps> = ({ app }) => {
  const [liveValue, setLiveValue] = useState<number | string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    
    const fetchLiveMetrics = async () => {
      try {
        setLoading(true);
        // Normalize URL to remove trailing slash
        const baseUrl = app.url.replace(/\/$/, '');
        const response = await fetch(`${baseUrl}/api/hub-metrics`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        
        const data = await response.json();
        if (isMounted && data && data.value !== undefined) {
          setLiveValue(data.value);
        }
      } catch (err) {
        console.error(`Failed to fetch metrics for ${app.name}:`, err);
        if (isMounted) {
          setError(true);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchLiveMetrics();

    return () => {
      isMounted = false;
    };
  }, [app.url]);

  return (
    <div className="glass-panel app-card">
      <div className="card-header">
        <div className={`status-indicator ${error ? 'error' : 'active'}`}></div>
        <h3>{app.name}</h3>
      </div>
      
      <div className="card-body">
        <div className="metric-box">
          <span className="metric-label">{app.metric || '핵심 지표'}</span>
          <span className="metric-value">
            {loading ? (
              <span className="spinner">...</span>
            ) : error ? (
              <span className="error-text">연결 실패</span>
            ) : (
              liveValue !== null ? liveValue : '데이터 없음'
            )}
          </span>
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
