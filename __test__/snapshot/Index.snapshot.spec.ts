import Page from "../../pages/index.vue";
import { mount } from "@vue/test-utils";

describe("Snapshot Index Page", () => {
  test("Snapshot index page component", () => {
    const pages = mount(Page);
    expect(pages.html()).toMatchSnapshot();
  });
});
