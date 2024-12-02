<script setup lang="ts">

</script>

<template>
  <div class="sessions">
    <div class="session-card" @click="$router.push('sessions')">
      <p>Photos grouped sessions</p>
    </div>
    <div class="session-card" @click="$router.push('everything')">
      <p>All photos</p>
      <small>(WARNING: CAN CAUSE LAG)</small>
    </div>
  </div>
</template>

<style scoped>

.sessions {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.session-card {
  position: relative;
  overflow: hidden;
  border-radius: .5rem;
  background-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 .5rem 1rem rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  aspect-ratio: 16 / 9;
  cursor: pointer;

  padding: 1rem;
  text-align: center;
  align-content: center;
}

.session-card:hover {
  transform: scale(1.05);
}

.session-card p {
  width: 100%;
  height: auto;
}
</style>
