<template>
  <q-page class="bg-dark-page text-white overflow-hidden">
    <!-- Hero Section -->
    <section class="hero-section q-pt-xl q-pb-xl relative-position">
      <div
        class="container q-mx-auto q-px-md row items-center q-col-gutter-xl"
        style="min-height: 85vh"
      >
        <div class="col-12 col-md-6 z-top">
          <q-badge color="primary" label="v1.0.0 Beta" class="q-mb-md" outline />
          <h1 class="text-h2 text-weight-bolder leading-tight q-mb-md">
            The Ultimate <br />
            <span class="text-gradient">Letter Management</span> <br />
            System
          </h1>
          <p
            class="text-body1 text-grey-4 q-mb-lg"
            style="max-width: 500px; font-size: 1.1rem; line-height: 1.6"
          >
            Streamline your organizational correspondence with security, efficiency, and modern
            elegance. Designed for SPRTPA.
          </p>
          <div class="row q-gutter-md">
            <q-btn
              to="/login"
              unelevated
              color="primary"
              label="Get Started"
              size="lg"
              no-caps
              class="q-px-xl rounded-borders"
              icon-right="arrow_forward"
            />
            <q-btn
              @click="scrollToFeatures"
              outline
              color="white"
              label="View Demo"
              size="lg"
              no-caps
              class="q-px-xl rounded-borders"
            />
          </div>

          <div class="row q-gutter-lg q-mt-xl text-center">
            <div>
              <div class="text-h4 text-weight-bold">2.5k+</div>
              <div class="text-caption text-grey">Letters Processed</div>
            </div>
            <div>
              <div class="text-h4 text-weight-bold">99.9%</div>
              <div class="text-caption text-grey">Uptime</div>
            </div>
            <div>
              <div class="text-h4 text-weight-bold">100%</div>
              <div class="text-caption text-grey">Secure</div>
            </div>
          </div>
        </div>

        <div class="col-12 col-md-6 relative-position">
          <div class="hero-glow"></div>
          <img src="~assets/hero-mockup.png" alt="Dashboard Mockup" class="hero-image full-width" />
        </div>
      </div>
    </section>

    <!-- Roles Section -->
    <section id="roles" class="q-py-xl bg-dark">
      <div class="container q-mx-auto q-px-md">
        <div class="text-center q-mb-xl">
          <h2 class="section-title">Designed for <span class="text-primary">Everyone</span></h2>
          <p class="text-grey-5">Tailored experiences for every role in your organization.</p>
        </div>

        <div class="row q-col-gutter-lg">
          <div class="col-12 col-md-6">
            <div class="glass-card q-pa-xl h-full transition-hover">
              <q-icon name="admin_panel_settings" color="primary" size="4rem" class="q-mb-md" />
              <h3 class="text-h4 text-weight-bold q-mb-sm">Super Admin</h3>
              <p class="text-grey-4 q-mb-md">Full control over the system ecosystem.</p>
              <ul class="text-grey-4 q-pl-md" style="list-style-type: square">
                <li class="q-mb-sm">User Management & Role Assignment</li>
                <li class="q-mb-sm">Branch & Location Configuration</li>
                <li class="q-mb-sm">Advanced Reporting & Deletion Rights</li>
                <li class="q-mb-sm">Full Audit Logs Access</li>
              </ul>
            </div>
          </div>
          <div class="col-12 col-md-6">
            <div class="glass-card q-pa-xl h-full transition-hover">
              <q-icon name="support_agent" color="white" size="4rem" class="q-mb-md" />
              <h3 class="text-h4 text-weight-bold q-mb-sm">Staff</h3>
              <p class="text-grey-4 q-mb-md">Efficient tools for daily operations.</p>
              <ul class="text-grey-4 q-pl-md" style="list-style-type: square">
                <li class="q-mb-sm">Add & Track New Letters</li>
                <li class="q-mb-sm">View Assigned Correspondence</li>
                <li class="q-mb-sm">Secure File Uploads</li>
                <li class="q-mb-sm">Real-time Status Updates</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Grid -->
    <section id="features" class="q-py-xl relative-position">
      <div class="container q-mx-auto q-px-md">
        <div class="text-center q-mb-xl">
          <h2 class="section-title">Core <span class="text-primary">Features</span></h2>
        </div>

        <div class="row q-col-gutter-md">
          <div class="col-12 col-sm-6 col-md-3" v-for="feature in features" :key="feature.title">
            <div class="glass-card q-pa-lg text-center h-full feature-card">
              <q-avatar color="primary" text-color="white" icon="star" class="q-mb-md" />
              <div class="text-h6 q-mb-sm">{{ feature.title }}</div>
              <div class="text-caption text-grey">{{ feature.desc }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Tech Stack -->
    <section class="q-py-xl bg-dark text-center">
      <div class="container q-mx-auto q-px-md">
        <h3 class="text-h5 text-grey-6 q-mb-lg">POWERED BY</h3>
        <div class="row justify-center q-gutter-xl items-center opacity-50">
          <div class="text-h6 text-weight-bold">VUE.JS</div>
          <div class="text-h6 text-weight-bold">QUASAR</div>
          <div class="text-h6 text-weight-bold">NODE.JS</div>
          <div class="text-h6 text-weight-bold">POSTGRESQL</div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="q-py-xl relative-position">
      <div class="container q-mx-auto q-px-md text-center">
        <h2 class="section-title">Get in <span class="text-primary">Touch</span></h2>
        <p class="text-grey-5 q-mb-lg">Need help or have questions? Contact the IT department.</p>
        <q-btn outline color="white" label="Contact IT Support" icon="email" no-caps />
      </div>
    </section>
  </q-page>
</template>

<script setup>
const features = [
  { title: 'Secure Storage', desc: 'Enterprise-grade encryption for all files.' },
  { title: 'Audit Trails', desc: 'Track every action with precision.' },
  { title: 'Instant Search', desc: 'Find any letter in milliseconds.' },
  { title: 'Responsive', desc: 'Works perfectly on any device.' },
]

const scrollToFeatures = () => {
  const element = document.getElementById('features')
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style scoped>
.container {
  max-width: 1200px;
}
.text-gradient {
  background: linear-gradient(to right, #ffffff, var(--q-primary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.hero-image {
  border-radius: 20px;
  box-shadow: 0 20px 50px rgba(230, 57, 70, 0.2);
  transform: perspective(1000px) rotateY(-10deg) rotateX(5deg);
  transition: transform 0.5s ease;
}
.hero-image:hover {
  transform: perspective(1000px) rotateY(-5deg) rotateX(2deg) scale(1.02);
}
.hero-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(230, 57, 70, 0.2) 0%, rgba(0, 0, 0, 0) 70%);
  z-index: -1;
  filter: blur(50px);
}
.transition-hover {
  transition: all 0.3s ease;
}
.transition-hover:hover {
  transform: translateY(-5px);
  border-color: var(--q-primary);
}
.h-full {
  height: 100%;
}
</style>
