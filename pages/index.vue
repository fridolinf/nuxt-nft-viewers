<template>
  <div
    class="bg-neutral-800 text-white h-screen p-10"
    @mouseleave="onMouseleave"
    @mouseenter="onMouseEnter"
    @mousemove="detectMove"
  >
    <!-- <Web3Modal /> -->
    <div
      v-if="loading"
      class="flex flex-col justify-center items-center h-full w-full"
    >
      <CustomLoading />
    </div>
    <div class="relative z-10 text-center flex justify-center h-full" v-else>
      <div class="h-full flex justify-center -z-10 fixed">
        <img :src="exodiaImage" />
      </div>
      <div class="h-screen justify-center flex items-center w-full">
        <div class="fixed">
          <div class="relative flex flex-row flex-shrink gap-10">
            <div
              class="bg-red-500 w-24 h-24 -z-10 animate-pulse rounded-full blur-xl"
            ></div>
            <div
              class="bg-blue-500 w-24 h-24 -z-10 animate-pulse rounded-full blur-xl"
            ></div>
          </div>
        </div>
        <button
          id="cek"
          class="cursor-pointer font-bold text-lg hover:animate-puls hover:text-black w-fit z-50 font-mono tracking-wider md:text-2xl"
          :disabled="!metamaskInstalled"
          @click="connectWallet"
        >
          Connect Wallet
        </button>
      </div>
    </div>
    <div
      v-show="handleChangeBg"
      :style="{ ...positionBg }"
      :class="handleChangeBg && [...handleBg]"
    ></div>
  </div>
</template>
<script setup lang="ts">
import CustomLoading from "../components/CustomLoading.vue";
import { MetaMaskInpageProvider } from "@metamask/providers";
import exodiaImage from "../public/assets/images/exodia.png";
import useMetamask from "../hooks/useMetamask";
import { onMounted, reactive, ref } from "vue";
let metamaskInstalled: Ref<boolean> = ref(false);
let windowEthereum: Ref<MetaMaskInpageProvider | null> = ref(
  process.client && window.ethereum
);
let walletAddress: Ref<string> = ref("");
let handleChangeBg: Ref<boolean> = ref(false);
let loading: Ref<boolean> = ref(true);
let handleBg = [
  "bg-green-300",
  "w-20",
  "h-20",
  "absolute",
  "top-10",
  "blur-2xl",
  "animate-pulse",
];
let positionBg = reactive({
  left: "",
  top: "",
});

onMounted(async () => {
  if (process.client) {
    const { metamaskDefined, ethereum, handleAccountsChanged } = useMetamask();
    loading.value = false;
    if (metamaskDefined) {
      metamaskInstalled.value = metamaskDefined;
      windowEthereum.value = ethereum;
    }
    if (metamaskInstalled) {
      try {
        const account = await ethereum.request<string>({
          method: "eth_accounts",
        });
        if (account) {
          const currentAccount = handleAccountsChanged(account);
          if (currentAccount) {
            await navigateTo({
              path: "/nft",
              query: {
                chain: "eth",
                address: currentAccount,
              },
            });
            walletAddress.value = currentAccount;
          }
        }
      } catch (error) {
        console.log(error, "error");
      }
    }
  }
});

if (windowEthereum) {
  windowEthereum &&
    windowEthereum.value &&
    windowEthereum.value.on("accountsChanged", (accounts: any | string[]) => {
      if (accounts && accounts[0]) {
        walletAddress.value = accounts[0];
      } else {
        walletAddress.value = "";
      }
    });
}

const connectWallet = async () => {
  if (windowEthereum && windowEthereum.value) {
    try {
      const accounts = await windowEthereum.value.request<string[]>({
        method: "eth_requestAccounts",
      });
      if (accounts && accounts[0]) {
        walletAddress.value = accounts[0];
        await navigateTo({
          path: "/nft",
          query: {
            chain: "eth",
            address: accounts[0],
          },
        });
      }
    } catch (error) {
      console.log(error, "error");
    }
  }
};

const detectMove = ($event: MouseEvent) => {
  positionBg.left = $event.clientX - 35 + "px";
  positionBg.top = $event.clientY - 30 + "px";
};

const onMouseleave = () => {
  handleChangeBg.value = false;
};

const onMouseEnter = () => {
  handleChangeBg.value = true;
};
</script>
<style>
.page-enter-active,
.page-leave-active {
  transition: all 2s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
