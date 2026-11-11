<script>
import BookCard from './BookCard.vue'

export default {
  name: 'BookList',
  components: {
    BookCard
  },
  props: {
    books: {
      type: Array,
      required: true
    }
  },
  emits: ['toggle-favorite'],
  methods: {
    toggleFavorite(bookId) {
      this.$emit('toggle-favorite', bookId)
    }
  }
}
</script>

<template>
  <section class="catalogue" aria-labelledby="catalogue-title">
    <div class="section-heading">
      <h2 id="catalogue-title">Mes livres</h2>
      <span>{{ books.length }} livre{{ books.length > 1 ? 's' : '' }}</span>
    </div>

    <div v-if="books.length" class="book-grid">
      <BookCard
        v-for="book in books"
        :key="book.id"
        :book="book"
        @toggle-favorite="toggleFavorite"
      >
        <template #actions>
          <span class="slot-label">Ajouté au catalogue</span>
        </template>
      </BookCard>
    </div>

    <p v-else class="empty-state">Aucun livre dans le catalogue.</p>
  </section>
</template>
