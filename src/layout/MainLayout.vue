<template>
  <div>
    <WrapLayout>
      <NavBar class="z-50 relative" />
      <RouterView />
    </WrapLayout>
  </div>
</template>

<script setup>
import NavBar from '@/components/NavBar.vue'
import WrapLayout from '@/layout/WrapLayout.vue'

import { RouterView } from 'vue-router'
</script>
