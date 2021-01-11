<template>
  <h1
    @dblclick="edit"
    @keydown.enter.prevent.exact="update"
    @keydown.enter.ctrl="update"
    :contenteditable="isEditEnable" ref="title1">
    {{ title }}
  </h1>
</template>

<script>
export default {
  name: 'AppResumeTitle',
  props: ['title'],
  emits: ['update'],
  data: () => ({
    componentTitle: null,
    isEditEnable: false
  }),
  methods: {
    edit() {
      this.isEditEnable = true
    },
    update() {
      this.$emit('update', this.$refs.title1.innerHTML)
      this.isEditEnable = false
    }
  }
}
</script>

<style scoped lang="scss">
h1 {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

img {
  width: 20px;

  &:hover {
    cursor: pointer;
  }
}
</style>
