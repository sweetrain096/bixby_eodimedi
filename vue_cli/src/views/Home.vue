<template>
  <div class="home">
    <BottomButton/>
  </div>
</template>

<script>
// @ is an alias to /src
import BottomButton from '@/components/home/BottomButton.vue'

export default {
  name: 'home',
  components: {
    BottomButton
  }
}
</script>
