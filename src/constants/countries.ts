import { Component } from "vue";

import brazil from "@components/atoms/flags/brazil.vue";
import argentina from "@components/atoms/flags/argentina.vue";
import usa from "@components/atoms/flags/usa.vue";
import portugal from "@components/atoms/flags/portugal.vue";
import france from "@components/atoms/flags/france.vue";
import unitedKingdom from "@components/atoms/flags/unitedKingdom.vue";
import uruguay from "@components/atoms/flags/uruguay.vue";
import england from "@components/atoms/flags/england.vue";
import spain from "@components/atoms/flags/spain.vue";
import italy from "@components/atoms/flags/italy.vue";
import germany from "@components/atoms/flags/germany.vue";
import netherlands from "@components/atoms/flags/netherlands.vue";

export type CountryCode =
  | "BR"
  | "AR"
  | "EN"
  | "GB"
  | "ES"
  | "FR"
  | "DE"
  | "IT"
  | "PT"
  | "NL"
  | "UR"
  | "US";

export interface CountryProps {
  name: string;
  flag: Component;
}

const COUNTRIES_ICONS = {
  BR: brazil,
  AR: argentina,
  EN: england,
  UK: unitedKingdom,
  ES: spain,
  FR: france,
  DE: germany,
  IT: italy,
  PT: portugal,
  NL: netherlands,
  UR: uruguay,
  US: usa,
};

export const COUNTRIES: Record<CountryCode, CountryProps> = {
  BR: { name: "Brasil", flag: COUNTRIES_ICONS.BR },
  AR: { name: "Argentina", flag: COUNTRIES_ICONS.AR },
  EN: { name: "Inglaterra", flag: COUNTRIES_ICONS.EN },
  GB: { name: "United Kingdom", flag: COUNTRIES_ICONS.UK },
  ES: { name: "Espanha", flag: COUNTRIES_ICONS.ES },
  FR: { name: "França", flag: COUNTRIES_ICONS.FR },
  DE: { name: "Alemanha", flag: COUNTRIES_ICONS.DE },
  IT: { name: "Itália", flag: COUNTRIES_ICONS.IT },
  PT: { name: "Portugal", flag: COUNTRIES_ICONS.PT },
  NL: { name: "Netherlands", flag: COUNTRIES_ICONS.NL },
  UR: { name: "Uruguai", flag: COUNTRIES_ICONS.UR },
  US: { name: "USA", flag: COUNTRIES_ICONS.US },
};
