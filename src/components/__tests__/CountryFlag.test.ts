import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import CountryFlag from "@components/atoms/CountryFlag.vue";
import { COUNTRIES } from "@/constants/countries";

describe("CountryFlag.vue", () => {
  it("renderiza corretamente o nome do país", () => {
    const wrapper = mount(CountryFlag, {
      props: { code: "BR", showName: true },
    });

    expect(wrapper.text()).toContain(COUNTRIES.BR.name);
  });

  it("renderiza o componente da bandeira", () => {
    const wrapper = mount(CountryFlag, {
      props: { code: "FR" },
    });

    const flag = wrapper.find("svg, div");
    expect(flag.exists()).toBe(true);
  });

  it("não mostra o nome quando showName = false", () => {
    const wrapper = mount(CountryFlag, {
      props: { code: "BR", showName: false },
    });

    expect(wrapper.text()).not.toContain(COUNTRIES.BR.name);
  });

  it("usa o tamanho correto no estilo", () => {
    const wrapper = mount(CountryFlag, {
      props: { code: "BR", size: 8 },
    });

    const flag = wrapper.find("[class*='size-8']");
    expect(flag.exists()).toBe(true);
  });
});
