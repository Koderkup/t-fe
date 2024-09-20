export type Message = {
  id: string;
  message: string;
  mediaUrl?: string;
  createdAt: string;
  shopId: string;
  status: SubscriberMessageStatus;
};

export enum SubscriberMessageStatus {
  Pending = "Pending",
  Sent = "Sent",
}
