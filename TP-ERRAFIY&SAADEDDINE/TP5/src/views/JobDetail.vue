<template>
  <p v-if="loading" class="status">Chargement de l'offre...</p>
  <p v-else-if="error" class="status status-error">{{ error }}</p>
  <section v-else-if="job" class="detail-page">
    <RouterLink class="back-link" to="/">← Retour aux offres</RouterLink>
    <div class="detail-header">
      <div>
        <span class="contract">{{ job.contract }}</span>
        <h1>{{ job.title }}</h1>
        <p class="job-location">{{ job.location }} · {{ job.experience }} an(s) d'expérience</p>
      </div>
      <strong class="detail-salary">{{ formatSalary(job.salary) }}</strong>
    </div>

    <div class="detail-content">
      <h2>Description du poste</h2>
      <p>{{ job.description }}</p>
      <p class="detail-date">Offre publiée le {{ formatDate(job.createdAt) }}</p>
    </div>

    <div class="detail-actions">
      <RouterLink
        class="button button-primary"
        :to="{ name: 'edit-job', params: { id: job.id } }"
      >
        Modifier
      </RouterLink>
      <button class="button button-danger" type="button" @click="removeJob">Supprimer</button>
    </div>
  </section>
  <p v-else class="status">Cette offre n'existe pas.</p>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { deleteJob, getJob } from '../services/api'

const route = useRoute()
const router = useRouter()
const job = ref(null)
const loading = ref(true)
const error = ref('')

onMounted(async () => {
  try {
    job.value = await getJob(route.params.id)
  } catch (requestError) {
    error.value = requestError.message
  } finally {
    loading.value = false
  }
})

async function removeJob() {
  if (!window.confirm('Voulez-vous vraiment supprimer cette offre ?')) {
    return
  }

  await deleteJob(job.value.id)
  await router.push('/')
}

function formatDate(value) {
  return new Intl.DateTimeFormat('fr-FR', { dateStyle: 'long' }).format(new Date(value))
}

function formatSalary(value) {
  return `${Number(value).toLocaleString('fr-FR')} DH / mois`
}
</script>
