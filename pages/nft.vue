<template>
  <div
    v-if="loading"
    class="flex flex-col justify-center items-center h-screen w-full"
  >
    <CustomLoading />
  </div>
  <div v-else class="h-screen overflow-auto">
    <div class="md:hidden">
      <select
        id="tabs"
        name="tabs"
        class="block w-full text-center capitalize text-xl rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
        :defaultValue="tabsData.tabs.find((_tab, i) => i === tabIdx)?.name"
        @change="handleTab"
      >
        >
        <option :value="tab.name" v-for="(tab, i) in tabsData.tabs" :key="i">
          {{ tab.name }}
        </option>
      </select>
    </div>
    <div class="hidden md:block">
      <CustomNavigation
        :tabs-data="tabsData.tabs"
        :tab-idx="tabIdx"
        :handle-tab="handleTab"
      />
    </div>
    <div
      class="grid grid-cols-1 xl:grid-cols-4 md:grid-cols-2 gap-5 md:gap-2"
      v-if="cardData.nftData.length > 0"
    >
      <NftCard :card-data="cardData.nftData" />
    </div>
    <div
      v-else
      class="flex justify-center h-screen items-center font-bold text-2xl"
    >
      <p>NO NFT DATA</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import CustomLoading from "../components/CustomLoading.vue";
import { MetaMaskInpageProvider } from "@metamask/providers";
import useMetamask from "../hooks/useMetamask";
import moralis from "../services/api";
import { tabs } from "../common/tabs";
import { MoralisMetadata } from "../interfaces/IMoralis";
const route = useRoute();

const tabsData = reactive({ tabs });
const cardData = reactive({
  nftData: [] as MoralisMetadata[],
});
const windowEthereum: Ref<MetaMaskInpageProvider | null> = ref(
  process.client && window.ethereum
);
const tabIdx: Ref<number> = ref(0);
const chain: Ref<string> = ref("");
const address: Ref<string> = ref("");
const loading: Ref<boolean> = ref(true);

const handleTab = async (val: string | Event) => {
  let newVal: string =
    typeof val !== "string" ? (val.target as HTMLInputElement).value : val;
  cardData.nftData = [];
  const newChain = tabsData.tabs.filter((data, i) => {
    if (data.name.toLocaleLowerCase() === newVal.toLocaleLowerCase()) {
      tabIdx.value = i;
      return data;
    }
  });
  const nftResponses = await moralis.getNft(
    newChain[0].name.toLocaleLowerCase(),
    address.value
  );
  if (nftResponses && nftResponses?.result.length > 0) {
    nftResponses.result.map((data) => {
      if (data) {
        const nftMetadata = {
          ...JSON.parse(data.metadata),
          collectionName: data.name,
        } as MoralisMetadata;
        cardData.nftData.push(nftMetadata);
      }
    });
  }
};

onBeforeMount(async () => {
  chain.value = route.query.chain as string; //check query params from uri and pass to ref()
  address.value = route.query.address as string;
  if (process.client) {
    // detect if nuxt ready
    const { ethereum, metamaskDefined } = useMetamask();

    if (metamaskDefined) {
      windowEthereum.value = ethereum;
    }
    try {
      /**
       * @account - before mount will be detect if daaps still can connect to metamask with accessing an account
       */
      const account = await ethereum.request<string>({
        method: "eth_accounts",
      });
      if (account && account.length === 0) {
        // if can't get an account will navigate to home pages
        await navigateTo({
          path: "/",
        });
      }
    } catch (error) {
      throw error;
    }
  }
});

onMounted(async () => {
  cardData.nftData = [];
  const nftResponses = await moralis.getNft(
    chain.value.toLocaleLowerCase(),
    address.value
  );
  if (nftResponses && nftResponses?.result.length > 0) {
    nftResponses.result.map((data) => {
      if (data && data.metadata) {
        const nftMetadata = {
          ...JSON.parse(data.metadata),
          collectionName: data.name, //adding collection name of an Nft
        } as MoralisMetadata;
        cardData.nftData.push(nftMetadata);
      }
    });
  }
  loading.value = false;
});
if (windowEthereum && windowEthereum.value) {
  /**
   * @windowEthereum {accountsChanges} - is method for detect if user switch their wallet address to another wallet address in metamask
   */
  windowEthereum.value.on(
    "accountsChanged",
    async (accounts: any | string[]) => {
      if (accounts && accounts.length > 0) {
        // if any change tabIdx will set to default 0 again and replace the query address of uri silently
        tabIdx.value = 0;
        await navigateTo({
          path: "/nft",
          query: {
            chain: "eth",
            address: accounts[0],
          },
        });
        // after navigating to another uri with new address, get nft data again
        cardData.nftData = [];
        const nftResponses = await moralis.getNft("eth", accounts[0]);
        if (nftResponses && nftResponses?.result.length > 0) {
          nftResponses.result.map((data) => {
            if (data && data.metadata) {
              const nftMetadata = {
                ...JSON.parse(data.metadata),
                collectionName: data.name,
              } as MoralisMetadata;
              cardData.nftData.push(nftMetadata);
            }
          });
        }
      } else {
        await navigateTo("/");
      }
    }
  );
}
</script>
