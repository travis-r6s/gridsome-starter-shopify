<template>
  <div class="container-fluid">
    <Navbar />
    <section class="section">
      <slot />
    </section>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
export default {
  components: { Navbar }
}
</script>
