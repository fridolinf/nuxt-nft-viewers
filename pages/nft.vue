<template>
  <div>NFT</div>
</template>

<script setup>
import moralis from "../services/api";

onMounted(async () => {
  await moralis.getNft();
});
</script>
