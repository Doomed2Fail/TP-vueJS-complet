<template>
  <div class="filters" aria-label="Filtrer les offres">
    <button
      v-for="filter in filters"
      :key="filter.value"
      class="filter-button"
      :class="{ active: modelValue === filter.value }"
      type="button"
      @click="$emit('update:modelValue', filter.value)"
    >
      {{ filter.label }}
    </button>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: String,
    required: true
  }
})

defineEmits(['update:modelValue'])

const filters = [
  { value: 'all', label: 'Toutes' },
  { value: 'CDI', label: 'CDI' },
  { value: 'CDD', label: 'CDD' },
  { value: 'Stage', label: 'Stage' }
]
</script>
