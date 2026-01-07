<template>
  <q-page class="q-pa-lg">
    <div class="row items-center justify-between q-mb-lg">
      <h1 class="text-h4 text-weight-bold q-mb-xs">Branches</h1>
      <q-btn color="primary" icon="add" label="Add Branch" unelevated no-caps @click="openDialog" />
    </div>

    <q-card class="bg-dark-elem text-white shadow-2">
      <q-table
        :rows="branches"
        :columns="columns"
        row-key="branch_id"
        dark
        class="bg-transparent"
        :loading="loading"
        flat
      >
        <template v-slot:body-cell-actions="props">
          <q-td :props="props" auto-width>
            <q-btn
              flat
              round
              dense
              color="red"
              icon="delete"
              size="sm"
              @click="deleteBranch(props.row.branch_id)"
            />
          </q-td>
        </template>
      </q-table>
    </q-card>

    <q-dialog v-model="showDialog">
      <q-card class="bg-dark-elem text-white" style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Add New Branch</div>
        </q-card-section>

        <q-card-section class="q-gutter-md">
          <q-input dark filled v-model="newBranch.branch_name" label="Branch Name" />
          <q-input dark filled v-model="newBranch.location" label="Location" />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="grey" v-close-popup />
          <q-btn flat label="Save" color="primary" @click="saveBranch" />
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
const branches = ref([])
const showDialog = ref(false)
const newBranch = ref({ branch_name: '', location: '' })

const columns = [
  { name: 'id', align: 'left', label: 'ID', field: 'branch_id', sortable: true },
  { name: 'name', align: 'left', label: 'Branch Name', field: 'branch_name', sortable: true },
  { name: 'location', align: 'left', label: 'Location', field: 'location' },
  { name: 'actions', align: 'right', label: 'Actions' },
]

const fetchBranches = async () => {
  loading.value = true
  try {
    const res = await api.get('/branches')
    branches.value = res.data
  } catch (err) {
    console.error(err)
    $q.notify({ type: 'negative', message: 'Failed to load branches' })
  } finally {
    loading.value = false
  }
}

const openDialog = () => {
  showDialog.value = true
}

const saveBranch = async () => {
  try {
    await api.post('/branches', newBranch.value)
    $q.notify({ type: 'positive', message: 'Branch Added' })
    showDialog.value = false
    newBranch.value = { branch_name: '', location: '' }
    fetchBranches()
  } catch (err) {
    console.error(err)
    $q.notify({ type: 'negative', message: 'Error adding branch' })
  }
}

const deleteBranch = async (id) => {
  try {
    if (!confirm('Are you sure?')) return
    await api.delete(`/branches/${id}`)
    $q.notify({ type: 'positive', message: 'Branch deleted' })
    fetchBranches()
  } catch (err) {
    console.error(err)
    $q.notify({ type: 'negative', message: 'Error deleting branch' })
  }
}

onMounted(fetchBranches)
</script>

<style scoped>
.bg-dark-elem {
  background: #1e1e1e;
}
</style>
