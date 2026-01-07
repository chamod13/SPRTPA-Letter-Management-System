<template>
  <q-layout view="lHh Lpr lFf" class="bg-dark-page text-white">
    <q-header class="bg-transparent text-white q-py-md" :class="{ 'bg-dark shadow-2': scrolled }">
      <q-toolbar class="container q-mx-auto">
        <q-btn flat no-caps no-wrap class="q-ml-xs">
          <q-icon name="mail" color="primary" size="28px" />
          <q-toolbar-title shrink class="text-weight-bold q-ml-sm text-h6">
            SPRTPA <span class="text-primary">LMS</span>
          </q-toolbar-title>
        </q-btn>

        <q-space />

        <div class="gt-sm q-gutter-md">
          <q-btn flat no-caps label="Home" @click="scrollToSection('hero')" />
          <q-btn flat no-caps label="Features" @click="scrollToSection('features')" />
          <q-btn flat no-caps label="Roles" @click="scrollToSection('roles')" />
          <q-btn flat no-caps label="Contact" @click="scrollToSection('contact')" />
        </div>

        <q-space />

        <q-btn
          to="/login"
          unelevated
          rounded
          color="primary"
          label="Login"
          no-caps
          class="q-px-lg"
        />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="bg-dark text-white q-py-lg">
      <div class="text-center">
        <div class="text-grey-5 q-mb-sm">
          © 2024 SPRTPA Letter Management System. All rights reserved.
        </div>
      </div>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const scrolled = ref(false)

const handleScroll = () => {
  scrolled.value = window.scrollY > 50
}

const scrollToSection = (id) => {
  // If we are not on home page, go to home page first
  if (route.path !== '/') {
    router.push('/').then(() => {
      // Small delay to let page load
      setTimeout(() => {
        const element = document.getElementById(id)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 300)
    })
  } else {
    // If on home page, just scroll
    if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
