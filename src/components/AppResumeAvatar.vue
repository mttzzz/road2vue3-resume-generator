<template>
  <div class="avatar">
        <img :src="avatar">
  </div>
</template>

<script>
export default {
  name: 'AppResumeAvatar',
  props: {
    avatar: {
      type: String,
      validator(value) {
        try {
          /* eslint-disable no-new */
          new URL(value)
          return true
        } catch (_) {
          console.warn('')
          return false
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
