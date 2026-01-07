<template>
  <q-page class="q-pa-lg">
    <div class="row items-center justify-between q-mb-lg">
      <div>
        <h1 class="text-h4 text-weight-bold q-mb-xs">Audit Logs</h1>
        <p class="text-grey-5">Monitor system activity and security events.</p>
      </div>
      <q-btn
        color="primary"
        icon="refresh"
        label="Refresh"
        unelevated
        no-caps
        @click="fetchLogs"
        :loading="loading"
      />
    </div>

    <q-card class="bg-dark-elem text-white shadow-2">
      <q-table
        :rows="logs"
        :columns="columns"
        row-key="log_id"
        dark
        class="bg-transparent"
        :loading="loading"
        flat
        :pagination="{ rowsPerPage: 15 }"
      >
        <template v-slot:body-cell-action="props">
          <q-td :props="props">
            <q-badge :color="getActionColor(props.value)" :label="props.value" />
          </q-td>
        </template>

        <template v-slot:body-cell-created_at="props">
          <q-td :props="props">
            {{ new Date(props.value).toLocaleString() }}
          </q-td>
        </template>
      </q-table>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { api } from 'boot/axios'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const loading = ref(false)
const logs = ref([])

const columns = [
  { name: 'log_id', align: 'left', label: 'ID', field: 'log_id', sortable: true },
  {
    name: 'user',
    align: 'left',
    label: 'User',
    field: (row) => row.username || 'Unknown',
    sortable: true,
  },
  { name: 'action', align: 'center', label: 'Action', field: 'action', sortable: true },
  { name: 'details', align: 'left', label: 'Details', field: 'details' },
  { name: 'ip', align: 'left', label: 'IP Address', field: 'ip_address' },
  {
    name: 'created_at',
    align: 'right',
    label: 'Date & Time',
    field: (row) => row.created_at,
    sortable: true,
  },
]

const getActionColor = (action) => {
  if (action === 'USER_LOGIN') return 'green'
  if (action === 'CREATE_LETTER') return 'blue'
  if (action === 'DELETE_LETTER') return 'red'
  return 'grey'
}

const fetchLogs = async () => {
  loading.value = true
  try {
    const res = await api.get('/audit')
    logs.value = res.data
  } catch (err) {
    console.error('Frontend Audit Fetch Error:', err)
    $q.notify({
      type: 'negative',
      message: 'Failed to load audit logs: ' + (err.response?.data || err.message),
      timeout: 5000,
    })
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchLogs()
})
</script>

<style scoped>
.bg-dark-elem {
  background: #1e1e1e;
}
</style>
