<template>
  <div>NFT</div>
</template>

<script setup>
import moralis from "../services/api";

onMounted(async () => {
  const nftResponses = await moralis.getNft();
});
</script>
