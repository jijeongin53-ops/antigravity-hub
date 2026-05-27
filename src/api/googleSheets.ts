import type { SheetData } from '../types';

// .env 파일에 VITE_GOOGLE_APPS_SCRIPT_URL 를 설정해야 합니다.
const SCRIPT_URL = import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL;

export const fetchDashboardData = async (): Promise<SheetData> => {
  if (!SCRIPT_URL || SCRIPT_URL === '여기에_대표님의_웹앱_URL을_붙여넣으세요') {
    // URL이 설정되지 않은 경우 처리 (개발 편의를 위해 임시 빈 데이터 반환 또는 에러 방출)
    console.warn("Google Apps Script URL is not set in .env file.");
    return { apps: [], metrics: [] };
  }

  try {
    const response = await fetch(SCRIPT_URL);
    if (!response.ok) throw new Error('Network response was not ok');
    const data: SheetData = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    throw error;
  }
};

export const addAppToSheet = async (name: string, url: string, metric: string): Promise<boolean> => {
  if (!SCRIPT_URL || SCRIPT_URL === '여기에_대표님의_웹앱_URL을_붙여넣으세요') {
    alert("Google Apps Script URL이 설정되지 않았습니다.");
    return false;
  }

  try {
    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8', // CORS 회피용 text/plain
      },
      body: JSON.stringify({ name, url, metric })
    });
    
    const result = await response.json();
    return result.success;
  } catch (error) {
    console.error("Error saving app:", error);
    return false;
  }
};
