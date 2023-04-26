import Page from "../pages/index.vue";
import { mount } from "@vue/test-utils";

describe("Testing Index Page", () => {
  /* This code is testing whether the "loading" component is being rendered correctly on the "Index"
  page. It uses the `mount` function from the `@vue/test-utils` library to mount the "Index" page
  component, then uses the `find` method to locate the "loading" component by its ID. Finally, it
  uses the `toBeDefined` matcher from the Jest testing framework to check that the "loading"
  component exists and is defined. */
  test("Render loading component", () => {
    const pages = mount(Page);
    const loading = pages.find("#loading");
    expect(loading).toBeDefined();
  });
});
