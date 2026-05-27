import { useEffect, useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { LinkInputForm } from './components/LinkInputForm';
import { fetchDashboardData, addAppToSheet } from './api/googleSheets';
import type { SheetData } from './types';
import './App.css';

function App() {
  const [data, setData] = useState<SheetData>({ apps: [], metrics: [] });
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const result = await fetchDashboardData();
      setData(result);
    } catch (error) {
      console.error("Failed to load data", error);
      // fallback in case of error
      setData({ apps: [], metrics: [] });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddApp = async (name: string, url: string, metric: string) => {
    const success = await addAppToSheet(name, url, metric);
    if (success) {
      // Reload data to reflect new changes
      await loadData();
    } else {
      alert("앱 추가에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>AntiGravity Hub</h1>
        <p className="subtitle">통합 웹앱 대시보드 플랫폼</p>
      </header>

      <main className="app-main">
        <LinkInputForm metrics={data.metrics} onAddApp={handleAddApp} />
        <section className="dashboard-section">
          <div className="section-header">
            <h2>내 앱 목록</h2>
            <button onClick={loadData} className="refresh-btn">새로고침 ↻</button>
          </div>
          <Dashboard apps={data.apps} loading={loading} />
        </section>
      </main>
    </div>
  );
}

export default App;
