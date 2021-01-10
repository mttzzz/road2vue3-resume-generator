<template>
  <h2>
    <slot/>
    <img src="./../assets/icons/delete.svg" alt="oops" @click="$emit('remove')">
  </h2>
</template>

<script>
export default {
  name: 'AppResumeSubtitle'
}
</script>

<style scoped lang="scss">
h2 {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

img {
  width: 20px;
  &:hover  {
    cursor: pointer;
  }
}
</style>
