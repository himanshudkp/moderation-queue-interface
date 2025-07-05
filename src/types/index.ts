export type Status = "pending" | "approved" | "rejected";

export interface Author {
  username: string;
  id: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  author: Author;
  reportedReason: string;
  reportedAt: string;
  status: Status;
  reportCount: number;
}

export interface ActionTimeout {
  id: string;
  timeoutId: any;
}
