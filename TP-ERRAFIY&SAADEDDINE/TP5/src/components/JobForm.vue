<template>
  <form class="job-form" @submit.prevent="submitForm">
    <div class="form-grid">
      <label>
        Titre du poste
        <input v-model.trim="form.title" type="text" required />
      </label>

      <label>
        Ville
        <input v-model.trim="form.location" type="text" required />
      </label>

      <label>
        Type de contrat
        <select v-model="form.contract" required>
          <option value="CDI">CDI</option>
          <option value="CDD">CDD</option>
          <option value="Stage">Stage</option>
          <option value="Freelance">Freelance</option>
        </select>
      </label>

      <label>
        Salaire mensuel (DH)
        <input v-model.number="form.salary" type="number" min="0" required />
      </label>

      <label>
        Expérience (années)
        <input v-model.number="form.experience" type="number" min="0" required />
      </label>

      <label>
        Date de création
        <input v-model="form.createdAt" type="date" required />
      </label>
    </div>

    <label>
      Description
      <textarea v-model.trim="form.description" rows="5" required></textarea>
    </label>

    <p v-if="error" class="form-error">{{ error }}</p>

    <div class="form-actions">
      <RouterLink class="button button-secondary" to="/">Annuler</RouterLink>
      <button class="button button-primary" type="submit" :disabled="saving">
        {{ saving ? 'Enregistrement...' : submitLabel }}
      </button>
    </div>
  </form>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  initialJob: {
    type: Object,
    default: () => ({})
  },
  submitLabel: {
    type: String,
    default: 'Enregistrer'
  }
})

const emit = defineEmits(['submit'])
const saving = ref(false)
const error = ref('')
const form = reactive({
  title: props.initialJob.title || '',
  description: props.initialJob.description || '',
  salary: props.initialJob.salary || 0,
  createdAt: props.initialJob.createdAt || new Date().toISOString().slice(0, 10),
  experience: props.initialJob.experience || 0,
  location: props.initialJob.location || '',
  contract: props.initialJob.contract || 'CDI'
})

async function submitForm() {
  error.value = ''
  saving.value = true

  try {
    await emit('submit', { ...form })
  } catch {
    error.value = 'Impossible d’enregistrer cette offre.'
  } finally {
    saving.value = false
  }
}
</script>
