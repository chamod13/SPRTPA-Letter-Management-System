<template>
  <q-page class="q-pa-lg">
    <div class="row items-center justify-between q-mb-lg">
      <div>
        <h1 class="text-h4 text-weight-bold q-mb-xs">Letters</h1>
        <p class="text-grey-5">Manage incoming and outgoing correspondence.</p>
      </div>
      <q-btn
        color="primary"
        icon="add"
        label="New Letter"
        unelevated
        no-caps
        @click="openAddDialog"
      />
    </div>

    <!-- Letters Table -->
    <q-card class="bg-dark-elem text-white shadow-2">
      <q-table
        :rows="letters"
        :columns="columns"
        row-key="id"
        dark
        class="bg-transparent"
        :loading="loading"
        flat
      >
        <template v-slot:body-cell-attachment="props">
          <q-td :props="props">
            <div v-if="props.value && props.value.length > 0">
              <q-btn
                flat
                round
                dense
                icon="attachment"
                color="accent"
                type="a"
                :href="'http://localhost:5000/' + props.value[0].path"
                target="_blank"
              >
                <q-tooltip>{{ props.value[0].name }}</q-tooltip>
              </q-btn>
            </div>
            <div v-else class="text-grey-7">-</div>
          </q-td>
        </template>

        <template v-slot:body-cell-status="props">
          <q-td :props="props">
            <q-badge :color="getStatusColor(props.value)" :label="props.value" />
          </q-td>
        </template>

        <template v-slot:body-cell-priority="props">
          <q-td :props="props">
            <q-badge
              :color="getPriorityColor(props.value)"
              text-color="white"
              :label="props.value"
              outline
            />
          </q-td>
        </template>

        <template v-slot:body-cell-actions="props">
          <q-td :props="props" auto-width>
            <q-btn flat round dense color="grey-4" icon="visibility" size="sm" />
            <q-btn flat round dense color="primary" icon="edit" size="sm" />
          </q-td>
        </template>
      </q-table>
    </q-card>

    <!-- Add Letter Dialog -->
    <q-dialog v-model="showDialog">
      <q-card class="bg-dark-elem text-white" style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">Add New Letter</div>
        </q-card-section>

        <q-card-section class="q-gutter-md">
          <q-input dark filled v-model="newLetter.title" label="Letter Title" />
          <q-input dark filled v-model="newLetter.sender" label="Sender Name/Org" />
          <q-select
            dark
            filled
            v-model="newLetter.priority"
            :options="['Normal', 'Urgent', 'High']"
            label="Priority"
          />

          <!-- File Upload Input -->
          <q-file
            dark
            filled
            bottom-slots
            v-model="newLetter.file"
            label="Attachment (PDF/Image)"
            counter
            max-files="1"
          >
            <template v-slot:prepend>
              <q-icon name="attach_file" @click.stop />
            </template>
            <template v-slot:append>
              <q-icon name="close" @click.stop="newLetter.file = null" class="cursor-pointer" />
            </template>
          </q-file>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="grey" v-close-popup />
          <q-btn
            flat
            label="Save Letter"
            color="primary"
            @click="saveLetter"
            :loading="submitting"
          />
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
const submitting = ref(false)
const letters = ref([])
const showDialog = ref(false)

const newLetter = ref({
  title: '',
  sender: '',
  priority: 'Normal',
  file: null,
})

const columns = [
  { name: 'letter_number', align: 'left', label: 'ID', field: 'letter_number', sortable: true },
  { name: 'title', align: 'left', label: 'Title', field: 'title', sortable: true },
  { name: 'sender', align: 'left', label: 'Sender', field: 'sender', sortable: true },
  { name: 'attachment', align: 'center', label: 'Attach', field: 'attachments' },
  { name: 'status', align: 'center', label: 'Status', field: 'status', sortable: true },
  { name: 'priority', align: 'center', label: 'Priority', field: 'priority', sortable: true },
  {
    name: 'created_at',
    align: 'right',
    label: 'Date',
    field: 'created_at',
    format: (val) => new Date(val).toLocaleDateString(),
    sortable: true,
  },
  { name: 'actions', align: 'right', label: 'Actions' },
]

const getStatusColor = (status) => {
  if (status === 'Completed') return 'positive'
  if (status === 'Processing') return 'blue'
  return 'orange'
}

const getPriorityColor = (priority) => {
  if (priority === 'High' || priority === 'Urgent') return 'red'
  return 'green'
}

const fetchLetters = async () => {
  loading.value = true
  try {
    const res = await api.get('/letters')
    letters.value = res.data
  } catch (err) {
    console.error(err)
    $q.notify({ type: 'negative', message: 'Failed to load letters' })
  } finally {
    loading.value = false
  }
}

const openAddDialog = () => {
  showDialog.value = true
}

const saveLetter = async () => {
  submitting.value = true
  try {
    // Create FormData for file upload
    const formData = new FormData()
    formData.append('title', newLetter.value.title)
    formData.append('sender', newLetter.value.sender)
    formData.append('priority', newLetter.value.priority)

    if (newLetter.value.file) {
      formData.append('attachment', newLetter.value.file)
    }

    // Send as Multipart request
    await api.post('/letters', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })

    $q.notify({ type: 'positive', message: 'Letter Added Successfully' })
    showDialog.value = false
    fetchLetters() // Refresh list

    // Reset form
    newLetter.value = { title: '', sender: '', priority: 'Normal', file: null }
  } catch (err) {
    console.error(err)
    $q.notify({
      type: 'negative',
      message: 'Error adding letter: ' + (err.response?.data || err.message),
    })
  } finally {
    submitting.value = false
  }
}

onMounted(() => {
  fetchLetters()
})
</script>

<style scoped>
.bg-dark-elem {
  background: #1e1e1e;
}
</style>
