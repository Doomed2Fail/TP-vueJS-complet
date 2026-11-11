<template>
  <section class="form-page">
    <RouterLink class="back-link" to="/">← Retour aux offres</RouterLink>
    <p class="overline">Nouvelle offre</p>
    <h1>Ajouter un emploi</h1>
    <JobForm submit-label="Ajouter l'offre" @submit="addJob" />
  </section>
</template>

<script setup>
import { RouterLink, useRouter } from 'vue-router'
import JobForm from '../components/JobForm.vue'
import { createJob } from '../services/api'

const router = useRouter()

async function addJob(job) {
  await createJob(job)
  await router.push('/')
}
</script>
