<template>
  <q-page class="flex flex-center bg-dark-page relative-position overflow-hidden">
    <!-- Background Elements -->
    <div class="glow-effect"></div>

    <div class="glass-card q-pa-xl" style="width: 100%; max-width: 450px; z-index: 10">
      <div class="text-center q-mb-lg">
        <q-icon name="admin_panel_settings" size="4rem" color="primary" />
        <h2 class="text-h4 text-weight-bold text-white q-mt-md">Welcome Back</h2>
        <p class="text-grey-5">Sign in to continue to SPRTPA LMS</p>
      </div>

      <q-form @submit="onSubmit" class="q-gutter-md">
        <q-input
          v-model="email"
          dark
          filled
          type="text"
          label="Username or Email"
          color="primary"
          class="q-mb-md"
        >
          <template v-slot:prepend>
            <q-icon name="person" color="grey-5" />
          </template>
        </q-input>

        <q-input
          v-model="password"
          dark
          filled
          :type="showPassword ? 'text' : 'password'"
          label="Password"
          color="primary"
        >
          <template v-slot:prepend>
            <q-icon name="lock" color="grey-5" />
          </template>
          <template v-slot:append>
            <q-icon
              :name="showPassword ? 'visibility' : 'visibility_off'"
              class="cursor-pointer text-grey-5"
              @click="showPassword = !showPassword"
            />
          </template>
        </q-input>

        <div class="row items-center justify-between q-mt-sm">
          <q-checkbox v-model="rememberMe" dark color="primary" label="Remember me" size="sm" />
          <a href="#" class="text-primary text-decoration-none text-caption">Forgot Password?</a>
        </div>

        <div class="q-mt-lg">
          <q-btn
            unelevated
            rounded
            color="primary"
            label="Sign In"
            type="submit"
            class="full-width q-py-sm text-weight-bold"
            size="lg"
            :loading="loading"
          />
        </div>
      </q-form>

      <div class="text-center q-mt-lg">
        <p class="text-grey-6 text-caption">
          Don't have an account? <span class="text-primary cursor-pointer">Contact Admin</span>
        </p>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { api } from 'boot/axios'

const router = useRouter()
const $q = useQuasar()

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const rememberMe = ref(false)
const loading = ref(false)

const onSubmit = async () => {
  loading.value = true
  $q.notify({ message: 'Attempting to contact server...', color: 'info' })

  try {
    // Basic validation
    if (!email.value || !password.value) {
      $q.notify({ type: 'warning', message: 'Please enter username and password' })
      loading.value = false
      return
    }

    console.log('Sending request to /auth/login', {
      username: email.value,
      password: password.value,
    })

    // Call Backend API
    const response = await api.post('/auth/login', {
      username: email.value,
      password: password.value,
    })

    console.log('Response received:', response)
    $q.notify({ message: 'Server responded!', color: 'positive' })

    if (response.data && response.data.token) {
      $q.notify({ message: 'Token received. Saving...', color: 'positive' })

      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user_role', response.data.user.role)

      $q.notify({
        type: 'positive',
        message: 'Login Success! Redirecting...',
        position: 'top',
        timeout: 1000,
      })

      router.push('/dashboard')
    } else {
      $q.notify({ type: 'negative', message: 'Response missing token' })
    }
  } catch (error) {
    console.error(error)
    const msg = error.response ? error.response.data.message : error.message
    $q.notify({
      type: 'negative',
      message: 'Login Failed: ' + msg,
      position: 'top',
      timeout: 5000,
    })
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.glow-effect {
  position: absolute;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(230, 57, 70, 0.15) 0%, rgba(0, 0, 0, 0) 70%);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
}
</style>
