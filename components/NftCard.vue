<template>
  <div
    id="nft-card"
    v-for="(nft, i) in cardData as MoralisMetadata[]"
    :key="i"
    class="m-3 shadow-lg shadow-black rounded-md p-2 bg-white"
  >
    <div class="relative">
      <div
        v-show="nft && nft.image ? nft.image : '/assets/images/noimg.png'"
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
          ? nft.image.replace('ipfs://', 'https://cloudflare-ipfs.com/ipfs/')
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
</template>

<script setup lang="ts">
import { MoralisMetadata } from "../interfaces/IMoralis";

defineProps({
  cardData: { type: Array, required: true },
});
</script>
