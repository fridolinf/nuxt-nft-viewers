import NftCard from "../components/NftCard.vue";
import { mount } from "@vue/test-utils";
import { metadataTest } from "../common/metadata";
import { MoralisMetadata } from "../interfaces/IMoralis";

describe("Testing Nft Card Component", () => {
  test("Render Nft Card component", () => {
    /* This code is mounting the `NftCard` component with the `metadataTest` data as props. The `mount`
    function is a utility function provided by the `@vue/test-utils` library that creates a wrapper
    around the component and allows you to interact with it in tests. The `props` object passed to
    the `mount` function is used to set the initial props of the component being mounted. */
    const pages = mount(NftCard, {
      props: {
        cardData: metadataTest as MoralisMetadata[],
      },
    });
    const cardComponent = pages.find("#nft-card");
    expect(cardComponent).toBeDefined();
    /* `expect(pages.findAll("#nft-card")).toHaveLength(3);` is an assertion that checks if there are
    three instances of the `#nft-card` element in the mounted `NftCard` component. The `findAll`
    method returns an array of all elements that match the given selector, and the `toHaveLength`
    method checks if the length of the array is equal to the expected value of 3. */
    expect(pages.findAll("#nft-card")).toHaveLength(3);
  });
});
