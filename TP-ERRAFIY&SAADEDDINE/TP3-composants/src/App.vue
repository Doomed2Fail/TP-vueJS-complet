<script>
import AddBookForm from './components/AddBookForm.vue'
import BookList from './components/BookList.vue'

const initialBooks = [
  {
    id: 1,
    title: 'Le Petit Prince',
    author: 'Antoine de Saint-Exupéry',
    isFav: true
  },
  {
    id: 2,
    title: 'L’Étranger',
    author: 'Albert Camus',
    isFav: false
  }
]

export default {
  name: 'App',
  components: {
    AddBookForm,
    BookList
  },
  data() {
    return {
      books: [],
      loading: true
    }
  },
  mounted() {
    setTimeout(() => {
      this.books = initialBooks
      this.loading = false
    }, 600)
  },
  methods: {
    addBook(book) {
      this.books.push({
        ...book,
        id: Date.now(),
        isFav: false
      })
    },
    toggleFavorite(bookId) {
      const book = this.books.find((item) => item.id === bookId)
      if (book) {
        book.isFav = !book.isFav
      }
    }
  }
}
</script>

<template>
  <main class="app">
    <header class="hero">
      
      <h1>Catalogue de livres</h1>
      
    </header>

    <AddBookForm @add-book="addBook" />

    <p v-show="loading" class="loading" role="status">Chargement des livres...</p>

    <BookList
      v-show="!loading"
      :books="books"
      @toggle-favorite="toggleFavorite"
    />
  </main>
</template>
