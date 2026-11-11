<template>
  <div v-if="student">
    <h1>{{ student.firstName }} {{ student.lastName }}</h1>
    <p><label>Filière : <input v-model="student.filiere" /></label></p>
    <p><label>Année : <input v-model.number="student.year" type="number" min="1" /></label></p>
    <p><label>Email : <input v-model="student.email" type="email" /></label></p>
  </div>
  <div v-else>
    <p>Étudiant introuvable.</p>
  </div>

  <router-link to="/">Retour à l'annuaire</router-link>
</template>

<script>
import { store } from '../store/students.js'

export default {
  name: 'StudentDetailView',
  computed: {
    student() {
      return store.students.find(student => student.id === Number(this.$route.params.id))
    }
  }
}
</script>
