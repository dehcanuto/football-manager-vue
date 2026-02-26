import { IconMessages } from "@/components/atoms/Icon.vue";

export interface MessagesType {
  id: number;
  type: IconMessages;
  title: string;
  content: string;
  read: boolean;
  createdAt: string;
}
