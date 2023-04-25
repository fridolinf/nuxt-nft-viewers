<template>
  <div class="flex-row gap-4 flex py-2">
    <span
      v-for="a in Array(3)"
      class="animate-ping bg-red-500 rounded-t-xl p-1"
      :key="a"
    >
    </span>
  </div>
  <div class="flex flex-row gap-2">
    <p>Loading</p>
    <span v-for="a in Array(3)" class="animate-bounce h-3 w-2" :key="a">.</span>
  </div>
</template>
