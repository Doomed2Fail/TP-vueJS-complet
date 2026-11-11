<template>
  <header class="site-header">
    <div class="container header-content">
      <RouterLink class="brand" to="/">Jobs</RouterLink>
      <nav class="main-nav" aria-label="Navigation principale">
        <RouterLink to="/">Offres</RouterLink>
        <RouterLink class="nav-add" to="/add">Ajouter une offre</RouterLink>
      </nav>
    </div>
  </header>

  <main class="container page-content">
    <RouterView />
  </main>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>
