<template>
  <q-page class="q-pa-lg">
    <div class="row q-col-gutter-lg q-mb-xl">
      <div class="col-12">
        <h1 class="text-h4 text-weight-bold q-mb-xs">Dashboard</h1>
        <p class="text-grey-5">Welcome back, here is your daily overview.</p>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="row q-col-gutter-lg q-mb-xl">
      <div class="col-12 col-sm-6 col-md-3">
        <q-card class="bg-dark-elem text-white shadow-2">
          <q-card-section class="row items-center no-wrap">
            <div class="col">
              <div class="text-h6 text-weight-bold">{{ stats.total }}</div>
              <div class="text-caption text-grey">Total Letters</div>
            </div>
            <div class="col-auto">
              <q-avatar color="primary" text-color="white" icon="mark_email_read" />
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-sm-6 col-md-3">
        <q-card class="bg-dark-elem text-white shadow-2">
          <q-card-section class="row items-center no-wrap">
            <div class="col">
              <div class="text-h6 text-weight-bold">{{ stats.pending }}</div>
              <div class="text-caption text-grey">Pending</div>
            </div>
            <div class="col-auto">
              <q-avatar color="orange-9" text-color="white" icon="pending_actions" />
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-sm-6 col-md-3">
        <q-card class="bg-dark-elem text-white shadow-2">
          <q-card-section class="row items-center no-wrap">
            <div class="col">
              <div class="text-h6 text-weight-bold">{{ stats.processing }}</div>
              <div class="text-caption text-grey">Processing</div>
            </div>
            <div class="col-auto">
              <q-avatar color="blue-8" text-color="white" icon="sync" />
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-sm-6 col-md-3">
        <q-card class="bg-dark-elem text-white shadow-2">
          <q-card-section class="row items-center no-wrap">
            <div class="col">
              <div class="text-h6 text-weight-bold">{{ stats.completed }}</div>
              <div class="text-caption text-grey">Completed</div>
            </div>
            <div class="col-auto">
              <q-avatar color="positive" text-color="white" icon="done_all" />
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Charts & Recent Activity -->
    <div class="row q-col-gutter-lg">
      <div class="col-12 col-md-8">
        <q-card class="bg-dark-elem text-white full-height">
          <q-card-section>
            <div class="text-h6">Letter Status Analytics</div>
          </q-card-section>
          <q-card-section class="q-pa-lg flex flex-center" style="min-height: 300px">
            <!-- Placeholder for Chart -->
            <div class="text-grey-6 text-center">
              <q-icon name="bar_chart" size="4rem" />
              <p>Chart Component Integration Needed</p>
              <p class="text-caption">Use chart.js or apexcharts here</p>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-md-4">
        <q-card class="bg-dark-elem text-white full-height">
          <q-card-section>
            <div class="text-h6">Recent Activity</div>
          </q-card-section>
          <q-list separator dark>
            <q-item v-for="n in 5" :key="n">
              <q-item-section avatar>
                <q-avatar size="sm" color="grey-8" text-color="white">UA</q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label>New Letter Added</q-item-label>
                <q-item-label caption class="text-grey-6"
                  >User Admin added Letter #102{{ n }}</q-item-label
                >
              </q-item-section>
              <q-item-section side>
                <q-item-label caption>2m ago</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { api } from 'boot/axios'

const stats = ref({
  total: 0,
  pending: 0,
  processing: 0,
  completed: 0,
})

const fetchStats = async () => {
  try {
    const res = await api.get('/letters')
    // Calculate stats from letters array
    const letters = res.data
    stats.value = {
      total: letters.length,
      pending: letters.filter((l) => l.status === 'Pending').length,
      processing: letters.filter((l) => l.status === 'Processing').length,
      completed: letters.filter((l) => l.status === 'Completed').length,
    }
  } catch (err) {
    console.error(err)
    // Silent fail or minimal notif
  }
}

onMounted(() => {
  fetchStats()
})
</script>

<style scoped>
.bg-dark-elem {
  background: #1e1e1e;
}
</style>
