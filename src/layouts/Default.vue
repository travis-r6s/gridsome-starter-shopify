<template>
  <div class="container-fluid">
    <Navbar />
    <slot />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
export default {
  components: { Navbar }
}
</script>
