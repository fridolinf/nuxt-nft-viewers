import Page from "../../pages/index.vue";
import { mount } from "@vue/test-utils";

describe("Testing Index Page", () => {
  test("Render component before connect wallet", () => {
    const page = mount(Page);

    const button = page.get("#cek").text();
    expect(button).toContain("Connect Wallet");
    expect(page.find("img")).toBeDefined();
  });
});
