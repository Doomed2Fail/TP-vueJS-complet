<template>
  <p v-if="loading" class="status">Chargement de l'offre...</p>
  <p v-else-if="error" class="status status-error">{{ error }}</p>
  <section v-else class="form-page">
    <RouterLink class="back-link" :to="{ name: 'job-detail', params: { id: job.id } }">
      ← Retour aux détails
    </RouterLink>
    <p class="overline">Modification</p>
    <h1>Modifier l'emploi</h1>
    <JobForm :initial-job="job" submit-label="Enregistrer les modifications" @submit="saveJob" />
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import JobForm from '../components/JobForm.vue'
import { getJob, updateJob } from '../services/api'

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

async function saveJob(updatedJob) {
  await updateJob(job.value.id, updatedJob)
  await router.push({ name: 'job-detail', params: { id: job.value.id } })
}
</script>
