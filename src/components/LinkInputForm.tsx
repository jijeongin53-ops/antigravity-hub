import React, { useState } from 'react';
import './LinkInputForm.css';

interface LinkInputFormProps {
  metrics: string[];
  onAddApp: (name: string, url: string, metric: string) => Promise<void>;
}

export const LinkInputForm: React.FC<LinkInputFormProps> = ({ metrics, onAddApp }) => {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [metric, setMetric] = useState(metrics[0] || '');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !url) {
      alert('앱 이름과 URL을 모두 입력해주세요.');
      return;
    }
    
    setLoading(true);
    await onAddApp(name, url, metric);
    setLoading(false);
    setName('');
    setUrl('');
  };

  return (
    <div className="glass-panel form-container">
      <form onSubmit={handleSubmit} className="link-form">
        <div className="input-group">
          <label>새로운 앱 추가</label>
          <div className="inputs-row">
            <input 
              type="text" 
              className="input-field" 
              placeholder="앱 이름 (예: 인턴매칭 앱)"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input 
              type="url" 
              className="input-field" 
              placeholder="Vercel URL (https://...)"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <select 
              className="input-field metric-select" 
              value={metric}
              onChange={(e) => setMetric(e.target.value)}
            >
              {metrics.length > 0 ? (
                metrics.map((m, idx) => (
                  <option key={idx} value={m}>{m}</option>
                ))
              ) : (
                <option value="">지표를 시트에 추가해주세요</option>
              )}
            </select>
            <button type="submit" className="button-primary submit-btn" disabled={loading}>
              {loading ? '추가 중...' : '앱 등록하기'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
