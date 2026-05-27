export interface AppData {
  name: string;
  url: string;
  metric: string;
  createdAt: string;
}

export interface SheetData {
  apps: AppData[];
  metrics: string[];
}
