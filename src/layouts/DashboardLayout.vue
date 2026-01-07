<template>
  <q-layout view="lHh LpR lFf" class="bg-black text-white">
    <!-- Header -->
    <q-header bordered class="bg-black text-white" style="border-bottom: 1px solid #333">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" color="primary" />

        <q-toolbar-title class="text-weight-bold">
          SPRTPA <span class="text-primary">LMS</span>
        </q-toolbar-title>

        <q-space />

        <div class="row q-gutter-sm items-center">
          <q-btn round flat icon="notifications" color="grey-5">
            <q-badge color="red" floating>3</q-badge>
          </q-btn>

          <q-btn-dropdown flat no-caps stretch>
            <template v-slot:label>
              <div class="row items-center no-wrap">
                <q-avatar size="28px" class="q-mr-sm">
                  <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
                </q-avatar>
                <div class="text-subtitle2">Admin User</div>
              </div>
            </template>
            <q-list class="bg-dark text-white" style="min-width: 150px">
              <q-item clickable v-close-popup>
                <q-item-section avatar>
                  <q-icon name="person" />
                </q-item-section>
                <q-item-section>Profile</q-item-section>
              </q-item>
              <q-separator dark />
              <q-item clickable v-close-popup @click="logout">
                <q-item-section avatar>
                  <q-icon name="logout" color="red" />
                </q-item-section>
                <q-item-section class="text-red">Logout</q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </div>
      </q-toolbar>
    </q-header>

    <!-- Sidebar -->
    <q-drawer
      show-if-above
      v-model="leftDrawerOpen"
      side="left"
      bordered
      class="bg-black"
      :width="280"
    >
      <div class="q-pa-md">
        <div class="text-grey-6 text-caption q-mb-sm q-ml-sm">MAIN MENU</div>
        <q-list padding class="text-grey-4">
          <q-item clickable v-ripple to="/dashboard" active-class="text-primary bg-red-1">
            <q-item-section avatar>
              <q-icon name="dashboard" />
            </q-item-section>
            <q-item-section>Dashboard</q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/letters" active-class="text-primary bg-red-1">
            <q-item-section avatar>
              <q-icon name="mail" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Letters</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-badge color="primary" label="12" />
            </q-item-section>
          </q-item>

          <div class="q-mt-lg text-grey-6 text-caption q-mb-sm q-ml-sm">ADMINISTRATION</div>

          <q-item clickable v-ripple active-class="text-primary bg-red-1" to="/users">
            <q-item-section avatar>
              <q-icon name="people" />
            </q-item-section>
            <q-item-section>Users</q-item-section>
          </q-item>

          <q-item clickable v-ripple active-class="text-primary bg-red-1" to="/branches">
            <q-item-section avatar>
              <q-icon name="domain" />
            </q-item-section>
            <q-item-section>Branches</q-item-section>
          </q-item>

          <q-item clickable v-ripple active-class="text-primary bg-red-1" to="/audit">
            <q-item-section avatar>
              <q-icon name="history" />
            </q-item-section>
            <q-item-section>Audit Logs</q-item-section>
          </q-item>
        </q-list>
      </div>

      <div class="absolute-bottom q-pa-md">
        <div class="glass-card q-pa-md text-center">
          <q-icon name="help_outline" size="sm" class="q-mb-sm" color="primary" />
          <div class="text-caption text-grey">Need help?</div>
          <div class="text-tiny text-grey-6">Contact Support</div>
        </div>
      </div>
    </q-drawer>

    <!-- Page Content -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

const leftDrawerOpen = ref(false)
const router = useRouter()
const $q = useQuasar()

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

function logout() {
  // Clear token (in future)
  $q.notify({
    type: 'info',
    message: 'Logged out successfully',
  })
  router.push('/login')
}
</script>

<style lang="scss" scoped>
.glass-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
}
.bg-red-1 {
  background: rgba(230, 57, 70, 0.1) !important;
}
</style>
