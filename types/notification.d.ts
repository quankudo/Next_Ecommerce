export interface Notification {
  id: number;
  type: "order" | "system" | "promotion";
  content: string;
  date: string;
  isRead: boolean;
}