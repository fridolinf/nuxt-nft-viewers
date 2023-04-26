<template>
  <nav
    class="isolate flex divide-x divide-gray-200 rounded-lg shadow"
    aria-label="Tabs"
  >
    <a
      v-for="(tab, i) in tabsData as TabsInterface[]"
      @click.prevent="handleTab(tab.name)"
      :class="[
        i === tabIdx ? 'text-gray-900' : 'text-gray-500',
        i === 0 ? 'rounded-l-lg' : '',
        i === tabsData.length - 1 ? 'rounded-r-lg' : '',
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
</template>

<script setup lang="ts">
import { TabsInterface } from "../interfaces/ITabs";

defineProps({
  tabsData: { type: Array, required: true },
  tabIdx: { type: Number, required: true },
  handleTab: { type: Function, required: true },
});
</script>
