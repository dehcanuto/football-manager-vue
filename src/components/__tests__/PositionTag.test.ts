import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import PositionTag from "@components/atoms/PositionTag.vue";
import { positionName } from "@/constants/team";

describe("PositionTag.vue", () => {
  it("renderiza corretamente a posição passada", () => {
    const wrapper = mount(PositionTag, {
      props: { position: "MID" },
    });
    expect(wrapper.text()).toContain("MID");
  });

  it("usa a cor correta para cada posição", () => {
    const cases = [
      { pos: "FWD", color: "badge-error" },
      { pos: "MID", color: "badge-warning" },
      { pos: "DEF", color: "badge-info" },
      { pos: "GK", color: "badge-neutral" },
    ];

    for (const { pos, color } of cases) {
      const wrapper = mount(PositionTag, {
        props: { position: pos as any },
      });
      expect(wrapper.classes()).toContain(color);
    }
  });

  it("mostra o tooltip correto com o nome completo da posição", () => {
    const wrapper = mount(PositionTag, {
      props: { position: "DEF" },
    });

    expect(wrapper.attributes("data-tip")).toBe(positionName.DEF);
  });

  it("mantém as classes base de estilo", () => {
    const wrapper = mount(PositionTag, {
      props: { position: "GK" },
    });

    expect(wrapper.classes()).toContain("badge");
    expect(wrapper.classes()).toContain("tooltip");
  });
});
