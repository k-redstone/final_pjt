<template>
  <div>
    <WrapLayout class="min-h-screen flex flex-col">
      <div class="grow">
        <NavBar class="z-50 relative" />
        <RouterView />
      </div>
      <GlobalFooter class="relative h-[75px]" />
    </WrapLayout>
  </div>
</template>

<script setup>
import NavBar from '@/components/NavBar.vue'
import GlobalFooter from '@/components/GlobalFooter.vue'
import WrapLayout from '@/layout/WrapLayout.vue'

import { RouterView } from 'vue-router'
</script>
