import { IconName } from "@/components/atoms/Icon.vue";

export interface MenuItem {
  label: string;
  icon?: IconName;
  path: string;
  children?: MenuItem[];
}
