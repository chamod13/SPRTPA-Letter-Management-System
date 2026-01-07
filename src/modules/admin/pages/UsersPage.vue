<template>
  <q-page class="q-pa-lg">
    <div class="row items-center justify-between q-mb-lg">
      <h1 class="text-h4 text-weight-bold q-mb-xs">Users</h1>
      <q-btn color="primary" icon="add" label="Add User" unelevated no-caps @click="openDialog" />
    </div>

    <q-card class="bg-dark-elem text-white shadow-2">
      <q-table
        :rows="users"
        :columns="columns"
        row-key="user_id"
        dark
        class="bg-transparent"
        :loading="loading"
        flat
      >
        <template v-slot:body-cell-role="props">
          <q-td :props="props">
            <q-badge
              :color="props.value === 'Super Admin' ? 'red' : 'green'"
              :label="props.value"
            />
          </q-td>
        </template>
      </q-table>
    </q-card>

    <q-dialog v-model="showDialog">
      <q-card class="bg-dark-elem text-white" style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">Add New User</div>
        </q-card-section>

        <q-card-section class="q-gutter-md">
          <q-input dark filled v-model="newUser.username" label="Username" />
          <q-input dark filled v-model="newUser.password" type="password" label="Password" />
          <q-select
            dark
            filled
            v-model="newUser.role"
            :options="['Staff', 'Super Admin']"
            label="Role"
          />
          <q-select
            dark
            filled
            v-model="newUser.branch_id"
            :options="branchOptions"
            map-options
            emit-value
            label="Branch"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="grey" v-close-popup />
          <q-btn flat label="Save" color="primary" @click="saveUser" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { api } from 'boot/axios'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const loading = ref(false)
const users = ref([])
const branches = ref([])
const branchOptions = ref([])
const showDialog = ref(false)

const newUser = ref({ username: '', password: '', role: 'Staff', branch_id: null })

const columns = [
  { name: 'id', align: 'left', label: 'ID', field: 'user_id', sortable: true },
  { name: 'user', align: 'left', label: 'Username', field: 'username', sortable: true },
  { name: 'role', align: 'left', label: 'Role', field: 'role' },
  { name: 'branch', align: 'left', label: 'Branch', field: (row) => row.branch_name || 'N/A' },
  {
    name: 'created',
    align: 'right',
    label: 'Created At',
    field: (row) => new Date(row.created_at).toLocaleDateString(),
  },
]

const fetchData = async () => {
  loading.value = true
  try {
    const [userRes, branchRes] = await Promise.all([api.get('/users'), api.get('/branches')])

    users.value = userRes.data
    branches.value = branchRes.data

    // Map branches for select options
    branchOptions.value = branchRes.data.map((b) => ({
      label: b.branch_name,
      value: b.branch_id,
    }))
  } catch (err) {
    console.error(err)
    $q.notify({ type: 'negative', message: 'Failed to load data' })
  } finally {
    loading.value = false
  }
}

const openDialog = () => {
  showDialog.value = true
}

const saveUser = async () => {
  if (!newUser.value.username || !newUser.value.password) {
    $q.notify({ type: 'warning', message: 'Please fill all fields' })
    return
  }

  try {
    await api.post('/users', newUser.value)
    $q.notify({ type: 'positive', message: 'User created successfully' })
    showDialog.value = false
    newUser.value = { username: '', password: '', role: 'Staff', branch_id: null }
    fetchData()
  } catch (err) {
    console.error(err)
    $q.notify({ type: 'negative', message: err.response?.data?.message || 'Error creating user' })
  }
}

onMounted(fetchData)
</script>

<style scoped>
.bg-dark-elem {
  background: #1e1e1e;
}
</style>
