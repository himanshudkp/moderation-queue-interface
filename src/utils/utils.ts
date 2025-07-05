import type { Status } from "../types";

export type FilterType = "all" | Status;

export const LOAD_MORE_THRESHOLD = 100;
export const POSTS_PER_BATCH = 20;
export const INITIAL_LOADING_DELAY = 700;
export const LOAD_MORE_DELAY = 500;
export const UNDO_DELAY = 5000;

export const statusColors: Record<Status, string> = {
  pending: "yellow",
  approved: "green",
  rejected: "red",
};

const getButtonColor = (status: FilterType): string => {
  if (status === "all") {
    return "bg-gray-100 text-gray-700 hover:bg-gray-200";
  }

  const color = statusColors[status];
  return `bg-${color}-100 text-${color}-800 hover:bg-${color}-200`;
};

const getActiveRingColor = (status: FilterType): string => {
  if (status === "all") {
    return "ring-2 ring-gray-400";
  }

  const color = statusColors[status];
  return `ring-2 ring-${color}-400`;
};

export const FILTER_BUTTONS: FilterType[] = [
  "all",
  "pending",
  "approved",
  "rejected",
];

export const buttonColors: Record<FilterType, string> = Object.fromEntries(
  FILTER_BUTTONS.map((status) => [status, getButtonColor(status)])
) as Record<FilterType, string>;

export const activeRingColors: Record<FilterType, string> = Object.fromEntries(
  FILTER_BUTTONS.map((status) => [status, getActiveRingColor(status)])
) as Record<FilterType, string>;

export const capitalizeFirstChar = (str: string): string => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};
