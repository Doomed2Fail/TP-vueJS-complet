<template>
  <article class="job-card">
    <div class="job-card-top">
      <span class="contract">{{ job.contract }}</span>
      <span class="date">{{ formatDate(job.createdAt) }}</span>
    </div>
    <h2>{{ job.title }}</h2>
    <p class="job-location">{{ job.location }} · {{ job.experience }} an(s) d'expérience</p>
    <p class="job-description">{{ job.description }}</p>
    <div class="job-card-bottom">
      <strong>{{ formatSalary(job.salary) }}</strong>
      <RouterLink :to="{ name: 'job-detail', params: { id: job.id } }">Voir l'offre</RouterLink>
    </div>
  </article>
</template>

<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  job: {
    type: Object,
    required: true
  }
})

function formatDate(value) {
  return new Intl.DateTimeFormat('fr-FR', { dateStyle: 'medium' }).format(new Date(value))
}

function formatSalary(value) {
  return `${Number(value).toLocaleString('fr-FR')} DH / mois`
}
</script>
