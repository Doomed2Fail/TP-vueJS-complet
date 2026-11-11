<template>
  <section class="page-heading">
    <div>
      <p class="overline">Opportunités professionnelles</p>
      <h1>Les offres disponibles</h1>
      <p class="intro">Trouvez le prochain poste qui correspond à votre profil.</p>
    </div>
    <RouterLink class="button button-primary" to="/add">Ajouter une offre</RouterLink>
  </section>

  <FilterNav v-model="selectedFilter" />

  <p v-if="loading" class="status">Chargement des offres...</p>
  <p v-else-if="error" class="status status-error">{{ error }}</p>
  <p v-else-if="filteredJobs.length === 0" class="status">Aucune offre pour ce filtre.</p>
  <div v-else class="jobs-list">
    <JobCard v-for="job in filteredJobs" :key="job.id" :job="job" />
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import FilterNav from '../components/FilterNav.vue'
import JobCard from '../components/JobCard.vue'
import { getJobs } from '../services/api'

const jobs = ref([])
const loading = ref(true)
const error = ref('')
const selectedFilter = ref('all')

const filteredJobs = computed(() => (
  selectedFilter.value === 'all'
    ? jobs.value
    : jobs.value.filter((job) => job.contract === selectedFilter.value)
))

onMounted(async () => {
  try {
    jobs.value = await getJobs()
  } catch (requestError) {
    error.value = requestError.message
  } finally {
    loading.value = false
  }
})
</script>
