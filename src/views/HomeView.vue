<script setup lang="ts">

</script>

<template>
  <div class="title">
    <div class="title-text">Welcome to <strong>VRC Folf</strong></div>
    <div class="title-body">
      <p>This site contains all my archived photos from VRChat</p>
      <p>If you have any issues, my contact details are available at <a href="https://luna.folf.io" target="_blank">https://luna.folf.io/</a></p>
    </div>
  </div>

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
.title {
  text-align: center;
  margin-bottom: 2rem;
}

.title-text {
  font-size: 3rem;
  line-height: 3.5rem;
}

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
