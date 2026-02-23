<script setup>
import DefaultTheme from 'vitepress/theme'
const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #layout-top>
      <div class="custom-banner">
        📚 Віртуальна лабораторія 3DLab
      </div>
    </template>
  </Layout>
</template>

<style scoped>
.custom-banner {
  text-align: center;
  padding: 1rem;
  font-weight: bold;
}
</style>