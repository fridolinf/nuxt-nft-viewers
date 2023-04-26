import NftCard from "../../components/NftCard.vue";
import { mount } from "@vue/test-utils";

describe("Snapshot Index Page", () => {
  test("Snapshot index page component", () => {
    const pages = mount(NftCard);
    expect(pages.html()).toMatchSnapshot();
  });
});
