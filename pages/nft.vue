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
        :defaultValue="tabsData.tabs.find((tab, i) => i === tabIdx)?.name"
        @change="handleTab"
      >
        >
        <option :value="tab.name" v-for="(tab, i) in tabsData.tabs" :key="i">
          {{ tab.name }}
        </option>
      </select>
    </div>
    <div class="hidden md:block">
      <nav
        class="isolate flex divide-x divide-gray-200 rounded-lg shadow"
        aria-label="Tabs"
      >
        <a
          v-for="(tab, i) in tabsData.tabs"
          @click.prevent="handleTab(tab.name)"
          :class="[
            i === tabIdx ? 'text-gray-900' : 'text-gray-500',
            i === 0 ? 'rounded-l-lg' : '',
            i === tabsData.tabs.length - 1 ? 'rounded-r-lg' : '',
            'group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-1 text-center text-sm md:text-xs font-medium hover:bg-gray-50 focus:z-10 capitalize',
          ]"
          :aria-current="i === tabIdx ? 'page' : undefined"
          :key="i"
          :href="tab.href"
        >
          <span>{{ tab.name }}</span>
          <span
            :class="[
              i === tabIdx ? 'bg-indigo-500' : 'bg-transparent',
              'absolute inset-x-0 bottom-0 h-0.5',
            ]"
            aria-hidden="true"
          />
        </a>
      </nav>
    </div>
    <div
      class="grid grid-cols-1 xl:grid-cols-4 md:grid-cols-2 gap-5 md:gap-2"
      v-if="cardData.nftData.length > 0"
    >
      <div
        v-for="(nft, i) in cardData.nftData"
        :key="i"
        class="m-3 shadow-lg shadow-black rounded-md p-2 bg-white"
      >
        <div class="relative">
          <div
            v-show="
              nft && nft.image ? nft.image : '../public/assets/images/noimg.png'
            "
            class="bg-cyan-300 w-32 h-52 absolute md:-right-5 xl:left-2/3 -z-10 rounded-md"
          ></div>
        </div>
        <p class="text-center font-bold">
          {{ nft && nft.collectionName ? nft.collectionName : "" }}
        </p>
        <nuxt-img
          quality="50"
          class="rounded-xl shadow-sm shadow-cyan-500 my-2 w-full"
          loading="lazy"
          :src="
            nft && nft.image
              ? nft.image.replace(
                  'ipfs://',
                  'https://cloudflare-ipfs.com/ipfs/'
                )
              : '../public/assets/images/noimg.png'
          "
          :alt="nft && nft.name ? nft.name : 'nft-image'"
        />
        <div class="text-clip">
          <p>Metadata</p>
          <p class="font-semibold">{{ nft.name }}</p>
          <p>
            {{
              nft && nft.description
                ? nft.description.substring(0, 150) + " " + "..."
                : ""
            }}
          </p>
        </div>
      </div>
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

let tabsData = reactive({ tabs });
let cardData = reactive({
  nftData: [] as MoralisMetadata[],
});
let windowEthereum: Ref<MetaMaskInpageProvider | null> = ref(
  process.client && window.ethereum
);
let tabIdx: Ref<number> = ref(0);
let chain: Ref<string> = ref("");
let address: Ref<string> = ref("");
let loading: Ref<boolean> = ref(true);

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
  chain.value = route.query.chain as string;
  address.value = route.query.address as string;
  if (process.client) {
    const { ethereum, metamaskDefined } = useMetamask();

    if (metamaskDefined) {
      windowEthereum.value = ethereum;
    }
    try {
      const account = await ethereum.request<string>({
        method: "eth_accounts",
      });
      if (account && account.length === 0) {
        await navigateTo({
          path: "/",
        });
      }
    } catch (error) {
      console.log(error, "error");
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
          collectionName: data.name,
        } as MoralisMetadata;
        cardData.nftData.push(nftMetadata);
      }
    });
  }
  loading.value = false;
});

if (windowEthereum && windowEthereum.value) {
  windowEthereum.value.on(
    "accountsChanged",
    async (accounts: any | string[]) => {
      if (accounts && accounts.length > 0) {
        tabIdx.value = 0;
        await navigateTo({
          path: "/nft",
          query: {
            chain: "eth",
            address: accounts[0],
          },
        });
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
