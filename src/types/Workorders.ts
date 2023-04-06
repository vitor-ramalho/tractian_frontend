export interface Checklist {
  completed: boolean;
  task: string;
}

export interface MaintenanceTask {
  assetId: number;
  assignedUserIds: number[];
  checklist: Checklist[];
  description: string;
  id: number;
  priority: "low" | "medium" | "high";
  status: "pending" | "in progress" | "completed";
  title: string;
}