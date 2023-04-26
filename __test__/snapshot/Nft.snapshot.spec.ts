import NftPage from "../../pages/nft.vue";
import { RouterLinkStub, mount } from "@vue/test-utils";
import { useRoute } from "vue-router";
describe("Snapshot Nft Page", () => {
  test("Snapshot Nft page component", () => {
    const pages = mount(NftPage);
    expect(pages.html()).toMatchSnapshot();
  });
});
