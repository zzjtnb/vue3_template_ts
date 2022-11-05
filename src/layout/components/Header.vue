<script setup lang="ts">
import Language from './Language.vue'
</script>

<template>
  <nav>
    <div class="right">
      <Language />
    </div>
  </nav>
  <router-link to="/">
    <p>{{ $t('LogoTip') }}</p>
  </router-link>
</template>
