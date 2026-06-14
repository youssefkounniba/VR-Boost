export type VisitStatus =
  | "not_started"
  | "pending"
  | "scanning"
  | "in_progress"
  | "completed";

export type StagingStyle =
  | "Contemporary Chic"
  | "Scandinavian"
  | "Minimalist"
  | "Industrial"
  | "Bohemian";

export interface Project {
  id: string;
  client: string;
  propertyType: "Apartment" | "House" | "Villa" | "Office";
  address: string;
  rooms: string[];
  surface: number;
  style: StagingStyle;
  status: VisitStatus;
  matterportLink: string;
  image: string;
  createdAt: string;
  assignees?: { initial: string; color: string }[];
}

export interface Meeting {
  id: string;
  projectId: string;
  date: string;
  startTime: string;
  endTime: string;
  guest: { name: string; email: string; initial: string; color: string };
  status: "upcoming" | "past" | "live" | "canceled";
  image?: string;
  propertyType?: string;
  address?: string;
  rooms?: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Designer" | "Sales" | "Support";
  initial: string;
  color: string;
  joinedAt: string;
}

export interface FurnitureCategory {
  id: string;
  name: string;
  items: number;
  image: string;
}

export interface FurnitureItem {
  id: string;
  name: string;
  categoryId: string;
  colors: string[];
  image: string;
}

export const STATUS_LABELS: Record<VisitStatus, string> = {
  not_started: "Not Started",
  pending: "Pending",
  scanning: "Scanning",
  in_progress: "In Progress",
  completed: "Completed",
};

export const STATUS_COLORS: Record<VisitStatus, string> = {
  not_started: "bg-gray-100 text-gray-500",
  pending: "bg-amber-50 text-amber-600",
  scanning: "bg-blue-50 text-blue-600",
  in_progress: "bg-purple-50 text-purple-600",
  completed: "bg-green-50 text-green-600",
};

export const STATUS_DOT: Record<VisitStatus, string> = {
  not_started: "bg-gray-400",
  pending: "bg-amber-500",
  scanning: "bg-blue-500",
  in_progress: "bg-purple-500",
  completed: "bg-green-500",
};
