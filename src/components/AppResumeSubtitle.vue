<template>
  <h2>
    {{ subtitle }}
    <div>
      <img src="./../assets/icons/up-arrow.svg" alt="oops" @click="$emit('up')" v-if="idx > 0">
      <img src="./../assets/icons/down-arrow.svg" alt="oops" @click="$emit('down')"
           v-if="idx !== comboBlocksLength - 1">
      <img src="./../assets/icons/delete.svg" alt="oops" @click="showModal = true">
    </div>
  </h2>
  <app-modal v-if="showModal" @yes="$emit('remove')" @no="showModal=false">
    <template #header>
      Нужно подтверждение
    </template>
    <template #body>
      Уверены? А Если подумать?
    </template>
  </app-modal>
</template>

<script>
import AppModal from '@/components/AppModal'

export default {
  name: 'AppResumeSubtitle',
  components: {AppModal},
  emits: ['remove', 'up', 'down'],
  props: ['subtitle', 'comboBlocksLength', 'idx'],
  data: () => ({
    showModal: false
  })
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
