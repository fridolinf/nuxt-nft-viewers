<template>
  <div
    class="bg-neutral-800 text-white h-screen p-10"
    @mouseleave="onMouseleave"
    @mouseenter="onMouseEnter"
    @mousemove="detectMove"
  >
    <div
      v-if="loading"
      class="flex flex-col justify-center items-center h-full w-full"
    >
      <CustomLoading />
    </div>
    <div class="relative z-10 text-center flex justify-center h-full" v-else>
      <div class="h-screen flex justify-center -z-10 absolute">
        <nuxt-img
          :src="`/assets/images/exodia.png`"
          quality="20"
          loading="lazy"
        />
      </div>
      <div class="h-full justify-center flex items-center w-full mt-10">
        <div class="absolute" id="pulse">
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
import { MetaMaskInpageProvider } from "@metamask/providers";
import { onMounted, reactive, ref } from "vue";
import { handleBg } from "../common/background";
import CustomLoading from "../components/CustomLoading.vue";
import useMetamask from "../hooks/useMetamask";

const metamaskInstalled: Ref<boolean> = ref(false);
const windowEthereum: Ref<MetaMaskInpageProvider | null> = ref(
  process.client && window.ethereum
);
const walletAddress: Ref<string> = ref("");
const handleChangeBg: Ref<boolean> = ref(false);
const loading: Ref<boolean> = ref(true);

const positionBg = reactive({
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
        throw error;
      }
    }
  }
});

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
      throw error;
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
