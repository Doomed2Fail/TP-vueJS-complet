<script>
export default {
  name: 'AddBookForm',
  emits: ['add-book'],
  data() {
    return {
      title: '',
      author: ''
    }
  },
  mounted() {
    this.$refs.titreInput.focus()
  },
  methods: {
    submit() {
      const title = this.title.trim()
      const author = this.author.trim()

      if (!title || !author) {
        return
      }

      this.$emit('add-book', { title, author })
      this.title = ''
      this.author = ''
      this.$refs.titreInput.focus()
    }
  }
}
</script>

<template>
  <form class="book-form" @submit.prevent="submit">
    <div class="field">
      <label for="book-title">Titre</label>
      <input
        id="book-title"
        ref="titreInput"
        v-model="title"
        type="text"
        placeholder="Le titre du livre ici"
        required
      />
    </div>
    <div class="field">
      <label for="book-author">Auteur</label>
      <input
        id="book-author"
        v-model="author"
        type="text"
        placeholder="Le nom de l'auteur ici"
        required
      />
    </div>
    <button type="submit">Ajouter le livre</button>
  </form>
</template>
