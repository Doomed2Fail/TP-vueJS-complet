<script>
export default {
  name: 'BookCard',
  props: {
    book: {
      type: Object,
      required: true,
      validator(book) {
        return typeof book.title === 'string' && book.title.trim().length > 0
      }
    }
  },
  emits: ['toggle-favorite'],
  methods: {
    toggleFavorite() {
      this.$emit('toggle-favorite', this.book.id)
    }
  }
}
</script>

<template>
  <article class="book-card">
    <div class="book-card__content">
      <p class="book-card__author">{{ book.author }}</p>
      <h3>{{ book.title }}</h3>
      <span v-if="book.isFav" class="favorite-badge">★ Favori</span>
      <slot name="actions"></slot>
    </div>
    <button
      class="favorite-button"
      type="button"
      :aria-label="book.isFav ? `Retirer ${book.title} des favoris` : `Ajouter ${book.title} aux favoris`"
      @click="toggleFavorite"
    >
      {{ book.isFav ? 'Retirer des favoris' : 'Ajouter aux favoris' }}
    </button>
  </article>
</template>
