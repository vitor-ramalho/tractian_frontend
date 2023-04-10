export interface Asset {
  assignedUserIds: number[];
  companyId: number;
  healthHistory: {
    status: string;
    timestamp: string;
  }[];
  healthscore: number;
  id: number;
  image: string;
  metrics: {
    lastUptimeAt: string;
    totalCollectsUptime: number;
    totalUptime: number;
  };
  model: string;
  name: string;
  sensors: string[];
  specifications: {
    maxTemp: number;
    power?: number;
    rpm?: number | null;
  };
  status: string;
  unitId: number;
}