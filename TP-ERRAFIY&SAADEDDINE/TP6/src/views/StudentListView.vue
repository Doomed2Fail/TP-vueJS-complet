<template>
  <h1>Annuaire des étudiants</h1>

  <form @submit.prevent="ajouterEtudiant">
    <input v-model.trim="newStudent.firstName" placeholder="Prénom" aria-label="Prénom" required />
    <input v-model.trim="newStudent.lastName" placeholder="Nom" aria-label="Nom" required />
    <input v-model.trim="newStudent.filiere" placeholder="Filière" aria-label="Filière" />
    <input v-model.number="newStudent.year" type="number" min="1" aria-label="Année" />
    <input v-model.trim="newStudent.email" type="email" placeholder="Email" aria-label="Email" />
    <button type="submit">Ajouter</button>
  </form>

  <div class="toolbar">
    <input v-model="recherche" placeholder="Rechercher par nom ou prénom" aria-label="Recherche" />
    <select v-model="tri" aria-label="Trier par">
      <option value="lastName">Nom</option>
      <option value="filiere">Filière</option>
    </select>
  </div>

  <StudentCard v-for="student in etudiantsAffiches" :key="student.id" :student="student" />
</template>

<script>
import StudentCard from '../components/StudentCard.vue'
import { store } from '../store/students.js'

export default {
  name: 'StudentListView',
  components: { StudentCard },
  data() {
    return {
      store,
      recherche: '',
      tri: 'lastName',
      newStudent: { firstName: '', lastName: '', filiere: '', year: 1, email: '' }
    }
  },
  computed: {
    etudiantsAffiches() {
      const texte = this.recherche.trim().toLowerCase()
      return this.store.students
        .filter(student =>
          student.firstName.toLowerCase().includes(texte) ||
          student.lastName.toLowerCase().includes(texte)
        )
        .sort((a, b) => a[this.tri].localeCompare(b[this.tri], 'fr'))
    }
  },
  methods: {
    ajouterEtudiant() {
      const firstName = this.newStudent.firstName.trim()
      const lastName = this.newStudent.lastName.trim()
      if (!firstName || !lastName) return

      const id = Math.max(0, ...this.store.students.map(student => student.id)) + 1
      this.store.students.push({ ...this.newStudent, id, firstName, lastName })
      this.newStudent = { firstName: '', lastName: '', filiere: '', year: 1, email: '' }
    }
  }
}
</script>
