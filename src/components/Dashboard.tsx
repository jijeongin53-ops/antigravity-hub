import React from 'react';
import { AppData } from '../types';
import { AppCard } from './AppCard';
import './Dashboard.css';

interface DashboardProps {
  apps: AppData[];
  loading: boolean;
}

export const Dashboard: React.FC<DashboardProps> = ({ apps, loading }) => {
  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner"></div>
        <p>대시보드 데이터를 불러오는 중...</p>
      </div>
    );
  }

  if (apps.length === 0) {
    return (
      <div className="dashboard-empty glass-panel">
        <h2>등록된 앱이 없습니다.</h2>
        <p>상단의 폼을 통해 새로운 Vercel 앱을 추가해 보세요.</p>
      </div>
    );
  }

  return (
    <div className="dashboard-grid">
      {apps.map((app, index) => (
        <AppCard key={index} app={app} />
      ))}
    </div>
  );
};
