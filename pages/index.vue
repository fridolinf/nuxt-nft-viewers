<template>
  <div
    class="bg-neutral-800 text-white h-screen p-10"
    @mouseleave="onMouseleave"
    @mouseenter="onMouseEnter"
    @mousemove="detectMove"
  >
    <!-- <Web3Modal /> -->
    <div
      class="relative z-10 text-center flex justify-center h-full"
      v-if="!walletAddress"
    >
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
          class="cursor-pointer font-bold text-2xl hover:animate-puls hover:text-black w-fit z-50 font-mono tracking-wider"
          :disabled="!metamaskInstalled"
          @click="connectWallet"
        >
          {{ buttonText }}
        </button>
      </div>
    </div>
    <div class="relative z-10" v-else>
      {{ walletAddress }}
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
import useMetamask from "~/hooks/useMetamask";
import exodiaImage from "assets/images/exodia.png";
let metamaskInstalled: Ref<boolean> = ref(false);
let windowEthereum: MetaMaskInpageProvider | null =
  process.client && window.ethereum;
let walletAddress: Ref<string> = ref("");
let handleChangeBg: Ref<boolean> = ref(false);
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
let buttonText: Ref<string> = ref("Connect Wallet");

onMounted(async () => {
  if (process.client) {
    const { metamaskDefined, ethereum, handleAccountsChanged } = useMetamask();
    if (metamaskDefined) {
      metamaskInstalled.value = metamaskDefined;
      windowEthereum = ethereum;
    }

    if (metamaskInstalled) {
      try {
        const account = await ethereum.request<string>({
          method: "eth_accounts",
        });
        if (account) {
          const currentAccount = handleAccountsChanged(account);
          if (currentAccount) {
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
  console.log(windowEthereum, "bababa");
  windowEthereum.on("accountsChanged", (accounts: any | string[]) => {
    if (accounts && accounts[0]) {
      console.log(accounts, "asccc");
      walletAddress.value = accounts[0];
    } else {
      walletAddress.value = "";
    }
  });
}

const connectWallet = async () => {
  if (windowEthereum) {
    try {
      const accounts = await windowEthereum.request<string[]>({
        method: "eth_requestAccounts",
      });
      if (accounts && accounts[0]) {
        walletAddress.value = accounts[0];
      }
    } catch (error) {
      console.log(error, "error");
      buttonText.value = "See Metamask";
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
