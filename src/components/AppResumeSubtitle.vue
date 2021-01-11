<template>
  <h2>
    {{ subtitle }}
    <div>
      <img src="./../assets/icons/up-arrow.svg" alt="oops" @click="$emit('up')" v-if="idx > 0">
      <img src="./../assets/icons/down-arrow.svg" alt="oops" @click="$emit('down')" v-if="idx !== comboBlocksLength - 1">
      <img src="./../assets/icons/delete.svg" alt="oops" @click="$emit('remove')">
    </div>
  </h2>
</template>

<script>
export default {
  name: 'AppResumeSubtitle',
  emits: ['remove', 'up', 'down'],
  props: ['subtitle', 'comboBlocksLength', 'idx']
}
</script>

<style scoped lang="scss">
h2 {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

div {
  display: flex;
  justify-content: right;
  align-items: center;
}

img {
  width: 20px;

  &:hover {
    cursor: pointer;
  }
}
</style>
